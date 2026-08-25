(function () {
  'use strict';

  function init() {
    var section = document.getElementById('solutions-preview');
    var grid = document.getElementById('solrev-grid');
    if (!section || !grid) return;

    var cards = Array.prototype.slice.call(grid.children);
    if (!cards.length) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion) return; // cards stay in their default, final, visible state

    if (!('IntersectionObserver' in window)) return; // no observer support: leave cards visible as-is

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
      card.style.setProperty('--solrev-tx', isLeftHalf ? '-100vw' : '100vw');
      card.style.setProperty('--solrev-ty', isTopRow ? '-100vh' : '0px');
    });

    grid.classList.add('solrev-armed');

    // Hysteresis via two independent observers, each with its own rootMargin,
    // so a small scroll wobble near one threshold can't flip the state back
    // and forth: "gather" fires once the block is well inside the viewport,
    // "scatter" only fires once it has retreated well past that point.
    var gatherObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) grid.classList.add('solrev-in');
      });
    }, { rootMargin: '0px 0px -40% 0px', threshold: 0 });

    var scatterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) grid.classList.remove('solrev-in');
      });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

    gatherObserver.observe(section);
    scatterObserver.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
