/**
 * Form — Floating labels, input state classes, toast notifications, submit ripple
 */

function createToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector('.form-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'form-toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(251, 191, 36, 0.9))',
    color: '#0a0a0a',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '0.95rem',
    boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    pointerEvents: 'none',
    backdropFilter: 'blur(10px)',
  });

  document.body.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Auto-dismiss after 3s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function createRipple(e, button) {
  const ripple = document.createElement('span');
  ripple.className = 'btn-ripple';

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  Object.assign(ripple.style, {
    position: 'absolute',
    width: size + 'px',
    height: size + 'px',
    left: x + 'px',
    top: y + 'px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(0)',
    animation: 'rippleExpand 0.6s ease-out forwards',
    pointerEvents: 'none',
  });

  // Ensure button has relative positioning and overflow hidden
  button.style.position = 'relative';
  button.style.overflow = 'hidden';

  button.appendChild(ripple);

  // Clean up after animation
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Inject ripple keyframes
function injectRippleStyles() {
  if (document.getElementById('ripple-styles')) return;

  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    @keyframes rippleExpand {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

export function initForm() {
  const formGroups = document.querySelectorAll('.form-group');
  const form = document.querySelector('.contact-form form') || document.querySelector('#contact-form');
  const submitBtn = document.querySelector('.contact-form .btn-primary') || document.querySelector('.contact-form button[type="submit"]');

  injectRippleStyles();

  // ------- Floating label behavior -------
  formGroups.forEach((group) => {
    const input = group.querySelector('input, textarea');
    if (!input) return;

    // Check initial state (e.g., autofilled)
    if (input.value.trim() !== '') {
      group.classList.add('has-value');
    }

    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      group.classList.remove('focused');
      if (input.value.trim() === '') {
        group.classList.remove('has-value');
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        group.classList.add('has-value');
      } else {
        group.classList.remove('has-value');
      }
    });
  });

  // ------- Form submission (Web3Forms API) -------
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const accessKey = formData.get('access_key');

      // If they haven't configured a key yet, show a reminder and simulate sending
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        createToast("Demo mode: Message sent! (Configure access_key in HTML to receive emails)");
        form.reset();
        formGroups.forEach((group) => {
          group.classList.remove('focused', 'has-value');
        });
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Convert FormData to JSON
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let res = await response.json();
        if (response.status === 200) {
          createToast("Message sent! I'll get back to you soon.");
          form.reset();
          formGroups.forEach((group) => {
            group.classList.remove('focused', 'has-value');
          });
        } else {
          console.error(res);
          createToast(res.message || "Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        createToast("Form submission failed. Please try again later.");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    });
  }

  // ------- Submit button ripple -------
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      createRipple(e, submitBtn);
    });
  }

  // ------- Copy email to clipboard -------
  const copyEmailBtn = document.querySelector('.copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'kousiksiddhu@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          createToast("Email copied to clipboard!");
          
          // Switch icon to checkmark temporarily for premium micro-interaction
          const icon = copyEmailBtn.querySelector('.copy-action-icon');
          if (icon) {
            icon.setAttribute('data-lucide', 'check');
            icon.style.color = 'var(--color-emerald)';
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
              lucide.createIcons();
            }
            
            // Revert back after 2 seconds
            setTimeout(() => {
              icon.setAttribute('data-lucide', 'copy');
              icon.style.color = '';
              if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
              }
            }, 2000);
          }
        })
        .catch((err) => {
          console.error('Could not copy email: ', err);
          createToast("Failed to copy. Please copy it manually.");
        });
    });
  }
}
