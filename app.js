const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".input");
const expression = document.querySelector(".expression");
const clearButton = document.querySelector('[data-key="clear"]');
const equals = document.querySelector('[data-key="calculate"]');
const previousOperator = [];

let firstOperation = true;
let firstOperand = 0;
let secondOperand;
let operator;
let sum;

// Calculator displays '0' by default
window.addEventListener('load', (event) => {
    display.textContent = 0;
});

numbers.forEach(function (button) {
    button.addEventListener("click", function () {

        const currentKey = button.textContent;

        if (expression.textContent.includes('=')) {
            clear(button);
        };

        if (display.textContent.includes('0')) {
            if (display.textContent[0] == 0 && !display.textContent.includes('.')) {
                display.textContent = "";
            };
        };

        // Prevents multiple decimal points
        if (currentKey == '.') {
            if (display.textContent.includes('.')) {
                console.log("Decimal point already present");
                return;
            } else if (display.textContent == "") {
                display.append('0');
            } else {
                display.append(this.textContent);
                return;
            };
        };

        // Store user inputted values 
        if (!operator) {
            display.append(this.textContent);
            firstOperand = parseFloat(display.textContent);
            return firstOperand;
        } else {
            display.append(this.textContent);
            secondOperand = parseFloat(display.textContent);
            return secondOperand;
        };
    });
});

// Retrieve operator
operators.forEach(function (sign) {
    sign.addEventListener("click", function () {

        operator = this.dataset.key;
        previousOperator.push(operator);

         if (expression.textContent[expression.textContent.length-1] != "=") {
            const newExpression = expression.textContent.slice(0, expression.textContent.length-1)
            expression.textContent = newExpression;
         };

        if (expression.textContent.includes('=')) {
            expression.textContent = "";
        };
    
        if (display.textContent[display.textContent.length-1] == ".") {
            const newDisplay = display.textContent.slice(0, display.textContent.length-1);
            display.textContent = newDisplay;
        };

        if (display.textContent == secondOperand) {
            expression.textContent = "";
            calculate(firstOperand, secondOperand, previousOperator[previousOperator.length - 2]);
        };

        expression.append(display.textContent, this.textContent);
        display.textContent = "";
        return operator;
    });
});


equals.addEventListener("click", function () {
    expression.append(secondOperand, '=');
    calculate(firstOperand, secondOperand, operator);
});

// Calculation function
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "add":
            sum = firstOperand + secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "subtract":
            sum = firstOperand - secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "multiply":
            sum = firstOperand * secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "divide":
            sum = firstOperand / secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        default:
            console.log("Invalid Operator!");
    };
};

// Change ValueOne to equal the sum of last input for long expressions
function changeValue(sum) {
    if (sum == secondOperand && expression.textContent.includes(firstOperand)) return firstOperand = 0;
    return firstOperand = sum;
};

const allClear = clearButton.addEventListener("click", function () {
    clear();
});

const clear = (button) => {
    expression.textContent = "";
    firstOperand = 0;
    secondOperand = undefined;
    operator = undefined;
    sum = undefined;
    if (button) {
        display.textContent = "";
        return;
    };
    display.textContent = 0;
    firstOperation = true;
};