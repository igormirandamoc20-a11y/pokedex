export default function Pagination({ pagina, temProxima, onMudar }) {
  return (
    <nav className="paginacao" aria-label="Paginação">
      <button onClick={() => onMudar(pagina - 1)} disabled={pagina <= 1}>
        ← Anterior
      </button>
      <span>Página {pagina}</span>
      <button onClick={() => onMudar(pagina + 1)} disabled={!temProxima}>
        Próxima →
      </button>
    </nav>
  );
}
