// ===================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT
// Industry Standard Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // SMOOTH SCROLL NAVIGATION
  // ===================================
  
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const headerHeight = 72;
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href.length <= 1) return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('mobile-menu-toggle');
        if (nav && toggle) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
        }
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
  
  // ===================================
  // HEADER SCROLL BEHAVIOR
  // ===================================
  
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }
  
  window.addEventListener('scroll', throttle(updateHeader, 10));
  
  // ===================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ===================================
  
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  
  function highlightNavigation() {
    const scrollPosition = window.pageYOffset + headerHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
    
    // Handle top of page
    if (window.pageYOffset < 100) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#home') {
          item.classList.add('active');
        }
      });
    }
  }
  
  window.addEventListener('scroll', throttle(highlightNavigation, 10));
  
  // ===================================
  // MOBILE MENU TOGGLE
  // ===================================
  
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // ===================================
  // THEME TOGGLE
  // ===================================
  
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const body = document.body;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }
  
  function updateThemeIcon(isDark) {
    if (!themeIcon) return;
    themeIcon.textContent = isDark ? '🌙' : '☀️';
  }

  // ===================================
  // CONTACT FORM VALIDATION
  // ===================================
  
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation on blur
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        clearError(this);
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Construct Mailto Link
      const body = `Name: ${name}\n\nMessage:\n${message}`;
      const mailtoLink = `mailto:sampatrathore.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open Email Client
      window.location.href = mailtoLink;
      
      // UI Feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Opening Email Client...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
        alert('Thank you! Your email client should have opened.');
      }, 3000);
    });
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = `${capitalizeFirst(fieldName)} is required`;
    }
    
    // Email validation
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Minimum length validation
    else if (value && value.length < 2) {
      errorMessage = `${capitalizeFirst(fieldName)} must be at least 2 characters`;
    }
    
    // Message minimum length
    if (fieldName === 'message' && value && value.length < 10) {
      errorMessage = 'Message must be at least 10 characters';
    }
    
    if (errorMessage) {
      showError(field, errorMessage);
      return false;
    }
    
    return true;
  }
  
  function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    field.classList.add('error');
  }
  
  function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    field.classList.remove('error');
  }
  
  function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
    
    const inputElements = document.querySelectorAll('.form-input, .form-textarea');
    inputElements.forEach(el => el.classList.remove('error'));
  }
  
  function showSuccessMessage() {
    alert('Thank you for your message! I will get back to you soon.');
  }
  
  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // ===================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ===================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll(
    '.project-card, .service-card, .tech-category, .about-stats, .stat-item, .section-title, .section-subtitle'
  );
  
  animatedElements.forEach((el, index) => {
    // Add reveal class for CSS transition
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
  
  // ===================================
  // DYNAMIC COPYRIGHT YEAR
  // ===================================
  
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // ===================================
  // UTILITY FUNCTIONS
  // ===================================
  
  // Throttle function for scroll performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Initialize on load
  updateHeader();
  highlightNavigation();
  
});
