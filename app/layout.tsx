import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-titulo" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-texto" });

export const metadata: Metadata = {
  title: "Lirea Design",
  description: "Estúdio de branding e design de conteúdo para marcas autorais.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
