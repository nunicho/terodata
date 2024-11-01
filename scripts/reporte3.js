// Función para generar un color aleatorio en formato RGBA
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.5; // Transparencia (0.0 a 1.0)
  return {
    background: `rgba(${r}, ${g}, ${b}, ${a})`,
    border: `rgba(${r}, ${g}, ${b}, 1)`,
  };
}

// Función para cargar los datos desde el archivo JSON
async function loadDogData() {
  const response = await fetch("../data/datosReporte3.json"); // Reemplaza con la ruta a tu archivo JSON
  const data = await response.json();
  return data.perros; // Devuelve la lista de perros
}

// Función para crear el gráfico de burbujas
function createBubbleChart(dogs) {
  const ctx = document.getElementById("bubbleChart").getContext("2d");

  const bubbleData = {
    datasets: dogs.map((dog) => {
      const color = getRandomColor(); // Obtener un color aleatorio para cada perro
      return {
        label: dog.nombre, // Etiqueta del conjunto de datos
        data: [
          {
            x: dog.estaturaPromedio, // Eje X: estatura promedio
            y: dog.esperanzaVida, // Eje Y: esperanza de vida
            r: dog.pesoPromedio, // Tamaño de la burbuja basado en el peso promedio
            nombre: dog.nombre, // Agregamos el nombre aquí para accederlo en la tooltip
          },
        ],
        backgroundColor: color.background, // Color de fondo de la burbuja
        borderColor: color.border, // Color del borde de la burbuja
        borderWidth: 1,
      };
    }),
  };

  const bubbleChart = new Chart(ctx, {
    type: "bubble",
    data: bubbleData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Estatura Promedio (cm)", // Cambiar etiqueta del eje X
          },
          min: 0,
          max: 100, // Ajusta según tus datos
        },
        y: {
          title: {
            display: true,
            text: "Esperanza de Vida (años)", // Cambiar etiqueta del eje Y
          },
          min: 0,
          max: 20, // Ajusta según tus datos
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const dog = tooltipItem.raw; // Accedemos a los datos directamente
              return [
                `Nombre: ${dog.nombre}`, // Accedemos al nombre desde los datos
                `Estatura: ${dog.x} cm`, // Usamos 'dog.x' para la estatura
                `Esperanza de Vida: ${dog.y} años`, // Usamos 'dog.y' para la esperanza de vida
                `Peso: ${dog.r} kg`, // Usamos 'dog.r' para el peso
              ];
            },
          },
        },
      },
    },
  });
}

// Cargar los datos y crear el gráfico
loadDogData().then((dogs) => createBubbleChart(dogs));
