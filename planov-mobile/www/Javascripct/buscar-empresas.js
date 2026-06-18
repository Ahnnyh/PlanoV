// ===== BUSCAR EMPRESAS – SCRIPT PRINCIPAL =====

// ===== ELEMENTOS DO DOM =====
const searchInput = document.getElementById('search-input');  // campo de busca
const cards = document.querySelectorAll('.card');            // lista de cards
const emptyMsg = document.getElementById('empty-msg');       // mensagem "nenhum resultado"

// ===== FUNÇÃO DE FILTRO =====
function filterCards() {
  const term = searchInput.value.toLowerCase().trim();       // termo digitado (minúsculo, sem espaços)
  let hasVisible = false;                                    // flag para saber se há algum card visível

  // Percorre todos os cards
  cards.forEach(card => {
    // Obtém nome e produto/serviço a partir dos atributos data-
    const nome = card.getAttribute('data-nome')?.toLowerCase() || '';
    const prod = card.getAttribute('data-prod')?.toLowerCase() || '';
    // Verifica se o termo corresponde ao nome ou ao produto
    const matches = term === '' || nome.includes(term) || prod.includes(term);
    if (matches) {
      card.style.display = '';      // mostra o card (estilo padrão)
      hasVisible = true;
    } else {
      card.style.display = 'none';  // esconde o card
    }
  });

  // Exibe a mensagem "nenhuma empresa encontrada" se não houver cards visíveis e a busca não estiver vazia
  emptyMsg.classList.toggle('visible', !hasVisible && term !== '');
  if (term === '') emptyMsg.classList.remove('visible');
}

// ===== EVENTO DE BUSCA =====
searchInput.addEventListener('input', filterCards);

// ===== BOTÕES "VISUALIZAR" =====
document.querySelectorAll('.btn-visualizar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const nome = btn.getAttribute('data-nome');
    alert(`Visualizar detalhes de ${nome}`);
    // Aqui você pode redirecionar para a página de perfil da empresa
  });
});