let chartInstance;
const datasets = []; // Array para almacenar los datasets de alimentos seleccionados

async function cargarDatos() {
  try {
    const response = await fetch("../data/datosReporte2.json");
    if (!response.ok) throw new Error("Error al cargar los datos");

    const datos = await response.json();
    if (!Array.isArray(datos.alimentos)) {
      throw new Error("El archivo JSON no contiene un array de alimentos");
    }

    // Crear botones dinámicos para cada alimento
    crearBotones(datos.alimentos);

    // Crear el gráfico vacío al inicio
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

function crearBotones(alimentos) {
  const contenedorBotones = document.getElementById("botonesAlimentos");
  contenedorBotones.innerHTML = ""; // Limpiar el contenedor antes de agregar botones

  alimentos.forEach((alimento) => {
    const boton = document.createElement("button");
    boton.innerText = alimento.nombre;
    boton.onclick = () => toggleAlimento(alimento);
    contenedorBotones.appendChild(boton);
  });
}

function toggleAlimento(alimento) {
  const etiquetas = obtenerEtiquetas();

  // Verificar si el alimento ya está en el gráfico
  const index = datasets.findIndex(
    (dataset) => dataset.label === alimento.nombre
  );

  if (index === -1) {
    // Si no está, agregarlo
    const dataset = {
      label: alimento.nombre,
      data: etiquetas.map((etiqueta) => alimento[etiqueta.clave] || 0),
      backgroundColor: `rgba(54, 162, 235, 0.2)`,
      borderColor: `rgba(54, 162, 235, 1)`,
      pointBackgroundColor: `rgba(54, 162, 235, 1)`,
    };

    datasets.push(dataset);
  } else {
    // Si ya está, eliminarlo
    datasets.splice(index, 1);
  }

  // Actualizar el gráfico
  actualizarGrafico(etiquetas.map((et) => et.nombre));
}

function crearGraficoVacio(etiquetas) {
  const ctx = document.getElementById("radarChart").getContext("2d");

  chartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: etiquetas.map((et) => et.nombre),
      datasets: [], // Inicializar con un dataset vacío
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
    },
  });
}

function actualizarGrafico(etiquetas) {
  const ctx = document.getElementById("radarChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy(); // Destruir el gráfico anterior si existe
  }

  chartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: etiquetas,
      datasets: datasets,
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Llamar a la función de carga de datos al inicio
cargarDatos();
