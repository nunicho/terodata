///////////////////////    AÑADIR / ELIMINAR DATOS DE EMPRESA  //////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("empresaForm");
  const resultadoDiv = document.getElementById("resultado");
  const botonBorrar = document.getElementById("borrar");

  const empresaGuardada = JSON.parse(localStorage.getItem("empresa"));
  if (empresaGuardada) {
    cargarDatosEnFormulario(empresaGuardada);
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

 
    alert("Empresa asignada. Estados contables y ratios reiniciados.");
    location.reload();
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

  function cargarDatosEnFormulario(empresa) {
    document.getElementById("nombre").value = empresa.nombre;
    document.getElementById("actividad").value = empresa.actividad;
    document.getElementById("ubicacion").value = empresa.ubicacion;
  }
});
