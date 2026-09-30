/* =========================================================
   estaticos/js/depoimentos.js
   carrossel de avaliações com avanço automático
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    const trilho = CR.$('[data-slider-trilho]');
    if (!trilho) return;

    const slides = CR.$$('[data-slide]', trilho);
    const areaBolinhas = CR.$('[data-slider-bolinhas]');
    const btnAnt = CR.$('[data-slider-ant]');
    const btnProx = CR.$('[data-slider-prox]');
    const total = slides.length;
    const INTERVALO = 5200;
    let pagina = 0;
    let temporizador = null;

    /* quantos slides cabem por página */
    function porPagina() {
      return window.matchMedia('(min-width: 900px)').matches ? 3 : 1;
    }

    function maximo() {
      return Math.max(total - porPagina(), 0);
    }

    function irPara(destino) {
      pagina = Math.max(0, Math.min(destino, maximo()));
      const deslocamento = (pagina * 100) / porPagina();
      trilho.style.transform = 'translateX(-' + deslocamento + '%)';

      CR.$$('.depoimentos__bolinha', areaBolinhas).forEach((b, i) => {
        b.classList.toggle('ativa', i === pagina);
      });
      reiniciar();
    }

    function montarBolinhas() {
      if (!areaBolinhas) return;
      areaBolinhas.innerHTML = '';
      for (let i = 0; i <= maximo(); i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'depoimentos__bolinha' + (i === pagina ? ' ativa' : '');
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
        b.addEventListener('click', () => irPara(i));
        areaBolinhas.appendChild(b);
      }
    }

    function proximo() {
      irPara(pagina >= maximo() ? 0 : pagina + 1);
    }

    function reiniciar() {
      if (temporizador) clearInterval(temporizador);
      temporizador = setInterval(proximo, INTERVALO);
    }

    if (btnAnt) btnAnt.addEventListener('click', () => irPara(pagina - 1));
    if (btnProx) btnProx.addEventListener('click', () => irPara(pagina + 1));

    const secao = CR.$('.depoimentos');
    if (secao) {
      secao.addEventListener('mouseenter', () => temporizador && clearInterval(temporizador));
      secao.addEventListener('mouseleave', reiniciar);
    }

    /* arrastar com o dedo */
    let inicioX = null;
    trilho.addEventListener('touchstart', (e) => (inicioX = e.touches[0].clientX), { passive: true });
    trilho.addEventListener('touchend', (e) => {
      if (inicioX === null) return;
      const delta = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(delta) > 45) irPara(pagina + (delta < 0 ? 1 : -1));
      inicioX = null;
    });

    window.addEventListener('resize', () => {
      const antes = pagina;
      montarBolinhas();
      irPara(Math.min(antes, maximo()));
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (temporizador) clearInterval(temporizador);
      } else {
        reiniciar();
      }
    });

    montarBolinhas();
    irPara(0);
  });
})(window.CR);
