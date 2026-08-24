(function () {
  'use strict';

  var OFFSET_X_DESKTOP = 72; // px
  var OFFSET_Y_DESKTOP = 56; // px
  var OFFSET_X_MOBILE = 32; // px
  var OFFSET_Y_MOBILE = 24; // px
  var MOBILE_BREAKPOINT = 768;

  function init() {
    var section = document.getElementById('solutions-preview');
    var grid = document.getElementById('solrev-grid');
    if (!section || !grid) return;

    var cards = Array.prototype.slice.call(grid.children);
    if (!cards.length) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion) return; // cards stay in their default, final, visible state

    if (!('IntersectionObserver' in window)) return; // no observer support: leave cards visible as-is

    var isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    var offsetX = isMobile ? OFFSET_X_MOBILE : OFFSET_X_DESKTOP;
    var offsetY = isMobile ? OFFSET_Y_MOBILE : OFFSET_Y_DESKTOP;

    // Cards in the same row share (roughly) the same offsetTop — use that to
    // find the row width without hardcoding a column count per breakpoint.
    var firstTop = cards[0].offsetTop;
    var columnsPerRow = cards.filter(function (card) {
      return Math.abs(card.offsetTop - firstTop) < 1;
    }).length;

    cards.forEach(function (card, index) {
      var column = index % columnsPerRow;
      var isLeftHalf = column < columnsPerRow / 2;
      var isTopRow = Math.abs(card.offsetTop - firstTop) < 1;
      card.style.setProperty('--solrev-tx', (isLeftHalf ? -offsetX : offsetX) + 'px');
      card.style.setProperty('--solrev-ty', (isTopRow ? -offsetY : 0) + 'px');
    });

    grid.classList.add('solrev-armed');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        grid.classList.add('solrev-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -35% 0px', threshold: 0 });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
