// Mostrar datos del perfil
async function loadProfileData() {
  try {
    const user = await checkAuth();
    
    if (!user) return;
    
    // Mostrar datos en la página de perfil
    if (document.getElementById('profile-name')) {
      document.getElementById('profile-name').textContent = user.name;
      document.getElementById('profile-email').textContent = user.email;
      document.getElementById('profile-role').textContent = user.role === 'admin' ? 'Administrador' : 'Usuario';
      
      const createdAt = new Date(user.createdAt);
      document.getElementById('profile-created').textContent = createdAt.toLocaleDateString() + ' ' + createdAt
