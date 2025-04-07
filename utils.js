// Mostrar notificación
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  
  if (!notification || !notificationMessage) return;
  
  notificationMessage.textContent = message;
  notification.className = 'notification';
  notification.classList.add(type);
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

// Toggle password visibility
function setupPasswordToggles() {
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// Verificar autenticación
async function checkAuth() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    redirectToLogin();
    return null;
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error de autenticación');
    }
    
    return data.data;
  } catch (err) {
    logout();
    throw err;
  }
}

// Mostrar información del usuario en el header
function displayUserHeader(user) {
  const userInfo = document.getElementById('user-info');
  const headerUsername = document.getElementById('header-username');
  const headerLogout = document.getElementById('header-logout');
  
  if (userInfo && headerUsername) {
    headerUsername.textContent = user.name;
    userInfo.classList.remove('hidden');
  }
  
  if (headerLogout) {
    headerLogout.addEventListener('click', logout);
  }
}

// Logout
function logout() {
  localStorage.removeItem('token');
  redirectToLogin();
}

// Redirigir a login
function redirectToLogin() {
  if (!window.location.pathname.includes('login.html') {
    window.location.href = 'login.html';
  }
}

// Verificar rol de admin
function checkAdminRole(user) {
  const adminLinks = document.querySelectorAll('.admin-link, #admin-nav-link');
  
  if (user && user.role === 'admin') {
    adminLinks.forEach(link => link.classList.remove('hidden'));
  } else {
    adminLinks.forEach(link => link.classList.add('hidden'));
  }
}

// Inicializar la página protegida
async function initProtectedPage() {
  try {
    const user = await checkAuth();
    displayUserHeader(user);
    checkAdminRole(user);
    return user;
  } catch (err) {
    showNotification(err.message, 'error');
    return null;
  }
}

// Setup inicial cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggles();
  
  // Inicializar páginas protegidas
  if (!window.location.pathname.includes('login.html') {
    initProtectedPage();
  }
});
