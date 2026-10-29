import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <h1>Pokédex</h1>
      <p>Explore o mundo dos Pokémon</p>
      <Link href="/pokemon" className="botao">
        Ver Pokémon
      </Link>
    </section>
  );
}
