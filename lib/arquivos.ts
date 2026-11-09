import fs from "fs";
import path from "path";

export function getArquivos(slug: string) {
  const dir = path.join(process.cwd(), "public", "images", slug);
  let nomes: string[] = [];
  try { nomes = fs.readdirSync(dir); } catch {}
  nomes.sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));
  const url = (n: string) => `/images/${slug}/${encodeURIComponent(n)}`;
  const f = (re: RegExp) => nomes.filter((n) => re.test(n)).map((n) => ({ nome: n, url: url(n) }));
  return {
    imagens: f(/\.(jpe?g|png|webp|gif|avif)$/i),
    pdfs: f(/\.pdf$/i),
    videos: f(/\.(mp4|webm|mov)$/i),
  };
}