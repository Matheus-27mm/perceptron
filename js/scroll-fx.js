/**
 * PERCEPTRON — Lógica de Scroll e Animações GSAP
 * Mantém a experiência de carregamento leve, fluida e de altíssimo desempenho.
 */
(function () {
  'use strict';

  // 1. Barra de navegação scrolled state
  var nav = document.getElementById('nav');
  var onNavScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  // 2. Botão de voltar ao topo
  var toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Detecção de GSAP / Acessibilidade de movimento reduzido
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 4. Barra de leitura no topo
  gsap.to('#progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  // 5. Animação de entrada do Hero
  var intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .fromTo('.hero .status-pill', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
    .fromTo('.hero-title', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.2)
    .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.48)
    .fromTo('.hero-actions', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.62)
    .fromTo('.hero-logos', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.78);

  // 6. Cabeçalhos de Seções (.sec-head)
  gsap.utils.toArray('.sec-head').forEach(function (el) {
    gsap.from(el, {
      y: 30, opacity: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // 7. Grade de Serviços (stagger suave)
  var servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    gsap.from(servicesGrid.children, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: servicesGrid, start: 'top 86%' }
    });
  }

  // 8. Grade de Diferenciais (stagger suave)
  var diffGrid = document.querySelector('.diff-grid');
  if (diffGrid) {
    gsap.from(diffGrid.children, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15,
      scrollTrigger: { trigger: diffGrid, start: 'top 86%' }
    });
  }

  // 9. Seção de CTA / Contato
  var ctaContainer = document.querySelector('.cta-container');
  if (ctaContainer) {
    gsap.from(ctaContainer, {
      y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: ctaContainer, start: 'top 88%' }
    });
  }

  // Atualiza gatilhos ao carregar tudo
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
