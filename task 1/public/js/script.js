// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('.panel');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach((section) => observer.observe(section));

// ---------- Requirement tag toggles (single-select) ----------
const tagButtons = document.querySelectorAll('.toggle-tag');
const requirementInput = document.getElementById('requirementType');

tagButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tagButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    requirementInput.value = btn.dataset.value;
  });
});

// ---------- SWOT tab switching ----------
const swotTabs = document.querySelectorAll('.swot-tab');
const swotPanels = document.querySelectorAll('.swot-panel');

swotTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    swotTabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    swotPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
  });
});

// ---------- Contact form submission ----------
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const requirementType = requirementInput.value;

  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.textContent = 'SENDING...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, requirementType })
    });

    const data = await response.json();

    if (response.ok) {
      submitBtn.textContent = 'SENT SUCCESS!';
      submitBtn.classList.add('success');
      form.reset();
      tagButtons.forEach((b) => b.classList.remove('active'));
      tagButtons[0].classList.add('active');
      requirementInput.value = 'PROJECT';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('success');
        submitBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error(data.message || 'Something went wrong.');
    }
  } catch (err) {
    alert(err.message || 'Could not send your message. Please try again.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});
