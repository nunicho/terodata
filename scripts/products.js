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
      productCard.className = "col-md-4 mb-3";
      productCard.innerHTML = `
        <div class="card text-center">  <!-- Agregamos text-center aquí -->
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <button class="btn btn-primary" onclick="addToCart('${
              product.quantity
            }', ${product.price})">
              Agregar al carrito
            </button>
            ${
              product.isFeatured
                ? '<span class="badge bg-warning">Destacado</span>'
                : ""
            } <!-- Badge para producto destacado -->
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  })
  .catch((error) => console.error("Error cargando productos:", error));
