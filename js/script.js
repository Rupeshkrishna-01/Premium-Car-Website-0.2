const cursor = document.querySelector('.cursor');
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');

const moveCursor = (event) => {
  if (!cursor) return;
  const { clientX, clientY } = event;
  cursor.style.left = `${clientX}px`;
  cursor.style.top = `${clientY}px`;
};

const toggleCursorActive = (isActive) => {
  cursor?.classList.toggle('active', isActive);
};

if (cursor) {
  window.addEventListener('mousemove', moveCursor);

  document.querySelectorAll('a, button').forEach((interactive) => {
    interactive.addEventListener('mouseenter', () => toggleCursorActive(true));
    interactive.addEventListener('mouseleave', () => toggleCursorActive(false));
  });

  window.addEventListener('touchstart', () => {
    cursor.style.display = 'none';
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      nav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId === '#' || targetId.length === 1) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      nav?.classList.remove('open');
      menuToggle?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const initCarousel = () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prev = carousel.querySelector('[data-carousel="prev"]');
    const next = carousel.querySelector('[data-carousel="next"]');

    if (!track || items.length === 0) return;

    let index = 0;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const handlePrev = () => {
      index = (index - 1 + items.length) % items.length;
      updateCarousel();
    };

    const handleNext = () => {
      index = (index + 1) % items.length;
      updateCarousel();
    };

    prev?.addEventListener('click', handlePrev);
    next?.addEventListener('click', handleNext);

    carousel.addEventListener('mouseenter', () => toggleCursorActive(true));
    carousel.addEventListener('mouseleave', () => toggleCursorActive(false));
  });
};

window.addEventListener('DOMContentLoaded', initCarousel);

