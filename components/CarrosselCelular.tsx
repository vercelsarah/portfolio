'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  usuario?: string;
  avatar?: string;
};

export default function CarrosselCelular({ src, alt, usuario = 'lirea.design', avatar }: Props) {
  const [total, setTotal] = useState(1);
  const [atual, setAtual] = useState(0);
  const [pronto, setPronto] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const inicioX = useRef<number | null>(null);

  const medir = () => {
    const el = img.current;
    if (!el || !el.naturalHeight) return;
    setTotal(Math.max(1, Math.round(el.naturalWidth / (el.naturalHeight * 0.8))));
    setPronto(true);
  };

  useEffect(() => {
    if (img.current?.complete) medir();
  }, []);

  const ir = (n: number) => setAtual(Math.min(Math.max(n, 0), total - 1));

  return (
    <div className="cel">
      <div className="cel-corpo">
        <span className="cel-ilha" aria-hidden="true" />

        <div className="ig-status" aria-hidden="true">
          <span>9:41</span>
          <svg viewBox="0 0 48 14">
            <rect x="0" y="9" width="3" height="5" rx="1" fill="currentColor" />
            <rect x="5" y="6" width="3" height="8" rx="1" fill="currentColor" />
            <rect x="10" y="3" width="3" height="11" rx="1" fill="currentColor" />
            <rect x="15" y="0" width="3" height="14" rx="1" fill="currentColor" />
            <rect x="26" y="2" width="20" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="28" y="4" width="14" height="6" rx="1.5" fill="currentColor" />
          </svg>
        </div>

        <div className="ig-topo" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="ig-ico">
            <path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <strong>Posts</strong>
        </div>

        <div className="ig-perfil">
          <span className="ig-avatar" aria-hidden="true">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="" />
            ) : (
              <span>L</span>
            )}
          </span>
          <span className="ig-nome">{usuario}</span>
          <svg viewBox="0 0 24 24" className="ig-ico ig-menu" aria-hidden="true">
            <path d="M4 8h16M4 16h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div
          className="cel-tela"
          role="group"
          aria-roledescription="carrossel"
          aria-label={alt}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') ir(atual - 1);
            if (e.key === 'ArrowRight') ir(atual + 1);
          }}
        >
          <div
            className="cel-janela"
            onTouchStart={(e) => {
              inicioX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (inicioX.current === null) return;
              const dx = e.changedTouches[0].clientX - inicioX.current;
              if (Math.abs(dx) > 40) ir(atual + (dx < 0 ? 1 : -1));
              inicioX.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={img}
              src={src}
              alt={`${alt}, slide ${atual + 1} de ${total}`}
              onLoad={medir}
              className="cel-faixa"
              style={{
                width: `${total * 100}%`,
                transform: `translateX(-${(atual * 100) / total}%)`,
                opacity: pronto ? 1 : 0,
              }}
            />

            <span className="ig-contador" aria-hidden="true">
              {atual + 1}/{total}
            </span>

            <button
              type="button"
              className="cel-seta cel-esq"
              onClick={() => ir(atual - 1)}
              disabled={atual === 0}
              aria-label="Slide anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="cel-seta cel-dir"
              onClick={() => ir(atual + 1)}
              disabled={atual === total - 1}
              aria-label="Próximo slide"
            >
              ›
            </button>
          </div>
        </div>

        <div className="cel-bolinhas">
          {Array.from({ length: total }).map((_, n) => (
            <button
              key={n}
              type="button"
              className={n === atual ? 'on' : ''}
              onClick={() => ir(n)}
              aria-label={`Ir para o slide ${n + 1}`}
              aria-current={n === atual}
            />
          ))}
        </div>

        <div className="ig-acoes" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="ig-ico">
            <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.5 2.7c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" className="ig-ico">
            <path d="M20.5 11.5a8 8 0 0 1-11.7 7L3.5 20l1.6-4.6A8 8 0 1 1 20.5 11.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" className="ig-ico">
            <path d="M17 3l3 3-3 3M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 0 1-3 3H4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" className="ig-ico">
            <path d="M21 3L3 10l7 3 3 7 8-17z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" className="ig-ico ig-salvar">
            <path d="M6 3h12v18l-6-4.5L6 21z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="ig-home" aria-hidden="true" />
      </div>
    </div>
  );
}