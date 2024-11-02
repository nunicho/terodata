    ///////////////////////    MOSTRAR INFORME EN PANTALLA  //////////////////////////////

    function mostrarReporte() {
    const reporte = JSON.parse(localStorage.getItem("reporte-ratios")) || [];
    const contenedor = document.getElementById("reporte-cards");

    contenedor.innerHTML = "";


    if (reporte.length === 0) {
        contenedor.innerHTML = "<p>No hay ratios agregados al reporte.</p>";
        return;
    }

    reporte.forEach((ratio) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h3>${ratio.nombre}</h3>
        <p>Valor: ${ratio.valor}</p>
        `;
        contenedor.appendChild(card);
    });
    }
    
    function mostrarDatosEmpresa() {
      const empresaGuardada = JSON.parse(localStorage.getItem("empresa"));

      if (!empresaGuardada) {
        return;
      }

      const empresaInfo = document.createElement("div");
      empresaInfo.classList.add("empresa-info");

      empresaInfo.innerHTML = `
        <h2>Datos de la Empresa</h2>
        <p><strong>Nombre de la Empresa:</strong> ${empresaGuardada.nombre}</p>
        <p><strong>Actividad:</strong> ${empresaGuardada.actividad}</p>
        <p><strong>Ubicación:</strong> ${empresaGuardada.ubicacion}</p>
    `;

      // Cambia el lugar donde se inserta la info de la empresa
      const contenedor = document.getElementById("reporte-cards").parentElement; // Obtenemos el padre de 'reporte-cards'

      contenedor.insertBefore(
        empresaInfo,
        document.getElementById("reporte-cards")
      );
    }

    
    function mostrarFechaReporte() {
    const fechaActual = new Date(); 


    const opciones = { year: "numeric", month: "long", day: "numeric" };
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", opciones);

    
    document.getElementById(
        "fecha-reporte"
    ).textContent = `Fecha del Reporte: ${fechaFormateada}`;
    }

    window.onload = function () {
    mostrarDatosEmpresa();
    mostrarReporte();
    mostrarFechaReporte(); 
    };
    