/* performance-enhance.js
   ──────────────────────
   1. Lazy-load de imágenes/iframes con IntersectionObserver (fallback nativo).
   2. Scroll suave para anclas internas.
   3. Debounce de resize → evita cálculos caros y ajusta la unidad --vh.
*/

;(function () {

  /* ── 1) LAZY-LOAD ───────────────────────────────────────────────────── */
  if ('loading' in HTMLImageElement.prototype) {
    // Soporte nativo: basta con poner loading="lazy"
    document
      .querySelectorAll('img:not([loading])')
      .forEach(img => img.setAttribute('loading', 'lazy'));
  } else {
    // Fallback con IntersectionObserver
    const imgs = document.querySelectorAll('img[data-src]');
    const io   = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src   = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '150px 0px' });
    imgs.forEach(img => io.observe(img));
  }

  /* ── 2) SCROLL SUAVE PARA ANCLAS ─────────────────────────────────────── */
  document.documentElement.style.scrollBehavior = 'smooth';
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', '#' + id);
      }
    }
  });

  /* ── 3) DEBOUNCE + ajuste de --vh ───────────────────────────────────── */
  const debounce = (fn, wait = 140) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  // Corrige 100 vh en móviles (barras de navegación dinámicas)
  const updateVH = () =>
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

  updateVH();
  window.addEventListener('resize', debounce(updateVH, 150));

})();
