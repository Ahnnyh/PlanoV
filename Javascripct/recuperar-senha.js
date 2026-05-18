// ===== RECUPERAR SENHA – SCRIPT PRINCIPAL =====

// ===== ELEMENTOS DO DOM =====
const emailInput     = document.getElementById('email');
const btnSend        = document.getElementById('btn-send');
const modalOverlay   = document.getElementById('modal-overlay');
const modalBtnFechar = document.getElementById('modal-btn-fechar');

// ===== VALIDAÇÃO DE EMAIL =====
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ===== CONTROLE DO MODAL =====
function abrirModal() {
  modalOverlay.classList.add('show');
}

function fecharModal() {
  modalOverlay.classList.remove('show');
}

// ===== MARCADOR DE ERRO =====
function markError(input) {
  input.classList.add('error');
  input.focus();
  input.addEventListener('input', () => input.classList.remove('error'), { once: true });
}

// ===== ENVIO DO FORMULÁRIO =====
function handleSend() {
  const value = emailInput.value.trim();

  if (!isValidEmail(value)) {
    markError(emailInput);
    return;
  }

  // Simula o envio para o backend (substitua por fetch real)
  console.log('[PlanoV] Recuperação solicitada para:', value);
  emailInput.value = '';

  // Exibe o modal de confirmação
  abrirModal();
}

// ===== EVENTOS =====
btnSend.addEventListener('click', handleSend);
modalBtnFechar.addEventListener('click', fecharModal);

// Fecha modal ao clicar fora (no overlay)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});

// Tecla Enter no campo de email
emailInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});