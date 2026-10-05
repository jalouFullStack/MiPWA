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
