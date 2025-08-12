document.addEventListener('DOMContentLoaded', function() {
  // Form Toggle
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  showSignup.addEventListener('click', function() {
    this.classList.add('active');
    showLogin.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });

  showLogin.addEventListener('click', function() {
    this.classList.add('active');
    showSignup.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  // Password Visibility Toggle
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // Password Strength Indicator
  const passwordInput = document.getElementById('signupPassword');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthBar = this.closest('.password-group').querySelector('.strength-bar');
      const strengthText = this.closest('.password-group').querySelector('.strength-text');
      const strength = calculatePasswordStrength(this.value);
      
      strengthBar.style.width = strength.percentage + '%';
      strengthBar.style.backgroundColor = strength.color;
      strengthText.textContent = strength.text;
      strengthText.style.color = strength.color;
    });
  }

  // Form Submission Handling
  document.getElementById('signupBtn')?.addEventListener('click', handleFormSubmit);
  document.getElementById('loginBtn')?.addEventListener('click', handleFormSubmit);

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
});