const container = document.querySelector(".container");

for (let coffee of coffees) {
  const card = document.createElement("div");

  card.classList.add("card");

  card.innerHTML = `
    <img src="${coffee.imagen}" alt="${coffee.nombre}">

    <div class="card-content">

      <h2>${coffee.nombre}</h2>

      <p>
        ${coffee.descripcion}
      </p>

      <button onclick="verCafe(${coffee.id})">
        Ver más
      </button>

    </div>
  `;

  container.appendChild(card);
}

function verCafe(id) {
  window.location.href = `coffee.html?id=${id}`;
}
