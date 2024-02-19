// Variables globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;
let numerosIntentados = [];

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    numerosIntentados.push(numeroDeUsuario);

    if (numeroDeUsuario === numeroSecreto) {
        // El usuario acertó
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
	asignarTextoElemento('p', `Numeros probados: ${obtenerNumerosProbados}, `)
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

// Función para limpiar el campo de entrada de usuario
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar un número secreto evitando repeticiones
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        // Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Función para establecer condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de números 
    // Generar el número aleatorio
    // Inicializar el número intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

// Función para mostrar los numeros que se han usado
function obtenerNumerosProbados (){
	return numerosIntentados.join(", ");
}

// Llamada a la función para establecer condiciones iniciales al cargar la página
condicionesIniciales();
