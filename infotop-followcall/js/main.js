/* フォローコールサービス LP */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  // iOS Safari で :active(タップ時の押し下げ)を効かせるための空リスナー
  document.addEventListener('touchstart', function () {}, { passive: true });

  if (!supportsIO) return;
  root.classList.add('js');

  /* ---------- ファーストビューの登場 ---------- */
  var hero = document.querySelector('.hero');
  document.querySelectorAll('[data-hero]').forEach(function (el, i) {
    el.style.setProperty('--delay', (0.1 + i * 0.12) + 's');
  });
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () { hero.classList.add('is-loaded'); });
  });

  /* ---------- スクロールで表示(同じリスト内は少しずつずらす) ---------- */
  document.querySelectorAll('ul, ol').forEach(function (list) {
    var items = Array.prototype.filter.call(list.children, function (li) {
      return li.hasAttribute('data-reveal');
    });
    items.forEach(function (li, i) { li.style.setProperty('--delay', (i * 0.12) + 's'); });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-inview');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- 数字のカウントアップ ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion || isNaN(target)) return;
    var duration = 1200;
    var start = null;
    el.textContent = '0';
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* ---------- SP追従CTA:FVを過ぎたら表示、問い合わせ欄では隠す ---------- */
  var fixedCta = document.querySelector('.fixed-cta');
  var contact = document.getElementById('contact');
  if (fixedCta && hero && contact) {
    var pastHero = false;
    var atContact = false;
    var update = function () { fixedCta.classList.toggle('is-show', pastHero && !atContact); };
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(hero);
    new IntersectionObserver(function (entries) {
      atContact = entries[0].isIntersecting;
      update();
    }, { rootMargin: '0px 0px -30% 0px' }).observe(contact);
  }
})();
