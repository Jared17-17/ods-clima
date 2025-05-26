# ODS Acción por el Clima 🌱

Sitio web informativo desarrollado como proyecto académico para la materia de Desarrollo Web Accesible y Seguridad Web.  
Enfocado en el ODS 13: Acción por el Clima, con enfoque en accesibilidad, buenas prácticas de seguridad y despliegue en un entorno público.

## 🚀 Enlace al sitio web

[Ver el sitio en línea (GitHub Pages)](https://jared17-17.github.io/ods-clima/)

---

## 📑 Estructura de páginas

- **Inicio** (`index.html`): Presentación general y bienvenida.
- **¿Qué es el cambio climático?** (`cambio-climatico.html`): Información clave y contexto del ODS 13.
- **Acciones diarias** (`acciones.html`): Recomendaciones y hábitos cotidianos para reducir el impacto climático.
- **CV** (`cv.html`): Currículum Vitae del autor.
- **Contacto** (`contacto.html`): Formulario de contacto accesible.

---

## ♿ Accesibilidad implementada

El sitio incluye las siguientes características de accesibilidad, accesibles desde el botón de ajustes (⚙️ Ajustes) presente en todas las páginas:

- Aumento y disminución del tamaño de la fuente (hasta 3 veces).
- Cambio de familia tipográfica.
- Modo oscuro.
- Modo alto contraste.
- Modo daltónico.
- Cambio de cursor.
- Opción para ocultar imágenes.
- Opción para sobresaltar o deshabilitar links.
- Todos los ajustes se mantienen al navegar entre páginas (persistencia con localStorage).

---

## 🛡️ Seguridad Web

- **Sitio servido sobre HTTPS** (certificado por GitHub Pages).
- **Validación y sanitización de formulario de contacto** para evitar envío de datos maliciosos (validación de email, campos obligatorios, anti-spam).
- **Protección anti-bots en el formulario de contacto** (pregunta lógica simple tipo captcha).
- **Aviso de privacidad** sobre el manejo del correo y advertencia de no incluir datos sensibles.
- **Encabezados de seguridad:**  
  GitHub Pages incluye automáticamente:
    - Strict-Transport-Security (HSTS)
    - X-Content-Type-Options
    - X-Frame-Options
    - Referrer-Policy  
  _(No es posible modificar los encabezados personalizados en GitHub Pages, pero se cumple lo básico por la plataforma)._
- **Eliminación de archivos sensibles**:  
  El proyecto no incluye archivos de configuración expuestos ni archivos de respaldo.
- **Mensajes de error y rutas protegidas:**  
  No se muestran mensajes de error del servidor ni se exponen rutas internas.

---

## 🛠️ Tecnologías usadas

- **HTML5, CSS3, JavaScript** (sin frameworks, código modular).
- **GitHub Pages** para despliegue público y HTTPS.
- **FormSubmit** (o servicio similar) para envío de formularios de contacto sin base de datos.

---

## 🧑‍💻 Instrucciones para clonar y correr localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jared17-17/ods-clima.git
   cd ods-clima
