document.addEventListener("DOMContentLoaded", () => {
  // Configuración de Chart.js
  const populationCtx = document
    .getElementById("populationChart")
    .getContext("2d");
  const surfaceCtx = document.getElementById("surfaceChart").getContext("2d");

  // Llamada a la API para obtener los datos
  fetch("https://api-colombia.com/api/v1/Department")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extraer nombres y datos
      const labels = data.map((department) => department.name);
      const populationData = data.map((department) => department.population);
      const surfaceData = data.map((department) => department.surface);

      // Configuración y creación del gráfico de población
      const populationConfig = {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Población por Departamento",
              data: populationData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(201, 203, 207)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: "Población por Departamento" },
            legend: { display: false },
          },
        },
      };
      new Chart(populationCtx, populationConfig);

      // Configuración y creación del gráfico de superficie
      const surfaceConfig = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Superficie por Departamento",
              data: surfaceData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: "Superficie por Departamento" },
            legend: { display: false },
          },
          scales: { y: { beginAtZero: true } },
        },
      };
      new Chart(surfaceCtx, surfaceConfig);
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud fetch:", error);
    });
});
