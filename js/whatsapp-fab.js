(function () {
  'use strict';

  var GLYPH = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.93 9.93 0 0 0 4.88 1.25h.01c5.5 0 9.97-4.47 9.97-9.97 0-2.66-1.04-5.17-2.92-7.05A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.28 8.28 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.41c0-4.56 3.72-8.28 8.29-8.28 2.21 0 4.29.86 5.86 2.43a8.23 8.23 0 0 1 2.42 5.86c0 4.57-3.72 8.27-8.29 8.27Zm4.55-6.2c-.25-.13-1.48-.73-1.7-.81-.23-.09-.4-.13-.56.12-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.24a7.5 7.5 0 0 1-1.39-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29Z"/></svg>';

  function init() {
    var cfg = window.PERCEPTRON_CONFIG || {};
    var number = (cfg.whatsappNumber || '').replace(/\D/g, '');
    if (!number) return;

    var text = 'Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Perceptron';

    var fab = document.createElement('a');
    fab.className = 'wa-fab';
    fab.id = 'waFab';
    fab.href = 'https://wa.me/' + number + '?text=' + text;
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Falar no WhatsApp');
    fab.innerHTML = GLYPH + '<span class="wa-label">Falar no WhatsApp</span>';
    document.body.appendChild(fab);

    var blockers = [];
    var contato = document.getElementById('contato');
    var foot = document.querySelector('footer.foot');
    if (contato) blockers.push(contato);
    if (foot) blockers.push(foot);
    if (!blockers.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.__waVisible = entry.isIntersecting; });
      fab.classList.toggle('is-parked', blockers.some(function (el) { return el.__waVisible; }));
    });

    blockers.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
