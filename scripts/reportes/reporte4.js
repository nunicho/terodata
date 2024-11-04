let bubbleChartInstance;
const datasets = []; 


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.5; 
  return {
    background: `rgba(${r}, ${g}, ${b}, ${a})`,
    border: `rgba(${r}, ${g}, ${b}, 1)`,
  };
}


async function loadPlanetData() {
  try {
    const response = await fetch("../data/datosReporte4.json"); 
    if (!response.ok) throw new Error("Error al cargar los datos");

    const data = await response.json();
    if (!Array.isArray(data.planetas)) {
      throw new Error("El archivo JSON no contiene un array de planetas");
    }

   
    createButtons(data.planetas);

 
    createEmptyBubbleChart();
  } catch (error) {
    console.error("Error:", error);
  }
}


function createButtons(planets) {
  const buttonContainer = document.getElementById("buttonsPlanets");
  buttonContainer.innerHTML = ""; 

  planets.forEach((planet) => {
    const button = document.createElement("button");
    button.innerText = planet.nombre;
    button.className = "btn"; 
    button.onclick = () => togglePlanet(planet, button); 
    buttonContainer.appendChild(button);
  });

 
  const clearButton = document.createElement("button");
  clearButton.innerText = "Limpiar gráfico";
  clearButton.className = "btn btn-clear"; 
  clearButton.onclick = clearBubbleChart; 
  buttonContainer.appendChild(clearButton); 
}


function togglePlanet(planet, button) {

  const index = datasets.findIndex(
    (dataset) => dataset.label === planet.nombre
  );

  if (index === -1) {

    const color = getRandomColor();
    const dataset = {
      label: planet.nombre,
      data: [
        {
          x: planet.distancia_del_sol, 
          y: planet.diametro_orbita, 
          r: planet.diametro_planeta * 10, 
          nombre: planet.nombre, 
        },
      ],
      backgroundColor: color.background,
      borderColor: color.border,
      borderWidth: 1,
    };
    datasets.push(dataset);
    button.classList.add("active"); 
  } else {
   
    datasets.splice(index, 1);
    button.classList.remove("active"); 
  }

  
  updateBubbleChart();
}


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
          min: 0, 
          max: 5000, 
          ticks: {
            stepSize: 500, 
          },
        },
        y: {
          title: {
            display: true,
            text: "Diámetro de Órbita (millones de km)",
          },
          min: 0,
          max: 5000,
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


function updateBubbleChart() {
  if (bubbleChartInstance) {
    bubbleChartInstance.destroy(); 
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
          max: 5000, 
          ticks: {
            stepSize: 500, 
          },
        },
        y: {
          title: {
            display: true,
            text: "Diámetro de Órbita (millones de km)",
          },
          min: 0,
          max: 5000, 
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


function clearBubbleChart() {
  datasets.length = 0; 
  updateBubbleChart();

 
  const buttons = document.querySelectorAll("#buttonsPlanets button");
  buttons.forEach((button) => button.classList.remove("active"));
}


loadPlanetData();
