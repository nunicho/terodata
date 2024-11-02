///////////////////////    AÑADIR / ELIMINAR RATIOS AL INFORME  //////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  actualizarBotones();
});

function agregarAlReporte(nombre, valor) {
  const reporte = JSON.parse(localStorage.getItem("reporte-ratios")) || [];

  if (!reporte.some((r) => r.nombre === nombre)) {
    reporte.push({ nombre, valor });
    localStorage.setItem("reporte-ratios", JSON.stringify(reporte));
  } else {
    alert(`${nombre} ya está en el reporte.`);
  }

  actualizarBotones();
}

function eliminarDelReporte(nombre) {
  let reporte = JSON.parse(localStorage.getItem("reporte-ratios")) || [];
  reporte = reporte.filter((r) => r.nombre !== nombre);
  localStorage.setItem("reporte-ratios", JSON.stringify(reporte));
  actualizarBotones();
}

function actualizarBotones() {
  const reporte = JSON.parse(localStorage.getItem("reporte-ratios")) || [];
  const ratios = [
    "Liquidez Corriente",
    "Liquidez Ácida",
    "Disponibilidad de Tesorería",
    "Días de Tesorería",
    "Solvencia",
    "Endeudamiento",
    "ROA",
    "ROE",
    "ROCE",
  ];

  ratios.forEach((ratio) => {
    const row = Array.from(
      document.querySelectorAll("#tabla-ratios tbody tr")
    ).find((r) => r.cells[0].textContent === ratio);
    if (!row) return;

    const valorCell = row.cells[1];
    let valorRatio = valorCell.textContent.trim();

    const valorNumerico = parseFloat(valorRatio.replace("%", "").trim());
    const esNumeroValido = !isNaN(valorNumerico) && isFinite(valorNumerico);

    const botonesPrevios = row.querySelector(".accion-btns");
    if (botonesPrevios) {
      botonesPrevios.remove();
    }

    const accionBtns = document.createElement("div");
    accionBtns.className = "accion-btns";

    if (!esNumeroValido || valorRatio === "") {
      const faltaDatosText = document.createElement("span");
      faltaDatosText.textContent = "Faltan datos";
      faltaDatosText.className = "falta-datos";
      accionBtns.appendChild(faltaDatosText);
    } else {
      const agregarBtn = document.createElement("button");
      agregarBtn.textContent = "Agregar al reporte";
      agregarBtn.className = "primary";
      agregarBtn.setAttribute("data-nombre", ratio);
      agregarBtn.addEventListener("click", function () {
        agregarAlReporte(ratio, valorRatio);
      });

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Quitar del reporte";
      eliminarBtn.className = "tertiary";
      eliminarBtn.setAttribute("data-nombre", ratio);
      eliminarBtn.addEventListener("click", function () {
        eliminarDelReporte(ratio);
      });

      accionBtns.appendChild(agregarBtn);
      accionBtns.appendChild(eliminarBtn);

      if (reporte.some((r) => r.nombre === ratio)) {
        agregarBtn.style.display = "none";
        eliminarBtn.style.display = "inline";
      } else {
        agregarBtn.style.display = "inline";
        eliminarBtn.style.display = "none";
      }
    }

    row.appendChild(accionBtns);
  });
}
