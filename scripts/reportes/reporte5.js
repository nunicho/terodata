
document.addEventListener("DOMContentLoaded", () => {

  fetch("../data/datosReporte5.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la carga de datos: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
 
      if (!data.jugadores || data.jugadores.length < 2) {
        throw new Error(
          "No se encontraron suficientes jugadores en los datos."
        );
      }

      
      const jugador1 = data.jugadores[0]; 
      const jugador2 = data.jugadores[1]; 

 
      const years = Object.keys(jugador1.goles);
      const golesMessi = Object.values(jugador1.goles);
      const golesCristiano = Object.values(jugador2.goles);
      const asistenciasMessi = Object.values(jugador1.asistencias);
      const asistenciasCristiano = Object.values(jugador2.asistencias);
      const valorMercadoMessi = Object.values(jugador1.valor_mercado);
      const valorMercadoCristiano = Object.values(jugador2.valor_mercado);

  
      const ctx = document.getElementById("golesChart").getContext("2d");

   
      const chart = new Chart(ctx, {
        type: "line", 
        data: {
          labels: years,
          datasets: [
            {
              label: "Goles de Messi", 
              data: golesMessi, 
              borderColor: "rgba(75, 192, 192, 1)", 
              borderWidth: 2, 
              fill: false, 
            },
            {
              label: "Goles de Cristiano Ronaldo", 
              data: golesCristiano, 
              borderColor: "rgba(255, 99, 132, 1)", 
              borderWidth: 2, 
              fill: false,
            },
            {
              label: "Asistencias de Messi", 
              data: asistenciasMessi, 
              borderColor: "rgba(54, 162, 235, 1)", 
              borderWidth: 2,
              fill: false, 
            },
            {
              label: "Asistencias de Cristiano Ronaldo", 
              data: asistenciasCristiano, 
              borderColor: "rgba(255, 206, 86, 1)", 
              borderWidth: 2,
              fill: false, 
            },
            {
              label: "Valor de Mercado de Messi (millones)", 
              data: valorMercadoMessi, 
              borderColor: "rgba(153, 102, 255, 1)", 
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Valor de Mercado de Cristiano Ronaldo (millones)",
              data: valorMercadoCristiano, 
              borderColor: "rgba(255, 159, 64, 1)", 
              borderWidth: 2,
              fill: false, 
            },
          ],
        },
        options: {
          responsive: true, 
          scales: {
            y: {
              beginAtZero: true, 
            },
          },
          plugins: {
            legend: {
              display: true, 
              position: "top", 
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error al cargar el gráfico:", error); 
    });
});



fetch("../data/datosReporte5.json")
  .then((response) => response.json())
  .then((data) => {
   
    const jugadores = data.jugadores;
    const titulos = Object.keys(jugadores[0].titulos); 
    const messiTitulos = titulos.map((titulo) => jugadores[0].titulos[titulo]); 
    const ronaldoTitulos = titulos.map(
      (titulo) => jugadores[1].titulos[titulo]
    ); 


    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar", 
      data: {
        labels: titulos,
        datasets: [
          {
            label: "Lionel Messi",
            data: messiTitulos,
            backgroundColor: "rgba(255, 99, 132, 0.6)", 
            borderColor: "rgba(255, 99, 132, 1)", 
            borderWidth: 1,
          },
          {
            label: "Cristiano Ronaldo",
            data: ronaldoTitulos,
            backgroundColor: "rgba(54, 162, 235, 0.6)", 
            borderColor: "rgba(54, 162, 235, 1)", 
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y", 
        responsive: true,
        scales: {
          x: {
            beginAtZero: true, 
            title: {
              display: true,
              text: "Número de Títulos", 
            },
          },
          y: {
            title: {
              display: true,
              text: "Categorías de Títulos", 
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
  });


  document.addEventListener("DOMContentLoaded", function () {
  
    function cargarGraficoPremios() {
      fetch("../data/datosReporte5.json")
        .then((response) => response.json())
        .then((data) => {
        
          const jugadores = data.jugadores;
          const premios = Object.keys(jugadores[0].premios);
          const messiPremios = premios.map(
            (premio) => jugadores[0].premios[premio]
          ); 
          const ronaldoPremios = premios.map(
            (premio) => jugadores[1].premios[premio]
          ); 

    
          const ctxPremios = document
            .getElementById("myChartAwards")
            .getContext("2d");
          const chartPremios = new Chart(ctxPremios, {
            type: "bar", 
            data: {
              labels: premios, 
              datasets: [
                {
                  label: "Lionel Messi",
                  data: messiPremios,
                  backgroundColor: "rgba(255, 99, 132, 0.6)", 
                  borderColor: "rgba(255, 99, 132, 1)", 
                  borderWidth: 1,
                },
                {
                  label: "Cristiano Ronaldo",
                  data: ronaldoPremios,
                  backgroundColor: "rgba(54, 162, 235, 0.6)", 
                  borderColor: "rgba(54, 162, 235, 1)", 
                  borderWidth: 1,
                },
              ],
            },
            options: {
              indexAxis: "y", 
              responsive: true,
              scales: {
                x: {
                  beginAtZero: true, 
                  title: {
                    display: true,
                    text: "Número de Premios", 
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Categorías de Premios", 
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            },
          });
        })
        .catch((error) => {
          console.error("Error al cargar los datos de premios:", error);
        });
    }

 
    function cargarGraficoTarjetas() {
      fetch("../data/datosReporte5.json")
        .then((response) => response.json())
        .then((data) => {
       
          const jugadores = data.jugadores;
          const tarjetas = ["amarillas", "rojas"]; 
          const messiTarjetas = tarjetas.map(
            (tipo) => jugadores[0].tarjetas[tipo]
          ); 
          const ronaldoTarjetas = tarjetas.map(
            (tipo) => jugadores[1].tarjetas[tipo]
          ); 

     
          const ctxTarjetas = document
            .getElementById("myChartCards")
            .getContext("2d");
          const chartTarjetas = new Chart(ctxTarjetas, {
            type: "bar",
            data: {
              labels: tarjetas, 
              datasets: [
                {
                  label: "Lionel Messi",
                  data: messiTarjetas,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Cristiano Ronaldo",
                  data: ronaldoTarjetas,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)", 
                  borderWidth: 1,
                },
              ],
            },
            options: {
              indexAxis: "y", 
              responsive: true,
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Número de Tarjetas", 
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Tipos de Tarjetas", 
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            },
          });
        })
        .catch((error) => {
          console.error("Error al cargar los datos de tarjetas:", error);
        });
    }

   
    cargarGraficoPremios();
    cargarGraficoTarjetas();
  });