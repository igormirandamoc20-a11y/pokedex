"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buscarPokemon } from "../../../services/pokemonApi";

function formatar(numero) {
  return (numero / 10).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function DetalhesPokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    if (!name) return;
    let cancelado = false;

    async function carregar() {
      setCarregando(true);
      setErro(false);
      setNaoEncontrado(false);
      setPokemon(null);
      try {
        const dados = await buscarPokemon(decodeURIComponent(name));
        if (cancelado) return;
        if (!dados) setNaoEncontrado(true);
        else setPokemon(dados);
      } catch {
        if (!cancelado) setErro(true);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [name]);

  return (
    <section className="detalhes">
      {carregando && <p className="estado">Carregando...</p>}

      {!carregando && erro && (
        <p className="estado erro">
          Não foi possível carregar os Pokémon. Tente novamente.
        </p>
      )}

      {!carregando && naoEncontrado && (
        <p className="estado">Pokémon não encontrado.</p>
      )}

      {pokemon && (
        <article className="ficha">
          <h1>{pokemon.name}</h1>
          <img
            src={
              pokemon.sprites.front_default ||
              pokemon.sprites.other?.["official-artwork"]?.front_default
            }
            alt={pokemon.name}
            width="160"
            height="160"
          />
          <dl>
            <div>
              <dt>Número</dt>
              <dd>#{pokemon.id}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{pokemon.types.map((t) => t.type.name).join(", ")}</dd>
            </div>
            <div>
              <dt>Altura</dt>
              <dd>{formatar(pokemon.height)} m</dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>{formatar(pokemon.weight)} kg</dd>
            </div>
          </dl>

          <h2>Habilidades</h2>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>

          <h2>Estatísticas</h2>
          <ul className="stats">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <span>{s.stat.name}</span>
                <strong>{s.base_stat}</strong>
              </li>
            ))}
          </ul>
        </article>
      )}

      <Link href="/pokemon" className="botao voltar">
        Voltar para a lista
      </Link>
    </section>
  );
}
