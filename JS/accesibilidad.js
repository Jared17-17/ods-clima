// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a botones y menú
  const ajustesBtn = document.getElementById('ajustesBtn');
  const accesibilidadMenu = document.getElementById('accesibilidad');

  if (!ajustesBtn || !accesibilidadMenu) return;

  // Mostrar/Ocultar menú de ajustes tipo popup
  ajustesBtn.onclick = (e) => {
    accesibilidadMenu.classList.toggle('oculto');
    if (!accesibilidadMenu.classList.contains('oculto')) {
      accesibilidadMenu.focus();
    }
  };

  // Oculta el menú si se da clic fuera del menú o botón
  document.addEventListener('click', function(e) {
    if (!ajustesBtn.contains(e.target) && !accesibilidadMenu.contains(e.target)) {
      accesibilidadMenu.classList.add('oculto');
    }
  });
  // Para accesibilidad: si se sale del menú con tab
  accesibilidadMenu.addEventListener('blur', function(e) {
    accesibilidadMenu.classList.add('oculto');
  }, true);

  // Helper para guardar/cargar en localStorage
  function saveSetting(key, value) {
    localStorage.setItem(key, value);
  }
  function loadSetting(key, defaultValue) {
    return localStorage.getItem(key) !== null ? localStorage.getItem(key) : defaultValue;
  }

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

  // Modo oscuro
  let darkMode = loadSetting('darkMode', 'false') === 'true';
  if (darkMode) {
    document.documentElement.style.setProperty('--bg-color', '#222');
    document.documentElement.style.setProperty('--text-color', '#f4f4f4');
  }
  document.getElementById('darkMode').onclick = () => {
    darkMode = !darkMode;
    saveSetting('darkMode', darkMode);
    document.documentElement.style.setProperty('--bg-color', darkMode ? '#222' : '#f4f4f4');
    document.documentElement.style.setProperty('--text-color', darkMode ? '#f4f4f4' : '#222');
  };

  // Alto contraste
  let highContrast = loadSetting('highContrast', 'false') === 'true';
  if (highContrast) {
    document.documentElement.style.setProperty('--bg-color', '#000');
    document.documentElement.style.setProperty('--text-color', '#fff');
  }
  document.getElementById('highContrast').onclick = () => {
    highContrast = !highContrast;
    saveSetting('highContrast', highContrast);
    if (highContrast) {
      document.documentElement.style.setProperty('--bg-color', '#000');
      document.documentElement.style.setProperty('--text-color', '#fff');
    } else {
      document.documentElement.style.setProperty('--bg-color', darkMode ? '#222' : '#f4f4f4');
      document.documentElement.style.setProperty('--text-color', darkMode ? '#f4f4f4' : '#222');
    }
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

  // Quitar/Sobresaltar links
  let linksDisabled = loadSetting('linksDisabled', 'false') === 'true';
  function aplicarResaltarLinks() {
    document.querySelectorAll('a').forEach(link => {
      link.classList.toggle('resaltado', linksDisabled);
      if (linksDisabled) {
        link.dataset.href = link.getAttribute('href');
        link.removeAttribute('href');
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
});
