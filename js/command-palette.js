/* ============================================================
   PERCEPTRON — command palette (Ctrl+K / Cmd+K / "/")
   Navegação e ações rápidas, estilo dev tool.
   API: window.PALETTE.open() / .close()
   ============================================================ */
(function () {
  'use strict';

  /* ---------- comandos ---------- */
  function go(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
    } else {
      var y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  var COMMANDS = [
    { i: '↗', l: 'ir para: hero',        k: 'goto', run: function () { go('#top'); } },
    { i: '↗', l: 'ir para: pilares',     k: 'goto', run: function () { go('#pilares'); } },
    { i: '↗', l: 'ir para: manifesto',   k: 'goto', run: function () { go('#manifesto'); } },
    { i: '↗', l: 'ir para: prova',       k: 'goto', run: function () { go('#prova'); } },
    { i: '↗', l: 'ir para: diferencial', k: 'goto', run: function () { go('#diferencial'); } },
    { i: '↗', l: 'ir para: stack',       k: 'goto', run: function () { go('#stack'); } },
    { i: '↗', l: 'ir para: casos',       k: 'goto', run: function () { go('#cases'); } },
    { i: '↗', l: 'ir para: processo',    k: 'goto', run: function () { go('#processo'); } },
    { i: '↗', l: 'ir para: contato',     k: 'goto', run: function () { go('#contato'); } },
    { i: '♪', l: 'som: ligar / desligar', k: 'toggle', run: function () {
        var b = document.getElementById('audioToggle');
        if (b) b.click();
      } },
    { i: '◈', l: 'toques futuristas: ligar / desligar', k: 'toggle', run: function () {
        if (window.FUTUR) {
          var on = document.documentElement.classList.contains('futur');
          window.FUTUR.set(!on);
        }
      } },
    { i: '✉', l: 'iniciar projeto (briefing)', k: 'ação', run: function () { go('#contato'); } },
    { i: '↑', l: 'voltar ao topo', k: 'ação', run: function () { go('#top'); } }
  ];

  /* ---------- DOM ---------- */
  var overlay = document.createElement('div');
  overlay.className = 'palette-overlay';
  overlay.innerHTML =
    '<div class="palette" role="dialog" aria-label="Paleta de comandos">' +
      '<div class="pal-inputrow"><span class="gt">&gt;_</span>' +
        '<input class="pal-input" type="text" placeholder="digite um comando…" autocomplete="off" spellcheck="false" />' +
      '</div>' +
      '<div class="pal-list"></div>' +
      '<div class="pal-foot"><span><b>↑↓</b> navegar</span><span><b>↵</b> executar</span><span><b>esc</b> fechar</span></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector('.pal-input');
  var list = overlay.querySelector('.pal-list');
  var isOpen = false;
  var filtered = COMMANDS.slice();
  var active = 0;

  function render() {
    list.innerHTML = '';
    if (!filtered.length) {
      var e = document.createElement('div');
      e.className = 'pal-empty';
      e.textContent = 'nenhum comando encontrado';
      list.appendChild(e);
      return;
    }
    filtered.forEach(function (cmd, idx) {
      var it = document.createElement('div');
      it.className = 'pal-item' + (idx === active ? ' active' : '');
      var pi = document.createElement('span');
      pi.className = 'pi';
      pi.textContent = cmd.i;
      var lb = document.createElement('span');
      lb.textContent = cmd.l;
      var kk = document.createElement('span');
      kk.className = 'k';
      kk.textContent = cmd.k;
      it.appendChild(pi); it.appendChild(lb); it.appendChild(kk);
      it.addEventListener('click', function () { exec(cmd); });
      it.addEventListener('pointerenter', function () {
        active = idx;
        var cur = list.querySelector('.pal-item.active');
        if (cur) cur.classList.remove('active');
        it.classList.add('active');
      });
      list.appendChild(it);
    });
    /* mantém o ativo visível (scroll interno, sem scrollIntoView) */
    var act = list.children[active];
    if (act) {
      var top = act.offsetTop, bot = top + act.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top - 8;
      else if (bot > list.scrollTop + list.clientHeight) list.scrollTop = bot - list.clientHeight + 8;
    }
  }

  function filter() {
    var q = input.value.trim().toLowerCase();
    filtered = !q ? COMMANDS.slice() : COMMANDS.filter(function (c) {
      return c.l.toLowerCase().indexOf(q) !== -1 || c.k.indexOf(q) !== -1;
    });
    active = 0;
    render();
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    overlay.classList.add('open');
    input.value = '';
    filter();
    input.focus({ preventScroll: true });
  }
  function close() {
    isOpen = false;
    overlay.classList.remove('open');
    input.blur();
  }
  function exec(cmd) {
    close();
    setTimeout(cmd.run, 60);
  }

  /* ---------- eventos ---------- */
  overlay.addEventListener('pointerdown', function (e) {
    if (e.target === overlay) close();
  });
  input.addEventListener('input', filter);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); render(); }
    else if (e.key === 'Enter') { if (filtered[active]) exec(filtered[active]); }
    else if (e.key === 'Escape') { close(); }
  });

  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    var typing = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isOpen ? close() : open();
    } else if (e.key === '/' && !typing && !isOpen) {
      e.preventDefault();
      open();
    } else if (e.key === 'Escape' && isOpen) {
      close();
    }
  });

  var hint = document.getElementById('paletteHint');
  if (hint) hint.addEventListener('click', open);

  window.PALETTE = { open: open, close: close };
})();
