const usersKey = "users";

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  const existingUser = existingUsers.find((user) => user.email === email);
  if (existingUser) {
    document.getElementById("message").innerText = "El usuario ya existe.";
    return;
  }

  const newUser = { name, email, password, cart: [] };
  existingUsers.push(newUser);

  localStorage.setItem(usersKey, JSON.stringify(existingUsers));

  document.getElementById("message").innerText =
    "Usuario registrado exitosamente.";
  e.target.reset();
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  const user = existingUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem(
      "user-login",
      JSON.stringify({
        name: user.name,
        email: user.email,
        cart: user.cart,
      })
    );
    document.getElementById("message").innerText = "Inicio de sesión exitoso.";
    updateNavbar();

    // Recargar la página para actualizar el contenido del carrito
    location.reload();
  } else {
    document.getElementById("message").innerText = "Credenciales incorrectas.";
  }
});

function updateNavbar() {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const navbarNav = document.getElementById("navbarNav");

  if (userData) {
    navbarNav.innerHTML = `
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <a class="nav-link" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#testimonios">Testimonios</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#ejemplos">Ejemplos</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#shop">Shop</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal" id="cart-link">
                <i class="bi bi-cart"></i>
                <span id="cart-count" class="badge bg-secondary">${userData.cart.length}</span>
            </a>
            </li>
            <li class="nav-item">
            <span class="nav-link">Bienvenido, ${userData.name}</span>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" id="logout">Cerrar Sesión</a>
            </li>
        </ul>
        `;

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("user-login");
      updateNavbar();
      location.reload();
    });
  } else {
    navbarNav.innerHTML = `
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <a class="nav-link" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#testimonios">Testimonios</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#ejemplos">Ejemplos</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#shop">Shop</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal" id="cart-link">
                <i class="bi bi-cart"></i>
                <span id="cart-count" class="badge bg-secondary">0</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Registrarse</a>
            </li>
        </ul>
        `;
  }
}

// Inicializar el navbar al cargar la página
updateNavbar();
