/* console.log("Hola Mundo")
console.log(2+3)
console.log('Hola la temp de hoy es: ', 8, '°C')
 esto esta comentado
*/
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById('options-container');
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementsById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
    frutas: [
        "Manzana",
        "Frutilla",
        "Pera",
        "Sandia",
        "Naranja",
        "Mandarina",
        "Limon",
        "Uva",
    ],
    animales: [
        "perro",
        "gato",
        "hamster",
        "nutria",
        "jirafa",
        "leon",
        "Pantera",
        "rinoceronte",
    ],
    paises: [
        "Argentina",
        "Brasil",
        "Alemania",
        "Estados Unidos",
        "España",
        "Chile",
        "Irlanda",
        "Africa",
    ],
};
// contadores
let winCount = 0;
let count = 0;
let chosenWord = "";

const displayOptions = () => {
    opcionesContainer.innerHTML += `<h3> Porfavor seleccione una opcion</h3>`;
    // innerHTML sirve para poder ingresar codigo html en js
    let buttonCon = document.createElement("div");
    for (let value in opciones) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`
    }
    opcionesContainer.appendChild(buttonCon);

};
const blocker = () => {
    let optionsButtons = document.querySelectorAll('.opciones');
    let letterButtons = document.querySelectorAll('.letters');

    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    letterButtons.forEach((button) => {
        button.disabled.true;
    });

    nuevoJuegoContainer.classList.remove("hide");
};

//Generador de palabaras
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll('.opciones');
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });


    // inicializar el contenido de las letras en 0 y limpiamos lo anterior
    letrasContainer.classList.remove("hide");
    seccionIngresarUsuario.innerText = "";

    //Array: similar a una lista que puede ser reccorrida 
    //con un ciclo for 
    let optionArray = opciones[optionValue];

    // elegir una palabra aleatoria
    chosenWord = optionArray[Math.floor(Math.random() *
        optionArray.length)];
    // la funcion UpperCase devuelve la cadena en mayuscula
    chosenWord = chosenWord.toUpperCase();

    // remplazaremos las letras con "_"
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">~</span>');

    seccionIngresarUsuario.innerHTML = displayItem;
};

// cuando se presione el boton de "nuevo juego"
// se debe reinciar todo
const initializer = () => {
    winCount = 0;
    count = 0;

    seccionIngresarUsuario.innerHTML = "";
    opcionesContainer.innerHTML = "";
    letrasContainer.classList.add("hide");
    nuevoJuegoContainer.classList.add("hide");
    letrasContainer.innerHTML = "";

    //crear las letras
    for (let i = 65; i < 91; i++) { // 65 al 90 son las letras en Mayusculas  y 97 al 122 son en minusculas
        let button = document.createElement("button");
        button.classList.add("letters");
        // de numeros a ASCII ( a - z)
        button.innerText = String.fromCharCode(i);

        // botones de los caracteres
        button.addEventListener("click", () => {
            // la funcion split() divide un objeto en string 
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        //reemplazar el espacio en blanco por el caracter 
                        dashes[index].innerText = char;
                        // incrementar el contador winCount
                        winCount += 1;
                        if (winCount == charArray.length) {
                            resultadoTexto.innerHTML = `<h2 class="win-msg">Ganaste :) </h2>`;
                            // bloquear todos los botones
                            blocker();
                        }
                    }
                });
            } else {
                // contador cuando pierde
                count += 1;
                // dibujar el hombrecito
                dibujarHombre(count);
                // contador == 6 , head,body, left arm,rigth arm, left leg, rigth leg
                if (count == 6) {
                    resultadoTexto.innerHTML = `<h2 class="lose-msg">Perdiste :(</h2><p> La palabra era <span> ${chosenWord}</span></p>)`;
                    blocker();
                }
            }
            button.disabled = true;
        });
        letrasContainer.append(button);
    }
    displayOptions();
    let { initialDrawning } = canvasCreator();
    initialDrawning();
};

// Canvas para dibujar el hombrecito
const canvasCreator = () => {
    let context = canvas.getContext("2d"); // trabajaremos en una representación bidimensional
    context.beginPath();
    context.strokeStyle = "#000"; // color
    context.lineWidth = 2; // tamaño de la linea

    // como se van a dibujar las lineas
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();  // metodo stroke() para dibujar trazos
    };
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true); // para hacer la circunferencia
        context.stroke();
    }
    const body = () => {
        drawLine(70, 40, 70, 80);
    }
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    }
    const rigthArm = () => {
        drawLine(70, 50, 90, 70);
    }
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    }
    const rigthLeg = () => {
        drawLine(70, 80, 90, 110);
    };
    const initialDrawning = () => {
        // va a limpiar el dibujo 
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    };
    return { initialDrawning, head, body, leftArm, rigthArm, leftLeg, rigthLeg };

};
const dibujarHombre = (count) => {
    let { head, body, leftArm, rigthArm, leftLeg, rigthLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rigthArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rigthLeg();
            break;
        default:
            break;
    }
};

nuevoJuegoButton.addEventListener("click", initializer)
window.onload = initializer;