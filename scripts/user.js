const usersKey = "users";

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;


  if (!name || !email || !password) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (name.length > 20) {
    alert("El nombre no debe superar los 20 caracteres.");
    return;
  }

  if (password.length < 5) {
    alert("La contraseña debe tener al menos 5 caracteres.");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  const existingUser = existingUsers.find((user) => user.email === email);
  if (existingUser) {
    alert("El usuario ya existe.");
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

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;


  if (!email || !password) {
    alert("Todos los campos son obligatorios.");
    return;
  }

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

    location.reload();
  } else {
    alert("Credenciales incorrectas."); 
  }
});

function updateNavbar() {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const loginNavItem = document.getElementById("login-nav-item");
  const registerNavItem = document.getElementById("register-nav-item");

  if (userData) {

    loginNavItem.style.display = "none";
    registerNavItem.style.display = "none";


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

    loginNavItem.style.display = "block";
    registerNavItem.style.display = "block";
  }
}


updateNavbar();
