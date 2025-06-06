
function iniciarAjustes() {
  const ajustesBtn = document.getElementById("ajustesBtn");
  const ajustesModal = document.getElementById("ajustes-modal");
  const modalBg = document.getElementById("ajustes-modal-bg");
  const cerrarBtn = document.getElementById("ajustesCerrar");

  const toggleBtn = (btn, activeText, inactiveText, isActive) => {
    btn.textContent = isActive ? inactiveText : activeText;
    btn.dataset.active = isActive ? "true" : "false";
  };

  ajustesBtn.addEventListener("click", () => {
    const isOpen = ajustesModal.classList.contains("oculto") === false;
    ajustesModal.classList.toggle("oculto", isOpen);
    modalBg.classList.toggle("oculto", isOpen);
  });

  cerrarBtn.addEventListener("click", () => {
    ajustesModal.classList.add("oculto");
    modalBg.classList.add("oculto");
  });

  modalBg.addEventListener("click", () => cerrarBtn.click());

  const setModeToggle = (id, className, activeText, inactiveText, key) => {
    const btn = document.getElementById(id);
    const saved = localStorage.getItem(key) === "true";
    if (saved) document.body.classList.add(className);
    toggleBtn(btn, activeText, inactiveText, saved);

    btn.addEventListener("click", () => {
      const isActive = document.body.classList.toggle(className);
      toggleBtn(btn, activeText, inactiveText, isActive);
      localStorage.setItem(key, isActive);
    });
  };

  setModeToggle("darkMode", "modo-oscuro", "Modo oscuro", "Modo claro", "modoOscuro");
  setModeToggle("highContrast", "alto-contraste", "Alto contraste", "Modo normal", "altoContraste");
  setModeToggle("daltonico", "daltonico", "Daltonismo", "Modo normal", "modoDaltonico");
  setModeToggle("toggleCursor", "cursor-grande", "Cursor grande", "Cursor normal", "cursorGrande");
  setModeToggle("removeImages", "sin-imagenes", "Ocultar imágenes", "Mostrar imágenes", "sinImagenes");

  const fontSizeSteps = [16, 18, 20, 22, 24];
  let currentFontSizeIndex = parseInt(localStorage.getItem("fontSizeIndex")) || 0;
  document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";

  document.getElementById("fontUp").addEventListener("click", () => {
    if (currentFontSizeIndex < fontSizeSteps.length - 1) {
      currentFontSizeIndex++;
      document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";
      localStorage.setItem("fontSizeIndex", currentFontSizeIndex);

  // Crear y aplicar un estilo global para el cursor grande
  const styleCursor = document.createElement("style");
  styleCursor.id = "cursor-style";
  styleCursor.textContent = `
    body.cursor-grande, body.cursor-grande * {
      cursor: url('https://cur.cursors-4u.net/mechanics/mec-2/mec124.cur'), auto !important;
    }
  `;
  document.head.appendChild(styleCursor);

    }
  });

  document.getElementById("fontDown").addEventListener("click", () => {
    if (currentFontSizeIndex > 0) {
      currentFontSizeIndex--;
      document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";
      localStorage.setItem("fontSizeIndex", currentFontSizeIndex);
    }
  });

  const fonts = ["'Segoe UI'", "'Arial'", "'Verdana'", "'Tahoma'", "'Georgia'"];
  let currentFont = parseInt(localStorage.getItem("fontFamilyIndex")) || 0;
  document.body.style.fontFamily = fonts[currentFont];

  document.getElementById("fontFamily").addEventListener("click", () => {
    currentFont = (currentFont + 1) % fonts.length;
    document.body.style.fontFamily = fonts[currentFont];
    localStorage.setItem("fontFamilyIndex", currentFont);
  });

  const toggleLinksBtn = document.getElementById("toggleLinks");
  let linksDisabled = localStorage.getItem("linksDisabled") === "true";
  if (linksDisabled) {
    document.querySelectorAll("a").forEach(a => {
      a.dataset.href = a.getAttribute("href");
      a.removeAttribute("href");
      a.style.outline = "2px dashed red";
      a.style.pointerEvents = "none";
    });
    toggleLinksBtn.textContent = "Activar links";
  }

  toggleLinksBtn.addEventListener("click", () => {
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach(a => {
      if (!linksDisabled) {
        a.dataset.href = a.getAttribute("href");
        a.removeAttribute("href");
        a.style.outline = "2px dashed red";
        a.style.pointerEvents = "none";
      } else {
        if (a.dataset.href) {
          a.setAttribute("href", a.dataset.href);
          a.removeAttribute("data-href");
        }
        a.style.outline = "";
        a.style.pointerEvents = "";
      }
    });
    linksDisabled = !linksDisabled;
    toggleLinksBtn.textContent = linksDisabled ? "Activar links" : "Desactivar links";
    localStorage.setItem("linksDisabled", linksDisabled);
  });

  document.getElementById("resetTodo").addEventListener("click", () => {
    document.body.className = "";
    document.body.style.fontSize = "";
    document.body.style.fontFamily = "";
    document.querySelectorAll("a").forEach(a => {
      if (a.dataset.href) {
        a.setAttribute("href", a.dataset.href);
        a.removeAttribute("data-href");
      }
      a.style.outline = "";
      a.style.pointerEvents = "";
    });

    localStorage.clear();
    linksDisabled = false;

    document.getElementById("darkMode").textContent = "Modo oscuro";
    document.getElementById("highContrast").textContent = "Alto contraste";
    document.getElementById("daltonico").textContent = "Daltonismo";
    document.getElementById("toggleCursor").textContent = "Cursor grande";
    document.getElementById("removeImages").textContent = "Ocultar imágenes";
    toggleLinksBtn.textContent = "Desactivar links";
  });
}

  // Funcionalidad persistente y dinámica para ocultar imágenes
  const imagenesBtn = document.getElementById("removeImages");
  let ocultar = localStorage.getItem("sinImagenes") === "true";

  const aplicarOcultarImagenes = () => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach(img => {
      if (ocultar) {
        img.dataset.src = img.src;
        img.src = "";
        img.alt = "(imagen oculta)";
        img.style.display = "none";
      } else {
        if (img.dataset.src) img.src = img.dataset.src;
        img.style.display = "";
      }
    });
    imagenesBtn.textContent = ocultar ? "Mostrar imágenes" : "Ocultar imágenes";
    localStorage.setItem("sinImagenes", ocultar);
  };

  aplicarOcultarImagenes(); // aplicar al cargar

  imagenesBtn.addEventListener("click", () => {
    ocultar = !ocultar;
    aplicarOcultarImagenes();
  });