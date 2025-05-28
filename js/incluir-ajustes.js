// js/incluir-ajustes.js
document.addEventListener('DOMContentLoaded', () => {
  const inject = document.getElementById('ajustes-inject');
  // Si estamos dentro de /pages/, subimos un nivel para encontrar ajustes.html
  const path = window.location.pathname.includes('/pages/')
    ? '../ajustes.html'
    : 'ajustes.html';

  fetch(path)
    .then(resp => {
      if (!resp.ok) throw new Error(`No pude cargar ${path}`);
      return resp.text();
    })
    .then(html => {
      inject.innerHTML = html;
      // Una vez inyectado, lanzamos el init de accesibilidad
      if (window.iniciarAjustes) iniciarAjustes();
    })
    .catch(err => console.error(err));
});
