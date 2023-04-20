let areaTxt = document.querySelector("#texto");
let btnEncriptar = document.querySelector("#encriptar");
let btnDesencriptar = document.querySelector("#desencriptar");
let acciones = document.querySelector(".acciones");
let info = document.querySelector(".info");

btnEncriptar.onclick = (e) => {
  e.preventDefault();
  if (areaTxt.value != "") {
    let texto = areaTxt.value.toLowerCase();
    let textoEncriptado = encriptar(texto);
    resetTxt();
    acciones.insertBefore(
      crearElemento("Encriptacion", textoEncriptado),
      acciones.firstChild
    );
  }
};

btnDesencriptar.onclick = (e) => {
  e.preventDefault();
  if (areaTxt.value != "") {
    let textoEncriptado = areaTxt.value.toLowerCase();
    let textoDesencriptado = desencriptar(textoEncriptado);
    resetTxt();
    acciones.insertBefore(
      crearElemento("Desencriptación", textoDesencriptado),
      acciones.firstChild
    );
  }
};

function encriptar(texto) {
  let textoEncriptado = "";
  for (letra of texto) {
    switch (letra) {
      case "a":
        textoEncriptado += "ai";
        break;
      case "e":
        textoEncriptado += "enter";
        break;
      case "i":
        textoEncriptado += "imes";
        break;
      case "o":
        textoEncriptado += "ober";
        break;
      case "u":
        textoEncriptado += "ufat";
        break;
      default:
        textoEncriptado += letra;
    }
  }
  return textoEncriptado;
}

function desencriptar(texto) {
  let textoDesencriptado = texto
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  return textoDesencriptado;
}

function resetTxt() {
  areaTxt.value = "";
}

function crearElemento(accion, resultado) {
  info.classList.add("display-none");
  let contenedorElemento = document.createElement("div");
  let descripcionAccion = document.createElement("p");
  let resultadoAccion = document.createElement("p");
  let iconoCopiar = document.createElement("img");
  iconoCopiar.classList.add("copiar");
  iconoCopiar.src = "./assets/copy-icon.png";
  iconoCopiar.alt = "copiar";
  iconoCopiar.onclick = () => {
    navigator.clipboard.writeText(resultado);
  };
  descripcionAccion.textContent = accion;
  resultadoAccion.textContent = resultado;
  contenedorElemento.classList.add("accion");
  descripcionAccion.classList.add("descripcion");
  resultadoAccion.classList.add("resultado");
  contenedorElemento.appendChild(descripcionAccion);
  contenedorElemento.appendChild(resultadoAccion);
  contenedorElemento.appendChild(iconoCopiar);
  setTimeout(() => {
    contenedorElemento.classList.add("aparecer");
  }, 100);
  return contenedorElemento;
}
