const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".user-input");
const expression = document.querySelector(".user-expression");
const clearButton = document.querySelector('[data-key="clear"]');
const equals = document.querySelector('[data-key="calculate"]');
const previousOperator = [];

let firstOperation = true;
let firstOperand;
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

        if (firstOperation) {
            firstInputCheck(currentKey);
            return;
        };

        // Prevents multiple decimal points
        if (currentKey == '.') {
            if (display.textContent.includes('.')) {
                console.log("Decimal point already present");
                return;
            } else if (display.textContent == "") {
                display.append('0');
            };
        };

        // Store user inputted values 
        if (!operator) {
            display.append(this.textContent);
            firstOperand = parseFloat(display.textContent);
            return firstOperand;
        } else {
            if (display.textContent == firstOperand) {
                display.textContent = " ";
            };
            display.append(this.textContent);
            secondOperand = parseFloat(display.textContent);
            return secondOperand;
        };
    });
});

// Checks the first input
function firstInputCheck(button) {
    const reg = /[1-9]/g;
    // If number is 0, do nothing
    if (button === '0') {
        return;
    };
    // If decimal, append to 0
    if (button === '.') {
        display.append(button);
        firstOperand = parseFloat(display.textContent);
    };
    // First operand set to 0 if operator already exists
    if (operator) {
        firstOperand = 0;
        secondOperand = parseFloat(display.textContent);
    }
    // If number, replace 0
    if (button.match(reg)) {
        display.textContent = button;
        firstOperand = parseFloat(display.textContent);
    };
    firstOperation = false;
    return;
};


const clear = clearButton.addEventListener("click", function () {
    firstOperation = true;
    display.textContent = 0;
    expression.textContent = "";
    firstOperand = undefined;
    secondOperand = undefined;
    operator = undefined;
    sum = undefined;
});

// Retrieve operator
operators.forEach(function (sign) {
    sign.addEventListener("click", function () {

        operator = this.dataset.key;
        previousOperator.push(operator)

        if (firstOperation) {
            firstInputCheck(sign.textContent);
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
    return firstOperand = sum;
};