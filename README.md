# 🚀 Generador de Código de Barras Profesional

Una aplicación web ligera y moderna para generar, visualizar y exportar códigos de barra. Creada con HTML, CSS y JavaScript puro, esta herramienta utiliza la biblioteca `JsBarcode` para generar gráficos vectoriales (SVG) de alta calidad, asegurando una impresión perfecta en cualquier impresora.

---

## 📋 Características

* **Generación Universal (CODE128):** Soporta números, letras (mayúsculas/minúsculas) y símbolos.
* **Calidad Vectorial (SVG):** Genera códigos en formato SVG, garantizando una nitidez perfecta en cualquier tamaño e impresora (láser, tinta o térmica).
* **Centrado Automático:** El código se centra automáticamente en la hoja al imprimir.
* **Impresión Limpia:** Al imprimir, se ocultan todos los botones y menús, y se eliminan los encabezados y pies de página del navegador (fecha, URL).
* **Múltiples Acciones:**
    * **Imprimir:** Envía el código directamente a cualquier impresora.
    * **Descargar SVG:** Guarda el código como un archivo `.svg` vectorial, ideal para diseñadores o para insertar en documentos.
    * **Copiar Imagen:** Copia el código al portapapeles como una imagen `.png` de alta resolución para pegar rápidamente en correos o chats.
* **Interfaz Sencilla:** Incluye un botón para limpiar el campo de texto fácilmente.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica moderna.
* **CSS3:** Diseño responsivo (Flexbox, Grid) y estilos de impresión (`@media print`).
* **JavaScript (ES6+):** Lógica de la aplicación, manejo de eventos y funciones `async/await`.
* **JsBarcode.js:** Biblioteca principal para la generación de códigos de barra.
* **canvas-to-blob.js:** Utilidad para la función de "Copiar como Imagen".

---

## 🏁 Cómo Empezar

No se requiere instalación ni servidor.

1.  Descarga los 3 archivos:
    * `index.html`
    * `style.css`
    * `script.js`
2.  Colócalos todos en la misma carpeta.
3.  Abre el archivo `index.html` en tu navegador web preferido.

---

## 📜 Licencia

Este proyecto está distribuido bajo la Licencia Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0). Ver el archivo `LICENSE` para más detalles.