// Lógica de filtrado de tarjetas por categoría
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.btn-filtro');
  const cards = document.querySelectorAll('.accion-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // cambia botón activo
      btns.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      const filtro = btn.dataset.filtro;
      cards.forEach(card => {
        card.style.display =
          filtro === 'todos' || card.dataset.cat === filtro ? 'block' : 'none';
      });
    });
  });
});
