document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.className = "custom-footer bg-light text-center text-lg-start border-top";
  footer.style.padding = "10px 0";  
  footer.innerHTML = `
      <div class="container text-center">
        <!-- Section: Social media -->
        <section class="mb-2">
          <a href="https://facebook.com" class="btn btn-outline-primary btn-sm mx-1" style="border-radius: 50%;" role="button" target="_blank"><i class="bi bi-facebook"></i></a>
          <a href="https://twitter.com" class="btn btn-outline-primary btn-sm mx-1" style="border-radius: 50%;" role="button" target="_blank"><i class="bi bi-twitter"></i></a>
          <a href="https://instagram.com" class="btn btn-outline-primary btn-sm mx-1" style="border-radius: 50%;" role="button" target="_blank"><i class="bi bi-instagram"></i></a>
          <a href="https://linkedin.com" class="btn btn-outline-primary btn-sm mx-1" style="border-radius: 50%;" role="button" target="_blank"><i class="bi bi-linkedin"></i></a>
        </section>
        <!-- Section: Links -->
        <section>
          <ul class="list-inline mb-2">
            <li class="list-inline-item"><a href="#inicio" class="text-dark text-decoration-none small">Inicio</a></li>
            <li class="list-inline-item"><a href="#ejemplo" class="text-dark text-decoration-none small">Ejemplos</a></li>
            <li class="list-inline-item"><a href="#testimonio" class="text-dark text-decoration-none small">Testimonios</a></li>
            <li class="list-inline-item"><a href="#shop" class="text-dark text-decoration-none small">Shop</a></li>
          </ul>
        </section>
      </div>
      <!-- Copyright -->
      <div class="text-center p-1" style="background-color: rgba(0, 0, 0, 0.05); font-size: 0.85rem;">
        &copy; 2024 Terodata. Todos los derechos reservados.  <img src="./assets/logo.png" alt="Logo Terodata" style="height: 40px;">
      </div>
    `;
  document.body.appendChild(footer);
});
