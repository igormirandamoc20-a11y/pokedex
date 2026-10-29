import Link from "next/link";

export default function PokemonCard({ nome, id, imagem }) {
  return (
    <Link href={`/pokemon/${nome}`} className="card">
      <img src={imagem} alt={nome} width="96" height="96" loading="lazy" />
      <span className="card-nome">{nome}</span>
      <span className="card-id">#{id}</span>
    </Link>
  );
}
