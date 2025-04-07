// Registrar usuario
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const role = document.getElementById('register-role').value;
      
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password, role })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.errors ? data.errors[0].msg : 'Error al registrarse');
        }
        
        showNotification('Registro exitoso! Por favor inicia sesión', 'success');
        registerForm.reset();
        
        // Redirigir a login después de 2 segundos
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } catch (err) {
        showNotification(err.message, 'error');
      }
    });
  }

  // Login de usuario
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Credenciales inválidas');
        }
        
        // Almacenar token y redirigir
        localStorage.setItem('token', data.token);
        showNotification('Inicio de sesión exitoso', 'success');
        
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1000);
      } catch (err) {
        showNotification(err.message, 'error');
      }
    });
  }
});
