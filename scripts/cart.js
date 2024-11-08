const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (!userData) {    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes iniciar sesión para agregar productos al carrito.",      
    });
    return;
  }

  const matchedUser = existingUsers.find(
    (user) => user.email === userData.email
  );

  if (matchedUser) {
    if (!matchedUser.cart) {
      matchedUser.cart = [];
    }

    const existingProduct = matchedUser.cart.find(
      (item) => item.name === productName
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      Swal.fire(`Se ha incrementado la cantidad de ${productName}.`);
    } else {
      matchedUser.cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
      });
      Swal.fire(`Producto agregado al carrito: ${productName}`);
    }

    localStorage.setItem("users", JSON.stringify(existingUsers));
    updateCartCount();
    updateCartDisplay();
  } else {
      Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se encontró el usuario asociado al email logueado."    
    });
  }
}

// Función para actualizar el conteo de productos en el carrito
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

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
      );
    } else {
      cartCount.innerText = 0;
    }
  } else {
    cartCount.innerText = 0;
  }
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const totalPriceContainer = document.getElementById("totalPrice");
  const checkoutButton = document.getElementById("checkoutButton");
  if (!cartItemsContainer) return;

  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      if (matchedUser.cart.length === 0) {
        cartItemsContainer.innerText = "El carrito está vacío.";
        checkoutButton.classList.add("d-none");
        totalPriceContainer.innerText = "0.00";
      } else {
        matchedUser.cart.forEach((item, index) => {
          const itemElement = document.createElement("div");
          itemElement.classList.add("cart-item");
          itemElement.innerText = `${item.name} - $${item.price} x ${item.quantity}`;

          // Calcular el total del artículo
          totalPrice += item.price * item.quantity;

          const increaseButton = document.createElement("button");
          increaseButton.innerText = "+";
          increaseButton.classList.add("increase-button");
          increaseButton.addEventListener("click", () => {
            const updatedCart = matchedUser.cart.map((cartItem, cartIndex) => {
              if (cartIndex === index) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });

            matchedUser.cart = updatedCart;
            localStorage.setItem("users", JSON.stringify(existingUsers));
            updateCartDisplay();
            updateCartCount();
          });

          const decreaseButton = document.createElement("button");
          decreaseButton.innerText = "-";
          decreaseButton.classList.add("decrease-button");
          decreaseButton.disabled = item.quantity === 1;
          decreaseButton.addEventListener("click", () => {
            const updatedCart = matchedUser.cart
              .map((cartItem, cartIndex) => {
                if (cartIndex === index) {
                  if (cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 };
                  } else {
                    removeCartItem(index);
                    return null;
                  }
                }
                return cartItem;
              })
              .filter((item) => item !== null);

            matchedUser.cart = updatedCart;
            localStorage.setItem("users", JSON.stringify(existingUsers));
            updateCartDisplay();
            updateCartCount();
          });

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Eliminar";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", () => {
            removeCartItem(index);
          });

          itemElement.appendChild(increaseButton);
          itemElement.appendChild(decreaseButton);
          itemElement.appendChild(deleteButton);
          cartItemsContainer.appendChild(itemElement);
        });
        totalPriceContainer.innerText = totalPrice.toFixed(2);
        checkoutButton.classList.remove("d-none");
      }
    } else {
      cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
      checkoutButton.classList.add("d-none");
      totalPriceContainer.innerText = "0.00";
    }
  } else {
    cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
    checkoutButton.classList.add("d-none");
    totalPriceContainer.innerText = "0.00";
  }
}

// Función para eliminar un artículo del carrito
function removeCartItem(index) {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      matchedUser.cart.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(existingUsers));
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
      matchedUser.cart = [];
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  }

  updateCartDisplay();
  updateCartCount();
}

// Inicializar el conteo y la visualización del carrito al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateCartCount();

  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    Swal.fire("¡Gracias por tu compra!");
    clearCart();
  });
});
