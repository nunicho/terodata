async function obtenerDatos() {
  const url = "https://api.bcra.gob.ar/estadisticas/v2.0/principalesvariables";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.results); // Mostrar datos en la consola
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

obtenerDatos();
