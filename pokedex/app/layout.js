import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Pokédex",
  description: "Explore o mundo dos Pokémon com a PokéAPI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <Link href="/" className="marca">
            <span className="bola" aria-hidden="true" />
            Pokédex
          </Link>
          <Link href="/pokemon">Pokémon</Link>
        </header>
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
