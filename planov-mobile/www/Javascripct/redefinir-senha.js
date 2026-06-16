// ===== REDEFINIÇÃO DE SENHA – INTEGRAÇÃO COM BACKEND =====
const API_BASE_URL = 'https://planov.onrender.com/api';

// ===== ELEMENTOS DO DOM =====
const novaSenhaInput     = document.getElementById('nova-senha');
const confirmaSenhaInput = document.getElementById('confirma-senha');
const btnConfirmar       = document.getElementById('btn-confirmar');
const erroNova           = document.getElementById('erro-nova');
const erroConfirma       = document.getElementById('erro-confirma');
const modalOverlay       = document.getElementById('modal-overlay');
const modalBtnFechar     = document.getElementById('modal-btn-fechar');

// ===== OBTER TOKEN DA URL =====
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (!token) {
  alert('Token de recuperação não encontrado. Solicite uma nova recuperação de senha.');
  window.location.href = 'recuperar-senha.html';
}

// ===== MOSTRAR / OCULTAR SENHA (BOTÃO OLHO) =====
document.querySelectorAll('.toggle-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (input.type === 'password') {
      input.type = 'text';
      btn.querySelector('.eye-icon').style.opacity = '1';
    } else {
      input.type = 'password';
      btn.querySelector('.eye-icon').style.opacity = '0.5';
    }
  });
});

// ===== FUNÇÕES DE LIMPEZA E MARCAÇÃO DE ERRO =====
function clearError(input, erroSpan) {
  input.classList.remove('error');
  erroSpan.textContent = '';
}

function markError(input, erroSpan, mensagem) {
  input.classList.add('error');
  erroSpan.textContent = mensagem;
  input.focus();
}

// ===== CONTROLE DO MODAL =====
function abrirModal() {
  modalOverlay.classList.add('show');
}

function fecharModal() {
  modalOverlay.classList.remove('show');
}

// ===== EVENTOS DE INPUT (LIMPAR ERRO AO DIGITAR) =====
novaSenhaInput.addEventListener('input', () => {
  clearError(novaSenhaInput, erroNova);
});
confirmaSenhaInput.addEventListener('input', () => {
  clearError(confirmaSenhaInput, erroConfirma);
});

// ===== ENVIO PARA O BACKEND =====
async function handleConfirmar() {
  const nova = novaSenhaInput.value.trim();
  const confirma = confirmaSenhaInput.value.trim();

  let valido = true;

  // Limpa erros anteriores
  clearError(novaSenhaInput, erroNova);
  clearError(confirmaSenhaInput, erroConfirma);

  // Validação da nova senha
  if (nova.length === 0) {
    markError(novaSenhaInput, erroNova, 'Informe a nova senha.');
    valido = false;
  } else if (nova.length < 6) {
    markError(novaSenhaInput, erroNova, 'A senha deve ter no mínimo 6 caracteres.');
    valido = false;
  }

  // Validação da confirmação
  if (confirma.length === 0) {
    markError(confirmaSenhaInput, erroConfirma, 'Confirme a nova senha.');
    valido = false;
  } else if (nova !== confirma && valido) {
    markError(confirmaSenhaInput, erroConfirma, 'As senhas não coincidem.');
    valido = false;
  }

  if (!valido) return;

  // Desabilitar botão durante a requisição
  const textoOriginal = btnConfirmar.innerText;
  btnConfirmar.innerText = 'Redefinindo...';
  btnConfirmar.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, novaSenha: nova })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao redefinir senha. Token inválido ou expirado.');
    }

    // Sucesso: limpa campos e exibe modal
    novaSenhaInput.value = '';
    confirmaSenhaInput.value = '';
    abrirModal();
  } catch (err) {
    alert(err.message);
    // Marcar campo de nova senha para indicar erro
    markError(novaSenhaInput, erroNova, err.message);
  } finally {
    btnConfirmar.innerText = textoOriginal;
    btnConfirmar.disabled = false;
  }
}

// ===== EVENTOS DO BOTÃO E ENTER =====
btnConfirmar.addEventListener('click', handleConfirmar);

[novaSenhaInput, confirmaSenhaInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleConfirmar();
  });
});

// ===== EVENTOS DO MODAL =====
modalBtnFechar.addEventListener('click', () => {
  fecharModal();
  window.location.href = 'login.html';
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    fecharModal();
    window.location.href = 'login.html';
  }
});