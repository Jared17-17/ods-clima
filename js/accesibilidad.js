// accesibilidad.js

// Esperamos a que el DOM esté cargado
window.addEventListener('DOMContentLoaded', function () {
  function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) callback(el);
    else setTimeout(() => waitForElement(selector, callback), 100);
  }

  waitForElement('#ajustesBtn', function () {
    const ajustesBtn = document.getElementById('ajustesBtn');
    const ajustesMenu = document.getElementById('accesibilidad');

    ajustesBtn.onclick = () => ajustesMenu.classList.toggle('oculto');

    function save(key, value) {
      localStorage.setItem(key, value);
    }
    function load(key, def) {
      return localStorage.getItem(key) ?? def;
    }

    // Fuente
    let fontSize = parseInt(load('fontSize', '17'));
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');

    document.getElementById('fontUp').onclick = () => {
      if (fontSize < 48) fontSize += 2;
      document.documentElement.style.setProperty('--font-size', fontSize + 'px');
      save('fontSize', fontSize);
    };
    document.getElementById('fontDown').onclick = () => {
      if (fontSize > 10) fontSize -= 2;
      document.documentElement.style.setProperty('--font-size', fontSize + 'px');
      save('fontSize', fontSize);
    };

    const fonts = ["'Segoe UI', sans-serif", "'Georgia', serif", "'Courier New', monospace"];
    let fontIndex = parseInt(load('fontIndex', '0'));
    document.documentElement.style.setProperty('--font-family', fonts[fontIndex]);

    document.getElementById('fontFamily').onclick = () => {
      fontIndex = (fontIndex + 1) % fonts.length;
      document.documentElement.style.setProperty('--font-family', fonts[fontIndex]);
      save('fontIndex', fontIndex);
    };

    // Modo oscuro
    let dark = load('darkMode', 'false') === 'true';
    document.body.classList.toggle('modo-oscuro', dark);

    document.getElementById('darkMode').onclick = () => {
      dark = !dark;
      save('darkMode', dark);
      document.body.classList.toggle('modo-oscuro', dark);
    };

    // Alto contraste
    let contrast = load('highContrast', 'false') === 'true';
    document.body.classList.toggle('alto-contraste', contrast);
    document.getElementById('highContrast').onclick = () => {
      contrast = !contrast;
      save('highContrast', contrast);
      document.body.classList.toggle('alto-contraste', contrast);
    };

    // Daltonismo
    let daltonic = load('daltonico', 'false') === 'true';
    document.body.classList.toggle('daltonico', daltonic);
    document.getElementById('daltonico').onclick = () => {
      daltonic = !daltonic;
      save('daltonico', daltonic);
      document.body.classList.toggle('daltonico', daltonic);
    };

    // Cursor grande
    let cursor = load('cursorGrande', 'false') === 'true';
    document.body.classList.toggle('cursor-grande', cursor);
    document.getElementById('toggleCursor').onclick = () => {
      cursor = !cursor;
      save('cursorGrande', cursor);
      document.body.classList.toggle('cursor-grande', cursor);
    };

    // Ocultar imágenes
    let noImg = load('imagenesOcultas', 'false') === 'true';
    document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta', noImg));
    document.getElementById('removeImages').onclick = () => {
      noImg = !noImg;
      save('imagenesOcultas', noImg);
      document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta', noImg));
    };

    // Links resaltados/desactivados
    let noLinks = load('linksDisabled', 'false') === 'true';
    function aplicarLinks() {
      document.querySelectorAll('a').forEach(link => {
        link.classList.toggle('resaltado', noLinks);
        if (noLinks) {
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
    aplicarLinks();
    document.getElementById('toggleLinks').onclick = () => {
      noLinks = !noLinks;
      save('linksDisabled', noLinks);
      aplicarLinks();
    };
  });
});
