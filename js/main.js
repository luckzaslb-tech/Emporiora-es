/* =========================================
   EMPÓRIO RAÇÕES — JavaScript Premium
   ========================================= */

'use strict';

/* ─── Custom Cursor ─── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .cat-card, .produto-card, .gal-item, .insta-item, .dif-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
});

/* ─── Header Scroll ─── */
const header = document.getElementById('header');
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* ─── Mobile Menu ─── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');

function openMenu() {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

/* ─── Smooth Scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Intersection Observer (Reveal) ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Animated Counter ─── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = el.dataset.suffix ? target + el.dataset.suffix : '+' + target;
      clearInterval(timer);
    } else {
      el.textContent = el.dataset.suffix
        ? Math.floor(start) + el.dataset.suffix
        : '+' + Math.floor(start);
    }
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ─── Produtos Tabs ─── */
const tabBtns = document.querySelectorAll('.tab-btn');
const produtoCards = document.querySelectorAll('.produto-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    produtoCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ─── Gallery Lightbox ─── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightbox-close')?.addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─── Hero Video Parallax ─── */
const heroVideo = document.querySelector('.hero-bg video');
const heroOverlay = document.querySelector('.hero-overlay');
window.addEventListener('scroll', () => {
  if (!heroVideo) return;
  const scrollY = window.pageYOffset;
  if (scrollY < window.innerHeight) {
    const progress = scrollY / window.innerHeight;
    heroVideo.style.transform = `scale(${1 + progress * 0.15}) translateY(${scrollY * 0.3}px)`;
    // Darken overlay as user scrolls for depth
    if (heroOverlay) {
      heroOverlay.style.opacity = 1 + progress * 0.4;
    }
  }
}, { passive: true });

/* ─── CTA Parallax ─── */
const ctaBg = document.querySelector('.cta-bg-img img');
const ctaSection = document.getElementById('cta-final');
if (ctaBg && ctaSection) {
  window.addEventListener('scroll', () => {
    const rect = ctaSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      ctaBg.style.transform = `translateY(${(progress - 0.5) * 60}px) scale(1.1)`;
    }
  }, { passive: true });
}

/* ─── Stagger delays for grid items ─── */
function applyStagger(selector, baseDelay = 0.1) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = (i * baseDelay) + 's';
  });
}
applyStagger('.cat-card', 0.05);
applyStagger('.dif-card', 0.1);
applyStagger('.review-card', 0.1);
applyStagger('.gal-item', 0.08);
applyStagger('.insta-item', 0.05);

/* ─── 3D Tilt on Category Cards ─── */
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    const rx = -(y / rect.height) * 14;
    const ry =  (x / rect.width)  * 14;
    card.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Active nav highlight on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ─── Scroll progress bar ─── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, #C62828, #FFB300);
  z-index: 9999; transition: width .1s linear;
  width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct  = (window.scrollY / docH) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });
