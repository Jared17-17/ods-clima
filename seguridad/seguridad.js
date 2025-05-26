// seguridad.js

(function seguridadWeb() {
  'use strict';

  // 1. Evitar inspección con teclas rápidas comunes (F12, Ctrl+Shift+I, etc.)
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toLowerCase() === 'u')
    ) {
      e.preventDefault();
    }
  });

  // 2. Ocultar errores en consola (solo en producción)
  if (location.hostname.includes('github.io')) {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  // 3. Encabezados HTTP de seguridad (solo como referencia en consola, no se puede aplicar desde JS)
  console.info('[Seguridad] Recuerda configurar estos headers desde el servidor si fuera posible:');
  console.info(' - Content-Security-Policy');
  console.info(' - X-Content-Type-Options: nosniff');
  console.info(' - X-Frame-Options: DENY');
  console.info(' - Referrer-Policy: no-referrer');
  console.info(' - Strict-Transport-Security');

  // 4. Anti-framing (clickjacking protection, por si algún iframe intenta incluir el sitio)
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // 5. Advertencia si se detectan extensiones devtools
  if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
    console.warn('[Seguridad] Puede que las herramientas de desarrollo estén activas.');
  }
})();