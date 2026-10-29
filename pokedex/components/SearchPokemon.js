"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buscarPokemon } from "../services/pokemonApi";

export default function SearchPokemon() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [buscando, setBuscando] = useState(false);

  async function aoBuscar(evento) {
    evento.preventDefault();
    const nome = texto.trim().toLowerCase();

    if (!nome) {
      setMensagem("Digite o nome de um Pokémon para buscar.");
      return;
    }

    setMensagem("");
    setBuscando(true);
    try {
      const pokemon = await buscarPokemon(nome);
      if (!pokemon) {
        setMensagem("Pokémon não encontrado.");
        setBuscando(false);
        return;
      }
      router.push(`/pokemon/${pokemon.name}`);
    } catch {
      setMensagem("Não foi possível buscar agora. Tente novamente.");
      setBuscando(false);
    }
  }

  return (
    <form className="busca" onSubmit={aoBuscar} noValidate>
      <div className="busca-linha">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o nome do Pokémon"
          aria-label="Nome do Pokémon"
        />
        <button type="submit" disabled={buscando}>
          {buscando ? "Buscando..." : "Buscar"}
        </button>
      </div>
      {mensagem && (
        <p className="aviso" role="alert">
          {mensagem}
        </p>
      )}
    </form>
  );
}
