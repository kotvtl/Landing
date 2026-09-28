(function () {
  'use strict';

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var MOBILE_BP = 768;

  function isMobile() {
    return window.matchMedia('(max-width: ' + MOBILE_BP + 'px)').matches;
  }

  function lockScroll()   { document.body.style.overflow = 'hidden'; }
  function unlockScroll() { document.body.style.overflow = ''; }
function initBurger() {
    var burger = $('[data-burger]');
    var nav = $('.nav');
    if (!burger || !nav) return;

    function open() {
      nav.classList.add('is-open');
      burger.classList.add('is-active');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Закрыть меню');
      lockScroll();
    }
    function close() {
      nav.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      unlockScroll();
    }
    function toggle() {
      nav.classList.contains('is-open') ? close() : open();
    }

    burger.addEventListener('click', toggle);
$$('.nav__link', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobile()) close();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
    });
    window.addEventListener('resize', function () {
      if (!isMobile() && nav.classList.contains('is-open')) close();
    });
  }
  function initSlider() {
    var slider = $('[data-slider]');
    if (!slider) return;

    var track     = $('.slider__track', slider);
    var dotsWrap  = $('.slider__dots', slider);
    var prevBtn   = $('[data-slider-prev]', slider);
    var nextBtn   = $('[data-slider-next]', slider);
    var originals = Array.prototype.slice.call(track.children);
    var originalCount = originals.length;

    var perView = 1;
    var totalSlides = 0;
    var index = 0;
    var animating = false;

    function getPerView() {
      var w = window.innerWidth;
      if (w > 1024) return 3;
      if (w > MOBILE_BP) return 2;
      return 1;
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i < originalCount; i++) {
        (function (i) {
          var li = document.createElement('li');
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
          btn.setAttribute('aria-label', 'Слайд ' + (i + 1));
          btn.addEventListener('click', function () { goTo(i); });
          li.appendChild(btn);
          dotsWrap.appendChild(li);
        })(i);
      }
    }

    function updateDots() {
      var real = ((index % originalCount) + originalCount) % originalCount;
      $$('.slider__dot', dotsWrap).forEach(function (d, i) {
        d.classList.toggle('is-active', i === real);
      });
    }
