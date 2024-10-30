fetch("../data/reporte2.json")
  .then((response) => response.json())
  .then((data) => {
    const provincias = data.provincias;
    const nombres = provincias.map((p) => p.nombre);
    const poblaciones = provincias.map((p) => p.poblacion);
    const pbi = provincias.map((p) => p.pbi_millones_usd); // Cargar PBI

    const ctxBar = document.getElementById("myChart").getContext("2d");
    const ctxDoughnut = document
      .getElementById("myDoughnutChart")
      .getContext("2d");

    // Datos iniciales para el gráfico de barras
    const chartDataBar = {
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

    // Datos iniciales para el gráfico de doughnut
    const chartDataDoughnut = {
      labels: nombres,
      datasets: [
        {
          label: "PBI en Millones de USD",
          data: pbi,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ], // Colores del gráfico
          hoverBackgroundColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Configuración del gráfico de barras
    const configBar = {
      type: "bar",
      data: chartDataBar,
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

    // Configuración del gráfico de doughnut
    const configDoughnut = {
      type: "doughnut",
      data: chartDataDoughnut,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "PBI por Provincia",
          },
        },
      },
    };

    const myBarChart = new Chart(ctxBar, configBar);
    const myDoughnutChart = new Chart(ctxDoughnut, configDoughnut);

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

        // Actualizar los datos de ambos gráficos
        updateCharts(
          myBarChart,
          myDoughnutChart,
          nombres,
          poblaciones,
          pbi,
          selectedProvincias
        );
      };
      buttonsContainer.appendChild(button);
    });

    // Función para actualizar ambos gráficos
    function updateCharts(
      barChart,
      doughnutChart,
      labels,
      populationData,
      pbiData,
      selected
    ) {
      if (selected.size === 0) {
        // Si no hay provincias seleccionadas, mostrar todos los datos
        barChart.data.labels = labels;
        barChart.data.datasets[0].data = populationData;

        doughnutChart.data.labels = labels;
        doughnutChart.data.datasets[0].data = pbiData;
      } else {
        // Filtrar los datos según las provincias seleccionadas
        const filteredPopulationData = populationData.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredPbiData = pbiData.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredLabels = labels.filter((label) => selected.has(label));

        barChart.data.labels = filteredLabels;
        barChart.data.datasets[0].data = filteredPopulationData;

        doughnutChart.data.labels = filteredLabels;
        doughnutChart.data.datasets[0].data = filteredPbiData;
      }

      // Actualizar ambos gráficos
      barChart.update(); // Actualizar el gráfico de barras
      doughnutChart.update(); // Actualizar el gráfico de doughnut
    }
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));

/*
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

  */
