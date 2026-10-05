const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

console.log("ID recibido:", id);

const coffee = coffees.find((item) => item.id === id);

console.log("Café encontrado:", coffee);

if (coffee) {
  document.getElementById("coffee-image").src = coffee.imagen;

  document.getElementById("coffee-image").alt = coffee.nombre;

  document.getElementById("coffee-name").textContent = coffee.nombre;

  document.getElementById("coffee-description").textContent =
    coffee.descripcion;

  document.getElementById("coffee-type").textContent = coffee.tipo;

  document.getElementById("coffee-origin").textContent = coffee.origen;

  document.getElementById("coffee-flavor").textContent = coffee.sabor;

  document.getElementById("coffee-ingredients").textContent =
    coffee.ingredientes;

  document.getElementById("coffee-preparation").textContent =
    coffee.preparacion;

  document.getElementById("coffee-history").textContent = coffee.historia;
} else {
  document.querySelector(".coffee-container").innerHTML = `
    
        <div class="not-found">

            <h1>Café no encontrado</h1>

            <p>
                No encontramos información para este café.
            </p>

            <a href="index.html">
                Regresar al menú
            </a>

        </div>

    `;
}
