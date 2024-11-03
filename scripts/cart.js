const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar si el usuario está autenticado
  if (!userData) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }

  // Buscar coincidencia de email en la lista de usuarios existentes
  const matchedUser = existingUsers.find(
    (user) => user.email === userData.email
  );

  // Si hay una coincidencia, agregar el producto al carrito de ese usuario
  if (matchedUser) {
    const cartItem = { name: productName, price: productPrice };

    // Asegurarse de que el carrito se inicialice en caso de que no exista
    if (!matchedUser.cart) {
      matchedUser.cart = [];
    }

    // Agregar el producto al carrito del usuario
    matchedUser.cart.push(cartItem);
    localStorage.setItem("users", JSON.stringify(existingUsers)); // Actualizar la lista de usuarios en localStorage

    // Actualizar el conteo y la visualización del carrito después de agregar un producto
    updateCartCount();
    updateCartDisplay();
  } else {
    alert("No se encontró el usuario asociado al email logueado.");
  }
}

// Función para actualizar el conteo de artículos en el carrito
function updateCartCount() {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const cartCount = document.getElementById("cart-count");
  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      cartCount.innerText = matchedUser.cart.length; // Mostrar la cantidad de artículos en el carrito del usuario
    } else {
      cartCount.innerText = 0; // Si no hay carrito, mostrar 0
    }
  } else {
    cartCount.innerText = 0; // Si no hay usuario logueado, mostrar 0
  }
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const checkoutButton = document.getElementById("checkoutButton"); // Obtener el botón de checkout
  cartItemsContainer.innerHTML = ""; // Limpiar el contenedor

  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );

    if (matchedUser && matchedUser.cart && matchedUser.cart.length > 0) {
      matchedUser.cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerText = `${item.name} - USD ${item.price}`;
        cartItemsContainer.appendChild(itemElement);
      });
      checkoutButton.classList.remove("d-none"); // Mostrar el botón si hay productos en el carrito
    } else {
      cartItemsContainer.innerHTML = "<p>No hay artículos en el carrito.</p>";
      checkoutButton.classList.add("d-none"); // Ocultar el botón si no hay productos
    }
  } else {
    cartItemsContainer.innerHTML = "<p>No hay artículos en el carrito.</p>"; // Mensaje si no hay usuario logueado
    checkoutButton.classList.add("d-none"); // Ocultar el botón si no hay usuario logueado
  }
}

// Función para limpiar el carrito
function clearCart() {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser) {
      matchedUser.cart = []; // Vaciar el carrito del usuario
      localStorage.setItem("users", JSON.stringify(existingUsers)); // Actualizar la lista de usuarios en localStorage
      updateCartDisplay(); // Actualizar la visualización del carrito
    }
  }
}

// Inicializar la visualización del carrito y el conteo al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateCartCount(); // Asegúrate de llamar a esta función aquí también

  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    alert("¡Gracias por tu compra!"); // Mensaje de agradecimiento
    clearCart(); // Limpiar el carrito
    location.reload();
  });
});
