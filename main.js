(function () {
  'use strict';
  var burger = document.querySelector('[data-burger]');

  if (burger) {
    burger.addEventListener('click', function () {
      var expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      burger.setAttribute('aria-label', expanded ? 'Открыть меню' : 'Закрыть меню');
    });
  }
  var slider = document.querySelector('[data-slider]');

  if (slider) {
    var dots = slider.querySelectorAll('[data-slide-to]');

    Array.prototype.forEach.call(dots, function (dot) {
      dot.addEventListener('click', function () {
        slider.style.setProperty('--index', dot.getAttribute('data-slide-to'));

        Array.prototype.forEach.call(dots, function (d) {
          d.classList.toggle('is-active', d === dot);
        });
      });
    });
  }
})();