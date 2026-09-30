/* =========================================================
   estaticos/js/main.js
   Ponto de entrada: carrega os módulos da página na ordem certa.
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    document.documentElement.classList.add('js-pronto');
  });

  /* Comentário sobre a arquitetura:
     Cada módulo (utilitarios, navegacao, revelacao, galeria, depoimentos, agenda, rodape)
     registra seus próprios hooks em CR.aoProntar(). O main.js só serve como
     ponto de entrada e indicador de que o JS foi carregado sem erros.
     Nenhuma requisição é feita: o site é 100% estático e demonstrativo. */
})(window.CR);
