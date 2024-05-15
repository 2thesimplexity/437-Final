document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(registerForm);
      const username = formData.get('username');
      const password = formData.get('password');
  
      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (response.ok) {
          alert('Registration successful! Please login.');
          window.location.href = '/login.html';
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error registering:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  