import PokemonCard from "./PokemonCard";
import { extrairId } from "../services/pokemonApi";

export default function PokemonList({ pokemons }) {
  return (
    <div className="grade">
      {pokemons.map((pokemon) => {
        const id = extrairId(pokemon.url);
        const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return (
          <PokemonCard
            key={pokemon.name}
            nome={pokemon.name}
            id={id}
            imagem={imagem}
          />
        );
      })}
    </div>
  );
}
