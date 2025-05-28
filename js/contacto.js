/* contacto.js  –  sincroniza daltonismo ↔ captcha  y valida antes de enviar */

document.addEventListener('DOMContentLoaded', () => {

  const body      = document.body;
  const form      = document.getElementById('contactForm');
  const errorsBox = document.getElementById('formErrors');

  /* --- CAPTCHA elementos --- */
  const dalBtn        = document.getElementById('daltonicoCaptcha');
  const captchaImages = document.querySelectorAll('#captchaImages img');
  const captchaValue  = document.getElementById('captchaImg');
  const notRobot      = document.getElementById('notRobot');

  /* --- cambiar daltonismo local ↔ global --- */
  const toggleDaltonismo = () => {
    body.classList.toggle('daltonico');
    ajustarCaptcha();
  };
  dalBtn.addEventListener('click', toggleDaltonismo);

  /* --- marcar o limpiar el captcha según modo --- */
  function ajustarCaptcha() {
    if (body.classList.contains('daltonico')) {
      captchaValue.value = 'daltonico-ok'; // se considerará válido
    } else {
      captchaValue.value = '';             // exige seleccionar imagen
      captchaImages.forEach(img=>img.classList.remove('selected'));
    }
  }
  ajustarCaptcha(); // estado inicial

  /* escucha cambios externos (panel ⚙) */
  new MutationObserver(ajustarCaptcha)
    .observe(body,{attributes:true,attributeFilter:['class']});

  /* --- seleccionar hoja verde --- */
  captchaImages.forEach(img=>{
    img.addEventListener('click',()=>{
      captchaImages.forEach(i=>i.classList.remove('selected'));
      img.classList.add('selected');
      captchaValue.value = img.dataset.correct === 'true' ? 'true' : '';
    });
  });

  /* --- VALIDACIÓN antes de enviar --- */
  form.addEventListener('submit', e=>{
    const errs = [];

    if (!form.nombre.value.trim())  errs.push('Nombre obligatorio.');
    if (!form.email.validity.valid) errs.push('Correo inválido.');
    if (!form.mensaje.value.trim()) errs.push('Mensaje obligatorio.');
    if (!notRobot.checked)          errs.push('Confirma que no eres un robot.');

    /* si no está en daltonismo, exigir captcha visual */
    if (!body.classList.contains('daltonico') && captchaValue.value !== 'true') {
      errs.push('Selecciona la hoja verde.');
    }

    if (errs.length){
      e.preventDefault();
      errorsBox.innerHTML = errs.map(t=>`<p>• ${t}</p>`).join('');
      errorsBox.hidden = false;
      errorsBox.scrollIntoView({behavior:'smooth'});
    } else {
      errorsBox.hidden = true; // todo ok
    }
  });
});
