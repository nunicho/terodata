document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector("#carousel"); // Usa # para seleccionar por ID

  const carouselHTML = `
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="./assets/kpi.jpeg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="./assets/presentacion.jpeg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="./assets/mesa.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
    </div>
  `;

  if (carouselContainer) {
    carouselContainer.innerHTML = carouselHTML;
  } else {
    console.error("No se encontró el contenedor del carousel.");
  }
});
