/* ============================================================
   PERCEPTRON — briefing via terminal
   O visitante responde perguntas digitando; no final o terminal
   compila um briefing e oferece enviar por e-mail / copiar.
   ============================================================ */
(function () {
  'use strict';

  var host = document.getElementById('briefTerm');
  if (!host) return;

  var body = host.querySelector('.bt-body');
  var MAIL = 'contact@perceptronenterprise.com';

  var QUESTIONS = [
    { k: 'nome',    q: 'qual é o seu nome?' },
    { k: 'empresa', q: 'empresa e setor?' },
    { k: 'gargalo', q: 'qual é o maior gargalo operacional hoje?' },
    { k: 'horas',   q: 'quantas horas por semana a equipe perde com isso?' },
    { k: 'email',   q: 'e-mail para retorno?' }
  ];

  var answers = {};
  var step = -1;
  var inputRow = null;
  var inputEl = null;

  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function line(text, cls, prefix) {
    var el = document.createElement('div');
    el.className = 'bl' + (cls ? ' ' + cls : '');
    if (prefix) {
      var p = document.createElement('span');
      p.className = 'pr';
      p.textContent = prefix + ' ';
      el.appendChild(p);
    }
    el.appendChild(document.createTextNode(text));
    body.appendChild(el);
    scrollDown();
    return el;
  }

  function makeInput() {
    inputRow = document.createElement('div');
    inputRow.className = 'bt-inputline';
    var pr = document.createElement('span');
    pr.className = 'pr';
    pr.textContent = '>';
    inputEl = document.createElement('input');
    inputEl.className = 'bt-input';
    inputEl.type = 'text';
    inputEl.autocomplete = 'off';
    inputEl.spellcheck = false;
    inputEl.setAttribute('aria-label', 'sua resposta');
    inputRow.appendChild(pr);
    inputRow.appendChild(inputEl);
    body.appendChild(inputRow);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var v = inputEl.value.trim();
      if (!v) return;
      submit(v);
    });
    scrollDown();
  }

  function ask() {
    step++;
    if (step >= QUESTIONS.length) { finish(); return; }
    line('? ' + QUESTIONS[step].q, 'q');
    if (inputRow) inputRow.remove();
    makeInput();
    /* não roubar o foco da página: só foca se o usuário já interagiu */
    if (host.dataset.engaged === '1') inputEl.focus({ preventScroll: true });
  }

  function submit(v) {
    if (v.toLowerCase() === 'reset') { reset(); return; }
    answers[QUESTIONS[step].k] = v;
    line(v, 'echo', '>');
    inputRow.remove();
    inputRow = null;
    setTimeout(ask, 220);
  }

  function briefingText() {
    return [
      'BRIEFING — Perceptron',
      '------------------------',
      'nome:     ' + (answers.nome || '—'),
      'empresa:  ' + (answers.empresa || '—'),
      'gargalo:  ' + (answers.gargalo || '—'),
      'horas/sem:' + ' ' + (answers.horas || '—'),
      'retorno:  ' + (answers.email || '—')
    ].join('\n');
  }

  function finish() {
    if (inputRow) { inputRow.remove(); inputRow = null; }
    line('compilando briefing…', 'echo');
    setTimeout(function () {
      line('✓ briefing compilado', 'ok');
      line(briefingText(), 'sum');
      line('digite "reset" para recomeçar — ou envie:', 'echo');

      var actions = document.createElement('div');
      actions.className = 'bt-actions';

      var send = document.createElement('a');
      send.className = 'btn btn-primary';
      send.textContent = 'Enviar por e-mail';
      send.href = 'mailto:' + MAIL +
        '?subject=' + encodeURIComponent('Briefing — ' + (answers.empresa || answers.nome || 'novo projeto')) +
        '&body=' + encodeURIComponent(briefingText());

      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-ghost';
      copy.textContent = 'Copiar briefing';
      copy.addEventListener('click', function () {
        var done = function () {
          copy.textContent = '✓ copiado';
          setTimeout(function () { copy.textContent = 'Copiar briefing'; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(briefingText()).then(done, done);
        } else { done(); }
      });

      actions.appendChild(send);
      actions.appendChild(copy);
      body.appendChild(actions);

      /* permite recomeçar digitando reset */
      makeInput();
      inputEl.placeholder = 'reset';
      scrollDown();
    }, 500);
  }

  function reset() {
    answers = {};
    step = -1;
    body.innerHTML = '';
    boot(true);
  }

  function boot(fast) {
    line('perceptron briefing v1.0', 'echo', '$');
    line('responda e receba um diagnóstico preliminar — sem compromisso.', 'echo');
    setTimeout(ask, fast ? 150 : 600);
  }

  /* foco ao clicar em qualquer área do terminal */
  host.addEventListener('click', function () {
    host.dataset.engaged = '1';
    if (inputEl) inputEl.focus({ preventScroll: true });
  });
  host.addEventListener('focusin', function () { host.dataset.engaged = '1'; });

  boot(false);
})();
