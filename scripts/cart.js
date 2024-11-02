let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para verificar si el usuario está autenticado
function isUserLoggedIn() {
  return !!localStorage.getItem("user-login"); // Cambia esto según tu lógica de autenticación
}

// Función para proceder al pago
function proceedToCheckout() {
  if (isUserLoggedIn()) {
    alert("Gracias por su compra");
    // Aquí puedes agregar más lógica para procesar el pago si es necesario
  } else {
    // Mostrar el modal de login
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
  updateCart();
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

// Función para actualizar la visualización del carrito y guardar en localStorage
function updateCart() {
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length; // Actualiza el número de artículos en el carrito

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
                            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
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

// Llama a updateCart al cargar la página
updateCart();
