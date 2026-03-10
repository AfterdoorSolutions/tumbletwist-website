/* ===== TumbleTwist – Modern Script ===== */

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }
});

/* ---------- Mobile Navigation ---------- */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Navbar scroll ---------- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Scroll-to-Top ---------- */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.add('translate-y-0', 'opacity-100');
    } else {
      scrollTopBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.remove('translate-y-0', 'opacity-100');
    }
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Reveal on Scroll ---------- */
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
}

/* ---------- Stagger Children ---------- */
const staggerParents = document.querySelectorAll('.stagger-children');
if (staggerParents.length) {
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          setTimeout(() => child.classList.add('revealed'), i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  staggerParents.forEach(el => staggerObserver.observe(el));
}

/* ---------- Counter Animation ---------- */
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.count;
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          entry.target.textContent = Math.floor(current) + suffix;
        }, 16);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));
}

/* ---------- Gallery Lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg) {
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        lightbox.querySelector('.lightbox-inner')?.classList.add('scale-100', 'opacity-100');
      });
    });
  });

  const closeLightbox = () => {
    const inner = lightbox.querySelector('.lightbox-inner');
    if (inner) { inner.classList.remove('scale-100', 'opacity-100'); }
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    }, 250);
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox(); });
}

/* ---------- Contact Form Validation ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    this.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    const name = this.querySelector('#form-name');
    const email = this.querySelector('#form-email');
    const phone = this.querySelector('#form-phone');
    const message = this.querySelector('#form-message');

    if (!name.value.trim()) { showError(name, 'Please enter your name.'); valid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) { showError(email, 'Please enter a valid email.'); valid = false; }
    if (phone.value.trim() && !/^[\d\s\-+()]{7,20}$/.test(phone.value.trim())) { showError(phone, 'Please enter a valid phone number.'); valid = false; }
    if (!message.value.trim()) { showError(message, 'Please enter a message.'); valid = false; }

    if (valid) {
      const successDiv = document.getElementById('form-success');
      if (successDiv) {
        successDiv.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => successDiv.classList.add('hidden'), 5000);
      }
    }
  });

  function showError(input, msg) {
    const errorEl = input.closest('.form-group')?.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = msg;
  }
}
