// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceworker.js")
      .then((registro) => {
        console.log("Service Worker registrado correctamente:", registro);
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  });
}

const modalOffline = document.getElementById("modalOffline");
const btnReintentar = document.getElementById("btnReintentar");

// Mostrar modal
function mostrarModalOffline() {
  modalOffline.hidden = false;
}

// Ocultar modal
function ocultarModalOffline() {
  modalOffline.hidden = true;
}

// Comprobar el estado de la conexión
function comprobarConexion() {
  if (navigator.onLine) {
    ocultarModalOffline();
  } else {
    mostrarModalOffline();
  }
}

// Detectar cuando se pierde Internet
window.addEventListener("offline", () => {
  mostrarModalOffline();
});

// Detectar cuando regresa Internet
window.addEventListener("online", () => {
  ocultarModalOffline();
});

// Botón para volver a comprobar
btnReintentar.addEventListener("click", () => {
  comprobarConexion();
});

// Comprobar al abrir la aplicación
comprobarConexion();
