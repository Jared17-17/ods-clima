// Animaciones de entrada para tarjetas y secciones
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.cv-card, .cv-header, .cv-section');
  cards.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(.21,1.13,.81,.99)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 200 + i * 120);
  });
});
