(function () {
  'use strict';

  function init() {
    var section = document.getElementById('solutions-preview');
    var grid = document.getElementById('solrev-grid');
    if (!section || !grid) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion) return; // cards stay in their default, final, visible state

    if (!('IntersectionObserver' in window)) return; // no observer support: leave cards visible as-is

    grid.classList.add('solrev-armed');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        grid.classList.add('solrev-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
