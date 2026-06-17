/* ============================================================
   PERCEPTRON — efeitos futuristas
   decode de texto · cursor próprio · HUD nos cards · varredura
   de seção · terminal vivo · (grão/scanlines são só CSS)
   API: window.FUTUR.set(true|false)
   ============================================================ */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* liga por padrão */
  docEl.classList.add('futur');

  /* ---------- (overlays de grão/scanlines removidos a pedido) ---------- */

  /* ---------- HUD: cantoneiras + micro-label nos cards ---------- */
  var cards = document.querySelectorAll('.card3d, .stack-card');
  Array.prototype.forEach.call(cards, function (card, i) {
    var c = document.createElement('i');
    c.className = 'hud-corners';
    c.setAttribute('aria-hidden', 'true');
    card.appendChild(c);
    var m = document.createElement('span');
    m.className = 'hud-meta';
    m.setAttribute('aria-hidden', 'true');
    m.textContent = 'NODE ' + String(i + 1).padStart(2, '0') + ' · OK';
    card.appendChild(m);
  });

  /* ---------- linha de varredura por seção ---------- */
  var sections = document.querySelectorAll('main section');
  if ('IntersectionObserver' in window && !reduced) {
    var scanIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target.querySelector('.fx-scan');
        if (el && docEl.classList.contains('futur')) el.classList.add('go');
        scanIO.unobserve(e.target);
      });
    }, { threshold: 0.18 });
    Array.prototype.forEach.call(sections, function (sec) {
      var s = document.createElement('span');
      s.className = 'fx-scan';
      s.setAttribute('aria-hidden', 'true');
      sec.appendChild(s);
      scanIO.observe(sec);
    });
  }

  /* ---------- decode de texto (estilo terminal) ---------- */
  var GLYPHS = '01<>/\\|[]{}#$%&*+=·';
  function decode(el, dur) {
    var original = el.textContent;
    var len = original.length;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var lock = Math.floor(p * len);
      var out = original.slice(0, lock);
      for (var i = lock; i < len; i++) {
        out += original[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = original;
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && !reduced) {
    var decodeTargets = document.querySelectorAll('.eyebrow, .card3d .idx, .card3d .tag, .stack-card .num, .hero-meta .item .k');
    var decIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (docEl.classList.contains('futur')) decode(e.target, 650);
        decIO.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(decodeTargets, function (el) { decIO.observe(el); });
  }

  /* ---------- cursor próprio (ponto + anel) ---------- */
  if (finePointer && !reduced) {
    docEl.classList.add('futur-cursor');
    var dot = document.createElement('div');
    dot.className = 'cursor-dot hidden';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring hidden';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = -100, my = -100, rxp = -100, ryp = -100, cursorRaf = null;
    function cursorTick() {
      rxp += (mx - rxp) * 0.16;
      ryp += (my - ryp) * 0.16;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = rxp.toFixed(1) + 'px';
      ring.style.top = ryp.toFixed(1) + 'px';
      cursorRaf = requestAnimationFrame(cursorTick);
    }
    document.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.classList.remove('hidden');
      ring.classList.remove('hidden');
      if (!cursorRaf) cursorRaf = requestAnimationFrame(cursorTick);
    }, { passive: true });
    document.addEventListener('pointerleave', function () {
      dot.classList.add('hidden');
      ring.classList.add('hidden');
    });
    var HOT = 'a, button, [data-tilt], .stack-card, input, select, textarea';
    document.addEventListener('pointerover', function (e) {
      if (e.target.closest && e.target.closest(HOT)) ring.classList.add('hot');
    }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      if (e.target.closest && e.target.closest(HOT)) ring.classList.remove('hot');
    }, { passive: true });
  }

  /* ---------- terminal vivo no hero ---------- */
  var termHost = document.getElementById('termLines');
  if (termHost && !reduced) {
    var SCRIPT = [
      { p: true,  t: 'perceptron · iniciar operação' },
      { ok: true, t: 'sistema no ar · pronto em 3.2s' },
      { ok: true, t: '28 tarefas processadas · fila zerada' },
      { ok: true, t: 'disponibilidade 99.98%' },
      { p: true,  t: 'sincronizar integrações' },
      { ok: true, t: '4 sistemas conectados' },
      { ok: true, t: 'dados conferidos · 0 erros' },
      { p: true,  t: 'verificar tudo' },
      { ok: true, t: 'tudo funcionando · sem falhas' }
    ];
    var MAXL = 6, idx = 0, charI = 0, lineEl = null, caret = null;

    function newLine(spec) {
      var ln = document.createElement('div');
      ln.className = 'ln';
      if (spec.p) {
        var pr = document.createElement('span');
        pr.className = 'p';
        pr.textContent = '$ ';
        ln.appendChild(pr);
      } else if (spec.ok) {
        var okm = document.createElement('span');
        okm.className = 'ok';
        okm.textContent = '✓ ';
        ln.appendChild(okm);
      }
      var txt = document.createElement('span');
      txt.className = 'tx';
      ln.appendChild(txt);
      caret = document.createElement('span');
      caret.className = 'caret';
      ln.appendChild(caret);
      termHost.appendChild(ln);
      while (termHost.children.length > MAXL) termHost.removeChild(termHost.firstChild);
      return txt;
    }

    function typeStep() {
      if (!docEl.classList.contains('futur')) { setTimeout(typeStep, 1200); return; }
      var spec = SCRIPT[idx % SCRIPT.length];
      if (!lineEl) { lineEl = newLine(spec); charI = 0; }
      if (charI < spec.t.length) {
        charI += 1 + ((Math.random() * 2) | 0);
        lineEl.textContent = spec.t.slice(0, charI);
        setTimeout(typeStep, spec.p ? 34 : 14);
      } else {
        lineEl.textContent = spec.t;
        if (caret) caret.remove();
        lineEl = null;
        idx++;
        setTimeout(typeStep, spec.p ? 360 : 620);
      }
    }
    setTimeout(typeStep, 1400);
  }

  /* ---------- API para o painel de tweaks ---------- */
  window.FUTUR = {
    set: function (on) {
      docEl.classList.toggle('futur', !!on);
      if (finePointer && !reduced) docEl.classList.toggle('futur-cursor', !!on);
    }
  };
})();
