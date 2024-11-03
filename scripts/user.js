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
  const loginNavItem = document.getElementById("login-nav-item");
  const registerNavItem = document.getElementById("register-nav-item");

  if (userData) {
    // Si el usuario está logueado, ocultar los elementos de inicio de sesión y registro
    loginNavItem.style.display = "none";
    registerNavItem.style.display = "none";

    // Mostrar bienvenida y cerrar sesión
    const welcomeItem = document.createElement("li");
    welcomeItem.className = "nav-item";
    welcomeItem.innerHTML = `<span class="nav-link">Bienvenido, ${userData.name}</span>`;

    const logoutItem = document.createElement("li");
    logoutItem.className = "nav-item";
    logoutItem.innerHTML = `<a class="nav-link" href="#" id="logout">Cerrar Sesión</a>`;

    const navbarNav = document.getElementById("navbarNav").querySelector("ul");
    navbarNav.appendChild(welcomeItem);
    navbarNav.appendChild(logoutItem);

    logoutItem.addEventListener("click", () => {
      localStorage.removeItem("user-login");
      updateNavbar();
      location.reload();
    });
  } else {
    // Si el usuario no está logueado, asegurarse de que los elementos de inicio de sesión y registro estén visibles
    loginNavItem.style.display = "block";
    registerNavItem.style.display = "block";
  }
}

// Inicializar el navbar al cargar la página
updateNavbar();
