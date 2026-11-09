import Link from "next/link";
import { projetos } from "@/lib/projetos";

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
            <div className="grade">
              {projetos.map((p) => (
                <Link key={p.slug} href={`/projetos/${p.slug}`} className="card">
                  <div className="capa" style={{ background: p.cor }}>{p.titulo}</div>
                  <small>{p.categoria}</small>
                  <h3>{p.titulo}</h3>
                  <p>{p.resumo}</p>
                </Link>
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
            <a className="botao" href="mailto:contato@seudominio.com">Enviar e-mail</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>Lirea Design</span>
          <span>© 2026 Todos os direitos reservados</span>
        </div>
      </footer>
    </>
  );
}
