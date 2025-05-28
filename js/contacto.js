/* contacto.js – sincroniza modo daltonismo con captcha        */
/* el resto de tu lógica (validación, captcha-img, etc.) sigue */

document.addEventListener('DOMContentLoaded', () => {
  const body          = document.body;
  const dalBtn        = document.getElementById('daltonicoCaptcha');
  const captchaImgInp = document.getElementById('captchaImg');
  const captchaImages = document.getElementById('captchaImages');

  /* ===== helper ===== */
  function aplicarDaltonismo(activo){
    /* ocultar/mostrar sección visual – CSS se encarga */
    /* marcar captcha como pasado si se oculta          */
    if (activo){
      captchaImgInp.value = 'daltonico-ok';            // saltamos validación
    } else {
      captchaImgInp.value = '';                        // fuerza a elegir imagen
    }
  }

  /* 1) click en el botón interno (hojas) => alterna clase global */
  dalBtn.addEventListener('click', () => {
    body.classList.toggle('daltonico');
  });

  /* 2) aplica estado inicial (por si el usuario activó daltonismo desde ajustes) */
  aplicarDaltonismo(body.classList.contains('daltonico'));

  /* 3) observa cambios en <body class> para sincronizar cuando se use el panel ⚙ */
  const obs = new MutationObserver(() => {
    aplicarDaltonismo(body.classList.contains('daltonico'));
  });
  obs.observe(body, { attributes:true, attributeFilter:['class'] });
});
