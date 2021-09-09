const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calcInput = document.querySelector(".user-input");
const expression = document.querySelector(".user-expression");
const clearButton = document.querySelector('[data-key="clear"]');
const equals = document.querySelector('[data-key="calculate"]');

let firstOperation = true;
let firstOperand;
let secondOperand;
let operator;
let sum;

// Calculator displays '0' by default
window.addEventListener('load', (event) => {
    calcInput.innerHTML = 0;
});

numbers.forEach(function (button) {
    button.addEventListener("click", function () {

        const currentKey = button.innerHTML;
        const previousKey = calcInput.innerHTML[calcInput.innerHTML.length - 1];
        const display = calcInput.innerHTML;

        if (firstOperation) {
            firstInputCheck(currentKey);
            return;
        };

        // Prevents multiple decimal points
        if (currentKey == '.' && display.includes('.')) {
            console.log("Decimal point already present");
            return;
        };

        expression.append(this.innerHTML);

        // Store user inputted values 
        if (!operator) {
            calcInput.append(this.innerHTML);
            firstOperand = parseFloat(calcInput.innerHTML);
            return firstOperand;
        } else {
            if (calcInput.innerHTML == firstOperand) {
                calcInput.innerHTML = "";
            };
            calcInput.append(this.innerHTML);
            secondOperand = parseFloat(calcInput.innerHTML);
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
        calcInput.append(button);
        firstOperand = parseFloat(calcInput.innerHTML);
    };
    // First operand set to 0 if operator already exists
    if (operator) {
        firstOperand = 0;
        secondOperand = parseFloat(calcInput.innerHTML);
    }
    // If number, replace 0
    if (button.match(reg)) {
        calcInput.innerHTML = button;
        firstOperand = parseFloat(calcInput.innerHTML);
    };
    expression.append(firstOperand);
    firstOperation = false;
    return;
};


const clear = clearButton.addEventListener("click", function () {
    calcInput.innerHTML = 0;
    firstOperand = "";
    secondOperand = "";
    operator = "";
    firstOperation = true;
});

// Retrieve operator
operators.forEach(function (sign) {
    sign.addEventListener("click", function () {
        operator = this.dataset.key;
        if (firstOperation) {
            firstInputCheck(sign.innerHTML);
        };
        expression.append(this.innerHTML);
        return operator;
    });
});

equals.addEventListener("click", function () {
    calculate(firstOperand, secondOperand, operator);
});

// Calculation function
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "add":
            sum = firstOperand + secondOperand;
            calcInput.innerHTML = sum;
            changeValue(sum);
            break;
        case "subtract":
            sum = firstOperand - secondOperand;
            calcInput.innerHTML = sum;
            changeValue(sum);
            break;
        case "multiply":
            sum = firstOperand * secondOperand;
            calcInput.innerHTML = sum;
            changeValue(sum);
            break;
        case "divide":
            sum = firstOperand / secondOperand;
            calcInput.innerHTML = sum;
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









