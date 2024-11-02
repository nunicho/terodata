let cart = [];

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

// Función para actualizar la visualización del carrito
function updateCart() {
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length; // Actualiza el número de artículos en el carrito

  let cartContent = document.getElementById("cart-content");

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>El carrito está vacío.</p>";
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
              ${product.item} - USD ${product.price.toFixed(2)} x ${
              product.quantity
            }
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
}
