/* let areaTxt = document.querySelector("#texto");

let btnDesencriptar = document.querySelector("#desencriptar");
let acciones = document.querySelector(".acciones");
let info = document.querySelector(".info");

btnEncriptar.onclick = (e) => {
  e.preventDefault();
  if (areaTxt.value != "") {
    let texto = areaTxt.value.toLowerCase();
    let textoEncriptado = encriptar(texto);
    resetTxt();
    acciones.replaceChildren(crearElemento("Encriptacion", textoEncriptado));
  }
};

btnDesencriptar.onclick = (e) => {
  e.preventDefault();
  if (areaTxt.value != "") {
    let textoEncriptado = areaTxt.value.toLowerCase();
    let textoDesencriptado = desencriptar(textoEncriptado);
    resetTxt();
    acciones.replaceChildren(
      crearElemento("Desencriptación", textoDesencriptado)
    );
  }
};


function resetTxt() {
  areaTxt.value = "";
}
*/

const textareaEncriptacion = document.getElementById("texto");
const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
const elementoEncriptador = document.querySelector(".encriptador");
elementoEncriptador.addEventListener("click", () => {
  textareaEncriptacion.focus();
});

let timeout = null;
const elementoTextoVentana = document.getElementById("textoVentana");
const elementoTextoInicio = document.getElementById("textoInicio");
const elementoTextoRespuesta = document.getElementById("textoRespuesta");
const elementoTextoEncriptado = document.getElementById("textoEncriptado");
const btnEncriptar = document.querySelector("#encriptar");
const btnCopy = document.getElementById("copy");
const btnEncriptarMode = document.getElementById("btnEncriptarMode");
const btnDesencriptarMode = document.getElementById("btnDesencriptarMode");
const contenedorEncriptacion = document.getElementById(
  "contenedorEncriptacion"
);

/* --------------------------------------------------- */
/* --------- FUNCIONES DE ANIMACION DE TEXTO --------- */
/* --------------------------------------------------- */

// Funcion que recibe un texto y lo inserta en un elemento, con un paramentro opcional para controlar el tiempo entre letras, ademas de ejecutar una funcion al finalizar la escritura. Si encuentra un - lo convierte en un salto de linea.
function typewritter(texto, elemento, duracion = 30, callback = () => {}) {
  let i = 0;
  let func = function () {
    if (i < texto.length) {
      if (texto.charAt(i) === "-") {
        elemento.innerHTML += "<br/>";
      } else {
        elemento.innerHTML += texto.charAt(i);
      }
      i++;
      timeout = setTimeout(func, duracion);
    } else {
      callback();
    }
  };
  func();
}

// Funcion que recibe un texto y lo inserta en un elemento, con un paramentro opcional para controlar el tiempo en el que varian las letras, ademas de ejecutar una funcion al finalizar la escritura. Si encuentra un - lo convierte en un salto de linea.
function hackerEffect(texto, elemento, duracion = 30, callback = () => {}) {
  let iteration = 0;

  let interval = setInterval(() => {
    elemento.innerText = texto
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return texto[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= texto.length) {
      clearInterval(interval);
      callback();
    }

    iteration += 1 / 3;
  }, duracion);
}

/* --------------------------------------------------- */

/* --------------------------------------------------- */
/* --------- FUNCIONES DE ENCRIPTACION --------- */
/* --------------------------------------------------- */

function encriptar(texto) {
  let textoEncriptado = "";
  texto = texto.toLowerCase();
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
  texto = texto.toLowerCase();
  let textoDesencriptado = texto
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  return textoDesencriptado;
}
/* --------------------------------------------------- */

function displayElement(elemento, texto) {
  return function () {
    elemento.style.display = "grid";
    hackerEffect(texto, elementoTextoEncriptado, 30, () => {
      btnCopy.toggleAttribute("disabled");
      btnEncriptar.removeAttribute("disabled");
    });
  };
}

