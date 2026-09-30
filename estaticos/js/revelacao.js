/* =========================================================
   estaticos/js/revelacao.js
   - animação de entrada das seções
   - contadores animados
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    const alvos = CR.$$('.revelar');
    const contadores = CR.$$('[data-counter]');
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!alvos.length && !contadores.length) return;

    if (!('IntersectionObserver' in window) || semMovimento) {
      alvos.forEach((a) => a.classList.add('visivel'));
      contadores.forEach((c) => animarContador(c, 1));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('visivel');
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    alvos.forEach((a) => observador.observe(a));

    function animarContador(el, progresso) {
      const alvo = parseInt(el.dataset.counter, 10) || 0;
      const sufixo = el.dataset.sufixo || '';
      const separador = el.dataset.separador || '';
      const valor = Math.round(alvo * progresso);
      let texto = String(valor);
      if (separador === '.') texto = texto.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (separador === ',') texto = CR.formatarNumero(valor);
      el.textContent = texto + sufixo;
    }

    const obsContador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          const duracao = 1400;
          const inicio = performance.now();

          function passo(agora) {
            const p = Math.min((agora - inicio) / duracao, 1);
            const suavizado = 1 - Math.pow(1 - p, 3);
            animarContador(e.target, suavizado);
            if (p < 1) requestAnimationFrame(passo);
          }
          requestAnimationFrame(passo);
        });
      },
      { threshold: 0.4 }
    );

    contadores.forEach((c) => obsContador.observe(c));
  });
})(window.CR);
