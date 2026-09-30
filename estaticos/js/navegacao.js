/* =========================================================
   estaticos/js/navegacao.js
   - estado da navbar ao rolar
   - barra de progresso da página
   - menu mobile
   - link ativo (scroll spy)
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    const nav = CR.$('#nav');
    const progresso = CR.$('[data-progress]');
    const alternador = CR.$('[data-nav-toggle]');
    const painel = CR.$('#menu-mobile');
    const links = CR.$$('.nav__link');
    const secoes = links
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);

    /* ---- estado ao rolar ---- */
    function aoRolar() {
      const y = window.scrollY;
      nav.classList.toggle('rolada', y > 24);

      if (progresso) {
        const altura = document.documentElement.scrollHeight - window.innerHeight;
        const pct = altura > 0 ? Math.min(y / altura, 1) : 0;
        progresso.style.transform = 'scaleX(' + pct + ')';
      }
    }

    let agendado = false;
    window.addEventListener(
      'scroll',
      () => {
        if (agendado) return;
        agendado = true;
        requestAnimationFrame(() => {
          aoRolar();
          agendado = false;
        });
      },
      { passive: true }
    );
    aoRolar();

    /* ---- menu mobile ---- */
    function abrirMenu(estado) {
      nav.classList.toggle('aberta', estado);
      if (alternador) {
        alternador.setAttribute('aria-expanded', estado ? 'true' : 'false');
        alternador.setAttribute('aria-label', estado ? 'Fechar menu' : 'Abrir menu');
      }
      CR.travarRolagem(estado);
    }

    if (alternador) {
      alternador.addEventListener('click', () => {
        abrirMenu(!nav.classList.contains('aberta'));
      });
    }

    if (painel) {
      CR.$$('a', painel).forEach((a) => a.addEventListener('click', () => abrirMenu(false)));
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('aberta')) {
        abrirMenu(false);
        if (alternador) alternador.focus();
      }
    });

    /* ---- scroll spy ---- */
    if (secoes.length) {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((e) => {
            if (!e.isIntersecting) return;
            const id = '#' + e.target.id;
            links.forEach((l) => l.classList.toggle('ativo', l.getAttribute('href') === id));
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      secoes.forEach((s) => observador.observe(s));
    }
  });
})(window.CR);
