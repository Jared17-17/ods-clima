// js/incluir-ajustes.js
document.addEventListener('DOMContentLoaded', () => {
  const inject = document.getElementById('ajustes-inject');
  if (!inject) return;

  // Si la URL contiene "/pages/", subimos un nivel para encontrar ajustes.html
  const path = window.location.pathname.includes('/pages/')
    ? '../ajustes.html'
    : 'ajustes.html';

  fetch(path)
    .then(response => {
      if (!response.ok) {
        console.error(`Error cargando ajustes desde ${path}:`, response.status);
        return '';
      }
      return response.text();
    })
    .then(html => {
      inject.innerHTML = html;
      // Después de inyectar el HTML, inicializamos los controles de accesibilidad
      if (typeof iniciarAjustes === 'function') {
        iniciarAjustes();
      } else {
        console.warn('iniciarAjustes() no está definido en accesibilidad.js');
      }
    })
    .catch(err => console.error('Fetch de ajustes fallido:', err));
});
