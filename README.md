# 🌍 ODS Acción por el Clima

Sitio web informativo desarrollado como proyecto académico para la materia de **Desarrollo Web Accesible y Seguridad Web**.

Enfocado en el ODS 13: **Acción por el Clima**, con un diseño centrado en la accesibilidad, buenas prácticas de seguridad y publicación en un entorno público accesible desde cualquier navegador moderno.

## 🚀 Enlace al sitio web

📎 [Ver el sitio en línea (GitHub Pages)](https://jared17-17.github.io/ods-clima/)

---

## 📑 Estructura del sitio

- **Inicio (`index.html`)**: Presentación general y bienvenida.
- **¿Qué es el cambio climático? (`cambio-climatico.html`)**: Explicación del ODS 13 y su relevancia.
- **Acciones diarias (`acciones.html`)**: Sugerencias cotidianas para combatir el cambio climático.
- **Currículum Vitae (`cv.html`)**: Información profesional del autor del sitio.
- **Contacto (`contacto.html`)**: Formulario de contacto validado y protegido.

---

## ♿ Accesibilidad implementada

Accesible desde el botón de **⚙️ Ajustes** presente en todas las vistas del sitio. Las funciones fueron diseñadas para funcionar en tiempo real y mantenerse activas entre páginas mediante `localStorage`.

- Aumento y disminución del tamaño de fuente (hasta 3 veces).
- Cambio de familia tipográfica.
- Modo oscuro.
- Modo alto contraste.
- Modo para personas con daltonismo.
- Cambio de cursor (incluye posibilidad de usar cursor personalizado).
- Opción para ocultar o mostrar imágenes en tiempo real.
- Opción para desactivar y resaltar enlaces.
- Botón de restauración para volver a los valores por defecto.

---

## 🛡️ Seguridad Web

Se integraron prácticas básicas de seguridad adecuadas a un sitio sin base de datos:

- **HTTPS activo**: Alojado en GitHub Pages (certificado SSL incluido por defecto).
- **Validación del formulario**:
  - Campos obligatorios.
  - Expresiones regulares para formato de correo.
  - Sanitización básica.
- **Protección anti-bots**:
  - CAPTCHA visual mediante selección de imagen.
- **Privacidad**:
  - Aviso claro sobre el envío sin cifrado de datos personales.
- **Encabezados de seguridad** (configurados por GitHub Pages):
  - `Strict-Transport-Security`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
- **Buenas prácticas adicionales**:
  - No se exponen archivos sensibles (.git, backups, pruebas).
  - No se muestran errores internos ni rutas inseguras.

---

## 🛠️ Tecnologías utilizadas

- HTML5 + CSS3 (con diseño modular y limpio).
- JavaScript puro (sin frameworks).
- GitHub Pages (hosting gratuito con HTTPS).
- [FormSubmit](https://formsubmit.co/) para envío de formularios sin base de datos.
- LocalStorage para persistencia de ajustes de accesibilidad.

---

## 🧑‍💻 Cómo clonar y correr localmente

```bash
git clone https://github.com/jared17-17/ods-clima.git
cd ods-clima
