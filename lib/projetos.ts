export type Projeto = {
  slug: string; titulo: string; categoria: string; resumo: string; cor: string;
  contexto?: string; conceito?: string; processo?: string[];
};

const c = ["#4f4e00", "#d14367", "#aa385d", "#e8601c", "#6b0f33"];
const lista: [string, string, string][] = [
  ["capa-de-livro", "Capa de livro", "Design editorial"],
  ["cards", "Cards", "Design de conteúdo"],
  ["carrosseis", "Carrosséis", "Design de conteúdo"],
  ["cartazes", "Cartazes", "Design gráfico"],
  ["cartoes-postais", "Cartões postais", "Design gráfico"],
  ["e-mail-marketing", "E-mail marketing", "Design de conteúdo"],
  ["empena", "Empena", "Design gráfico"],
  ["identidade-visual", "Identidade Visual", "Branding"],
  ["infograficos", "Infográficos", "Design de informação"],
  ["instalacao-artistica", "Instalação Artística", "Arte"],
  ["livro", "Livro", "Design editorial"],
  ["quadrinhos", "Quadrinhos", "Ilustração"],
  ["revista", "Revista", "Design editorial"],
  ["ux-ui-design", "Estudos de casos UX", "UX/UI"],
  ["videos", "Vídeos", "Audiovisual"],
  ["zines", "Zines", "Design editorial"],
];

export const projetos: Projeto[] = lista.map(([slug, titulo, categoria], i) => ({
  slug, titulo, categoria, cor: c[i % c.length],
  resumo: `Projeto de ${categoria.toLowerCase()} da Lírea Design.`,
}));