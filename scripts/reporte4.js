let bubbleChartInstance;
const datasets = []; // Array para almacenar los datasets de planetas seleccionados

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
async function loadPlanetData() {
  try {
    const response = await fetch("../data/datosReporte4.json"); // Reemplaza con la ruta a tu archivo JSON
    if (!response.ok) throw new Error("Error al cargar los datos");

    const data = await response.json();
    if (!Array.isArray(data.planetas)) {
      throw new Error("El archivo JSON no contiene un array de planetas");
    }

    // Crear botones dinámicos para cada planeta
    createButtons(data.planetas);

    // Crear el gráfico vacío al inicio
    createEmptyBubbleChart();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Función para crear botones dinámicos
function createButtons(planets) {
  const buttonContainer = document.getElementById("buttonsPlanets");
  buttonContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar botones

  planets.forEach((planet) => {
    const button = document.createElement("button");
    button.innerText = planet.nombre;
    button.className = "btn"; // Estilo base del botón
    button.onclick = () => togglePlanet(planet, button); // Pasar el botón como parámetro
    buttonContainer.appendChild(button);
  });

  // Crear el botón "Limpiar gráfico"
  const clearButton = document.createElement("button");
  clearButton.innerText = "Limpiar gráfico";
  clearButton.className = "btn btn-clear"; // Asignar clase específica
  clearButton.onclick = clearBubbleChart; // Asignar función al botón
  buttonContainer.appendChild(clearButton); // Agregar el botón al contenedor
}

// Función para agregar o quitar un planeta del gráfico
function togglePlanet(planet, button) {
  // Verificar si el planeta ya está en el gráfico
  const index = datasets.findIndex(
    (dataset) => dataset.label === planet.nombre
  );

  if (index === -1) {
    // Si no está, agregarlo
    const color = getRandomColor();
    const dataset = {
      label: planet.nombre,
      data: [
        {
          x: planet.distancia_del_sol, // Eje X: distancia del sol
          y: planet.diametro_orbita, // Eje Y: diámetro de órbita
          r: planet.diametro_planeta * 10, // Tamaño de la burbuja basado en el diámetro del planeta (multiplicado para visibilidad)
          nombre: planet.nombre, // Agregar el nombre aquí para el tooltip
        },
      ],
      backgroundColor: color.background,
      borderColor: color.border,
      borderWidth: 1,
    };
    datasets.push(dataset);
    button.classList.add("active"); // Añadir clase active al botón
  } else {
    // Si ya está, eliminarlo
    datasets.splice(index, 1);
    button.classList.remove("active"); // Eliminar clase active al botón
  }

  // Actualizar el gráfico
  updateBubbleChart();
}

// Función para crear el gráfico de burbujas vacío
function createEmptyBubbleChart() {
  const ctx = document.getElementById("bubbleChart").getContext("2d");

  bubbleChartInstance = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Distancia del Sol (millones de km)",
          },
          min: 0, // Mantén el valor mínimo como 0
          max: 5000, // Ajusta el máximo a 5000 para el eje X
          ticks: {
            stepSize: 500, // Cambia el tamaño del paso si quieres más ticks
          },
        },
        y: {
          title: {
            display: true,
            text: "Diámetro de Órbita (millones de km)",
          },
          min: 0,
          max: 5000, // Mantener el máximo en 5000 para el eje Y
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const planet = tooltipItem.raw;
              return [
                `Nombre: ${planet.nombre}`,
                `Distancia del Sol: ${planet.x} millones de km`,
                `Diámetro de Órbita: ${planet.y} millones de km`,
                `Diámetro del Planeta: ${planet.r} km`,
              ];
            },
          },
        },
      },
    },
  });
}

// Función para actualizar el gráfico con los datasets seleccionados
function updateBubbleChart() {
  if (bubbleChartInstance) {
    bubbleChartInstance.destroy(); // Destruir el gráfico anterior si existe
  }
  const ctx = document.getElementById("bubbleChart").getContext("2d");

  bubbleChartInstance = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: datasets,
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Distancia del Sol (millones de km)",
          },
          min: 0,
          max: 5000, // Ajustar el rango a 5000 para el eje X
          ticks: {
            stepSize: 500, // Cambia el tamaño del paso si quieres más ticks
          },
        },
        y: {
          title: {
            display: true,
            text: "Diámetro de Órbita (millones de km)",
          },
          min: 0,
          max: 5000, // Mantener el máximo en 5000 para el eje Y
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const planet = tooltipItem.raw;
              return [
                `Nombre: ${planet.nombre}`,
                `Distancia del Sol: ${planet.x} millones de km`,
                `Diámetro de Órbita: ${planet.y} millones de km`,
                `Diámetro del Planeta: ${planet.r} km`,
              ];
            },
          },
        },
      },
    },
  });
}

// Función para limpiar el gráfico
function clearBubbleChart() {
  datasets.length = 0; // Limpiar los datasets
  updateBubbleChart();

  // Eliminar la clase active de los botones
  const buttons = document.querySelectorAll("#buttonsPlanets button");
  buttons.forEach((button) => button.classList.remove("active"));
}

// Llamar a la función de carga de datos al inicio
loadPlanetData();
