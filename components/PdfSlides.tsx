"use client";
import { useEffect, useRef, useState } from "react";

export default function PdfSlides({ src, titulo }: { src: string; titulo: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const doc = useRef<any>(null);
  const [n, setN] = useState(0);
  const [i, setI] = useState(1);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        const url = "/pdf.min.mjs";
        const pdfjs: any = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url);
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const d = await pdfjs.getDocument(src).promise;
        if (!vivo) return;
        doc.current = d;
        setN(d.numPages);
      } catch {
        setErro(true);
      }
    })();
    return () => { vivo = false; };
  }, [src]);

  useEffect(() => {
    if (!n) return;
    let task: any;
    (async () => {
      const page = await doc.current.getPage(i);
      const c = canvas.current;
      if (!c) return;
      const w = c.parentElement!.clientWidth;
      const h = window.innerHeight * 0.8;
      const base = page.getViewport({ scale: 1 });
      const fit = Math.min(w / base.width, h / base.height);
      const scale = fit * Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale });
      c.width = vp.width;
      c.height = vp.height;
      task = page.render({ canvasContext: c.getContext("2d")!, viewport: vp });
      try { await task.promise; } catch {}
    })();
    return () => task?.cancel();
  }, [n, i]);

  const go = (d: number) => setI((p) => Math.min(Math.max(p + d, 1), n));

  if (erro) return <a href={src} target="_blank" rel="noopener noreferrer">Abrir PDF em nova aba</a>;

  return (
    <div
      className="slides"
      tabIndex={0}
      role="group"
      aria-label={`Apresentação: ${titulo}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="slides-tela">
        <canvas ref={canvas} aria-label={`${titulo}, página ${i} de ${n}`} />
      </div>
      <div className="slides-ctrl">
        <button onClick={() => go(-1)} disabled={i === 1} aria-label="Página anterior">‹</button>
        <span>{i} / {n || "…"}</span>
        <button onClick={() => go(1)} disabled={i === n} aria-label="Próxima página">›</button>
      </div>
      <a href={src} target="_blank" rel="noopener noreferrer">Abrir PDF em nova aba</a>
    </div>
  );
}