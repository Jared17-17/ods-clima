// accesibilidad.js

(function waitForAjustes() {
  if (document.getElementById('ajustesBtn') && document.getElementById('ajustes-modal')) {
    iniciarAjustes();
  } else {
    setTimeout(waitForAjustes, 100);
  }
})();

function iniciarAjustes() {
  const btn = document.getElementById('ajustesBtn');
  const modal = document.getElementById('ajustes-modal');
  const fondo = document.getElementById('ajustes-modal-bg');
  const cerrar = document.getElementById('ajustesCerrar');

  btn.addEventListener('click', () => {
    modal.classList.remove('oculto');
    fondo.classList.add('visible');
  });
  cerrar.addEventListener('click', () => {
    modal.classList.add('oculto');
    fondo.classList.remove('visible');
  });
  fondo.addEventListener('click', () => {
    modal.classList.add('oculto');
    fondo.classList.remove('visible');
  });

  const save = (key, value) => localStorage.setItem(key, value);
  const load = (key, def) => localStorage.getItem(key) ?? def;

  // Tamaño de fuente
  let fontSize = parseInt(load('fontSize', '17'));
  document.documentElement.style.setProperty('--font-size', fontSize + 'px');
  document.body.style.fontSize = fontSize + 'px';

  document.getElementById('fontUp').onclick = () => {
    if (fontSize < 48) fontSize += 2;
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
    document.body.style.fontSize = fontSize + 'px';
    save('fontSize', fontSize);
  };
  document.getElementById('fontDown').onclick = () => {
    if (fontSize > 10) fontSize -= 2;
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
    document.body.style.fontSize = fontSize + 'px';
    save('fontSize', fontSize);
  };

  // Cambiar fuente
  const fonts = ["'Segoe UI', sans-serif", "'Georgia', serif", "'Courier New', monospace"];
  let fontIndex = parseInt(load('fontIndex', '0'));
  document.documentElement.style.setProperty('--font-family', fonts[fontIndex]);
  document.body.style.fontFamily = fonts[fontIndex];

  document.getElementById('fontFamily').onclick = () => {
    fontIndex = (fontIndex + 1) % fonts.length;
    document.documentElement.style.setProperty('--font-family', fonts[fontIndex]);
    document.body.style.fontFamily = fonts[fontIndex];
    save('fontIndex', fontIndex);
  };

  let dark = load('darkMode', 'false') === 'true';
  document.body.classList.toggle('modo-oscuro', dark);
  document.getElementById('darkMode').onclick = () => {
    dark = !dark;
    save('darkMode', dark);
    document.body.classList.toggle('modo-oscuro', dark);
  };

  let contrast = load('highContrast', 'false') === 'true';
  document.body.classList.toggle('alto-contraste', contrast);
  document.getElementById('highContrast').onclick = () => {
    contrast = !contrast;
    save('highContrast', contrast);
    document.body.classList.toggle('alto-contraste', contrast);
  };

  let daltonic = load('daltonico', 'false') === 'true';
  document.body.classList.toggle('daltonico', daltonic);
  document.getElementById('daltonico').onclick = () => {
    daltonic = !daltonic;
    save('daltonico', daltonic);
    document.body.classList.toggle('daltonico', daltonic);
  };

  let cursor = load('cursorGrande', 'false') === 'true';
  document.body.classList.toggle('cursor-grande', cursor);
  document.getElementById('toggleCursor').onclick = () => {
    cursor = !cursor;
    save('cursorGrande', cursor);
    document.body.classList.toggle('cursor-grande', cursor);
  };

  let noImg = load('imagenesOcultas', 'false') === 'true';
  document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta', noImg));
  document.getElementById('removeImages').onclick = () => {
    noImg = !noImg;
    save('imagenesOcultas', noImg);
    document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta', noImg));
  };

  let noLinks = load('linksDisabled', 'false') === 'true';
  const aplicarLinks = () => {
    document.querySelectorAll('a').forEach(link => {
      link.classList.toggle('resaltado', noLinks);
      if (noLinks) {
        link.dataset.href = link.getAttribute('href');
        link.removeAttribute('href');
      } else if (link.dataset.href) {
        link.setAttribute('href', link.dataset.href);
        delete link.dataset.href;
      }
    });
  };
  aplicarLinks();
  document.getElementById('toggleLinks').onclick = () => {
    noLinks = !noLinks;
    save('linksDisabled', noLinks);
    aplicarLinks();
  };
}