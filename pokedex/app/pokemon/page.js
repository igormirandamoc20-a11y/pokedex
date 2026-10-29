"use client";
import { useEffect, useState } from "react";
import PokemonList from "../../components/PokemonList";
import SearchPokemon from "../../components/SearchPokemon";
import Pagination from "../../components/Pagination";
import { buscarLista } from "../../services/pokemonApi";

export default function ListaPokemon() {
  const [pagina, setPagina] = useState(1);
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setCarregando(true);
      setErro(false);
      try {
        const resultado = await buscarLista(pagina);
        if (!cancelado) setDados(resultado);
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
  }, [pagina, tentativa]);

  return (
    <section>
      <h1>Pokémon</h1>
      <SearchPokemon />

      {carregando && <p className="estado">Carregando...</p>}

      {!carregando && erro && (
        <div className="estado erro">
          <p>Não foi possível carregar os Pokémon. Tente novamente.</p>
          <button onClick={() => setTentativa((t) => t + 1)}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && dados && (
        <>
          <PokemonList pokemons={dados.results} />
          <Pagination
            pagina={pagina}
            temProxima={Boolean(dados.next)}
            onMudar={setPagina}
          />
        </>
      )}
    </section>
  );
}
