fetch("../data/reporte2.json")
  .then((response) => response.json())
  .then((data) => {
    const provincias = data.provincias;
    const nombres = provincias.map((p) => p.nombre);
    const poblaciones = provincias.map((p) => p.poblacion);

    const ctx = document.getElementById("myChart").getContext("2d");

    // Datos iniciales para el gráfico
    const chartData = {
      labels: nombres,
      datasets: [
        {
          label: "Población",
          data: poblaciones,
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo
          borderColor: "rgba(75, 192, 192, 1)", // Color del borde
          borderWidth: 1, // Ancho del borde
          borderRadius: 30,
          hoverBackgroundColor: "rgba(235, 172, 220, 1)", // Color al pasar el mouse
          hoverBorderColor: "rgba(200, 140, 190, 1)", // Color del borde al pasar el mouse
        },
      ],
    };

    const config = {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Población por Provincia",
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false, // Para evitar que se salten etiquetas
              maxRotation: 90, // Rotar hasta 90 grados
              minRotation: 90, // Rotar mínimamente a 90 grados
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    // Crear botones dinámicamente
    const buttonsContainer = document.getElementById("buttons");
    const selectedProvincias = new Set(); // Usar un Set para almacenar provincias seleccionadas

    nombres.forEach((nombre, index) => {
      const button = document.createElement("button");
      button.innerText = nombre;
      button.onclick = () => {
        // Alternar la selección de la provincia
        if (selectedProvincias.has(nombre)) {
          // Si ya está seleccionada, eliminarla
          selectedProvincias.delete(nombre);
          button.classList.remove("active"); // Quitar el estilo activo
        } else {
          // Si no está seleccionada, agregarla
          selectedProvincias.add(nombre);
          button.classList.add("active"); // Agregar el estilo activo
        }

        // Actualizar los datos del gráfico
        updateChart(myChart, nombres, poblaciones, selectedProvincias);
      };
      buttonsContainer.appendChild(button);
    });

    // Función para actualizar el gráfico
    function updateChart(chart, labels, data, selected) {
      if (selected.size === 0) {
        // Si no hay provincias seleccionadas, mostrar todos los datos
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
      } else {
        // Filtrar los datos según las provincias seleccionadas
        const filteredData = data.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredLabels = labels.filter((label) => selected.has(label));

        chart.data.labels = filteredLabels;
        chart.data.datasets[0].data = filteredData;
      }

      chart.update(); // Actualizar el gráfico
    }
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));
