/* スポーツ特集 main.js
   - 商品カードのフェードイン（商品が増えても自動で対象になる）
   - TOPボタンの表示切り替え
   - iOSで :active（タップ時の押し下げ）を効かせるための空リスナー */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  // iOS Safari で :active を有効にする
  document.addEventListener('touchstart', function () {}, { passive: true });

  // 商品カードのフェードイン
  var cards = document.querySelectorAll('.card');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    cards.forEach(function (card) { card.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    cards.forEach(function (card) { io.observe(card); });
  }

  // TOPボタン：ジャンル別ボタンを過ぎたら表示
  var toTop = document.querySelector('.to-top');
  var nav = document.querySelector('.genre-nav');
  if (toTop && nav && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      toTop.classList.toggle('is-shown', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(nav);
  } else if (toTop) {
    toTop.classList.add('is-shown');
  }
})();
