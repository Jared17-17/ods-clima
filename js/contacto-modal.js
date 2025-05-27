// contacto-modal.js : abre en carga, cierra con X o tecla Esc
document.addEventListener('DOMContentLoaded', () => {
  const modal  = document.getElementById('infoModal');
  const closeB = modal.querySelector('.modal-close');

  const cerrar = () => modal.classList.add('hidden');

  // Cerrar con botón X
  closeB.addEventListener('click', cerrar);
  // Cerrar con tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) cerrar();
  });
});
