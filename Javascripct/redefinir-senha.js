// ===== REDEFINIÇÃO DE SENHA – SCRIPT PRINCIPAL =====

// ===== ELEMENTOS DO DOM =====
const novaSenhaInput     = document.getElementById('nova-senha');
const confirmaSenhaInput = document.getElementById('confirma-senha');
const btnConfirmar       = document.getElementById('btn-confirmar');

const erroNova           = document.getElementById('erro-nova');
const erroConfirma       = document.getElementById('erro-confirma');

// ===== ELEMENTOS DO MODAL =====
const modalOverlay   = document.getElementById('modal-overlay');
const modalBtnFechar = document.getElementById('modal-btn-fechar');

// ===== MOSTRAR / OCULTAR SENHA (BOTÃO OLHO) =====
document.querySelectorAll('.toggle-eye').forEach(btn => {

  btn.addEventListener('click', () => {

    const targetId = btn.getAttribute('data-target');
    const input    = document.getElementById(targetId);

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

// ===== VALIDAÇÃO E SUBMISSÃO DO FORMULÁRIO =====
function handleConfirmar() {

  const nova     = novaSenhaInput.value.trim();
  const confirma = confirmaSenhaInput.value.trim();

  let valido = true;

  // Limpa erros anteriores
  clearError(novaSenhaInput, erroNova);
  clearError(confirmaSenhaInput, erroConfirma);

  // Validação da nova senha
  if (nova.length === 0) {

    markError(
      novaSenhaInput,
      erroNova,
      'Informe a nova senha.'
    );

    valido = false;

  } else if (nova.length < 6) {

    markError(
      novaSenhaInput,
      erroNova,
      'A senha deve ter no mínimo 6 caracteres.'
    );

    valido = false;

  }

  // Validação da confirmação de senha
  if (confirma.length === 0) {

    markError(
      confirmaSenhaInput,
      erroConfirma,
      'Confirme a nova senha.'
    );

    valido = false;

  } else if (nova !== confirma && valido) {

    markError(
      confirmaSenhaInput,
      erroConfirma,
      'As senhas não coincidem.'
    );

    valido = false;

  }

  // Se houver erro, interrompe
  if (!valido) return;

  // ===== SUCESSO =====
  console.log('[PlanoV] Senha redefinida com sucesso.');

  // Limpa os campos
  novaSenhaInput.value = '';
  confirmaSenhaInput.value = '';

  // Exibe o modal de sucesso
  abrirModal();

}

// ===== EVENTO DO BOTÃO CONFIRMAR =====
btnConfirmar.addEventListener('click', handleConfirmar);

// ===== SUBMISSÃO COM TECLA ENTER =====
[novaSenhaInput, confirmaSenhaInput].forEach(input => {

  input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

      handleConfirmar();

    }

  });

});

// ===== EVENTOS DO MODAL =====
// Fechar modal ao clicar no botão "Ir para login"
modalBtnFechar.addEventListener('click', () => {

  fecharModal();

  // Redireciona para a página de login
  window.location.href = 'login.html';

});

// Fechar modal ao clicar fora (no overlay escuro)
modalOverlay.addEventListener('click', (e) => {

  if (e.target === modalOverlay) {

    fecharModal();

  }

});