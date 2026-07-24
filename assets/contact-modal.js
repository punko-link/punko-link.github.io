/*
 * Shared Contact Sales modal for pages other than index.html.
 * Any element with class "contact-sales-open", or any link pointing at
 * "index.html#contact" / "#contact", opens this modal instead of navigating.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var backdrop = document.getElementById('contactModal');
    if (!backdrop) return;

    var form = document.getElementById('contactForm');
    var wrapper = document.getElementById('contactFormWrapper');
    var success = document.getElementById('contactSuccess');
    var closeBtn = document.getElementById('contactModalClose');
    var submitBtn = document.getElementById('contactSubmit');

    var WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
    var ACCESS_KEY = 'c8b4bb23-787c-49bf-a0d8-d21a7c599529';
    var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var fields = [
      { id: 'fieldCompany', name: 'company', errId: 'errCompany', required: true },
      { id: 'fieldEmail',   name: 'email',   errId: 'errEmail',   required: true, isEmail: true },
      { id: 'fieldPhone',   name: 'phone' },
      { id: 'fieldWebsite', name: 'website' },
      { id: 'fieldRequest', name: 'request', errId: 'errRequest', required: true }
    ];

    function openModal() {
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      document.getElementById(fields[0].id).focus();
    }

    function closeModal() {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function showError(inputEl, errorEl) {
      inputEl.classList.add('invalid');
      errorEl.classList.add('visible');
    }

    function clearError(inputEl, errorEl) {
      inputEl.classList.remove('invalid');
      errorEl.classList.remove('visible');
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.contact-sales-open, a[href="index.html#contact"], a[href="#contact"]');
      if (!trigger) return;
      e.preventDefault();
      openModal();
    });

    closeBtn.addEventListener('click', closeModal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal();
    });

    fields.forEach(function (f) {
      if (!f.errId) return;
      var input = document.getElementById(f.id);
      var err = document.getElementById(f.errId);
      input.addEventListener('input', function () {
        if (this.value.trim()) clearError(this, err);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var payload = {
        access_key: ACCESS_KEY,
        subject: 'New Contact Sales inquiry — Punkolink',
        from_name: 'Punkolink Website'
      };

      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        var val = input.value.trim();

        if (f.required) {
          var ok = f.isEmail ? reEmail.test(val) : !!val;
          if (!ok) {
            showError(input, document.getElementById(f.errId));
            valid = false;
          } else {
            clearError(input, document.getElementById(f.errId));
          }
        }

        payload[f.name] = val;
      });

      if (!valid) return;
      if (form.elements['botcheck'].checked) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) throw new Error(data.message || 'submission failed');
        wrapper.classList.add('hidden');
        success.classList.add('visible');
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send to Sales';
      });
    });
  });
})();
