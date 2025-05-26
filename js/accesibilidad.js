(function esperarBotones() {
  const ajustesBtn = document.getElementById('ajustesBtn');
  const ajustesModal = document.getElementById('ajustes-modal');
  const ajustesCerrar = document.getElementById('ajustesCerrar');
  const ajustesBg = document.getElementById('ajustes-modal-bg');
  if (!ajustesBtn || !ajustesModal || !ajustesCerrar || !ajustesBg) {
    setTimeout(esperarBotones, 80);
    return;
  }

  // Abrir menú de ajustes (modal)
  ajustesBtn.onclick = (e) => {
    ajustesModal.classList.remove('oculto');
    ajustesBg.classList.add('visible');
    ajustesModal.focus();
    document.body.style.overflow = 'hidden'; // Bloquea scroll al abrir modal
  };
  // Cerrar menú de ajustes (botón)
  ajustesCerrar.onclick = cerrarModal;
  // Cerrar si se da click en el fondo desenfocado
  ajustesBg.onclick = cerrarModal;
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !ajustesModal.classList.contains('oculto')) cerrarModal();
  });
  function cerrarModal() {
    ajustesModal.classList.add('oculto');
    ajustesBg.classList.remove('visible');
    document.body.style.overflow = '';
    ajustesBtn.focus();
  }

  // ACCESIBILIDAD FUNCIONALIDAD
  function saveSetting(key, value) { localStorage.setItem(key, value); }
  function loadSetting(key, def) { return localStorage.getItem(key) !== null ? localStorage.getItem(key) : def; }

  // Tamaño de fuente
  let fontSize = parseInt(loadSetting('fontSize', '16'));
  document.documentElement.style.setProperty('--font-size', fontSize + 'px');
  document.getElementById('fontUp').onclick = () => {
    if (fontSize < 48) fontSize += 8;
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
    saveSetting('fontSize', fontSize);
  };
  document.getElementById('fontDown').onclick = () => {
    if (fontSize > 8) fontSize -= 8;
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
    saveSetting('fontSize', fontSize);
  };

  // Cambiar fuente
  let fonts = ['Arial, sans-serif', 'Georgia, serif', 'Tahoma, sans-serif'];
  let currentFont = parseInt(loadSetting('fontIndex', '0'));
  document.documentElement.style.setProperty('--font-family', fonts[currentFont]);
  document.getElementById('fontFamily').onclick = () => {
    currentFont = (currentFont + 1) % fonts.length;
    document.documentElement.style.setProperty('--font-family', fonts[currentFont]);
    saveSetting('fontIndex', currentFont);
  };

  // Modo Oscuro
  let darkMode = loadSetting('darkMode', 'false') === 'true';
  if (darkMode) document.body.classList.add('modo-oscuro');
  document.getElementById('darkMode').onclick = () => {
    darkMode = !darkMode;
    saveSetting('darkMode', darkMode);
    document.body.classList.toggle('modo-oscuro', darkMode);
  };

  // Alto Contraste
  let highContrast = loadSetting('highContrast', 'false') === 'true';
  if (highContrast) document.body.classList.add('alto-contraste');
  document.getElementById('highContrast').onclick = () => {
    highContrast = !highContrast;
    saveSetting('highContrast', highContrast);
    document.body.classList.toggle('alto-contraste', highContrast);
  };

  // Daltonismo
  let daltonico = loadSetting('daltonico', 'false') === 'true';
  if (daltonico) {
    document.body.classList.add('daltonico');
  }
  document.getElementById('daltonico').onclick = () => {
    daltonico = !daltonico;
    saveSetting('daltonico', daltonico);
    document.body.classList.toggle('daltonico');
  };

  // Cambiar cursor
  let cursorGrande = loadSetting('cursorGrande', 'false') === 'true';
  if (cursorGrande) {
    document.body.classList.add('cursor-grande');
  }
  document.getElementById('toggleCursor').onclick = () => {
    cursorGrande = !cursorGrande;
    saveSetting('cursorGrande', cursorGrande);
    document.body.classList.toggle('cursor-grande');
  };

  // Quitar imágenes
  let imagenesOcultas = loadSetting('imagenesOcultas', 'false') === 'true';
  function aplicarOcultarImagenes() {
    document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta', imagenesOcultas));
  }
  aplicarOcultarImagenes();
  document.getElementById('removeImages').onclick = () => {
    imagenesOcultas = !imagenesOcultas;
    saveSetting('imagenesOcultas', imagenesOcultas);
    aplicarOcultarImagenes();
  };

// Quitar/Sobresaltar y desactivar links
let linksDisabled = loadSetting('linksDisabled', 'false') === 'true';
function aplicarResaltarLinks() {
  document.querySelectorAll('a').forEach(link => {
    link.classList.toggle('resaltado', linksDisabled);
    if (linksDisabled) {
      if (!link.dataset.href && link.hasAttribute('href')) {
        link.dataset.href = link.getAttribute('href');
        link.removeAttribute('href');
      }
    } else {
      if (link.dataset.href) {
        link.setAttribute('href', link.dataset.href);
        delete link.dataset.href;
      }
    }
  });
}
aplicarResaltarLinks();
document.getElementById('toggleLinks').onclick = () => {
  linksDisabled = !linksDisabled;
  saveSetting('linksDisabled', linksDisabled);
  aplicarResaltarLinks();
};

})();
