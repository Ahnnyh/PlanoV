(function() {
    // ========== 1. ACCORDION (EXPANDIR/RECOLHER) ==========
    const accordion = document.getElementById('avaliacaoAccordion');
    const header = document.getElementById('accordionHeader');
    const content = document.getElementById('avaliacaoContent');
    const toggleIcon = header.querySelector('.toggle-icon');

    header.addEventListener('click', (e) => {
      // Impede que cliques internos (estrelas, botão, textarea) fechem o accordion
      if (e.target.closest('.star-input') || e.target.closest('.btn-enviar-avaliacao') || e.target.closest('textarea')) {
        return;
      }
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        toggleIcon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('open');
        toggleIcon.style.transform = 'rotate(180deg)';
      }
    });

    // ========== 2. ESTRELAS COM HOVER RESPONSIVO ==========
    const stars = document.querySelectorAll('.star-input');
    const ratingFeedback = document.getElementById('ratingFeedback');
    let selectedRating = 0;  // Nota fixa selecionada (0 = nenhuma)

    // Preenche estrelas até o índice informado
    function fillStars(index) {
      stars.forEach((star, i) => {
        if (i < index) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }

    // Eventos para cada estrela
    stars.forEach((star, idx) => {
      // Mouse sobre: preenchimento temporário
      star.addEventListener('mouseenter', () => {
        fillStars(idx + 1);
      });
      // Mouse sai: restaura a nota selecionada
      star.addEventListener('mouseleave', () => {
        fillStars(selectedRating);
      });
      // Clique: define a nota permanentemente
      star.addEventListener('click', () => {
        selectedRating = idx + 1;
        fillStars(selectedRating);
        ratingFeedback.textContent = `Você deu ${selectedRating} estrela(s)`;
      });
    });

    // ========== 3. ENVIAR AVALIAÇÃO ==========
    const btnEnviar = document.getElementById('btnEnviarAvaliacao');
    const commentTextarea = document.getElementById('reviewComment');
    const reviewsList = document.getElementById('reviewsList');

    btnEnviar.addEventListener('click', () => {
      // Valida se alguma estrela foi selecionada
      if (selectedRating === 0) {
        alert('Por favor, selecione uma nota com as estrelas.');
        return;
      }
      const comment = commentTextarea.value.trim();
      // Comentário é opcional (descomente o bloco abaixo se quiser obrigatório)
      // if (comment === '') {
      //   alert('Escreva um comentário.');
      //   return;
      // }

      // Cria elemento da nova avaliação
      const novaAvaliacao = document.createElement('li');
      novaAvaliacao.className = 'review-card';

      // Gera o HTML das 5 estrelas (inicialmente sem preenchimento)
      let estrelasHTML = '';
      for (let i = 0; i < 5; i++) {
        estrelasHTML += `<svg class="star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      }

      // Monta a estrutura da nova avaliação
      novaAvaliacao.innerHTML = `
        <div class="review-header">
          <div class="review-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div class="review-author-info">
            <span class="review-author">Você – Nova avaliação</span>
            <div class="review-stars">${estrelasHTML}</div>
          </div>
        </div>
        <p class="review-text">${comment || 'Sem comentário adicional.'}</p>
      `;

      // Preenche as estrelas de acordo com a nota selecionada
      const novasEstrelas = novaAvaliacao.querySelectorAll('.star');
      for (let i = 0; i < selectedRating; i++) {
        novasEstrelas[i].style.fill = '#f5a623';
      }

      // Adiciona a avaliação no topo da lista
      reviewsList.prepend(novaAvaliacao);

      // Reseta o formulário
      commentTextarea.value = '';
      selectedRating = 0;
      fillStars(0);
      ratingFeedback.textContent = 'Clique nas estrelas para avaliar';

      // Fecha o accordion (opcional)
      content.classList.remove('open');
      toggleIcon.style.transform = 'rotate(0deg)';

      alert('Avaliação enviada com sucesso!');
    });
})();