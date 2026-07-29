/*
 * Site-wide cookie consent banner. Injects itself into the page on first
 * visit and remembers the visitor's choice in localStorage.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'punko_cookie_consent';

  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem(STORAGE_KEY)) return;

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<div class="cookie-banner-content">' +
        '<p>We use cookies to understand how visitors use this site. ' +
        'See our <a href="privacy-policy.html">Privacy Policy</a> for details.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="cookie-btn cookie-btn-decline" id="cookieDecline">Decline</button>' +
          '<button type="button" class="cookie-btn cookie-btn-accept" id="cookieAccept">Accept</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });

    function dismiss(value) {
      localStorage.setItem(STORAGE_KEY, value);
      banner.classList.remove('is-visible');
      setTimeout(function () {
        banner.remove();
      }, 300);
    }

    document.getElementById('cookieAccept').addEventListener('click', function () {
      dismiss('accepted');
    });
    document.getElementById('cookieDecline').addEventListener('click', function () {
      dismiss('declined');
    });
  });
})();
