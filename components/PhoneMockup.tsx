"use client";
import { useRef, useState } from "react";

export default function PhoneMockup({ telas = [], figma }: { telas?: string[]; figma?: string }) {
  const [i, setI] = useState(0);
  const x = useRef(0);
  const go = (n: number) => setI((p) => Math.min(Math.max(p + n, 0), telas.length - 1));

  return (
    <div
      className="phone"
      role="group"
      aria-label="Protótipo navegável"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="phone-notch" />
      <div
        className="phone-screen"
        onTouchStart={(e) => (x.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const d = e.changedTouches[0].clientX - x.current;
          if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
        }}
      >
        {figma ? (
          <iframe src={figma} title="Protótipo" allowFullScreen />
        ) : (
          <div className="phone-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {telas.map((s, k) => (
              <div className="phone-slide" key={s}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt={`Tela ${k + 1} do protótipo`} />
              </div>
            ))}
          </div>
        )}
      </div>
      {!figma && telas.length > 1 && (
        <div className="phone-ctrl">
          <button onClick={() => go(-1)} disabled={i === 0} aria-label="Tela anterior">‹</button>
          <span>{i + 1} / {telas.length}</span>
          <button onClick={() => go(1)} disabled={i === telas.length - 1} aria-label="Próxima tela">›</button>
        </div>
      )}
    </div>
  );
}