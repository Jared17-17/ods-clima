/*  Detecta si el usuario navega en móvil o escritorio.
    Añade <html class="device-mobile">  o  <html class="device-desktop">
    y ajusta el font-size para pantallas muy pequeñas.                 */

(function () {

  const docEl = document.documentElement;

  function aplicarClaseDispositivo () {

    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                       .test(navigator.userAgent);

    const isNarrow   = window.innerWidth <= 768;        // ancho típico de móvil
    const esMovil    = isMobileUA || isNarrow;

    docEl.classList.toggle('device-mobile',  esMovil);
    docEl.classList.toggle('device-desktop', !esMovil);

    /* Escalado tipográfico para pantallas MUY pequeñas (<380 px).        */
    if (esMovil) {
      const escala = Math.max(0.9, Math.min(1, window.innerWidth / 380));
      docEl.style.fontSize = `${escala * 100}%`;
    } else {
      docEl.style.fontSize = '100%';
    }
  }

  aplicarClaseDispositivo();
  window.addEventListener('resize', aplicarClaseDispositivo);

})();
