import Link from "next/link";
import { notFound } from "next/navigation";
import { projetos } from "@/lib/projetos";

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="case wrap">
      <Link href="/#projetos">Voltar aos projetos</Link>
      <div className="capa-grande" style={{ background: p.cor }} />
      <small>{p.categoria}</small>
      <h1>{p.titulo}</h1>
      <div className="meta" style={{ marginTop: 32 }}>
        <p>{p.descricao}</p>
        <div>
          <strong>Entregas</strong>
          <ul>{p.entregas.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      </div>
    </main>
  );
}
