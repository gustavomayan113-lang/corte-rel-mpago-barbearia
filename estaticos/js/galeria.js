/* =========================================================
   estaticos/js/galeria.js
   - filtro por categoria
   - lightbox (abrir, navegar, fechar, teclado)
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    /* ---------------- filtros ---------------- */
    const botoes = CR.$$('[data-filtro]');
    const itens = CR.$$('[data-categoria]');

    botoes.forEach((botao) => {
      botao.addEventListener('click', () => {
        const filtro = botao.dataset.filtro;

        botoes.forEach((b) => {
          const ativo = b === botao;
          b.classList.toggle('selecionado', ativo);
          b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
        });

        itens.forEach((item) => {
          const combina = filtro === 'todos' || item.dataset.categoria === filtro;
          item.classList.toggle('oculta', !combina);
        });
      });
    });

    /* ---------------- lightbox ---------------- */
    const caixa = CR.$('[data-lightbox]');
    if (!caixa) return;

    const img = CR.$('[data-lightbox-img]', caixa);
    const titulo = CR.$('[data-lightbox-titulo]', caixa);
    const tag = CR.$('[data-lightbox-tag]', caixa);
    const visiveis = () => CR.$$('[data-categoria]').filter((i) => !i.classList.contains('oculta'));
    let indice = 0;

    function mostrar(posicao) {
      const lista = visiveis();
      if (!lista.length) return;
      indice = (posicao + lista.length) % lista.length;
      const item = lista[indice];

      img.src = item.dataset.imagem;
      img.alt = item.dataset.titulo || 'Corte da Corte Relâmpago';
      titulo.textContent = item.dataset.titulo || 'Corte';
      tag.textContent = item.dataset.tag || '';
    }

    function abrir(item) {
      const lista = visiveis();
      mostrar(Math.max(lista.indexOf(item), 0));
      caixa.classList.add('aberto');
      caixa.setAttribute('aria-hidden', 'false');
      CR.travarRolagem(true);
      CR.guardarUltimoFoco = document.activeElement;
      const fechar = CR.$('[data-lightbox-fechar]', caixa);
      if (fechar) fechar.focus();
    }

    function fechar() {
      caixa.classList.remove('aberto');
      caixa.setAttribute('aria-hidden', 'true');
      CR.travarRolagem(false);
      if (CR.guardarUltimoFoco) CR.guardarUltimoFoco.focus();
    }

    CR.$$('[data-categoria]').forEach((item) => {
      item.addEventListener('click', () => abrir(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrir(item);
        }
      });
    });

    CR.$('[data-lightbox-fechar]', caixa).addEventListener('click', fechar);
    CR.$('[data-lightbox-ant]', caixa).addEventListener('click', () => mostrar(indice - 1));
    CR.$('[data-lightbox-prox]', caixa).addEventListener('click', () => mostrar(indice + 1));

    caixa.addEventListener('click', (e) => {
      if (e.target === caixa) fechar();
    });

    document.addEventListener('keydown', (e) => {
      if (!caixa.classList.contains('aberto')) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') mostrar(indice - 1);
      if (e.key === 'ArrowRight') mostrar(indice + 1);
    });
  });
})(window.CR);
