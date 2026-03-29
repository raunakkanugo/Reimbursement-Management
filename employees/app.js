/* ═══════════════════════════════════════════
   ExpenseFlow — Employee View
   Interactive Behaviours
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile nav toggle ──
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const actions = document.querySelector('.nav-actions');

  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      actions.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      actions.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // ── Active nav highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Scroll-reveal animation ──
  const revealElements = document.querySelectorAll(
    '.dash-card, .qa-card, .form-card, .tracker-card, .ocr-result-card, .ocr-drop-zone'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Currency conversion preview ──
  const amountInput = document.getElementById('expense-amount');
  const currencySelect = document.getElementById('expense-currency');
  const convertedDisplay = document.getElementById('converted-amount');

  const rates = { INR: 1, USD: 85.2, EUR: 92.5, GBP: 108.3, SGD: 63.1, AED: 23.2 };

  function updateConversion() {
    const amount = parseFloat(amountInput.value) || 0;
    const currency = currencySelect.value;
    if (currency === 'INR') {
      convertedDisplay.style.display = 'none';
    } else {
      const converted = amount * rates[currency];
      convertedDisplay.style.display = 'block';
      convertedDisplay.textContent = `Converted value in company currency: ₹${converted.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
  }

  if (amountInput && currencySelect) {
    amountInput.addEventListener('input', updateConversion);
    currencySelect.addEventListener('change', updateConversion);
    // Hide on initial load if INR
    convertedDisplay.style.display = 'none';
  }

  // ── Form submission ──
  const expenseForm = document.getElementById('expense-form');
  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Expense claim submitted successfully!', 'success');
      expenseForm.reset();
      convertedDisplay.style.display = 'none';
    });
  }

  // ── Save draft ──
  const saveDraftBtn = document.getElementById('save-draft-btn');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
      showToast('Draft saved.', 'info');
    });
  }

  // ── OCR drop zone interaction ──
  const ocrDropZone = document.getElementById('ocr-drop-zone');
  const ocrFileInput = document.getElementById('ocr-file-input');

  if (ocrDropZone) {
    ocrDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      ocrDropZone.style.borderColor = 'var(--c-primary)';
      ocrDropZone.style.background = 'rgba(113,75,103,.04)';
    });
    ocrDropZone.addEventListener('dragleave', () => {
      ocrDropZone.style.borderColor = '';
      ocrDropZone.style.background = '';
    });
    ocrDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      ocrDropZone.style.borderColor = '';
      ocrDropZone.style.background = '';
      showToast('Receipt uploaded! Extracting details…', 'info');
    });
    ocrDropZone.addEventListener('click', () => {
      ocrFileInput.click();
    });
    ocrFileInput.addEventListener('change', () => {
      if (ocrFileInput.files.length) {
        showToast('Receipt uploaded! Extracting details…', 'info');
      }
    });
  }

  // ── OCR auto-fill button ──
  const ocrAutofillBtn = document.getElementById('ocr-autofill-btn');
  if (ocrAutofillBtn) {
    ocrAutofillBtn.addEventListener('click', () => {
      document.getElementById('expense-title').value = 'Taj Mahal Palace Hotel — Accommodation';
      document.getElementById('expense-amount').value = '4850';
      document.getElementById('expense-category').value = 'accommodation';
      document.getElementById('expense-date').value = '2026-03-18';
      showToast('Fields auto-filled from receipt!', 'success');
      // Scroll to form
      document.getElementById('submit-expense').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ── Form receipt drop area ──
  const formReceiptDrop = document.getElementById('form-receipt-drop');
  if (formReceiptDrop) {
    formReceiptDrop.addEventListener('dragover', (e) => {
      e.preventDefault();
      formReceiptDrop.style.borderColor = 'var(--c-secondary)';
      formReceiptDrop.style.background = 'rgba(1,126,132,.04)';
    });
    formReceiptDrop.addEventListener('dragleave', () => {
      formReceiptDrop.style.borderColor = '';
      formReceiptDrop.style.background = '';
    });
    formReceiptDrop.addEventListener('drop', (e) => {
      e.preventDefault();
      formReceiptDrop.style.borderColor = '';
      formReceiptDrop.style.background = '';
      showToast('Receipt attached.', 'success');
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ── Toast notification system ──
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
      <span class="toast-msg">${message}</span>
    `;

    // Inject toast styles if not present
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        .toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 8px 32px rgba(26,26,46,.14);
          border: 1px solid #eee;
          font-size: 14px;
          font-weight: 500;
          z-index: 9999;
          animation: toastIn .4s cubic-bezier(.4,0,.2,1), toastOut .4s 2.6s cubic-bezier(.4,0,.2,1) forwards;
        }
        .toast--success { border-left: 4px solid #017E84; }
        .toast--info { border-left: 4px solid #714B67; }
        .toast-icon { font-size: 18px; }
        .toast--success .toast-icon { color: #017E84; }
        .toast--info .toast-icon { color: #714B67; }
        @keyframes toastIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // ── Navbar shadow on scroll ──
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(26,26,46,.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── Counter animation for dashboard cards ──
  function animateCounters() {
    const cards = document.querySelectorAll('.dash-card-value');
    cards.forEach(card => {
      const text = card.textContent.trim();
      // Only animate pure numbers
      const numMatch = text.match(/^[\d,]+$/);
      if (numMatch) {
        const target = parseInt(text.replace(/,/g, ''));
        let current = 0;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(eased * target);
          card.textContent = current.toLocaleString('en-IN');
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }

  // Trigger counter animation when dashboard becomes visible
  const dashSection = document.getElementById('dashboard');
  if (dashSection) {
    const dashObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          dashObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    dashObserver.observe(dashSection);
  }
});
