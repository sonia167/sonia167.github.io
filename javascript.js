String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

const palabras = ['kiwi', 'uva', 'grosella', 'mango', 'ciruela', 'nuez', 'papayas', 'sandia', 'fresa', 'toronja'];
let palabra;
let palabraConGuines;
let contadorfallos;

// Función para iniciar el juego
function iniciarJuego() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraConGuines = palabra.replace(/./g, "_ "); // Reemplaza las letras de la palabra con guiones bajos
    contadorfallos = 0;

    // Actualizar el DOM
    document.querySelector('#output').innerHTML = palabraConGuines;
    document.querySelector('#ahorcado').style.backgroundPosition = '0 0'; // Restablecer imagen del ahorcado
    document.querySelector('#ganador').style.display = 'none'; // Ocultar mensaje de victoria
}

// Evento al hacer clic en el botón de reinicio en el mensaje de derrota
document.querySelector('#reiniciar-perdedor').addEventListener('click', () => {
    document.querySelector('#perdedor').style.display = 'none'; // Oculta el mensaje de derrota
    iniciarJuego(); // Reinicia el juego
});


// Evento al hacer clic en "Evaluar"
document.querySelector('#calcular').addEventListener('click', () => {
    const letra = document.querySelector('#letra').value;
    let haFallado = true;

    for (const i in palabra) {
        if (letra === palabra[i]) {
            palabraConGuines = palabraConGuines.replaceAt(i * 2, letra);
            haFallado = false;
        }
    }

    document.querySelector('#output').innerHTML = palabraConGuines;
    document.querySelector('#letra').value = '';
    document.querySelector('#letra').focus();

    if (haFallado) {
        contadorfallos++;
        document.querySelector('#ahorcado').style.backgroundPosition = -(224 * contadorfallos) + 'px 0';
        if (contadorfallos == 6) {
            document.querySelector('#perdedor').style.display = 'flex'; // Muestra el mensaje de derrota
        }
    } else {
        if (palabraConGuines.indexOf('_') < 0) {
            document.querySelector('#ganador').style.display = 'flex'; // Mostrar mensaje de victoria
        }
    }
});

document.querySelector('#reiniciar').addEventListener('click', iniciarJuego);

iniciarJuego();

