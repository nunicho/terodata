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
    if (!matchedUser.cart) {
      matchedUser.cart = [];
    }

    const existingProduct = matchedUser.cart.find(
      (item) => item.name === productName
    );

    if (existingProduct) {
      existingProduct.quantity += 1; 
      alert(`Se ha incrementado la cantidad de ${productName}.`); 
    } else {
      matchedUser.cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
      }); 
      alert(`Producto agregado al carrito: ${productName}`); 
    }

    localStorage.setItem("users", JSON.stringify(existingUsers)); 

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


function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const checkoutButton = document.getElementById("checkoutButton");
  if (!cartItemsContainer) return; 

  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  
  cartItemsContainer.innerHTML = "";

  if (userData) {
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (matchedUser && matchedUser.cart) {
      if (matchedUser.cart.length === 0) {
        cartItemsContainer.innerText = "El carrito está vacío.";
        checkoutButton.classList.add("d-none"); 
      } else {
        matchedUser.cart.forEach((item, index) => {
          
          const itemElement = document.createElement("div");
          itemElement.classList.add("cart-item");
          itemElement.innerText = `${item.name} - $${item.price} x ${item.quantity}`;

        
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
        checkoutButton.classList.remove("d-none"); 
      }
    } else {
      cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
      checkoutButton.classList.add("d-none"); 
    }
  } else {
    cartItemsContainer.innerText = "Inicia sesión para ver tu carrito.";
    checkoutButton.classList.add("d-none"); 
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
    o
      matchedUser.cart = [];
   
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  }


  updateCartDisplay();
  updateCartCount();
}


updateCartCount();
updateCartDisplay();

// Inicializar la visualización del carrito y el conteo al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateCartCount(); 
  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    alert("¡Gracias por tu compra!"); 
    clearCart(); 
  });
});
