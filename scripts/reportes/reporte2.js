let chartInstance;
const datasets = [];
async function cargarDatos() {
  try {
    const response = await fetch("../data/datosReporte2.json");
    if (!response.ok) throw new Error("Error al cargar los datos");

    const datos = await response.json();
    if (!Array.isArray(datos.alimentos)) {
      throw new Error("El archivo JSON no contiene un array de alimentos");
    }

    crearBotones(datos.alimentos);

    const etiquetas = obtenerEtiquetas();
    crearGraficoVacio(etiquetas);
  } catch (error) {
    console.error("Error:", error);
  }
}

function obtenerEtiquetas() {
  return [
    { nombre: "Calorías", clave: "calorias" },
    { nombre: "Grasas", clave: "grasas" },
    { nombre: "Grasas Saturadas", clave: "grasas_saturadas" },
    { nombre: "Carbohidratos", clave: "carbohidratos" },
    { nombre: "Azúcares", clave: "azucares" },
    { nombre: "Proteínas", clave: "proteinas" },
    { nombre: "Sodio", clave: "sodio" },
  ];
}

function obtenerColorAleatorio() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

function obtenerColorBordeAleatorio() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function crearBotones(alimentos) {
  const contenedorBotones = document.getElementById("botonesAlimentos");
  contenedorBotones.innerHTML = "";

  alimentos.forEach((alimento) => {
    const boton = document.createElement("button");
    boton.innerText = alimento.nombre;
    boton.className = "btn";
    boton.onclick = () => toggleAlimento(alimento, boton);
    contenedorBotones.appendChild(boton);
  });

  const botonLimpiar = document.createElement("button");
  botonLimpiar.innerText = "Limpiar gráfico";
  botonLimpiar.className = "btn btn-limpiar";
  botonLimpiar.onclick = limpiarGrafico;
  contenedorBotones.appendChild(botonLimpiar);
}

function crearGraficoVacio(etiquetas) {
  const ctx = document.getElementById("radarChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: etiquetas.map((et) => et.nombre),
      datasets: datasets,
    },
    options: {
      scales: {
        r: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          angleLines: {
            color: "rgba(0, 0, 0, 0.5)",
          },
          pointLabels: {
            color: "#333333",
            font: {
              size: 14,
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#333333",
          },
        },
      },
    },
  });
}

function toggleAlimento(alimento, boton) {
  const datasetIndex = datasets.findIndex(
    (dataset) => dataset.label === alimento.nombre
  );
  if (datasetIndex === -1) {
    const nuevoDataset = {
      label: alimento.nombre,
      data: obtenerEtiquetas().map((et) => alimento[et.clave] || 0),
      backgroundColor: obtenerColorAleatorio(), // Fondo semitransparente para el gráfico
      borderColor: obtenerColorBordeAleatorio(),
      borderWidth: 2,
    };
    datasets.push(nuevoDataset);
    boton.classList.add("active");
  } else {
    datasets.splice(datasetIndex, 1);
    boton.classList.remove("active");
  }
  chartInstance.update();
}

function limpiarGrafico() {
  datasets.length = 0;
  document.querySelectorAll("#botonesAlimentos .btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  chartInstance.update();
}

cargarDatos();
