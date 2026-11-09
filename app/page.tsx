import Link from "next/link";
import { projetos } from "@/lib/projetos";
import Reveal from "@/components/Reveal";
import { getArquivos } from "@/lib/arquivos";
import ProjetosCarrossel from "@/components/ProjetosCarrossel";
import CarrosselCelular from "@/components/CarrosselCelular";

const servicos = [
  { t: "Identidade visual", d: "Logotipo, paleta, tipografia e padrões que dão rosto à sua marca." },
  { t: "Estratégia de marca", d: "Posicionamento e narrativa para crescer com autenticidade." },
  { t: "Design de conteúdo", d: "Peças e templates que mantêm sua marca consistente nas redes." },
];

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link href="/" className="logo">Lirea</Link>
          <nav aria-label="Principal">
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Lirea Design, com um lírio rosa sobre fundo em degradê" />
          <div className="wrap intro">
            <h1>Marcas autorais que unem estratégia, arte e sensibilidade.</h1>
            <p>Estúdio de branding e design de conteúdo para pequenas empresas que querem crescer com autenticidade e para negócios que precisam de um reposicionamento.</p>
            <a className="botao" href="#projetos">Ver projetos</a>
          </div>
        </div>

        <section id="sobre" className="manifesto" style={{ marginTop: 96 }}>
          <div className="wrap">
            <h2>Acreditamos que uma marca bonita nasce de uma marca verdadeira.</h2>
            <p>Cada projeto começa ouvindo a história de quem está por trás do negócio. Depois, transformamos essa história em identidade, linguagem e imagem.</p>
          </div>
        </section>

        <section id="projetos">
          <div className="wrap">
            <h2 className="titulo-secao">Projetos</h2>
            <ProjetosCarrossel
              itens={projetos.map((p) => {
                const a = getArquivos(p.slug);
                return {
                  slug: p.slug,
                  titulo: p.titulo,
                  categoria: p.categoria,
                  cor: p.cor,
                  capa: a.imagens[0]?.url ?? null,
                  capaPdf: a.pdfs[0]?.url ?? null,
                  capaVideo: a.videos[0]?.url ?? null,
                };
              })}
            />
          </div>
        </section>
      <section className="cel-secao" aria-labelledby="titulo-carrosseis">
          <div className="wrap">
            <h2 className="titulo-secao" id="titulo-carrosseis">Design de Conteúdo</h2>
            <p className="cel-rotulo">Carrosséis</p>
            <div className="cel-grade">
              {getArquivos("carrosseis").imagens.map((img, n) => (
                <CarrosselCelular key={img.url} src={img.url} alt={`Carrossel ${n + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="servicos">
          <div className="wrap">
            <h2 className="titulo-secao">Serviços</h2>
            <div className="grade">
              {servicos.map((s) => (
                <div key={s.t}><h3>{s.t}</h3><p>{s.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <div className="faixa" role="presentation" />

        <section id="contato" className="contato">
          <div className="wrap">
            <h2>Vamos criar a sua marca?</h2>
            <p>Conte um pouco sobre o seu negócio e eu respondo em até 2 dias úteis.</p>
            <a className="botao" href="mailto:sarahhsantos2026@gmail.com">Enviar e-mail</a>
            <p className="redes">
              <a href="https://www.instagram.com/lirea.design/" target="_blank" rel="noopener noreferrer">Instagram</a>{" · "}
              <a href="https://www.linkedin.com/in/sarah-santossilva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <a href="mailto:sarahhsantos2026@gmail.com">E-mail</a>{" · "}
            <a href="https://www.instagram.com/lirea.design/" target="_blank" rel="noopener noreferrer">Instagram</a>{" · "}
            <a href="https://www.linkedin.com/in/sarah-santossilva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
          <span>© 2026 Todos os direitos reservados</span>
        </div>
      </footer>
    </>
  );
}