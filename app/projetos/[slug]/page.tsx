import Link from "next/link";
import { notFound } from "next/navigation";
import { projetos } from "@/lib/projetos";
import { getArquivos } from "@/lib/arquivos";
import Reveal from "@/components/Reveal";
import PhoneMockup from "@/components/PhoneMockup";
import PdfSlides from "@/components/PdfSlides";

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projetos.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projetos[i];
  const ant = projetos[(i - 1 + projetos.length) % projetos.length];
  const prox = projetos[(i + 1) % projetos.length];
  const { imagens, pdfs, videos } = getArquivos(slug);
  const ux = slug === "ux-ui-design";

  const figmaLink = "https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaLink)}`";
  const temFigma = figmaLink.includes("figma.com");
  const phoneSrc = temFigma
    ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaLink)}`
    : undefined;

  return (
    <main className="case wrap">
      <Link href="/#projetos">← Voltar aos projetos</Link>
      <Reveal>
        <small>{p.categoria}</small>
        <h1>{p.titulo}</h1>
        <p>{p.resumo}</p>
      </Reveal>

      {p.contexto && <Reveal><h2>Contexto e objetivo</h2><p>{p.contexto}</p></Reveal>}
      {p.conceito && <Reveal><h2>Conceito criativo</h2><p>{p.conceito}</p></Reveal>}
      {p.processo && <Reveal><h2>Processo</h2><ul>{p.processo.map((x) => <li key={x}>{x}</li>)}</ul></Reveal>}

      {ux && temFigma && (
        <Reveal>
          <div className="app-cta">
            <div>
              <h2>Protótipo navegável</h2>
              <p>Teste o app direto no Figma, clicando pelas telas como no celular.</p>
            </div>
            <a className="botao" href={figmaLink} target="_blank" rel="noopener noreferrer">
              Abrir o app no Figma →
            </a>
          </div>
        </Reveal>
      )}

      {slug === "zines" && imagens.length > 0 &&
        [
          { t: "Laços com Pets", k: "pets" },
          { t: "Pará: Patrimônio Cultural", k: "para" },
        ].map((g) => {
          const lista = imagens.filter((x) => x.nome.toLowerCase().includes(`-${g.k}-`));
          if (!lista.length) return null;
          return (
            <section key={g.k} style={{ margin: "56px 0" }}>
              <Reveal><h2>{g.t}</h2></Reveal>
              <div className="galeria g-zines">
                {lista.map((img, k) => (
                  <Reveal key={img.url} delay={(k % 2) * 80}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={`${g.t}, imagem ${k + 1}`} loading="lazy" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

      {!ux && slug !== "zines" && imagens.length > 0 && (
        <div className={`galeria g-${slug}`}>
          {imagens.map((img, k) => (
            <Reveal key={img.url} delay={(k % 2) * 80}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={`${p.titulo}, imagem ${k + 1}`} loading="lazy" />
            </Reveal>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="videos">
          {videos.map((v) => (
            <Reveal key={v.url}><video suppressHydrationWarning controls preload="metadata" src={v.url} /></Reveal>
          ))}
        </div>
      )}

      {pdfs.map((d) => (
        <Reveal key={d.url}>
          <PdfSlides src={d.url} titulo={`${p.titulo}, ${d.nome}`} />
        </Reveal>
      ))}

      {imagens.length + pdfs.length + videos.length === 0 && (
        <p>Nenhum arquivo encontrado em public/images/{slug}/</p>
      )}

      <nav className="pager" aria-label="Navegação entre projetos">
        <Link href={`/projetos/${ant.slug}`}>← {ant.titulo}</Link>
        <Link href="/#projetos">Portfólio</Link>
        <Link href={`/projetos/${prox.slug}`}>{prox.titulo} →</Link>
      </nav>
    </main>
  );
}