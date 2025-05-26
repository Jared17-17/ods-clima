// Valida y sanitiza el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Genera pregunta anti-bot simple
  const a = Math.floor(Math.random() * 7) + 1;
  const b = Math.floor(Math.random() * 7) + 2;
  const resultado = a + b;
  document.getElementById('preguntaLabel').textContent = `Pregunta anti-bot: ¿Cuánto es ${a} + ${b}? *`;

  // Al enviar formulario
  form.addEventListener('submit', function(e) {
    let errores = [];

    // Nombre: solo letras, tildes y espacios
    const nombre = form.nombre.value.trim();
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.\-']{2,60}$/.test(nombre)) {
      errores.push("El nombre solo debe tener letras y espacios, de 2 a 60 caracteres.");
    }
    // Email válido
    const email = form.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errores.push("Introduce un correo electrónico válido.");
    }
    // Mensaje: sin scripts, largo mínimo
    const mensaje = form.mensaje.value.trim();
    if (mensaje.length < 10 || mensaje.length > 500) {
      errores.push("El mensaje debe tener entre 10 y 500 caracteres.");
    }
    if (/<script|<\//i.test(mensaje)) {
      errores.push("No se permiten scripts en el mensaje.");
    }
    // Anti-bot
    const pregunta = form.pregunta.value.trim();
    if (parseInt(pregunta, 10) !== resultado) {
      errores.push("Respuesta anti-bot incorrecta.");
    }

    // Si hay errores, muestra y cancela envío
    const errorDiv = document.getElementById('formErrors');
    if (errores.length > 0) {
      e.preventDefault();
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = errores.map(e => `<div>• ${e}</div>`).join('');
    } else {
      errorDiv.style.display = 'none';
    }
  });
});



// contacto.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    let errores = [];

    // Nombre: solo letras, tildes y espacios
    const nombre = form.nombre.value.trim();
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.\-']{2,60}$/.test(nombre)) {
      errores.push("El nombre solo debe tener letras y espacios, de 2 a 60 caracteres.");
    }
    // Email válido
    const email = form.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errores.push("Introduce un correo electrónico válido.");
    }
    // Mensaje: sin scripts, largo mínimo
    const mensaje = form.mensaje.value.trim();
    if (mensaje.length < 10 || mensaje.length > 500) {
      errores.push("El mensaje debe tener entre 10 y 500 caracteres.");
    }
    if (/<script|<\//i.test(mensaje)) {
      errores.push("No se permiten scripts en el mensaje.");
    }
    // Captcha imagen (o daltonico)
    if (typeof window.checkCaptchaImg === 'function' && !window.checkCaptchaImg()) {
      errores.push("Resuelve correctamente el captcha visual o activa el modo daltonismo para continuar.");
    }
    // Captcha checkbox
    if (typeof window.checkCaptchaCheck === 'function' && !window.checkCaptchaCheck()) {
      errores.push("Confirma que no eres un robot marcando la casilla.");
    }

    // Si hay errores, muestra y cancela envío
    const errorDiv = document.getElementById('formErrors');
    if (errores.length > 0) {
      e.preventDefault();
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = errores.map(e => `<div>• ${e}</div>`).join('');
    } else {
      errorDiv.style.display = 'none';
    }
  });
});
