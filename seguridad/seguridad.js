// seguridad.js

(function seguridadWeb() {
  'use strict';

  // 1. Bloqueo de teclas comunes para inspección de código
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toLowerCase() === 'u')
    ) {
      e.preventDefault();
    }
  });

  // 2. Ocultar consola en producción
  if (location.hostname.includes('github.io') || location.hostname.includes('wuaze.com')) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }

  // 3. Prevenir framing (clickjacking)
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // 4. Detectar apertura de DevTools (tamaño de ventana)
  function devtoolsDetect() {
    if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
      console.warn('[Seguridad] Herramientas de desarrollo podrían estar activas.');
    }
  }
  window.addEventListener('resize', devtoolsDetect);
  devtoolsDetect();

  // 5. Prevenir arrastre de imágenes y texto
  document.addEventListener('dragstart', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());

  // 6. Advertencias de encabezados HTTP (informativo)
  console.info('[Seguridad] Si tuvieras control de servidor, aplica estos encabezados HTTP:');
  console.info('- Content-Security-Policy');
  console.info('- Strict-Transport-Security');
  console.info('- X-Frame-Options: DENY');
  console.info('- X-Content-Type-Options: nosniff');
  console.info('- Referrer-Policy: no-referrer');

  // 7. Bloquear clic derecho (opcional, poco efectivo)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // 8. Redirigir desde dominios no permitidos (anti-hotlinking básico)
  const dominioPermitido = ['jared17-17.github.io', 'odsclima.wuaze.com'];
  if (!dominioPermitido.includes(location.hostname)) {
    location.href = 'https://jared17-17.github.io/ods-clima/';
  }

})();