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


async function loadDogData() {
  try {
    const response = await fetch("../data/datosReporte3.json"); 
    if (!response.ok) throw new Error("Error al cargar los datos");

    const data = await response.json();
    if (!Array.isArray(data.perros)) {
      throw new Error("El archivo JSON no contiene un array de perros");
    }

 
    createButtons(data.perros);

   
    createEmptyBubbleChart();
  } catch (error) {
    console.error("Error:", error);
  }
}


function createButtons(dogs) {
  const buttonContainer = document.getElementById("buttonsDogs");
  buttonContainer.innerHTML = ""; 

  dogs.forEach((dog) => {
    const button = document.createElement("button");
    button.innerText = dog.nombre;
    button.className = "btn"; 
    button.onclick = () => toggleDog(dog, button); 
    buttonContainer.appendChild(button);
  });


  const clearButton = document.createElement("button");
  clearButton.innerText = "Limpiar gráfico";
  clearButton.className = "btn btn-clear"; 
  clearButton.onclick = clearBubbleChart; 
  buttonContainer.appendChild(clearButton); 
}


function toggleDog(dog, button) {

  const index = datasets.findIndex((dataset) => dataset.label === dog.nombre);

  if (index === -1) {
  
    const color = getRandomColor();
    const dataset = {
      label: dog.nombre,
      data: [
        {
          x: dog.estaturaPromedio, 
          y: dog.esperanzaVida, 
          r: dog.pesoPromedio, 
          nombre: dog.nombre, 
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


function clearBubbleChart() {
  datasets.length = 0; 
  updateBubbleChart();

 
  const buttons = document.querySelectorAll("#buttonsDogs button");
  buttons.forEach((button) => button.classList.remove("active"));
}


loadDogData();
