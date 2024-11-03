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
    // Asegurarse de que el carrito se inicialice en caso de que no exista
    if (!matchedUser.cart) {
      matchedUser.cart = [];
    }

    const existingProduct = matchedUser.cart.find(
      (item) => item.name === productName
    );

    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa la cantidad si ya existe
      alert(`Se ha incrementado la cantidad de ${productName}.`); // Alert de producto incrementado
    } else {
      matchedUser.cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
      }); // Agrega un nuevo producto al carrito
      alert(`Producto agregado al carrito: ${productName}`); // Alert de producto agregado
    }

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
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return; // Verificar que el elemento existe

  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      cartCount.innerText = matchedUser.cart.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Mostrar la cantidad total de artículos en el carrito
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
  const checkoutButton = document.getElementById("checkoutButton");
  if (!cartItemsContainer) return; // Verificar que el contenedor existe

  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Limpiar el contenedor antes de agregar elementos nuevos
  cartItemsContainer.innerHTML = "";

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      if (matchedUser.cart.length === 0) {
        cartItemsContainer.innerText = "El carrito está vacío.";
        checkoutButton.classList.add("d-none"); // Ocultar el botón si el carrito está vacío
      } else {
        matchedUser.cart.forEach((item, index) => {
          // Crear un div para el elemento del carrito
          const itemElement = document.createElement("div");
          itemElement.classList.add("cart-item");
          itemElement.innerText = `${item.name} - $${item.price} x ${item.quantity}`;

          // Crear botones de "Aumentar" y "Disminuir"
          const increaseButton = document.createElement("button");
          increaseButton.innerText = "+";
          increaseButton.classList.add("increase-button");
          increaseButton.addEventListener("click", () => {
            const updatedCart = matchedUser.cart.map((cartItem, cartIndex) => {
              if (cartIndex === index) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }; // Crea una copia actualizada
              }
              return cartItem; // Devuelve el cartItem original
            });

            matchedUser.cart = updatedCart; // Actualiza el carrito
            localStorage.setItem("users", JSON.stringify(existingUsers)); // Guardar cambios
            updateCartDisplay(); // Actualiza la visualización
            updateCartCount(); // Actualiza el conteo
          });

          const decreaseButton = document.createElement("button");
          decreaseButton.innerText = "-";
          decreaseButton.classList.add("decrease-button");
          decreaseButton.disabled = item.quantity === 1; // Desactiva si es 1
          decreaseButton.addEventListener("click", () => {
            const updatedCart = matchedUser.cart
              .map((cartItem, cartIndex) => {
                if (cartIndex === index) {
                  if (cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 }; // Crea una copia actualizada
                  } else {
                    removeCartItem(index); // Elimina el producto si la cantidad es 1
                    return null; // Marca como null para eliminar después
                  }
                }
                return cartItem; // Devuelve el cartItem original
              })
              .filter((item) => item !== null); // Filtra los nulos

            matchedUser.cart = updatedCart; // Actualiza el carrito
            localStorage.setItem("users", JSON.stringify(existingUsers)); // Guardar cambios
            updateCartDisplay(); // Actualiza la visualización
            updateCartCount(); // Actualiza el conteo
          });

          // Crear un botón de "Eliminar"
          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Eliminar";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", () => {
            removeCartItem(index);
          });

          // Agregar los botones al elemento del carrito
          itemElement.appendChild(increaseButton);
          itemElement.appendChild(decreaseButton);
          itemElement.appendChild(deleteButton);
          cartItemsContainer.appendChild(itemElement);
        });
        checkoutButton.classList.remove("d-none"); // Mostrar el botón si hay productos en el carrito
      }
    } else {
      cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
      checkoutButton.classList.add("d-none"); // Ocultar el botón si no hay usuario logueado
    }
  } else {
    cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
    checkoutButton.classList.add("d-none"); // Ocultar el botón si no hay usuario logueado
  }
}

// Función para eliminar un producto del carrito
function removeCartItem(index) {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      // Eliminar el producto del carrito basado en el índice
      matchedUser.cart.splice(index, 1);

      // Guardar los cambios en localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Actualizar la visualización del carrito y el conteo
      updateCartDisplay();
      updateCartCount();
    }
  }
}

// Función para vaciar el carrito
function clearCart() {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser) {
      // Limpiar el carrito del usuario
      matchedUser.cart = [];
      // Actualizar localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  }

  // Actualizar la visualización del carrito y el conteo después de vaciarlo
  updateCartDisplay();
  updateCartCount();
}

// Inicializar el conteo del carrito al cargar la página
updateCartCount();
updateCartDisplay();

// Inicializar la visualización del carrito y el conteo al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateCartCount(); // Asegúrate de llamar a esta función aquí también

  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    alert("¡Gracias por tu compra!"); // Mensaje de agradecimiento al realizar la compra
    clearCart(); // Vaciar el carrito después de la compra
  });
});
