/* =============================================
   HOOR SPOGMAY — PORTFOLIO SCRIPTS v2
   ============================================= */

function openVideo(src, title) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const titleEl = document.getElementById('modalVideoTitle');
  if (!modal || !video || !titleEl) return;
  video.src = src;
  titleEl.textContent = title;
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  document.body.style.overflow = 'hidden';
  setTimeout(() => { video.play().catch(() => {}); }, 100);
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  if (!modal || !video) return;
  video.pause();
  video.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const html = document.documentElement;
      const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ── Parwarish Gallery - Auto-scroll one image at a time ──
  const galleryImages = [
    'parwarish-award.jpeg',
    'parwarish-presenting.jpeg',
    'parwarish-group1.jpeg',
    'parwarish-group2.jpeg'
  ];

  let currentImageIndex = 0;
  let autoScrollInterval;
  const mainImg = document.getElementById('galleryMainImg');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  let dots = [];

  function updateGalleryImage(index) {
    if (!mainImg) return;
    index = (index + galleryImages.length) % galleryImages.length;
    currentImageIndex = index;
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = galleryImages[currentImageIndex];
      mainImg.style.opacity = '1';
    }, 200);

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentImageIndex);
    });
  }

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      updateGalleryImage(currentImageIndex + 1);
    }, 4000);
  }

  // Initialize gallery
  if (mainImg) {
    dots = Array.from(document.querySelectorAll('.dot'));

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGalleryImage(currentImageIndex - 1);
        clearInterval(autoScrollInterval);
        startAutoScroll();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGalleryImage(currentImageIndex + 1);
        clearInterval(autoScrollInterval);
        startAutoScroll();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        updateGalleryImage(idx);
        clearInterval(autoScrollInterval);
        startAutoScroll();
      });
    });

    startAutoScroll();

    // Pause on hover
    const galleryViewer = document.querySelector('.gallery-viewer');
    if (galleryViewer) {
      galleryViewer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
      galleryViewer.addEventListener('mouseleave', () => startAutoScroll());
    }
  }

  // ── Modal close ──
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);
  if (modalClose) modalClose.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });

  // ── Custom Cursor ──
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    const interactives = document.querySelectorAll('a, button, .project-card, .video-card, .contact-link, .exp-card, .deployment-card, input, textarea, .theme-toggle');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = 'white';
        cursorFollower.style.width = '50px'; cursorFollower.style.height = '50px';
        cursorFollower.style.borderColor = 'rgba(200,169,126,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px'; cursor.style.height = '8px'; cursor.style.background = 'var(--gold)';
        cursorFollower.style.width = '28px'; cursorFollower.style.height = '28px';
        cursorFollower.style.borderColor = 'rgba(200,169,126,0.4)';
      });
    });
  }

  // ── Mobile Menu ──
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && closeMenu && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Scroll Reveal ──
  const revealTargets = document.querySelectorAll(
    '.section-header, .project-card, .about-card, .skill-bar-item, .timeline-item, .exp-card, .contact-link, .contact-form-wrap, .video-card, .deployment-card, .pipeline-visual, .hero-stats'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  revealTargets.forEach(el => revealObserver.observe(el));

  // ── Skill Bars ──
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 300);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.skill-fill').forEach(fill => skillObserver.observe(fill));

  // ── Active Nav ──
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? '#c8a97e' : '';
        });
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));

  // ── Project Filtering ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const noProjects = document.getElementById('noProjects');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let visibleCount = 0;
        projectCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
            visibleCount++;
          } else {
            card.classList.add('hidden');
            card.classList.remove('fade-in');
          }
        });
        if (noProjects) {
          noProjects.classList.toggle('hidden', visibleCount > 0);
        }
      });
    });
  }

  // ── Contact Form ──
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('formName')?.value.trim() || '';
      const email = document.getElementById('formEmail')?.value.trim() || '';
      const message = document.getElementById('formMessage')?.value.trim() || '';
      if (!name || !email || !message) {
        sendBtn.textContent = 'Please fill all fields';
        sendBtn.style.background = '#6b6055';
        setTimeout(() => { sendBtn.textContent = 'Send Message'; sendBtn.style.background = ''; }, 2000);
        return;
      }
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Hi Hoor,\n\nMy name is ${name} (${email}).\n\n${message}`);
      window.location.href = `mailto:hoorspogmay48@gmail.com?subject=${subject}&body=${body}`;
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = '#2a7a4a';
      setTimeout(() => { sendBtn.textContent = 'Send Message'; sendBtn.style.background = ''; }, 3000);
    });
  }

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Counter animation on stats ──
  const stats = document.querySelectorAll('.hero-stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        if (isNaN(target)) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
          else { el.textContent = current + '+'; }
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(stat => counterObserver.observe(stat));

});