/* =========================================================
   estaticos/js/rodape.js
   ano corrente e botão "voltar ao topo"
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    /* ano no rodapé */
    CR.$$('[data-ano]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    /* botão flutuante */
    const sobe = CR.$('[data-sobe]');
    if (sobe) {
      const atualizar = () => sobe.classList.toggle('visivel', window.scrollY > 600);
      window.addEventListener('scroll', atualizar, { passive: true });
      sobe.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      atualizar();
    }

    /* ano no <title> não se aplica; apenas highlights de link do rodapé */
    CR.$$('.rodape__lista a[href^="#"]').forEach((a) => {
      a.addEventListener('click', () => {
        CR.$$('.nav__link').forEach((l) =>
          l.classList.toggle('ativo', l.getAttribute('href') === a.getAttribute('href'))
        );
      });
    });
  });
})(window.CR);
