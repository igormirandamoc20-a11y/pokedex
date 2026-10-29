const BASE_URL = "https://pokeapi.co/api/v2";
export const POR_PAGINA = 20;

// Lista paginada: offset = (pagina - 1) * 20
export async function buscarLista(pagina) {
  const offset = (pagina - 1) * POR_PAGINA;
  const resposta = await fetch(
    `${BASE_URL}/pokemon?limit=${POR_PAGINA}&offset=${offset}`
  );
  if (!resposta.ok) {
    throw new Error("Falha ao buscar Pokémon");
  }
  return resposta.json();
}

// Detalhes de um Pokémon. Devolve null quando não existe (404).
export async function buscarPokemon(nome) {
  const resposta = await fetch(
    `${BASE_URL}/pokemon/${encodeURIComponent(nome.trim().toLowerCase())}`
  );
  if (resposta.status === 404) return null;
  if (!resposta.ok) {
    throw new Error("Falha ao buscar Pokémon");
  }
  return resposta.json();
}

// O id é o último trecho do endereço: .../pokemon/25/
export function extrairId(url) {
  return Number(url.split("/").filter(Boolean).pop());
}
