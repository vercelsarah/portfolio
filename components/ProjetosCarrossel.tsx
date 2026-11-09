'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

type Item = {
  slug: string;
  titulo: string;
  categoria?: string;
  cor: string;
  capa?: string | null;
  capaPdf?: string | null;
  capaVideo?: string | null;
};

function CapaPdf({ url, titulo }: { url: string; titulo: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const caminho = '/pdf.min.mjs';
        const pdfjs: any = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ caminho);
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const doc = await pdfjs.getDocument({ url }).promise;
        const pagina = await doc.getPage(1);
        const base = pagina.getViewport({ scale: 1 });
        const viewport = pagina.getViewport({ scale: 600 / base.width });
        const el = canvas.current;
        if (!el || cancelado) return;
        el.width = viewport.width;
        el.height = viewport.height;
        const ctx = el.getContext('2d');
        if (!ctx) return;
        await pagina.render({ canvasContext: ctx, viewport }).promise;
      } catch {
        if (!cancelado) setFalhou(true);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [url]);

  if (falhou) return <span className="pc-vazio">{titulo}</span>;
  return <canvas ref={canvas} className="pc-canvas" role="img" aria-label={`Capa do projeto ${titulo}`} />;
}

export default function ProjetosCarrossel({ itens }: { itens: Item[] }) {
  const janela = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLUListElement>(null);
  const inicioX = useRef<number | null>(null);

  const [indice, setIndice] = useState(0);
  const [medidas, setMedidas] = useState({ passo: 0, visivel: 1 });
  const [pausado, setPausado] = useState(false);
  const [reduzir, setReduzir] = useState(false);

  const max = Math.max(0, itens.length - medidas.visivel);
  const posicao = Math.min(indice, max);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduzir(mq.matches);
    const aoMudar = () => setReduzir(mq.matches);
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);

  // mede o tamanho dos cards e quantos cabem na tela
  useEffect(() => {
    const medir = () => {
      const ul = trilho.current;
      const jan = janela.current;
      if (!ul || !jan) return;
      const item = ul.querySelector('.pc-item') as HTMLElement | null;
      if (!item) return;
      const gap = parseFloat(getComputedStyle(ul).columnGap) || 16;
      const w = item.getBoundingClientRect().width;
      if (!w) return;
      const visivel = Math.max(1, Math.round((jan.clientWidth + gap) / (w + gap)));
      setMedidas({ passo: w + gap, visivel });
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [itens.length]);

  const ir = useCallback(
    (dir: 1 | -1) => {
      setIndice((atual) => {
        const a = Math.min(atual, max);
        if (dir === 1) return a >= max ? 0 : a + 1;
        return a <= 0 ? max : a - 1;
      });
    },
    [max]
  );

  // passa sozinho de 2 em 2 segundos
  useEffect(() => {
    if (pausado || reduzir) return;
    const id = setInterval(() => ir(1), 2000);
    return () => clearInterval(id);
  }, [pausado, reduzir, ir]);

  return (
    <div
      className="pc"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <button type="button" className="pc-seta pc-seta-esq" onClick={() => ir(-1)} aria-label="Projetos anteriores">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="pc-seta pc-seta-dir" onClick={() => ir(1)} aria-label="Próximos projetos">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="pc-janela"
        ref={janela}
        onTouchStart={(e) => {
          setPausado(true);
          inicioX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          setPausado(false);
          if (inicioX.current === null) return;
          const dx = e.changedTouches[0].clientX - inicioX.current;
          if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          inicioX.current = null;
        }}
      >
        <ul
          className="pc-trilho"
          ref={trilho}
          aria-label="Lista de projetos"
          style={{
            transform: `translateX(-${posicao * medidas.passo}px)`,
            transition: reduzir ? 'none' : 'transform 0.5s ease',
          }}
        >
          {itens.map((p) => (
            <li className="pc-item" key={p.slug}>
              <Link href={`/projetos/${p.slug}`} className="pc-card" style={{ background: p.cor }}>
                <span className="pc-img">
                  {p.capa ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.capa} alt={`Capa do projeto ${p.titulo}`} loading="lazy" />
                  ) : p.capaPdf ? (
                    <CapaPdf url={p.capaPdf} titulo={p.titulo} />
                  ) : p.capaVideo ? (
                    <video
                      src={`${p.capaVideo}#t=0.5`}
                      muted
                      playsInline
                      preload="metadata"
                      className="pc-video"
                      aria-label={`Capa do projeto ${p.titulo}`}
                    />
                  ) : (
                    <span className="pc-vazio">{p.titulo}</span>
                  )}
                </span>
                <span className="pc-titulo">{p.titulo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}