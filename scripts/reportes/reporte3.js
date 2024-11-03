let bubbleChartInstance;
const datasets = []; // Array para almacenar los datasets de perros seleccionados

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
  try {
    const response = await fetch("../data/datosReporte3.json"); // Reemplaza con la ruta a tu archivo JSON
    if (!response.ok) throw new Error("Error al cargar los datos");

    const data = await response.json();
    if (!Array.isArray(data.perros)) {
      throw new Error("El archivo JSON no contiene un array de perros");
    }

    // Crear botones dinámicos para cada perro
    createButtons(data.perros);

    // Crear el gráfico vacío al inicio
    createEmptyBubbleChart();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Función para crear botones dinámicos
function createButtons(dogs) {
  const buttonContainer = document.getElementById("buttonsDogs");
  buttonContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar botones

  dogs.forEach((dog) => {
    const button = document.createElement("button");
    button.innerText = dog.nombre;
    button.className = "btn"; // Estilo base del botón
    button.onclick = () => toggleDog(dog, button); // Pasar el botón como parámetro
    buttonContainer.appendChild(button);
  });

  // Crear el botón "Limpiar gráfico"
  const clearButton = document.createElement("button");
  clearButton.innerText = "Limpiar gráfico";
  clearButton.className = "btn btn-clear"; // Asignar clase específica
  clearButton.onclick = clearBubbleChart; // Asignar función al botón
  buttonContainer.appendChild(clearButton); // Agregar el botón al contenedor
}

// Función para agregar o quitar un perro del gráfico
function toggleDog(dog, button) {
  // Verificar si el perro ya está en el gráfico
  const index = datasets.findIndex((dataset) => dataset.label === dog.nombre);

  if (index === -1) {
    // Si no está, agregarlo
    const color = getRandomColor();
    const dataset = {
      label: dog.nombre,
      data: [
        {
          x: dog.estaturaPromedio, // Eje X: estatura promedio
          y: dog.esperanzaVida, // Eje Y: esperanza de vida
          r: dog.pesoPromedio, // Tamaño de la burbuja basado en el peso promedio
          nombre: dog.nombre, // Agregar el nombre aquí para el tooltip
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
    button.classList.remove("active"); // Eliminar clase active del botón
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
            text: "Estatura Promedio (cm)",
          },
          min: 0,
          max: 100,
        },
        y: {
          title: {
            display: true,
            text: "Esperanza de Vida (años)",
          },
          min: 0,
          max: 20,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const dog = tooltipItem.raw;
              return [
                `Nombre: ${dog.nombre}`, // Ahora `dog.nombre` estará definido
                `Estatura: ${dog.x} cm`,
                `Esperanza de Vida: ${dog.y} años`,
                `Peso: ${dog.r} kg`,
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
            text: "Estatura Promedio (cm)",
          },
          min: 0,
          max: 100,
        },
        y: {
          title: {
            display: true,
            text: "Esperanza de Vida (años)",
          },
          min: 0,
          max: 20,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const dog = tooltipItem.raw;
              return [
                `Nombre: ${dog.nombre}`,
                `Estatura: ${dog.x} cm`,
                `Esperanza de Vida: ${dog.y} años`,
                `Peso: ${dog.r} kg`,
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
  const buttons = document.querySelectorAll("#buttonsDogs button");
  buttons.forEach((button) => button.classList.remove("active"));
}

// Llamar a la función de carga de datos al inicio
loadDogData();
