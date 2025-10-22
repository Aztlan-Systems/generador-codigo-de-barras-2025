document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Selección de Elementos del DOM ---
    const inputTexto = document.getElementById("texto-input");
    const botonGenerar = document.getElementById("generar-btn");
    const actionButtons = document.getElementById("action-buttons");
    
    const botonLimpiar = document.getElementById("limpiar-btn"); 
    const botonImprimir = document.getElementById("imprimir-btn");
    const botonDescargar = document.getElementById("download-btn");
    const botonCopiar = document.getElementById("copy-btn");
    
    const printContainer = document.querySelector(".print-container"); 
    const svgElement = document.getElementById("barcode");
    const toastMsg = document.getElementById("toast-msg");
    
    let originalParent = printContainer.parentElement;
    let ultimoTextoGenerado = ""; 

    // --- 2. Función Principal: Generar Código ---
    const generarCodigo = () => {
        const texto = inputTexto.value;
        
        if (!texto) {
            alert("Por favor, ingresa un valor para generar el código.");
            return;
        }

        try {
            JsBarcode(svgElement, texto, {
                format: "CODE128",     
                displayValue: true,    
                text: texto,           
                fontSize: 18,
                margin: 10,            
                width: 2,
                height: 100,           
                background: "#ffffff"
            });
            
            actionButtons.style.display = "grid";
            ultimoTextoGenerado = texto; 

        } catch (e) {
            console.error(e);
            alert("Error: El texto ingresado no es válido para el formato CODE128.");
            svgElement.innerHTML = "";
            actionButtons.style.display = "none";
            ultimoTextoGenerado = "";
        }
    };

    // --- 3. Función para Limpiar Input (¡ACTUALIZADA!) ---
    const limpiarInput = () => {
        if (inputTexto.value === "") {
            // Si ya está vacío, muestra una notificación
            mostrarToast("El campo ya está vacío.");
        } else {
            // Si tiene texto, límpialo y enfoca
            inputTexto.value = "";
            inputTexto.focus(); // Pone el cursor de nuevo en el campo
        }
    };

    // --- 4. Función de Impresión (Corregida) ---
    const imprimirCodigo = () => {
        const afterPrint = () => {
            originalParent.appendChild(printContainer);
            window.removeEventListener("afterprint", afterPrint);
        };
        window.addEventListener("afterprint", afterPrint);
        document.body.appendChild(printContainer);
        window.print();
    };

    // --- 5. Función para Descargar como SVG ---
    const descargarSVG = () => {
        if (!ultimoTextoGenerado) return;
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `codigo-barras-${ultimoTextoGenerado}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // --- 6. Función para Copiar como Imagen (PNG) ---
    const copiarImagen = async () => {
        try {
            const blob = await svgToPngBlob(svgElement);
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            mostrarToast("¡Copiado al portapapeles!");
        } catch (err) {
            console.error("Error al copiar imagen:", err);
            alert("Error al copiar. Es posible que tu navegador no sea compatible.");
        }
    };

    // --- 7. Función Auxiliar para convertir SVG a PNG Blob ---
    const svgToPngBlob = (svgEl) => {
        return new Promise((resolve, reject) => {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgEl);
            const svgData = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const scale = 3; 
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Fallo al crear el Blob"));
                    }
                }, "image/png");
            };
            img.onerror = (e) => reject(e);
            img.src = svgData;
        });
    };

    // --- 8. Función Auxiliar para mostrar Toast ---
    const mostrarToast = (mensaje) => {
        toastMsg.textContent = mensaje;
        toastMsg.classList.add("show");
        setTimeout(() => {
            toastMsg.classList.remove("show");
        }, 3000);
    };

    // --- 9. Asignación de Eventos ---
    botonGenerar.addEventListener("click", generarCodigo);
    botonLimpiar.addEventListener("click", limpiarInput); 
    
    inputTexto.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            generarCodigo();
        }
    });

    botonImprimir.addEventListener("click", imprimirCodigo);
    botonDescargar.addEventListener("click", descargarSVG);
    botonCopiar.addEventListener("click", copiarImagen);
});
