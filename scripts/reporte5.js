// reporte5.js
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos desde datosReporte5.json
  fetch("../data/datosReporte5.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la carga de datos: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Verificar si hay jugadores en los datos
      if (!data.jugadores || data.jugadores.length < 2) {
        throw new Error(
          "No se encontraron suficientes jugadores en los datos."
        );
      }

      // Extraer los años y las estadísticas para ambos jugadores
      const jugador1 = data.jugadores[0]; // Messi
      const jugador2 = data.jugadores[1]; // Cristiano Ronaldo

      // Asumir que ambos jugadores tienen la misma serie de años
      const years = Object.keys(jugador1.goles);
      const golesMessi = Object.values(jugador1.goles);
      const golesCristiano = Object.values(jugador2.goles);
      const asistenciasMessi = Object.values(jugador1.asistencias);
      const asistenciasCristiano = Object.values(jugador2.asistencias);
      const valorMercadoMessi = Object.values(jugador1.valor_mercado);
      const valorMercadoCristiano = Object.values(jugador2.valor_mercado);

      // Obtener el contexto del canvas para el gráfico
      const ctx = document.getElementById("golesChart").getContext("2d");

      // Crear el gráfico de líneas
      const chart = new Chart(ctx, {
        type: "line", // Tipo de gráfico
        data: {
          labels: years, // Etiquetas del eje X
          datasets: [
            {
              label: "Goles de Messi", // Leyenda para Messi
              data: golesMessi, // Datos de Messi
              borderColor: "rgba(75, 192, 192, 1)", // Color de la línea de Messi
              borderWidth: 2, // Ancho de la línea de Messi
              fill: false, // No llenar el área bajo la línea
            },
            {
              label: "Goles de Cristiano Ronaldo", // Leyenda para Cristiano Ronaldo
              data: golesCristiano, // Datos de Cristiano Ronaldo
              borderColor: "rgba(255, 99, 132, 1)", // Color de la línea de Cristiano Ronaldo
              borderWidth: 2, // Ancho de la línea de Cristiano Ronaldo
              fill: false, // No llenar el área bajo la línea
            },
            {
              label: "Asistencias de Messi", // Leyenda para asistencias de Messi
              data: asistenciasMessi, // Datos de asistencias de Messi
              borderColor: "rgba(54, 162, 235, 1)", // Color de la línea de asistencias de Messi
              borderWidth: 2,
              fill: false, // No llenar el área bajo la línea
            },
            {
              label: "Asistencias de Cristiano Ronaldo", // Leyenda para asistencias de Cristiano Ronaldo
              data: asistenciasCristiano, // Datos de asistencias de Cristiano Ronaldo
              borderColor: "rgba(255, 206, 86, 1)", // Color de la línea de asistencias de Cristiano Ronaldo
              borderWidth: 2,
              fill: false, // No llenar el área bajo la línea
            },
            {
              label: "Valor de Mercado de Messi (millones)", // Leyenda para valor de mercado de Messi
              data: valorMercadoMessi, // Datos de valor de mercado de Messi
              borderColor: "rgba(153, 102, 255, 1)", // Color de la línea de valor de mercado de Messi
              borderWidth: 2,
              fill: false, // No llenar el área bajo la línea
            },
            {
              label: "Valor de Mercado de Cristiano Ronaldo (millones)", // Leyenda para valor de mercado de Cristiano Ronaldo
              data: valorMercadoCristiano, // Datos de valor de mercado de Cristiano Ronaldo
              borderColor: "rgba(255, 159, 64, 1)", // Color de la línea de valor de mercado de Cristiano Ronaldo
              borderWidth: 2,
              fill: false, // No llenar el área bajo la línea
            },
          ],
        },
        options: {
          responsive: true, // Hacer el gráfico responsivo
          scales: {
            y: {
              beginAtZero: true, // Comenzar el eje Y en 0
            },
          },
          plugins: {
            legend: {
              display: true, // Mostrar leyenda
              position: "top", // Posición de la leyenda
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error al cargar el gráfico:", error); // Manejo de errores
    });
});
