async function cargarDatos() {
  try {
    // Cargar los datos desde el archivo JSON
    const response = await fetch("../data/datosReporte2.json");
    if (!response.ok) throw new Error("Error al cargar los datos");

    const datos = await response.json();

    // Asegurarse de que datos.alimentos sea un array
    if (!Array.isArray(datos.alimentos)) {
      throw new Error("El archivo JSON no contiene un array de alimentos");
    }

    // Definir etiquetas para los nutrientes y sus claves en el JSON
    const etiquetas = [
      { nombre: "Calorías", clave: "calorias" },
      { nombre: "Grasas", clave: "grasas" },
      { nombre: "Grasas Saturadas", clave: "grasas_saturadas" },
      { nombre: "Carbohidratos", clave: "carbohidratos" },
      { nombre: "Azúcares", clave: "azucares" },
      { nombre: "Proteínas", clave: "proteinas" },
      { nombre: "Sodio", clave: "sodio" },
    ];

    // Preparar los datos para cada alimento
    const datasets = datos.alimentos.map((alimento) => {
      return {
        label: alimento.nombre,
        data: etiquetas.map((etiqueta) => {
          return alimento[etiqueta.clave] || 0; // Usar 0 si no existe el valor
        }),
        backgroundColor: `rgba(54, 162, 235, 0.2)`, // Color de fondo para el área
        borderColor: `rgba(54, 162, 235, 1)`, // Color del borde
        pointBackgroundColor: `rgba(54, 162, 235, 1)`, // Color de los puntos
      };
    });

    // Llamar a la función para crear el gráfico de radar
    crearRadarChart(
      etiquetas.map((et) => et.nombre),
      datasets
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

function crearRadarChart(etiquetas, datasets) {
  // Obtener el contexto del canvas en el HTML
  const ctx = document.getElementById("radarChart").getContext("2d");
  new Chart(ctx, {
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
