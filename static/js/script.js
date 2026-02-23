// First one at the top
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavbar();
  initScrollAnimations();
  initContactForm();  // This calls initContactForm()
});

// Second one at the bottom
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing contact form'); // Debug log
  initContactForm();  // This calls initContactForm() AGAIN!
});


document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavbar();
  initScrollAnimations();
  initContactForm();
});

function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.skill-card, .project-card, .approach-card, .stat-card');

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) {
    console.error('Contact form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submission intercepted');
    
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    console.log('Form data:', formData);

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const originalBg = submitButton.style.background;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      const response = await fetch('/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      // Success state
      submitButton.textContent = 'Message Sent!';
      submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      form.reset();

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = originalBg;
      }, 3000);

      showNotification('Message sent successfully!', 'success');
      
    } catch (error) {
      console.error('Form submission error:', error);

      // Error state
      submitButton.textContent = 'Error - Try Again';
      submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = originalBg;
      }, 3000);

      showNotification('Failed to send message. Please try again.', 'error');
    }
  });
}

// Notification function
function showNotification(message, type) {
  // Remove any existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
    ${type === 'success' 
      ? 'background: linear-gradient(135deg, #10b981, #059669);' 
      : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Add CSS animations once
(function addNotificationStyles() {
  // Check if styles already exist
  if (document.getElementById('notification-styles')) return;

  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();