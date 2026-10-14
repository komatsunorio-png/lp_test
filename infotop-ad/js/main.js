/* インフォトップ 広告掲載LP
   手順は README.txt を参照 */
(function () {
  'use strict';

  // iOS Safari で :active(タップ時の押し下げ)を効かせるための空リスナー
  document.addEventListener('touchstart', function () {}, { passive: true });

  // PC:ファーストビューを過ぎたら追従CTAを表示し、フォームが見えている間は隠す
  // (SPは CSS で常に画面下に固定表示)
  var floatCta = document.querySelector('.float-cta');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  if (!floatCta || !hero) return;

  var ticking = false;
  var update = function () {
    ticking = false;
    var pastHero = hero.getBoundingClientRect().bottom < 0;
    var atForm = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
    floatCta.classList.toggle('is-show', pastHero && !atForm);
  };
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
