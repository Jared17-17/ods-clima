/* acciones.js
   Filtra tarjetas por categoría y gestiona estado accesible de botones
*/
document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.btn-filtro');
  const cards   = document.querySelectorAll('.accion-card');

  function aplicarFiltro(cat){
    cards.forEach(c => {
      const mostrar = cat === 'todos' || c.dataset.cat === cat;
      c.style.display = mostrar ? 'block' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // cambia botón activo + aria-pressed
      buttons.forEach(b => { b.classList.remove('activo'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('activo');
      btn.setAttribute('aria-pressed','true');

      aplicarFiltro(btn.dataset.filtro);
    });
  });

  aplicarFiltro('todos'); // estado inicial
});
