/* ═══════════════════════════════════════════════
   ZERNAN VASH ARIVE — PORTFOLIO SCRIPTS
   zernanvash.dev
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── BOOT SCREEN ── */
  const boot = document.getElementById('boot');
  function dismissBoot() {
    if (!boot) return;
    boot.style.opacity = '0';
    setTimeout(() => { boot.style.display = 'none'; }, 650);
  }
  setTimeout(dismissBoot, 2800);
  document.addEventListener('keydown', dismissBoot, { once: true });
  document.addEventListener('click', function bootClick() {
    dismissBoot();
    document.removeEventListener('click', bootClick);
  });

  /* ── LIVE CLOCK ── */
  const clockEl = document.getElementById('clock');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* ── SMOOTH NAV SCROLL ── */
  document.querySelectorAll('.nav-btn[href^="#"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(btn.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── SECTION FADE-IN ON SCROLL ── */
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  sections.forEach(s => {
    s.style.transform = 'translateY(18px)';
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(s);
  });

  /* ── PROJECT FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.2s, box-shadow 0.2s';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── CONTACT FORM → MAILTO ── */
  const sendBtn = document.getElementById('send-btn');
  const formStatus = document.getElementById('form-status');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name    = document.getElementById('cf-name')?.value.trim() || '';
      const message = document.getElementById('cf-msg')?.value.trim() || '';

      if (!message) {
        if (formStatus) {
          formStatus.textContent = '> ERROR: message field empty.';
          setTimeout(() => { formStatus.textContent = ''; }, 2500);
        }
        return;
      }

      const subject = encodeURIComponent('Portfolio inquiry — Zernan Vash Arive');
      const body    = encodeURIComponent((name ? name + '\n\n' : '') + message);
      window.location.href = `mailto:zernanvasharive16@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = '> OK: opening mail client...';
        setTimeout(() => { formStatus.textContent = ''; }, 2500);
      }
    });
  }

  /* ── TYPING CURSOR ON ALL PROMPTS ── */
  // Prompts are rendered initially hidden (opacity 0) via CSS and then
  // revealed via animation. Nothing extra needed — just make sure each
  // .prompt is visible after the animation class triggers.

  /* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
  const navBtns = document.querySelectorAll('.nav-btn');
  const sectionIds = ['about', 'skills', 'projects', 'events', 'awards', 'contact'];

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navBtns.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObs.observe(el);
  });

  // Add active nav style dynamically
  const style = document.createElement('style');
  style.textContent = `.nav-btn.active { background: var(--blue-faint); border-color: var(--blue); color: var(--white); animation: none; }`;
  document.head.appendChild(style);

})();