/* --------------------------------------------------- */
/* ------- Intentando que la ventana se mueva ------- */
/* --------------------------------------------------- */

// Make the DIV element draggable:
dragElement(document.getElementById("ventana"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* --------------------------------------------------- */
/* --------- FUNCIONES DE APLICACION --------- */
/* --------------------------------------------------- */

function iniciarEncriptacion() {
  elementoTextoVentana.innerHTML = "encriptador.exe";
  let textoEncriptar =
    "Inicializando encriptador.exe...-Ingrese su palabra a encriptar:";
  let textoRespuesta = "Palabra válida!-Encriptando...";
  resetAll();

  typewritter(textoEncriptar, elementoTextoInicio);
  btnEncriptar.onclick = (e) => {
    e.preventDefault();
    btnEncriptar.setAttribute("disabled", "true");
    resetRespuesta();
    if (textareaEncriptacion.value != "") {
      typewritter(
        textoRespuesta,
        elementoTextoRespuesta,
        30,
        displayElement(
          contenedorEncriptacion,
          encriptar(textareaEncriptacion.value)
        )
      );
      btnEncriptar.setAttribute("disabled", "true");
    }
  };
}

function iniciarDesencriptación() {
  elementoTextoVentana.innerHTML = "desencriptador.exe";
  let textoEncriptar =
    "Inicializando desencripador.exe...-Ingrese su palabra encriptada:";
  let textoRespuesta = "Palabra válida!-Desencriptando...";
  resetAll();

  typewritter(textoEncriptar, elementoTextoInicio);

  btnEncriptar.onclick = (e) => {
    e.preventDefault();
    btnEncriptar.setAttribute("disabled", "true");
    resetRespuesta();
    if (textareaEncriptacion.value != "") {
      typewritter(
        textoRespuesta,
        elementoTextoRespuesta,
        30,
        displayElement(
          contenedorEncriptacion,
          desencriptar(textareaEncriptacion.value)
        )
      );
      btnEncriptar.setAttribute("disabled", "true");
    }
  };
}
/* --------------------------------------------------- */

function resetAll() {
  clearTimeout(timeout);
  elementoTextoInicio.innerHTML = "";
  elementoTextoRespuesta.innerHTML = "";
  elementoTextoEncriptado.innerHTML = "";
  contenedorEncriptacion.style.display = "none";
  textareaEncriptacion.value = "";
  btnEncriptar.removeAttribute("disabled");
  btnEncriptar.onclick = () => {};
  btnCopy.toggleAttribute("disabled");
}

function resetRespuesta() {
  elementoTextoRespuesta.innerHTML = "";
  contenedorEncriptacion.style.display = "none";
  elementoTextoEncriptado.innerHTML = "";
}

// Event listener para agrandar el textbox
textareaEncriptacion.addEventListener("input", (e) => {
  textareaEncriptacion.style.height = "24px";
  let scHeigth = e.target.scrollHeight;
  textareaEncriptacion.style.height = `${scHeigth}px`;
});

btnEncriptarMode.ondblclick = (e) => {
  inicializando = false;
  btnEncriptarMode.classList.add("active");
  iniciarEncriptacion();
};

btnEncriptarMode.onmouseleave = () => {
  setTimeout(() => {
    btnEncriptarMode.classList.remove("active");
  }, 700);
};

btnDesencriptarMode.ondblclick = (e) => {
  inicializando = false;
  btnDesencriptarMode.classList.add("active");
  iniciarDesencriptación();
};

btnDesencriptarMode.onmouseleave = () => {
  setTimeout(() => {
    btnDesencriptarMode.classList.remove("active");
  }, 700);
};

btnCopy.onclick = (e) => {
  navigator.clipboard.writeText(elementoTextoEncriptado.textContent).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );

  document.getElementById("copied").style.display = "block";

  setTimeout(() => {
    document.getElementById("copied").style.display = "none";
  }, 300);
};

iniciarEncriptacion();
