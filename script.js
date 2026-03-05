(function () {
  'use strict';

  // Header scroll + progress bar
  const header = document.querySelector('.header');
  const progressBar = document.getElementById('scroll-progress');
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    if (progressBar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Parallax hero background
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const rate = 0.3;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      heroImg.style.transform = 'translate3d(0, ' + y * rate * 0.5 + 'px, 0)';
    }, { passive: true });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // Mobile menu
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      header.classList.toggle('open');
      document.body.style.overflow = header.classList.contains('open') ? 'hidden' : '';
    });
  }
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        header.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Gallery lightbox — все фото, листание вперёд/назад
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  var lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');
  var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
  var lightboxPrev = lightbox && lightbox.querySelector('.lightbox-prev');
  var lightboxNext = lightbox && lightbox.querySelector('.lightbox-next');
  var lightboxCounter = document.getElementById('lightbox-counter');

  var gallerySrcs = [];
  document.querySelectorAll('.gallery-item[data-src]').forEach(function (item) {
    var src = item.getAttribute('data-src');
    if (src) gallerySrcs.push(src);
  });

  var lightboxIndex = 0;

  function showLightboxImage(index) {
    if (!lightboxImg || !gallerySrcs.length) return;
    lightboxIndex = (index + gallerySrcs.length) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[lightboxIndex];
    if (lightboxCounter) lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + gallerySrcs.length;
  }

  function openLightbox(srcOrIndex) {
    if (!lightbox || !lightboxImg) return;
    var idx = typeof srcOrIndex === 'number' ? srcOrIndex : gallerySrcs.indexOf(srcOrIndex);
    if (idx < 0) idx = 0;
    showLightboxImage(idx);
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  function lightboxPrevClick() {
    if (gallerySrcs.length) showLightboxImage(lightboxIndex - 1);
  }

  function lightboxNextClick() {
    if (gallerySrcs.length) showLightboxImage(lightboxIndex + 1);
  }

  if (lightbox) {
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); lightboxPrevClick(); });
    if (lightboxNext) lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); lightboxNextClick(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('lightbox--open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrevClick();
      if (e.key === 'ArrowRight') lightboxNextClick();
    });
  }

  document.querySelectorAll('.gallery-item[data-src]').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = this.getAttribute('data-src');
      if (src) openLightbox(src);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
