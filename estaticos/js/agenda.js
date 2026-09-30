/* =========================================================
   estaticos/js/agenda.js
   formulário de demonstração: validação, resumo e aviso
   (nenhum dado é enviado para servidor)
   ========================================================= */

(function (CR) {
  'use strict';

  CR.aoProntar(function () {
    const form = CR.$('[data-form]');
    if (!form) return;

    const aviso = CR.$('[data-aviso]', form);
    const textoAviso = CR.$('[data-aviso-texto]', form);
    const resumoServico = CR.$('#resumo-servico');
    const resumoHorario = CR.$('#resumo-horario');
    const resumoPreco = CR.$('#resumo-preco');
    const selectServico = CR.$('#servico', form);
    const grupoHorarios = CR.$('[data-horarios]', form);
    const campoData = CR.$('#data', form);

    /* data mínima = hoje */
    if (campoData) {
      const hoje = new Date();
      const iso = hoje.toISOString().slice(0, 10);
      campoData.min = iso;
      if (!campoData.value) campoData.value = iso;
    }

    function precoDoServico(valor) {
      const achado = String(valor).match(/R\$\s*([\d.]+)/);
      if (!achado) return null;
      return Number(String(achado[1]).replace(/\./g, ''));
    }

    function atualizarResumo() {
      const servico = selectServico ? selectServico.value : '';
      const chip = CR.chipSelecionado(grupoHorarios);
      const preco = precoDoServico(servico);

      if (resumoServico) resumoServico.textContent = servico || 'Nenhum serviço escolhido';
      if (resumoHorario) resumoHorario.textContent = 'horário: ' + (chip ? chip.dataset.chip : '—');
      if (resumoPreco) resumoPreco.textContent = preco ? 'R$ ' + preco : 'R$ —';
    }

    if (selectServico) selectServico.addEventListener('change', atualizarResumo);

    if (grupoHorarios) {
      CR.$$('.chip', grupoHorarios).forEach((chip) => {
        chip.addEventListener('click', () => {
          CR.marcarChip(chip);
          atualizarResumo();
        });
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      esconderAviso();

      /* validação simples, só front-end */
      const obrigatorios = CR.$$('[required]', form);
      const invalido = obrigatorios.find((campo) => !campo.value.trim());

      if (invalido) {
        invalido.focus();
        invalido.style.borderColor = 'var(--vermelho)';
        mostrarAviso('Preencha os campos destacados para continuar.', true);
        setTimeout(() => (invalido.style.borderColor = ''), 1800);
        return;
      }

      const nome = CR.$('#nome', form).value.trim().split(' ')[0];
      const chip = CR.chipSelecionado(grupoHorarios);
      const hora = chip ? chip.dataset.chip : '—';
      mostrarAviso(
        'Obrigado, ' + nome + '! ' + hora + ' reservado para ' + selectServico.value + '. (simulação de front-end)'
      );
      form.reset();
      if (campoData) campoData.value = new Date().toISOString().slice(0, 10);
      CR.marcarChip(grupoHorarios.querySelector('[data-chip="15:00"]'));
      atualizarResumo();
    });

    function mostrarAviso(texto, erro) {
      if (!aviso) return;
      textoAviso.textContent = texto;
      aviso.classList.toggle('aviso--erro', !!erro);
      aviso.classList.add('visivel');
    }

    function esconderAviso() {
      if (aviso) aviso.classList.remove('visivel');
    }

    /* ---- newsletter (também demonstrativa) ---- */
    const news = CR.$('[data-form-newsletter]');
    if (news) {
      news.addEventListener('submit', (e) => {
        e.preventDefault();
        const campo = CR.$('input', news);
        const botao = CR.$('button', news);
        if (!campo.value.includes('@')) {
          campo.focus();
          return;
        }
        botao.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>';
        botao.style.background = 'var(--vermelho)';
        campo.value = '';
        campo.placeholder = 'inscrito (demo)';
      });
    }

    atualizarResumo();
  });
})(window.CR);
