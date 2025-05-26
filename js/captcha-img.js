// captcha-img.js
document.addEventListener('DOMContentLoaded', function() {
  const captchaBlock = document.querySelector('.captcha-section');
  const imgs = document.querySelectorAll('#captchaImages img');
  let captchaImgCorrect = false;
  let daltonicMode = false;
  const btnDaltonico = document.getElementById('daltonicoCaptcha');
  const captchaImagesDiv = document.getElementById('captchaImages');

  imgs.forEach(img => {
    img.onclick = function() {
      if (daltonicMode) return; // si está en modo daltonico, ignora click
      imgs.forEach(i => i.style.border = '2px solid #bbb');
      img.style.border = '2.5px solid #229977';
      captchaImgCorrect = img.dataset.correct === "true";
      document.getElementById('captchaImg').value = captchaImgCorrect ? "ok" : "";
    }
  });

  // Botón modo daltonismo
  btnDaltonico.onclick = function() {
    daltonicMode = !daltonicMode;
    btnDaltonico.setAttribute('aria-pressed', daltonicMode ? "true" : "false");
    if (daltonicMode) {
      captchaImagesDiv.style.display = "none";
      btnDaltonico.textContent = "Desactivar modo daltonismo";
      // marca captcha como correcto (bypass)
      captchaImgCorrect = true;
      document.getElementById('captchaImg').value = "ok";
    } else {
      captchaImagesDiv.style.display = "flex";
      btnDaltonico.textContent = "Modo daltonismo";
      captchaImgCorrect = false;
      document.getElementById('captchaImg').value = "";
      imgs.forEach(i => i.style.border = '2px solid #bbb');
    }
  };

  // Exporta función global para validación
  window.checkCaptchaImg = function() {
    return captchaImgCorrect;
  };
});
