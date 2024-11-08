
fetch("../data/datosReporte1.json")
  .then((response) => response.json())
  .then((data) => {
    const provincias = data.provincias;

    const nombres = provincias.map((p) => p.nombre);
    const poblaciones = provincias.map((p) => p.poblacion);
    const pbi = provincias.map((p) => p.pbi_millones_usd);
    const cantidadMunicipios = provincias.map((p) => p.cantidad_municipios);
    const sectoresEconomicos = provincias.map((p) => p.sectores_economicos);

    const ctxBar = document.getElementById("myChart").getContext("2d");
    const ctxDoughnut = document
      .getElementById("myDoughnutChart")
      .getContext("2d");
    const ctxPolar = document.getElementById("myPolarChart").getContext("2d");

    function displaySectors(sectors) {
      const sectorsContainer = document.getElementById("economic-sectors");
      sectorsContainer.innerHTML = "";

      const titleElement = document.createElement("h6");
      titleElement.innerText =
        "Sectores económicos principales de la región seleccionada";
      sectorsContainer.appendChild(titleElement);

      console.log("Sectores económicos a mostrar:", sectors);

      sectors.forEach((sector) => {
        const sectorElement = document.createElement("div");
        sectorElement.innerText = sector;
        sectorsContainer.appendChild(sectorElement);
      });
    }

    // CONFIG GRAFICO DE BARRAS
    const configBar = {
      type: "bar",
      data: {
        labels: nombres,
        datasets: [
          {
            label: "Población",
            data: poblaciones,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            borderRadius: 30,
            hoverBackgroundColor: "rgba(235, 172, 220, 1)",
            hoverBorderColor: "rgba(200, 140, 190, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Población por Provincia",
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // GRAFICO DOUGHNUT
    const configDoughnut = {
      type: "doughnut",
      data: {
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
            ],
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
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "PBI por Provincia",
          },
        },
      },
    };

    // GRAFICO POLAR
    const configPolar = {
      type: "polarArea",
      data: {
        labels: nombres,
        datasets: [
          {
            label: "Cantidad de Municipios",
            data: cantidadMunicipios,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            hoverBackgroundColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Cantidad de Municipios por Provincia",
          },
        },
      },
    };

    // INICIALIZAR LOS GRAFICOS
    const myBarChart = new Chart(ctxBar, configBar);
    const myDoughnutChart = new Chart(ctxDoughnut, configDoughnut);
    const myPolarChart = new Chart(ctxPolar, configPolar);

    // INSERCIÓN DE BOTONES
    const buttonsContainer = document.getElementById("buttons");
    const selectedProvincias = new Set();

    nombres.forEach((nombre, index) => {
      const button = document.createElement("button");
      button.innerText = nombre;
      button.onclick = () => {
        if (selectedProvincias.has(nombre)) {
          selectedProvincias.delete(nombre);
          button.classList.remove("active"); 
        } else {
          selectedProvincias.add(nombre);
          button.classList.add("active"); 
        }
        updateCharts(
          myBarChart,
          myDoughnutChart,
          myPolarChart,
          nombres,
          poblaciones,
          pbi,
          cantidadMunicipios,
          sectoresEconomicos,
          selectedProvincias
        );
      };
      buttonsContainer.appendChild(button);
    });

    // INICIALIZAR LOS GRÁFICOS
    function updateCharts(
      barChart,
      doughnutChart,
      polarChart,
      labels,
      populationData,
      pbiData,
      municipiosData,
      sectoresData,
      selected
    ) {
   
      if (selected.size === 0) {
    
        barChart.data.labels = labels;
        barChart.data.datasets[0].data = populationData;

        doughnutChart.data.labels = labels;
        doughnutChart.data.datasets[0].data = pbiData;

        polarChart.data.labels = labels;
        polarChart.data.datasets[0].data = municipiosData;

 
        displaySectors([]); 
      } else {
       
        const filteredPopulationData = populationData.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredPbiData = pbiData.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredMunicipiosData = municipiosData.filter((_, index) =>
          selected.has(labels[index])
        );
        const filteredLabels = labels.filter((label) => selected.has(label));
        const filteredSectors = new Set(); 

        filteredLabels.forEach((label) => {
          const index = labels.indexOf(label);
          sectoresData[index].forEach((sector) => filteredSectors.add(sector));
        });

        barChart.data.labels = filteredLabels;
        barChart.data.datasets[0].data = filteredPopulationData;

        doughnutChart.data.labels = filteredLabels;
        doughnutChart.data.datasets[0].data = filteredPbiData;

        polarChart.data.labels = filteredLabels;
        polarChart.data.datasets[0].data = filteredMunicipiosData;

 
        displaySectors(Array.from(filteredSectors)); 
      }

      // ACTUALIZAR LOS GRÁFICOS
      barChart.update();
      doughnutChart.update();
      polarChart.update();
    }
  });
