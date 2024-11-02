document.addEventListener("DOMContentLoaded", function () {
  // Cargar el carrito desde localStorage al iniciar la página
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Carrito cargado desde localStorage:", cart); // Verifica si se carga correctamente

  // Función para agregar un producto al carrito
  window.addToCart = function (item, price) {
    const existingProduct = cart.find((product) => product.item === item);

    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa la cantidad si ya existe
    } else {
      cart.push({ item, price, quantity: 1 }); // Agrega un nuevo producto al carrito
    }

    updateCart(); // Llama a updateCart para actualizar el contador y la vista del carrito
  };

  // Función para actualizar la visualización del carrito y guardar en localStorage
  function updateCart() {
    let cartCount = document.getElementById("cart-count");
    const totalQuantity = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log("Cantidad total de productos calculada:", totalQuantity); // Verifica el conteo
    cartCount.textContent = totalQuantity; // Actualiza el número total de artículos en el carrito

    let cartContent = document.getElementById("cartItemsContainer");
    cartContent.innerHTML = ""; // Limpiar el contenido actual

    if (cart.length === 0) {
      cartContent.innerHTML = "<p>No hay artículos en el carrito.</p>";
    } else {
      let total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      cartContent.innerHTML = `
                <ul class="list-group mb-3">
                    ${cart
                      .map(
                        (product, index) => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                ${product.item} - USD ${product.price.toFixed(
                          2
                        )} x ${product.quantity}
                            </div>
                            <div>
                                <button class="btn btn-sm btn-outline-primary" onclick="increaseQuantity(${index})">+</button>
                                <button class="btn btn-sm ${
                                  product.quantity === 1
                                    ? "btn-outline-secondary"
                                    : "btn-warning"
                                }" onclick="decreaseQuantity(${index})" ${
                          product.quantity === 1 ? "disabled" : ""
                        }>-</button>
                                <button class="btn btn-sm btn-outline-danger" onclick="removeProduct(${index})">Eliminar</button>
                            </div>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
                <h5 class="text-end">Total: USD ${total.toFixed(2)}</h5>
            `;
    }

    // Guardar el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Función para aumentar la cantidad de un producto
  window.increaseQuantity = function (index) {
    if (cart[index]) {
      cart[index].quantity += 1;
      updateCart(); // Actualiza el carrito después de aumentar la cantidad
    }
  };

  // Función para disminuir la cantidad de un producto
  window.decreaseQuantity = function (index) {
    if (cart[index] && cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      updateCart(); // Actualiza el carrito después de disminuir la cantidad
    }
  };

  // Función para eliminar un producto del carrito
  window.removeProduct = function (index) {
    if (cart[index]) {
      cart.splice(index, 1); // Elimina el producto del carrito
      updateCart(); // Actualiza el carrito después de eliminar el producto
    }
  };

  // Llama a updateCart al cargar la página
  updateCart();
});

// Función para verificar si el usuario está autenticado
function isUserLoggedIn() {
  return !!localStorage.getItem("user-login"); // Cambia esto según tu lógica de autenticación
}

// Función para proceder al pago
function proceedToCheckout() {
  if (isUserLoggedIn()) {
    alert("Gracias por su compra");
  } else {
    const loginModal = new bootstrap.Modal(
      document.getElementById("loginModal")
    );
    loginModal.show();
  }
}

// Evento click en el botón de checkout
document
  .getElementById("checkoutButton")
  .addEventListener("click", proceedToCheckout);

// Función para agregar elementos al carrito
function addToCart(item, price) {
  const existingProduct = cart.find((product) => product.item === item);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ item, price, quantity: 1 });
  }
  alert(`Agregado al carrito: ${item} por USD ${price.toFixed(2)}`);
  updateCart(); // Actualiza el carrito después de agregar un producto
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Elimina el producto si la cantidad es 0
  }
  updateCart();
}

// Función para eliminar un producto del carrito
function removeProduct(index) {
  cart.splice(index, 1);
  updateCart();
}
