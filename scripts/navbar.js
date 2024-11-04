function createNavbar() {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="index.html">Terodata</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#ejemplo">Ejemplos</a></li>
          <li class="nav-item"><a class="nav-link" href="#testimonio">Testimonios</a></li>
          <li class="nav-item"><a class="nav-link" href="#shop">Shop</a></li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal" id="cart-link">
              <i class="bi bi-cart"></i>
              <span id="cart-count" class="badge bg-secondary">0</span>
            </a>
          </li>
          <li class="nav-item" id="login-nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>
          </li>
          <li class="nav-item" id="register-nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Registrarse</a>
          </li>
        </ul>
      </div>
    </nav>
  `;

  
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);
}

function smoothScroll() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`No se encontró el elemento con el ID: ${targetId}`);
      }
    });
  });
}

// Llamar a las funciones
createNavbar();
smoothScroll();