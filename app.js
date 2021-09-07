const calcButton = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calcInput = document.querySelector(".input");
const clearButton = document.querySelector('[data-key="clear"]');
const equals = document.querySelector('[data-key="calculate"]');

let firstOperand;
let secondOperand;
let operator;
let sum;
let firstOperation = true;

// Calculator displays '0' by default
window.addEventListener('load', (event) => {
    calcInput.innerHTML = 0;
});

calcButton.forEach(function (button) {
    button.addEventListener("click", function () {
        if (firstOperation) {
            firstInputCheck(button.innerHTML);
            return;
        }
        // Show user input on calculator display
        calcInput.append(this.innerHTML);
        // Store user inputted values 
        if (!operator) {
            firstOperand = parseFloat(calcInput.innerHTML);
            return firstOperand;
        } else {
            secondOperand = parseFloat(calcInput.innerHTML);
            return secondOperand;
        };
    });
});

// Checks the first value a user inputs
function firstInputCheck(button) {
    if (firstOperation) {
        // If decimal, append to 0
        if (button === '.') {
            calcInput.append(button);
            firstOperand = parseFloat(calcInput.innerHTML);
            firstOperation = false;
            return;
        };
        // If number, replace 0
        calcInput.innerHTML = button;
        firstOperand = parseFloat(calcInput.innerHTML);
        firstOperation = false;
        return;
    };
};

// Clear calculator display and reset values
const clear = clearButton.addEventListener("click", function () {
    calcInput.innerHTML = 0;
    firstOperand = "";
    secondOperand = "";
    operator = "";
    firstOperation = true;
});

// Retrieve operator
operators.forEach(function (button) {
    button.addEventListener("click", function () {
        calcInput.innerHTML = "";
        operator = this.dataset.key;
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









