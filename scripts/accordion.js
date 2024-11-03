document.addEventListener("DOMContentLoaded", function () {
  const accordionContainer = document.querySelector("#accordion-container");

  const accordionHTML = `
    <div class="accordion" id="accordionServicios">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Tableros geopolíticos
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionServicios"
        >
          <div class="accordion-body">
            <a href="./pages/reporte1.html">Ver Reporte Geopolítico</a>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Tableros de salud
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionServicios"
        >
          <div class="accordion-body">
            <a href="./pages/reporte2.html">Ver Reporte de Salud</a>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Tableros educativos
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionServicios"
        >
          <div class="accordion-body">
            <a href="./pages/reporte3.html">Ver Reporte Educativo</a>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Tableros científicos
          </button>
        </h2>
        <div
          id="collapseFour"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionServicios"
        >
          <div class="accordion-body">
            <a href="./pages/reporte4.html">Ver Reporte Científico</a>
          </div>
        </div>
      </div>
    </div>
  `;

  if (accordionContainer) {
    accordionContainer.innerHTML = accordionHTML;
  } else {
    console.error("No se encontró el contenedor del acordeón.");
  }
});
