/* =========================================================
   estaticos/js/utilitarios.js
   Namespace global: CR (Corte Relâmpago)
   ========================================================= */

window.CR = window.CR || {};

(function (CR) {
  'use strict';

  CR.$ = (sel, ctx) => (ctx || document).querySelector(sel);
  CR.$$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  CR.aoProntar = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  CR.formatarNumero = (n) => n.toLocaleString('pt-BR');

  CR.guardarUltimoFoco = null;

  CR.travarRolagem = (travar) => {
    document.body.style.overflow = travar ? 'hidden' : '';
  };

  /* Guarda o valor de um chip dentro do seu container */
  CR.marcarChip = (chip) => {
    const grupo = chip.closest('.chips');
    if (!grupo) return;
    CR.$$('.chip', grupo).forEach((c) => {
      const ativo = c === chip;
      c.classList.toggle('selecionado', ativo);
      c.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
  };

  CR.chipSelecionado = (grupo) => (grupo ? grupo.querySelector('.chip.selecionado') : null);
})(window.CR);
