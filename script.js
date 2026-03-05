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
