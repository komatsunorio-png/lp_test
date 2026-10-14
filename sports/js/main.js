/* スポーツ特集 LP main.js */
(function () {
  'use strict';

  // iOS Safari で :active(タップ時の押し下げ)を効かせるための空リスナー
  document.addEventListener('touchstart', function () {}, { passive: true });

  // ページ内リンク(ジャンルボタン)は CSS の scroll-behavior:smooth で動作。
  // 動きを減らす設定(prefers-reduced-motion)のときは CSS 側で無効化している。
})();