function setupClones() {
  $$('.slide--clone', track).forEach(function (el) { el.remove(); });

      var first = originals.slice(0, perView);
      var last  = originals.slice(-perView);
last.forEach(function (el) {
        var clone = el.cloneNode(true);
        clone.classList.add('slide--clone');
        clone.setAttribute('aria-hidden', 'true');
        track.insertBefore(clone, track.firstChild);
      });
      first.forEach(function (el) {
        var clone = el.cloneNode(true);
        clone.classList.add('slide--clone');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      totalSlides = track.children.length;
    }

    function setTransform(offset, animate) {
      var x = -100 * offset / totalSlides;
      if (animate) {
        track.style.transform = 'translateX(' + x + '%)';
      } else {
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + x + '%)';
        void track.offsetWidth; /* форс reflow */
        track.style.transition = '';
      }
    }

    function applyPosition(animate) {
      setTransform(perView + index, animate);
    }

    function goTo(newIndex) {
      if (animating) return;
      animating = true;
      index = newIndex;
      applyPosition(true);
      updateDots();
    }

    track.addEventListener('transitionend', function (e) {
      if (e.target !== track) return;
      animating = false;
if (index >= originalCount) {
        index -= originalCount;
        applyPosition(false);
      } else if (index < 0) {
        index += originalCount;
        applyPosition(false);
      }
    });

    prevBtn.addEventListener('click', function () { goTo(index - 1); });
    nextBtn.addEventListener('click', function () { goTo(index + 1); });

    function rebuild() {
      var newPv = getPerView();
      if (newPv === perView && totalSlides) return;
      perView = newPv;
      slider.style.setProperty('--per-view', perView);
      setupClones();
      index = 0;
      applyPosition(false);
      updateDots();
    }

    buildDots();
    rebuild();

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(rebuild, 150);
    });
  }
  var modalState = { product: null, selected: {}, params: [] };

  function getParams(product) {
    if (!product || !product.params) return [];
    if (typeof product.params === 'string') return PARAM_PRESETS[product.params] || [];
    return product.params;
  }

  function openModal(product) {
    var modal = $('[data-modal]');
    if (!modal) return;

    modalState.product = product;
    modalState.params = getParams(product);
    modalState.selected = {};
modalState.params.forEach(function (p) {
      modalState.selected[p.id] = p.options[0].value;
    });
    var img = $('[data-modal-image]', modal);
    img.src = product.image;
    img.alt = product.title;
    $('[data-modal-title]', modal).textContent = product.title;
    $('[data-modal-description]', modal).textContent = product.full || product.short;

    renderModalParams(modal);
    updateModalPrice(modal);

    modal.classList.add('is-open');
    document.documentElement.classList.add('is-modal-open');
    lockScroll();

    var closeBtn = $('.modal__close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function renderModalParams(modal) {
    var wrap = $('[data-modal-params]', modal);
    wrap.innerHTML = '';

    modalState.params.forEach(function (param) {
      var fs = document.createElement('fieldset');
      fs.className = 'param';

      var lg = document.createElement('legend');
      lg.className = 'param__label';
      lg.textContent = param.label;
      fs.appendChild(lg);

      var opts = document.createElement('div');
      opts.className = 'param__options';

      param.options.forEach(function (opt) {
        var label = document.createElement('label');
        label.className = 'param__option' +
          (modalState.selected[param.id] === opt.value ? ' is-selected' : '');

        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'param-' + param.id;
        input.value = opt.value;
        input.checked = modalState.selected[param.id] === opt.value;

        input.addEventListener('change', function () {
          modalState.selected[param.id] = opt.value;
          $$('.param__option', fs).forEach(function (lbl) {
            var inp = lbl.querySelector('input');
            lbl.classList.toggle('is-selected', inp.value === opt.value);
          });
          updateModalPrice(modal);
        });

        var text = document.createElement('span');
        text.className = 'param__option-text';
        text.textContent = opt.label;

        var delta = document.createElement('span');
        delta.className = 'param__option-delta';
        delta.textContent = opt.priceDelta > 0 ? '+' + opt.priceDelta + ' ₽' : '—';

        label.appendChild(input);
        label.appendChild(text);
        label.appendChild(delta);
        opts.appendChild(label);
      });

      fs.appendChild(opts);
      wrap.appendChild(fs);
    });
  }

  function updateModalPrice(modal) {
    var product = modalState.product;
    if (!product) return;
    var total = product.basePrice;
    modalState.params.forEach(function (p) {
      var v = modalState.selected[p.id];
      var opt = p.options.filter(function (o) { return o.value === v; })[0];
      if (opt) total += opt.priceDelta;
    });
    $('[data-modal-price]', modal).textContent = total + ' ₽';
  }

  function closeModal() {
    var modal = $('[data-modal]');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('is-modal-open');
    unlockScroll();
  }

  function initModal() {
    var modal = $('[data-modal]');
    if (!modal) return;

    $$('[data-modal-close]', modal).forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }
function initCatalog() {
    var list = $('[data-cards]');
    if (!list) return;

    var tabs = $$('.tab');
    var showMoreBtn = $('[data-show-more]');
    var moreWrap = showMoreBtn ? showMoreBtn.parentElement : null;

    var activeCategory = CATEGORIES[0].id;
    var expanded = false;
    var wasMobile = isMobile();

    function getInitialVisible() {
      return isMobile() ? 4 : 8;
    }

    function getItems() {
      return PRODUCTS.filter(function (p) { return p.category === activeCategory; });
    }

    function cardHTML(p) {
      var catLabel = (CATEGORIES.filter(function (c) { return c.id === p.category; })[0] || {}).label || '';
      return '' +
        '<article class="card" role="button" tabindex="0" aria-label="' + p.title + '">' +
          '<div class="card__media">' +
            '<img src="' + p.image + '" alt="' + p.title + '" width="600" height="450" loading="lazy">' +
          '</div>' +
          '<div class="card__body">' +
            '<h2 class="card__title">' + p.title + '</h2>' +
            '<p class="card__text">' + p.short + '</p>' +
            '<p class="card__meta">' +
              '<span class="card__price">' + p.basePrice + ' ₽</span>' +
              '<span class="card__tag">' + catLabel + '</span>' +
            '</p>' +
          '</div>' +
        '</article>';
    }

    function render() {
      var items = getItems();
      var total = items.length;
      var initial = getInitialVisible();
      var limit = expanded ? total : Math.min(initial, total);

      list.innerHTML = '';
      items.slice(0, limit).forEach(function (p) {
        var li = document.createElement('li');
        li.className = 'cards__item';
        li.dataset.id = p.id;
        li.innerHTML = cardHTML(p);
        list.appendChild(li);
      });
      if (moreWrap) {
        moreWrap.hidden = !(!expanded && total > initial);
      }
    }
tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var cat = tab.dataset.category;
        if (!cat || cat === activeCategory) return;
        activeCategory = cat;
        expanded = false;
        tabs.forEach(function (t) {
          var isActive = t === tab;
          t.classList.toggle('is-active', isActive);
          t.setAttribute('aria-pressed', String(isActive));
        });
        render();
      });
    });
if (showMoreBtn) {
      showMoreBtn.addEventListener('click', function () {
        expanded = true;
        render();
      });
    }
    window.addEventListener('resize', function () {
      var nowMobile = isMobile();
      if (nowMobile !== wasMobile) {
        wasMobile = nowMobile;
        expanded = false;
        render();
      }
    });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('.cards__item');
      if (!li) return;
      var p = PRODUCTS.filter(function (x) { return x.id === li.dataset.id; })[0];
      if (p) openModal(p);
    });
    list.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var li = e.target.closest('.cards__item');
      if (!li) return;
      e.preventDefault();
      var p = PRODUCTS.filter(function (x) { return x.id === li.dataset.id; })[0];
      if (p) openModal(p);
    });

    render();
  }
function init() {
    initBurger();
    initSlider();
    initCatalog();
    initModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();