export type Projeto = {
  slug: string; titulo: string; categoria: string; resumo: string;
  cor: string; descricao: string; entregas: string[];
};

// Troque estes exemplos pelos seus cases reais.
export const projetos: Projeto[] = [
  { slug: "cami-meulam", titulo: "Cami Meulam", categoria: "Identidade visual",
    resumo: "Marca autoral com flores, selos e tons de oliva.", cor: "#4f4e00",
    descricao: "Descreva aqui o desafio, a estratégia e o resultado do projeto.",
    entregas: ["Logotipo", "Paleta e tipografia", "Padrões gráficos"] },
  { slug: "projeto-dois", titulo: "Projeto dois", categoria: "Branding",
    resumo: "Resumo curto do projeto.", cor: "#d14367",
    descricao: "Descreva aqui o desafio, a estratégia e o resultado do projeto.",
    entregas: ["Posicionamento", "Identidade visual"] },
  { slug: "projeto-tres", titulo: "Projeto três", categoria: "Design de conteúdo",
    resumo: "Resumo curto do projeto.", cor: "#aa385d",
    descricao: "Descreva aqui o desafio, a estratégia e o resultado do projeto.",
    entregas: ["Templates de posts", "Direção de arte"] },
];
