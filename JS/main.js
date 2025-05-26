// Tamaño de fuente
let fontSize = 16;
document.getElementById('fontUp').onclick = () => {
  if (fontSize < 48) fontSize += 8;
  document.documentElement.style.setProperty('--font-size', fontSize + 'px');
};
document.getElementById('fontDown').onclick = () => {
  if (fontSize > 8) fontSize -= 8;
  document.documentElement.style.setProperty('--font-size', fontSize + 'px');
};

// Cambiar fuente
let currentFont = 0;
const fonts = ['Arial, sans-serif', 'Georgia, serif', 'Tahoma, sans-serif'];
document.getElementById('fontFamily').onclick = () => {
  currentFont = (currentFont + 1) % fonts.length;
  document.documentElement.style.setProperty('--font-family', fonts[currentFont]);
};

// Modo oscuro
let darkMode = false;
document.getElementById('darkMode').onclick = () => {
  darkMode = !darkMode;
  document.documentElement.style.setProperty('--bg-color', darkMode ? '#222' : '#f4f4f4');
  document.documentElement.style.setProperty('--text-color', darkMode ? '#f4f4f4' : '#222');
};

// Alto contraste
let highContrast = false;
document.getElementById('highContrast').onclick = () => {
  highContrast = !highContrast;
  if (highContrast) {
    document.documentElement.style.setProperty('--bg-color', '#000');
    document.documentElement.style.setProperty('--text-color', '#fff');
  } else {
    document.documentElement.style.setProperty('--bg-color', darkMode ? '#222' : '#f4f4f4');
    document.documentElement.style.setProperty('--text-color', darkMode ? '#f4f4f4' : '#222');
  }
};

// Daltonismo
document.getElementById('daltonico').onclick = () => {
  document.body.classList.toggle('daltonico');
};

// Cambiar cursor
document.getElementById('toggleCursor').onclick = () => {
  document.body.classList.toggle('cursor-grande');
};

// Quitar imágenes
document.getElementById('removeImages').onclick = () => {
  document.querySelectorAll('img').forEach(img => img.classList.toggle('oculta'));
};

// Quitar/Sobresaltar links
let linksDisabled = false;
document.getElementById('toggleLinks').onclick = () => {
  linksDisabled = !linksDisabled;
  document.querySelectorAll('a').forEach(link => {
    link.classList.toggle('resaltado');
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
};
