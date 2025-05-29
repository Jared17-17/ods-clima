
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

  // Modos de visualización persistentes
  setModeToggle("darkMode", "modo-oscuro", "Modo oscuro", "Modo claro", "modoOscuro");
  setModeToggle("highContrast", "alto-contraste", "Alto contraste", "Modo normal", "altoContraste");
  setModeToggle("daltonico", "daltonico", "Daltonismo", "Modo normal", "modoDaltonico");
  setModeToggle("toggleCursor", "cursor-grande", "Cursor grande", "Cursor normal", "cursorGrande");
  setModeToggle("removeImages", "sin-imagenes", "Ocultar imágenes", "Mostrar imágenes", "sinImagenes");

  // Fuente y tamaño
  const fontSizeSteps = [16, 18, 20, 22, 24];
  let currentFontSizeIndex = parseInt(localStorage.getItem("fontSizeIndex")) || 0;
  document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";

  document.getElementById("fontUp").addEventListener("click", () => {
    if (currentFontSizeIndex < fontSizeSteps.length - 1) {
      currentFontSizeIndex++;
      document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";
      localStorage.setItem("fontSizeIndex", currentFontSizeIndex);
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

  // Links
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

  // Reset total
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
  })
}
