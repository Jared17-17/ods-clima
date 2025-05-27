// /js/animacion-vista.js
document.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll(
    '.card, .info-card, .cv-header, .cv-section, main > section, .contact-card'
  );
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(.21,1.13,.81,.99)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 180 + i * 130);
  });
});
