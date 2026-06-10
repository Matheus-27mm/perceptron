/* ============================================================
   PERCEPTRON — scroll FX
   GSAP + ScrollTrigger: pin, scrub, paralaxe, entradas 3D, tilt.
   Degrada com elegância: sem GSAP ou com reduced-motion, tudo
   simplesmente aparece (nenhum conteúdo fica preso invisível).
   ============================================================ */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.FX = window.FX || { intensity: 1 };

  /* ---------- básicos que funcionam sempre ---------- */
  var nav = document.getElementById('nav');
  var onNavScroll = function () { nav && nav.classList.toggle('scrolled', window.scrollY > 24); };
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  var toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- stack: carrossel contínuo (sem pin) ---------- */
  var track = document.getElementById('stackTrack');
  if (track && !track.dataset.carousel) {
    track.dataset.carousel = '1';
    var setEl = document.createElement('div');
    setEl.className = 'stack-set';
    while (track.firstChild) setEl.appendChild(track.firstChild);
    track.appendChild(setEl);
    var cloneEl = setEl.cloneNode(true);
    cloneEl.setAttribute('aria-hidden', 'true');
    track.appendChild(cloneEl);
  }

  /* ---------- split do manifesto em palavras ---------- */
  var quote = document.getElementById('manifestoQuote');
  var words = [];
  if (quote) {
    var parts = quote.textContent.trim().split(/\s+/);
    quote.textContent = '';
    parts.forEach(function (wd, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = wd;
      quote.appendChild(s);
      if (i < parts.length - 1) quote.appendChild(document.createTextNode(' '));
    });
    words = Array.prototype.slice.call(quote.querySelectorAll('.w'));
  }

  function showEverything() {
    docEl.classList.remove('fx');
    words.forEach(function (w) { w.style.color = 'inherit'; });
  }

  /* ---------- sem GSAP / reduced motion → mostra tudo ---------- */
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    showEverything();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* rede de segurança: nunca deixar conteúdo invisível */
  setTimeout(function () {
    var eb = document.querySelector('.hero .eyebrow');
    if (eb && parseFloat(getComputedStyle(eb).opacity) < 0.05) showEverything();
  }, 2600);

  /* ---------- barra de progresso ---------- */
  gsap.to('#progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  /* ---------- entrada do hero ---------- */
  var intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .to('.hero .eyebrow', { opacity: 1, duration: 0.6 }, 0.15)
    .to('.hero-title .line-inner', { y: 0, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.25)
    .fromTo('.hero-sub', { y: 26 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7)
    .fromTo('.hero-actions', { y: 26 }, { y: 0, opacity: 1, duration: 0.8 }, 0.82)
    .fromTo('.hero-meta', { y: 26 }, { y: 0, opacity: 1, duration: 0.8 }, 0.94);

  /* ---------- hero: paralaxe + fade na saída ---------- */
  gsap.to('.hero-copy', {
    y: -110,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 38%', scrub: 0.4 }
  });
  gsap.to('.hero-cue', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '22% top', scrub: 0.4 }
  });

  /* ---------- marcas d'água gigantes: paralaxe ---------- */
  gsap.utils.toArray('.watermark').forEach(function (el) {
    gsap.fromTo(el, { y: 110 }, {
      y: -110,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  /* ---------- cabeçalhos de seção ---------- */
  gsap.utils.toArray('.section-head').forEach(function (el) {
    gsap.from(el, {
      y: 54, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  /* ---------- grades de cards: viram para dentro em 3D ---------- */
  gsap.utils.toArray('[data-cards]').forEach(function (grid) {
    gsap.from(grid.children, {
      y: 90, opacity: 0, rotationX: -16, transformOrigin: '50% 0%',
      duration: 1, ease: 'power3.out', stagger: 0.13,
      scrollTrigger: { trigger: grid, start: 'top 84%' },
      clearProps: 'transform,opacity'   // libera o tilt depois da entrada
    });
  });

  /* ---------- diferencial: paralaxe entre colunas ---------- */
  gsap.utils.toArray('.diff-grid > *').forEach(function (card, i) {
    gsap.to(card, {
      y: (i - 1) * -34,
      ease: 'none',
      scrollTrigger: { trigger: '.diff-grid', start: 'top bottom', end: 'bottom top', scrub: 0.7 }
    });
  });

  /* ---------- manifesto: pinado, palavras acendem com o scroll ---------- */
  if (words.length) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#manifesto',
        start: 'top top',
        end: '+=170%',
        scrub: 0.35,
        pin: true,
        anticipatePin: 1
      }
    })
      .to(words, { color: '#e7e7ec', stagger: 0.8, ease: 'none', duration: 6 })
      .to('#neuronDiagram .nd', { strokeDashoffset: 0, stagger: 0.6, duration: 3.5, ease: 'none' }, '-=4')
      .to('#neuronDiagram .ndn', { opacity: 1, stagger: 0.25, duration: 2, ease: 'none' }, '-=3.5')
      .from('.neuron-formula', { y: 40, opacity: 0, duration: 5, ease: 'power2.out' }, '-=4');
  }

  /* ---------- stack: agora é carrossel contínuo (CSS) — sem pin ---------- */

  /* ---------- CTA: entra inclinado em perspectiva ---------- */
  gsap.from('.cta', {
    y: 90, opacity: 0, rotationX: 10, transformOrigin: '50% 100%',
    duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 86%' }
  });

  /* ---------- footer ---------- */
  gsap.from('footer.foot .wrap', {
    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: 'footer.foot', start: 'top 92%' }
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  /* ============================================================
     TILT 3D nos cards (segue o ponteiro, com brilho)
     ============================================================ */
  (function () {
    var MAXA = 7; // graus
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var rx = 0, ry = 0, trx = 0, try_ = 0, raf = null, over = false;

      function tick() {
        rx += (trx - rx) * 0.12;
        ry += (try_ - ry) * 0.12;
        card.style.transform =
          'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)' +
          (over ? ' translateZ(6px)' : '');
        if (Math.abs(trx - rx) > 0.02 || Math.abs(try_ - ry) > 0.02) {
          raf = requestAnimationFrame(tick);
        } else { raf = null; }
      }
      function kick() { if (!raf) raf = requestAnimationFrame(tick); }

      card.addEventListener('pointerenter', function () {
        over = true;
        card.style.setProperty('--glare', '1');
      });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var amp = MAXA * (window.FX.intensity || 1);
        try_ = (px - 0.5) * 2 * amp;
        trx = (0.5 - py) * 2 * amp;
        card.style.setProperty('--gx', px.toFixed(3));
        card.style.setProperty('--gy', py.toFixed(3));
        kick();
      });
      card.addEventListener('pointerleave', function () {
        over = false;
        trx = 0; try_ = 0;
        card.style.setProperty('--glare', '0');
        kick();
      });
    });
  })();
})();
