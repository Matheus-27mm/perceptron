/* ============================================================
   PERCEPTRON — enhance
   preloader · lenis (scroll inercial) · botões magnéticos ·
   contadores · colapso da galáxia · profundidade de seções ·
   blips de áudio (off por padrão)
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);

  /* ---------- preloader: remove após a animação ---------- */
  var pre = document.getElementById('preloader');
  if (pre) setTimeout(function () { pre.remove(); }, reduced ? 0 : 2300);

  /* ---------- Lenis: scroll inercial ---------- */
  var lenis = null;
  if (window.Lenis && hasGsap && !reduced) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    /* âncoras passam pelo Lenis */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70, duration: 1.3 });
    });
    var toTopBtn = document.getElementById('toTop');
    if (toTopBtn) toTopBtn.addEventListener('click', function () {
      lenis.scrollTo(0, { duration: 1.4 });
    });
    setTimeout(function () { ScrollTrigger.refresh(); }, 300);
  }

  /* ---------- colapso da galáxia (hero → rede neural) ---------- */
  if (hasGsap && !reduced && document.querySelector('.hero-galaxy')) {
    var dot = document.createElement('div');
    dot.className = 'collapse-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 22%', scrub: 0.5 }
    })
      .to('.hero-galaxy', { scale: 0.5, opacity: 0, transformOrigin: '50% 42%', ease: 'power1.in' }, 0)
      .fromTo(dot, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.in' }, 0.25)
      .to(dot, { opacity: 0, scale: 2.8, duration: 0.3, ease: 'power2.out' }, 0.72);
  }

  /* ---------- profundidade entre seções ---------- */
  if (hasGsap && !reduced) {
    gsap.utils.toArray('#pilares > .wrap, #prova > .wrap, #diferencial > .wrap, #cases > .wrap, #processo > .wrap, #contato > .wrap').forEach(function (w) {
      gsap.from(w, {
        scale: 0.958, y: 36, rotationX: 3.5, transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: w.parentElement, start: 'top 95%', end: 'top 42%', scrub: 0.5 }
      });
    });
  }

  /* ---------- processo: linha que se desenha + etapas ---------- */
  if (hasGsap && !reduced && document.querySelector('.proc-grid')) {
    gsap.to('.proc-line-fill', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.proc-grid', start: 'top 78%', end: 'bottom 55%', scrub: 0.5 }
    });
    gsap.from('.proc-step', {
      y: 44, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.16,
      scrollTrigger: { trigger: '.proc-grid', start: 'top 82%' }
    });
  }

  /* ---------- botões magnéticos ---------- */
  if (finePointer && !reduced) {
    document.querySelectorAll('.btn, .btn-glass, .top-pill, .soc').forEach(function (btn) {
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      function tick() {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        btn.style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px)';
        if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
          if (tx === 0 && ty === 0) { btn.style.transform = ''; cx = cy = 0; }
        }
      }
      function kick() { if (!raf) raf = requestAnimationFrame(tick); }
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        tx = Math.max(-9, Math.min(9, dx * 0.22));
        ty = Math.max(-7, Math.min(7, dy * 0.3));
        kick();
      });
      btn.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
    });
  }

  /* ---------- contadores ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1500;
    var t0 = performance.now();
    function fmt(n) { return n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
    function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    if (reduced) { el.textContent = fmt(target); return; }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCounter(e.target);
        cIO.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cIO.observe(el); });
  }

  /* ---------- áudio (blips sutis, off por padrão) ---------- */
  var audioBtn = document.getElementById('audioToggle');
  if (audioBtn) {
    var actx = null, master = null;
    var on = false;
    try { on = localStorage.getItem('perceptron_audio') === 'on'; } catch (err) { /* noop */ }

    function ensureCtx() {
      if (actx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      actx = new AC();
      master = actx.createGain();
      master.gain.value = 0.1;
      master.connect(actx.destination);
    }
    function blip(freq, dur, gain, type) {
      if (!on || !actx || actx.state !== 'running') return;
      var o = actx.createOscillator();
      var g = actx.createGain();
      o.type = type || 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(gain, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
      o.connect(g); g.connect(master);
      o.start();
      o.stop(actx.currentTime + dur);
    }
    function syncUI() {
      audioBtn.classList.toggle('on', on);
      audioBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var lbl = audioBtn.querySelector('.albl');
      if (lbl) lbl.textContent = on ? 'som on' : 'som off';
    }
    audioBtn.addEventListener('click', function () {
      on = !on;
      if (on) { ensureCtx(); if (actx && actx.state === 'suspended') actx.resume(); }
      try { localStorage.setItem('perceptron_audio', on ? 'on' : 'off'); } catch (err) { /* noop */ }
      syncUI();
      if (on) setTimeout(function () { blip(880, 0.09, 0.5); }, 60);
    });
    syncUI();

    /* hover em interativos */
    var lastHover = 0;
    document.addEventListener('pointerover', function (e) {
      if (!on) return;
      var hot = e.target.closest && e.target.closest('a, button, [data-tilt], .stack-card');
      if (!hot) return;
      var now = performance.now();
      if (now - lastHover < 90) return;
      lastHover = now;
      blip(1280, 0.045, 0.32);
    }, { passive: true });
    /* clique */
    document.addEventListener('click', function (e) {
      if (!on) return;
      if (e.target.closest && e.target.closest('a, button')) blip(700, 0.085, 0.42);
    }, { passive: true });
    /* entrada de seção */
    if ('IntersectionObserver' in window) {
      var sIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) blip(520, 0.12, 0.3, 'triangle');
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('main section').forEach(function (s) { sIO.observe(s); });
    }
  }
})();
