function obtenerInputsPorIds(ids) {
  return ids.reduce((acc, id) => {
    acc[id] = document.getElementById(id);
    return acc;
  }, {});
}

const idsPatrimonio = [
  "caja-bancos",
  "inversiones-transitorias",
  "bienes-cambio",
  "activo-no-corriente",
  "pasivo-corriente",
  "pasivo-no-corriente",
  "patrimonio-neto",
];

const idsResultados = [
  "ventas",
  "gastos-operativos",
  "gastos-comercializacion",
  "gastos-administracion",
  "gastos-financiacion",
  "impuesto",
  "utilidad-bruta",
  "utilidad-antes-impuesto",
  "utilidad-neta",
];

const inputsPatrimonio = obtenerInputsPorIds(idsPatrimonio);
const inputsResultados = obtenerInputsPorIds(idsResultados);

function cargarDesdeLocalStorage(key, inputs) {
  const data = JSON.parse(localStorage.getItem(key)) || {};
  Object.keys(inputs).forEach((inputId) => {
    inputs[inputId].value = data[inputId] || 0;
  });
}

function validarCampos(inputs) {
  const camposPosiblesNegativos = [
    "caja-bancos",
    "inversiones-transitorias",
    "bienes-cambio",
    "activo-no-corriente",
    "pasivo-corriente",
    "pasivo-no-corriente",
    "utilidad-bruta",
    "utilidad-antes-impuesto",
    "utilidad-neta",
  ];

  for (let input of Object.values(inputs)) {
    const valor = parseFloat(input.value);

    if (!camposPosiblesNegativos.includes(input.id)) {
      if (isNaN(valor) || valor < 0) {
        alert("Ningún valor puede ser negativo o no numérico.");
        return false;
      }
    }
  }

  return true;
}

function guardarEnLocalStorage(key, inputs) {
  const data = Object.fromEntries(
    Object.entries(inputs).map(([id, input]) => [id, parseFloat(input.value)])
  );
  localStorage.setItem(key, JSON.stringify(data));

  // Limpiar "reporte-ratios" después de guardar
  localStorage.removeItem("reporte-ratios");

  alert("Datos guardados correctamente. Ratios recalculados.");
  location.reload();
}

function calcularPatrimonioNeto() {
  const activoCorriente =
    parseFloat(inputsPatrimonio["caja-bancos"].value) || 0;
  const inversionesTransitorias =
    parseFloat(inputsPatrimonio["inversiones-transitorias"].value) || 0;
  const bienesCambio = parseFloat(inputsPatrimonio["bienes-cambio"].value) || 0;
  const activoNoCorriente =
    parseFloat(inputsPatrimonio["activo-no-corriente"].value) || 0;
  const pasivoCorriente =
    parseFloat(inputsPatrimonio["pasivo-corriente"].value) || 0;
  const pasivoNoCorriente =
    parseFloat(inputsPatrimonio["pasivo-no-corriente"].value) || 0;

  const patrimonioNeto =
    activoCorriente +
    inversionesTransitorias +
    bienesCambio +
    activoNoCorriente -
    (pasivoCorriente + pasivoNoCorriente);
  inputsPatrimonio["patrimonio-neto"].value = patrimonioNeto.toFixed(2);
}

function calcularEstadoResultados() {
  const ventas = parseFloat(inputsResultados["ventas"].value) || 0;
  const gastosOperativos =
    parseFloat(inputsResultados["gastos-operativos"].value) || 0;
  const gastosComercializacion =
    parseFloat(inputsResultados["gastos-comercializacion"].value) || 0;
  const gastosAdministracion =
    parseFloat(inputsResultados["gastos-administracion"].value) || 0;
  const gastosFinanciacion =
    parseFloat(inputsResultados["gastos-financiacion"].value) || 0;
  const impuesto = parseFloat(inputsResultados["impuesto"].value) || 0;

  const utilidadBruta = ventas - gastosOperativos;
  const utilidadAntesImpuesto =
    utilidadBruta -
    (gastosComercializacion + gastosAdministracion + gastosFinanciacion);
  const utilidadNeta = utilidadAntesImpuesto - impuesto;

  inputsResultados["utilidad-bruta"].value = utilidadBruta.toFixed(2);
  inputsResultados["utilidad-antes-impuesto"].value =
    utilidadAntesImpuesto.toFixed(2);
  inputsResultados["utilidad-neta"].value = utilidadNeta.toFixed(2);
}

function configurarEventosFormulario(formId, calcularFn, validarFn, inputs) {
  const form = document.getElementById(formId);
  form.addEventListener("input", calcularFn);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validarFn(inputs)) {
      guardarEnLocalStorage(formId, inputs);
    }
  });
}

cargarDesdeLocalStorage("form-patrimonio", inputsPatrimonio);
cargarDesdeLocalStorage("form-resultados", inputsResultados);

configurarEventosFormulario(
  "form-patrimonio",
  calcularPatrimonioNeto,
  validarCampos,
  inputsPatrimonio
);
configurarEventosFormulario(
  "form-resultados",
  calcularEstadoResultados,
  validarCampos,
  inputsResultados
);

function limpiarRegistros(inputsPatrimonio, inputsResultados) {
  Object.values(inputsPatrimonio).forEach((input) => {
    input.value = 0;
  });

  Object.values(inputsResultados).forEach((input) => {
    input.value = 0;
  });

  localStorage.setItem("form-patrimonio", JSON.stringify({}));
  localStorage.setItem("form-resultados", JSON.stringify({}));

  alert("Registros limpiados correctamente.");
  location.reload();
}

document.getElementById("limpiar-registros").addEventListener("click", () => {
  const confirmar = confirm(
    "¿Estás seguro de que deseas limpiar los registros? Esta acción no se puede deshacer."
  );

  if (confirmar) {
    limpiarRegistros(inputsPatrimonio, inputsResultados);
    location.reload();
  } else {
     alert("Acción cancelada.");
  }
});
