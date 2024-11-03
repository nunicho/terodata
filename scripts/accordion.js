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
        data-bs-target="#collapseCorporateReports"
        aria-expanded="false"
        aria-controls="collapseCorporateReports"
      >
        Reportes corporativos
        <span class="badge bg-success ms-2">NUEVO</span>
      </button>
    </h2>
    <div
      id="collapseCorporateReports"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionServicios"
    >
      <div class="accordion-body">
        <p>Los reportes corporativos ofrecen una visión integral de la organización, facilitando la toma de decisiones estratégicas y mejorando la eficiencia operativa.</p>
        <a href="./pages/reporte6.html">Ver Ejemplo de Tablero Corporativo</a>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="false"
        aria-controls="collapseOne"
      >
        Tableros geopolíticos
      </button>
    </h2>
    <div
      id="collapseOne"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionServicios"
    >
      <div class="accordion-body">
        <p>Los tableros geopolíticos permiten monitorear tendencias globales, ayudando a anticipar cambios en el entorno internacional y a tomar decisiones informadas.</p>
        <a href="./pages/reporte1.html">Ver Ejemplo de Tablero Geopolítico</a>
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
        Tableros profesionales
      </button>
    </h2>
    <div
      id="collapseTwo"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionServicios"
    >
      <div class="accordion-body">
        <p>Los tableros profesionales brindan datos en tiempo real sobre indicadores que el profesional necesita, lo que permite una respuesta más rápida y efectiva a las necesidades del profesional.</p>
        <a href="./pages/reporte2.html">Ver Ejemplo de Tablero Profesional</a>
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
        <p>Los tableros educativos proporcionan una visión clara del rendimiento académico y permiten identificar áreas de mejora en el proceso educativo.</p>
        <a href="./pages/reporte3.html">Ver Ejemplo de Tablero Educativo</a>
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
        <p>Los tableros científicos facilitan la visualización de datos complejos y fomentan la colaboración entre investigadores al compartir hallazgos de manera efectiva.</p>
        <a href="./pages/reporte4.html">Ver Ejemplo de Tablero Científico</a>
      </div>
    </div>
  </div>

  <!-- Nuevo ítem agregado para Tableros deportivos -->
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseFive"
        aria-expanded="false"
        aria-controls="collapseFive"
      >
        Tableros deportivos
      </button>
    </h2>
    <div
      id="collapseFive"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionServicios"
    >
      <div class="accordion-body">
        <p>Los tableros deportivos ofrecen información en tiempo real sobre estadísticas y desempeño de equipos y jugadores, permitiendo un análisis profundo de cada evento deportivo.</p>
        <a href="./pages/reporte5.html">Ver Ejemplo de Tablero Deportivo</a>
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
