(function () {
  'use strict';

  var COPIES = 3;
  var DRIFT_SPEED = 18; // px/s — slow, continuous
  var INERTIA_STOP = 8; // px/s — below this, inertia hands back to drift
  var VELOCITY_HALF_LIFE = 400; // ms — how fast a flick's speed decays

  function initReel(viewportId, trackId, direction) {
    var viewport = document.getElementById(viewportId);
    var track = document.getElementById(trackId);
    if (!viewport || !track) return;

    var originalCards = Array.prototype.slice.call(track.children);
    if (!originalCards.length) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    for (var c = 1; c < COPIES; c++) {
      originalCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    var segmentWidth = 0;
    var x = 0;

    function measure() {
      var firstOfSet0 = track.children[0];
      var firstOfSet1 = track.children[originalCards.length];
      segmentWidth = firstOfSet1.offsetLeft - firstOfSet0.offsetLeft;
    }

    function apply() {
      track.style.transform = 'translateX(' + x + 'px)';
    }

    function wrap() {
      if (!segmentWidth) return;
      while (x <= -2 * segmentWidth) x += segmentWidth;
      while (x > 0) x -= segmentWidth;
    }

    var dragging = false;
    var axisLocked = null; // 'x' | 'y' | null
    var pointerId = null;
    var startClientX = 0;
    var startClientY = 0;
    var startX = 0;
    var lastMoveTime = 0;
    var lastMoveX = 0;
    var pointerVelocity = 0; // px/ms

    var inInertia = false;
    var inertiaVelocity = 0; // px/s

    function onPointerDown(event) {
      if (event.button !== undefined && event.button !== 0) return;
      dragging = true;
      axisLocked = null;
      inInertia = false;
      pointerId = event.pointerId;
      startClientX = event.clientX;
      startClientY = event.clientY;
      startX = x;
      lastMoveTime = performance.now();
      lastMoveX = event.clientX;
      pointerVelocity = 0;
    }

    function onPointerMove(event) {
      if (!dragging || event.pointerId !== pointerId) return;
      var dx = event.clientX - startClientX;
      var dy = event.clientY - startClientY;

      if (axisLocked === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axisLocked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (axisLocked === 'x') {
          try { viewport.setPointerCapture(pointerId); } catch (e) {}
          viewport.classList.add('is-dragging');
        } else {
          dragging = false; // vertical intent: leave it to page scroll
          return;
        }
      }

      if (axisLocked !== 'x') return;

      event.preventDefault();
      x = startX + dx;
      wrap();
      apply();

      var now = performance.now();
      var dt = now - lastMoveTime;
      if (dt > 0) {
        pointerVelocity = (event.clientX - lastMoveX) / dt;
      }
      lastMoveTime = now;
      lastMoveX = event.clientX;
    }

    function onPointerUp(event) {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      if (axisLocked === 'x' && !reduceMotion) {
        inertiaVelocity = pointerVelocity * 1000;
        inInertia = Math.abs(inertiaVelocity) > INERTIA_STOP;
      }
      axisLocked = null;
    }

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);

    var lastFrameTime = null;

    function tick(now) {
      if (lastFrameTime === null) lastFrameTime = now;
      var dt = Math.min(now - lastFrameTime, 50);
      lastFrameTime = now;

      if (!dragging) {
        if (inInertia) {
          x += inertiaVelocity * (dt / 1000);
          inertiaVelocity *= Math.pow(0.5, dt / VELOCITY_HALF_LIFE);
          if (Math.abs(inertiaVelocity) < INERTIA_STOP) inInertia = false;
        } else if (!reduceMotion) {
          x += direction * DRIFT_SPEED * (dt / 1000);
        }
        wrap();
        apply();
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', function () {
      measure();
      wrap();
      apply();
    });

    measure();
    x = -segmentWidth;
    apply();
    requestAnimationFrame(tick);
  }

  function init() {
    initReel('l7reel-viewport', 'l7reel-track', -1);
    initReel('blockreel-viewport', 'blockreel-track', 1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
