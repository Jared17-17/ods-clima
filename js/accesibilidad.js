
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

  const setModeToggle = (id, className, activeText, inactiveText) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      const isActive = document.body.classList.toggle(className);
      toggleBtn(btn, activeText, inactiveText, isActive);
    });
  };

  // Modos de visualización
  setModeToggle("darkMode", "modo-oscuro", "Modo oscuro", "Modo claro");
  setModeToggle("highContrast", "alto-contraste", "Alto contraste", "Modo normal");
  setModeToggle("daltonico", "daltonico", "Daltonismo", "Modo normal");
  setModeToggle("toggleCursor", "cursor-grande", "Cursor grande", "Cursor normal");
  setModeToggle("removeImages", "sin-imagenes", "Ocultar imágenes", "Mostrar imágenes");

  // Aumentar y reducir fuente
  const fontSizeSteps = [16, 18, 20, 22, 24];
  let currentFontSizeIndex = 0;
  document.getElementById("fontUp").addEventListener("click", () => {
    if (currentFontSizeIndex < fontSizeSteps.length - 1) {
      currentFontSizeIndex++;
      document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";
    }
  });
  document.getElementById("fontDown").addEventListener("click", () => {
    if (currentFontSizeIndex > 0) {
      currentFontSizeIndex--;
      document.body.style.fontSize = fontSizeSteps[currentFontSizeIndex] + "px";
    }
  });

  // Cambiar fuente
  const fonts = ["'Segoe UI'", "'Arial'", "'Verdana'", "'Tahoma'", "'Georgia'"];
  let currentFont = 0;
  document.getElementById("fontFamily").addEventListener("click", () => {
    currentFont = (currentFont + 1) % fonts.length;
    document.body.style.fontFamily = fonts[currentFont];
  });

  // Desactivar links
  const toggleLinksBtn = document.getElementById("toggleLinks");
  let linksDisabled = false;
  toggleLinksBtn.addEventListener("click", () => {
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach(a => {
      if (!linksDisabled) {
        a.dataset.href = a.getAttribute("href");
        a.removeAttribute("href");
        a.style.outline = "2px dashed red";
        a.style.pointerEvents = "none";
      } else {
        a.setAttribute("href", a.dataset.href);
        a.style.outline = "";
        a.style.pointerEvents = "";
      }
    });
    linksDisabled = !linksDisabled;
    toggleLinksBtn.textContent = linksDisabled ? "Activar links" : "Desactivar links";
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
    linksDisabled = false;
    // Restaurar textos de botones
    document.getElementById("darkMode").textContent = "Modo oscuro";
    document.getElementById("highContrast").textContent = "Alto contraste";
    document.getElementById("daltonico").textContent = "Daltonismo";
    document.getElementById("toggleCursor").textContent = "Cursor grande";
    document.getElementById("removeImages").textContent = "Ocultar imágenes";
    toggleLinksBtn.textContent = "Desactivar links";
  });
}