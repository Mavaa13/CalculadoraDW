const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let firstValue = "";
let operator = "";
let secondValue = "";

buttons.forEach((bttn) => {
    bttn.addEventListener("click", () => {
        const buttonValue = bttn.id;

        if (buttonValue.match(/[0-9.]/)) {
            if (!operator) {
                firstValue += buttonValue;
            } else {
                secondValue += buttonValue;
            }
        } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
            operator = buttonValue;
        } else if (buttonValue === "=") {
            // Con el botón "=", cuando se realiza la operación nos muestra el resultado de la misma
            if (firstValue && operator && secondValue) {
                const result = calculateResult(parseFloat(firstValue), operator, parseFloat(secondValue));
                display.value = result;
                firstValue = result.toString();
                operator = "";
                secondValue = "";
            }
        } else if (buttonValue === "ac") {
            // Con el botón AC se reinicia la operación hecha en la calculadora
            firstValue = "";
            operator = "";
            secondValue = "";
            display.value = "";
        } else if (buttonValue === "de") {
            // Con el boton "de" se elimina el último crácter puesto en la calculadora
            if (secondValue && secondValue.slice(-1).match(/[0-9.]/)) {
                secondValue = secondValue.slice(0, -1);
            } else if (operator) {
                operator = "";
            } else if (firstValue) {
                firstValue = firstValue.slice(0, -1);
            }
        }
        display.value = `${firstValue} ${operator} ${secondValue}`;
    });
});

function calculateResult(firstValue, operator, secondValue) {
    // Dependiendo del operador se realiza un tipo de cálculo (suma, resta, multiplicación o división)
    switch (operator) {
        case "+":
            return firstValue + secondValue;
        case "-":
            return firstValue - secondValue;
        case "*":
            return firstValue * secondValue;
        case "/":
            if (secondValue === 0) {
                return "Error: División por cero";
            }
            return firstValue / secondValue;
        default:
            return "Error: Operador no válido";
    }
}
