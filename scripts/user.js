// Almacena los usuarios en el localStorage
const usersKey = "users"; // Clave para localStorage

// Registro de usuario
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Obtener usuarios existentes del localStorage
  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  // Verificar si el usuario ya existe
  const existingUser = existingUsers.find((user) => user.email === email);
  if (existingUser) {
    document.getElementById("message").innerText = "El usuario ya existe.";
    return;
  }

  // Crear nuevo usuario
  const newUser = { name, email, password };
  existingUsers.push(newUser);

  // Guardar en el localStorage
  localStorage.setItem(usersKey, JSON.stringify(existingUsers));

  document.getElementById("message").innerText =
    "Usuario registrado exitosamente.";
  e.target.reset();
});

// Iniciar sesión
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Obtener usuarios existentes del localStorage
  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  // Verificar si el usuario existe y la contraseña es correcta
  const user = existingUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("user-login", user.name); // Almacenar el nombre de usuario en localStorage
    document.getElementById("message").innerText = "Inicio de sesión exitoso.";
    updateNavbar(); // Actualizar el navbar
    // Aquí podrías redirigir a otra página o cambiar el estado de la aplicación
  } else {
    document.getElementById("message").innerText = "Credenciales incorrectas.";
  }
});

// Función para actualizar el navbar
function updateNavbar() {
  const userName = localStorage.getItem("user-login");
  const navbarNav = document.getElementById("navbarNav"); // Asegúrate de que este ID es correcto

  if (userName) {
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
          <span class="nav-link">Bienvenido, ${userName}</span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="logout">Cerrar Sesión</a>
        </li>
      </ul>
    `;
    // Añadir evento de cerrar sesión
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("user-login"); // Eliminar la clave del usuario logueado
      updateNavbar(); // Volver a cargar el navbar
    });
  } else {
    // Si no hay usuario logueado, mostrar las opciones de inicio de sesión y registro
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

// Llamar a updateNavbar al cargar la página para mostrar el estado correcto
updateNavbar();
