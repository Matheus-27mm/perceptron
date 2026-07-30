(function () {
  'use strict';

  var ENDPOINT = 'https://api.web3forms.com/submit';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function digits(v) { return (v || '').replace(/\D/g, ''); }

  function maskPhone(v) {
    var d = digits(v).slice(0, 11);
    if (d.length <= 2) return d.length ? '(' + d : '';
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  var RULES = {
    name: function (v) { return v.trim().length >= 2; },
    company: function (v) { return v.trim().length >= 2; },
    whatsapp: function (v) { var d = digits(v); return d.length === 10 || d.length === 11; },
    email: function (v) { return EMAIL_RE.test(v.trim()); },
    message: function (v) { return v.trim().length >= 10; }
  };

  function init() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var submit = form.querySelector('.cform-submit');
    var honeypot = form.querySelector('[name="botcheck"]');
    var controls = [];

    Object.keys(RULES).forEach(function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      if (el) controls.push({ name: name, el: el, field: el.closest('.cform-field') });
    });

    function setInvalid(c, invalid) {
      if (!c.field) return;
      c.field.classList.toggle('is-invalid', invalid);
      c.el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    }

    function validate(c) {
      var ok = RULES[c.name](c.el.value);
      setInvalid(c, !ok);
      return ok;
    }

    var phone = form.querySelector('[name="whatsapp"]');
    if (phone) {
      phone.addEventListener('input', function () {
        var end = this.selectionStart === this.value.length;
        this.value = maskPhone(this.value);
        if (end) this.setSelectionRange(this.value.length, this.value.length);
      });
    }

    controls.forEach(function (c) {
      c.el.addEventListener('blur', function () { if (c.el.value.trim()) validate(c); });
      c.el.addEventListener('input', function () {
        if (c.field && c.field.classList.contains('is-invalid')) validate(c);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submit.getAttribute('data-state') === 'busy') return;

      form.removeAttribute('data-result');

      var firstBad = null;
      controls.forEach(function (c) {
        if (!validate(c) && !firstBad) firstBad = c;
      });
      if (firstBad) { firstBad.el.focus(); return; }

      if (honeypot && honeypot.value) { form.setAttribute('data-result', 'ok'); return; }

      var cfg = window.PERCEPTRON_CONFIG || {};
      if (!cfg.web3formsAccessKey) { form.setAttribute('data-result', 'fail'); return; }

      var payload = {
        access_key: cfg.web3formsAccessKey,
        subject: 'Novo contato pelo site — Perceptron',
        from_name: 'Site Perceptron',
        botcheck: ''
      };
      controls.forEach(function (c) { payload[c.name] = c.el.value.trim(); });

      submit.setAttribute('data-state', 'busy');
      submit.disabled = true;

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
        .then(function (data) {
          if (!data || !data.success) throw new Error('rejected');
          form.setAttribute('data-result', 'ok');
          form.reset();
        })
        .catch(function () {
          form.setAttribute('data-result', 'fail');
        })
        .then(function () {
          submit.removeAttribute('data-state');
          submit.disabled = false;
        });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
