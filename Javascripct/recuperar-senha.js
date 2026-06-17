// ===== RECUPERAR SENHA – INTEGRAÇÃO COM BACKEND =====
const API_BASE_URL = 'https://planov.onrender.com/api';

const emailInput     = document.getElementById('email');
const btnSend        = document.getElementById('btn-send');
const modalOverlay   = document.getElementById('modal-overlay');
const modalBtnFechar = document.getElementById('modal-btn-fechar');

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function abrirModal() {
  modalOverlay.classList.add('show');
}

function fecharModal() {
  modalOverlay.classList.remove('show');
  // Opcional: limpar email e redirecionar para login
  window.location.href = 'login.html';
}

function markError(input, message) {
  input.classList.add('error');
  alert(message);  // ou exibir mensagem inline, mas para simplicidade mantemos alert
  input.focus();
  input.addEventListener('input', () => input.classList.remove('error'), { once: true });
}

async function handleSend() {
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    markError(emailInput, 'Digite um email válido.');
    return;
  }

  // Desabilitar botão durante o envio
  const originalText = btnSend.innerText;
  btnSend.innerText = 'Enviando...';
  btnSend.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao solicitar recuperação.');
    }

    // Limpa campo e exibe modal
    emailInput.value = '';
    abrirModal();
  } catch (err) {
    alert(err.message);
    emailInput.classList.add('error');
  } finally {
    btnSend.innerText = originalText;
    btnSend.disabled = false;
  }
}

// Eventos
btnSend.addEventListener('click', handleSend);
modalBtnFechar.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});
emailInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});
