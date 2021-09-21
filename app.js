const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".input");
const expression = document.querySelector(".expression");
const clearButton = document.querySelector('[data-key="clear"]');
const delButton = document.querySelector('[data-key="delete"]');
const equals = document.querySelector('[data-key="calculate"]');
const previousOperator = [];

let firstOperand = 0;
let secondOperand = 0;
let operator;
let sum;

// Calculator displays '0' by default
window.addEventListener('load', (event) => {
    display.textContent = 0;
});

// Click event
numberButtons.forEach(function (button) {
    button.addEventListener("click", function (button) {
        appendNumber(this.textContent)
    });
});

// Keydown event
window.addEventListener("keydown", function (e) {
    appendNumber(parseFloat(e.key))
});

function appendNumber(button) {

    const currentKey = button;

    if (isNaN(currentKey)) return;

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

    display.append(this.textContent || currentKey);

    // Store user inputted values 
    updateValue(button.textContent);
};

const updateValue = (value) => {
    if (!operator) {
        firstOperand = parseFloat(display.textContent);
        return firstOperand;
    } else {
        secondOperand = parseFloat(display.textContent);
        return secondOperand;
    };
};

// Retrieve operator
operators.forEach(function (sign) {
    sign.addEventListener("click", function () {

        operator = this.dataset.key;
        previousOperator.push(operator);

        if (expression.textContent[expression.textContent.length - 1] != "=") {
            const newExpression = expression.textContent.slice(0, expression.textContent.length - 1)
            expression.textContent = newExpression;
        };

        if (expression.textContent.includes('=')) {
            expression.textContent = "";
        };

        if (display.textContent[display.textContent.length - 1] == ".") {
            remove();
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

// Change firstOperand to equal the sum of last input for long expressions
function changeValue(sum) {
    if (sum == secondOperand && expression.textContent.includes(firstOperand)) return firstOperand = 0;
    return firstOperand = sum;
};

const allClear = clearButton.addEventListener("click", function () {
    clear();
});

const del = delButton.addEventListener("click", function () {
    remove();
});

const remove = () => {
    const newDisplay = display.textContent.slice(0, display.textContent.length - 1);

    if (expression.textContent.includes('=')) {
        return expression.textContent = "";
    };

    if (display.textContent == sum) return;

    display.textContent = newDisplay;

    if (display.textContent.length == 0) {
        display.textContent = 0;
    };

    updateValue(newDisplay);
};

const clear = (button) => {
    expression.textContent = "";
    firstOperand = 0;
    secondOperand = 0;
    operator = undefined;
    sum = undefined;

    if (button) {
        display.textContent = "";
        return;
    };

    display.textContent = 0;
};