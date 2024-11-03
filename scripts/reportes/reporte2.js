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

function obtenerColorAleatorio() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`; // Color de fondo
}

function obtenerColorBordeAleatorio() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`; // Color de borde
}

function crearBotones(alimentos) {
  const contenedorBotones = document.getElementById("botonesAlimentos");
  contenedorBotones.innerHTML = ""; // Limpiar el contenedor antes de agregar botones

  alimentos.forEach((alimento) => {
    const boton = document.createElement("button");
    boton.innerText = alimento.nombre;
    boton.className = "btn"; // Estilo base del botón
    boton.onclick = () => toggleAlimento(alimento, boton); // Pasar el botón como parámetro
    contenedorBotones.appendChild(boton);
  });

  // Crear el botón "Limpiar gráfico"
  const botonLimpiar = document.createElement("button");
  botonLimpiar.innerText = "Limpiar gráfico";
  botonLimpiar.className = "btn btn-limpiar"; // Asignar clase específica
  botonLimpiar.onclick = limpiarGrafico; // Asignar función al botón
  contenedorBotones.appendChild(botonLimpiar); // Agregar el botón al contenedor
}

function toggleAlimento(alimento, boton) {
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
      backgroundColor: obtenerColorAleatorio(), // Color de fondo aleatorio
      borderColor: obtenerColorBordeAleatorio(), // Color de borde aleatorio
      pointBackgroundColor: obtenerColorBordeAleatorio(), // Color de los puntos aleatorio
    };

    datasets.push(dataset);
    boton.classList.add("active"); // Añadir clase active al botón
  } else {
    // Si ya está, eliminarlo
    datasets.splice(index, 1);
    boton.classList.remove("active"); // Eliminar clase active del botón
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

function limpiarGrafico() {
  // Limpiar los datasets
  datasets.length = 0;

  // Actualizar el gráfico con las etiquetas originales pero sin datos
  const etiquetas = obtenerEtiquetas().map((etiqueta) => etiqueta.nombre);
  actualizarGrafico(etiquetas);

  // Opcional: también puedes eliminar la clase active de los botones
  const botones = document.querySelectorAll("#botonesAlimentos button");
  botones.forEach((boton) => boton.classList.remove("active"));
}


// Llamar a la función de carga de datos al inicio
cargarDatos();
