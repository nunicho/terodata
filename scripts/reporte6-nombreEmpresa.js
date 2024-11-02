///////////////////////    AÑADIR / ELIMINAR DATOS DE EMPRESA  //////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("empresaForm");
  const resultadoDiv = document.getElementById("resultado");
  const botonBorrar = document.getElementById("borrar");

  const empresaGuardada = JSON.parse(localStorage.getItem("empresa"));
  if (empresaGuardada) {
    cargarDatosEnFormulario(empresaGuardada);
    mostrarDatos(empresaGuardada);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const actividad = document.getElementById("actividad").value;
    const ubicacion = document.getElementById("ubicacion").value;

    const empresa = {
      nombre: nombre,
      actividad: actividad,
      ubicacion: ubicacion,
    };

    localStorage.setItem("empresa", JSON.stringify(empresa));

    localStorage.removeItem("reporte-ratios");
    localStorage.removeItem("form-patrimonio");
    localStorage.removeItem("form-resultados");

    mostrarDatos(empresa);

    alert("Empresa asignada. Estados contables y ratios reiniciados.");
  });

  botonBorrar.addEventListener("click", function () {
    const confirmacion = confirm(
      "¿Estás seguro de que deseas borrar los datos?"
    );
    if (confirmacion) {
      localStorage.removeItem("empresa");
      resultadoDiv.innerHTML = "";
      form.reset();
      alert("Datos borrados correctamente.");
    } else {
      alert("Operación cancelada.");
    }
  });

  function mostrarDatos(empresa) {
    resultadoDiv.innerHTML = `
      <h3>Datos ingresados:</h3>
      <p><strong>Nombre de la Empresa:</strong> ${empresa.nombre}</p>
      <p><strong>Actividad:</strong> ${empresa.actividad}</p>
      <p><strong>Ubicación:</strong> ${empresa.ubicacion}</p>
    `;
  }

  function cargarDatosEnFormulario(empresa) {
    document.getElementById("nombre").value = empresa.nombre;
    document.getElementById("actividad").value = empresa.actividad;
    document.getElementById("ubicacion").value = empresa.ubicacion;
  }
});
