document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img src="../assets/logo.png" alt="Logo Terodata" style="height: 40px;">
      <a class="navbar-brand" href="../index.html">
        Terodata
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="../index.html">
              Inicio
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `;

  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;
  }
});
