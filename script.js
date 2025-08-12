document.addEventListener('DOMContentLoaded', function() {
  // Form Toggle
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  function toggleForms(showSignupForm) {
    if (showSignupForm) {
      showSignup.classList.add('active');
      showLogin.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    } else {
      showLogin.classList.add('active');
      showSignup.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    }
    
    // Scroll to top of form on mobile
    if (window.innerWidth <= 900) {
      document.querySelector('.auth-box').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  showSignup.addEventListener('click', () => toggleForms(true));
  showLogin.addEventListener('click', () => toggleForms(false));

  // Password Visibility Toggle
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
      
      // Focus the input after toggle on mobile
      if (window.innerWidth <= 600) {
        input.focus();
      }
    });
  });

  // Adjust input label positioning for mobile
  if (window.innerWidth <= 600) {
    document.querySelectorAll('.input-group input').forEach(input => {
      input.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
          label.style.fontSize = '0.75rem';
        }
      });
    });
  }

  // Password Strength Indicator
  const passwordInput = document.getElementById('signupPassword');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthBar = this.closest('.password-group').querySelector('.strength-bar');
      const strengthText = this.closest('.password-group').querySelector('.strength-text');
      const strength = calculatePasswordStrength(this.value);
      
      if (strengthBar && strengthText) {
        strengthBar.style.width = strength.percentage + '%';
        strengthBar.style.backgroundColor = strength.color;
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
      }
    });
  }

  // Form Submission Handling
  document.querySelectorAll('.auth-btn').forEach(btn => {
    btn.addEventListener('click', handleFormSubmit);
  });

  // Helper Functions
  function calculatePasswordStrength(password) {
    const strength = {
      0: { text: 'Weak', color: '#e74c3c', percentage: 30 },
      1: { text: 'Medium', color: '#f39c12', percentage: 60 },
      2: { text: 'Strong', color: '#2ecc71', percentage: 100 }
    };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score++;
    if (password.match(/\d/) || password.match(/[^a-zA-Z0-9]/)) score++;
    
    return strength[Math.min(score, 2)];
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
      button.classList.remove('loading');
      alert('Form submitted successfully!');
    }, 1500);
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 900) {
      document.querySelector('.page').style.flexDirection = 'column';
    } else {
      document.querySelector('.page').style.flexDirection = 'row';
    }
  });
});
