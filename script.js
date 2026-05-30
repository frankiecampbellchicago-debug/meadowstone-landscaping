/* ============================================================
   MeadowStone Landscaping — script.js
   ============================================================ */

'use strict';

/* ── STICKY HEADER ──────────────────────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.setAttribute('aria-hidden', String(isOpen));
    if (!isOpen) {
      mobileNav.style.display = 'flex';
    } else {
      mobileNav.style.display = '';
    }
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.style.display = '';
    });
  });
}

/* ── SMOOTH SCROLL OFFSET (accounts for fixed header) ────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;

  // Wrap content for grid animation
  if (!answer.querySelector('div')) {
    const inner = document.createElement('div');
    while (answer.firstChild) inner.appendChild(answer.firstChild);
    answer.appendChild(inner);
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    faqItems.forEach(i => {
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      i.classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      item.classList.add('open');
    }
  });
});

/* ── SCROLL FADE ANIMATIONS ──────────────────────────────────── */
const animateTargets = () => {
  const sections = [
    '.service-card',
    '.project-card',
    '.testimonial-card',
    '.about-content',
    '.area-content',
    '.faq-item',
    '.contact-info',
    '.contact-form-wrap'
  ];

  sections.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('fade-up');
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  } else {
    // Reduced motion: show everything immediately
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
  }
};

/* ── CONTACT FORM ────────────────────────────────────────────── */
const quoteForm = document.getElementById('quote-form');
const formSuccess = document.getElementById('form-success');

if (quoteForm && formSuccess) {
  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const required = quoteForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
    });

    if (!valid) {
      quoteForm.querySelector('[required]:invalid, [required]')?.focus();
      return;
    }

    // Simulate submission (replace with real endpoint / Formspree / Netlify)
    const btn = quoteForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      quoteForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  animateTargets();
});
