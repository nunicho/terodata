function addToCart(quantity, price) {
  // Lógica para agregar al carrito
  console.log(`Agregado al carrito: ${quantity} a USD ${price}`);
}

// Cargar productos desde el archivo JSON
fetch("../data/products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((products) => {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-3"; // Añadir margen inferior para las tarjetas
      productCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <button class="btn btn-primary" onclick="addToCart('${product.quantity}', ${product.price})">
              Agregar al carrito
            </button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  })
  .catch((error) => console.error("Error cargando productos:", error));
