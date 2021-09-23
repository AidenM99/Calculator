const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector(".input");
const expression = document.querySelector(".expression");
const clearButton = document.querySelector('[data-key="clear"]');
const delButton = document.querySelector('[data-key="delete"]');
const equals = document.querySelector('[data-key="calculate"]');
const previousOperator = [];
const operators = ["+", "-", "x", "÷"];

let firstOperand = 0;
let secondOperand;
let operator;
let sum;

window.addEventListener('load', (event) => {
    display.textContent = 0;
});

// Click event
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        appendNumber(this.textContent);
        buttonAnimation(this.classList[1]);
    });
});

// Keydown event
window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") calcCheck();
    if (e.key == "Delete") clear();
    if (e.key == "Backspace") remove();
    appendNumber(e.key);
    appendOperator(e.key);
    buttonAnimation(e.code);
});

function appendNumber(button) {

    const currentKey = button;

    if (isNaN(currentKey) && currentKey != ".") return;

    if (expression.textContent.includes('=')) {
        clear(button);
    };

    // Replace default '0' with number
    if (display.textContent[0] == 0 && !display.textContent.includes('.')) {
        display.textContent = "";
    };


    // Prevents multiple decimal points
    if (currentKey == '.') {
        if (display.textContent.includes('.')) {
            console.log("Decimal point already present");
            return;
        } else if (display.textContent == "") {
            display.append('0');
        } else {
            display.append(currentKey);
            return;
        };
    };

    display.append(currentKey);

    updateValue(currentKey);
};

// Store value shown on calc display
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
operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        appendOperator(this.textContent);
        buttonAnimation(this.classList[1]);
    });
});

function appendOperator(button) {

    if (!operators.includes(button)) return;

    const currentOperator = button;
    operator = currentOperator;
    previousOperator.push(currentOperator);

    // Replaces current operator on display if clicked in succession
    if (expression.textContent[expression.textContent.length - 1] != "=") {
        const newExpression = expression.textContent.slice(0, expression.textContent.length - 1)
        expression.textContent = newExpression;
    };

    if (expression.textContent.includes('=')) {
        expression.textContent = "";
    };

    // Remove decimal point if last operation when operator is clicked
    if (display.textContent[display.textContent.length - 1] == ".") {
        remove();
    };

    if (display.textContent == secondOperand) {
        expression.textContent = "";
        calculate(firstOperand, secondOperand, previousOperator[previousOperator.length - 2]);
    };

    expression.append(display.textContent, currentOperator);
    display.textContent = "";
    return;
};

equals.addEventListener("click", function () {
    buttonAnimation(this.classList[1]);
    calcCheck();
});

// Checks values before evaluating expression
function calcCheck() {
    if (secondOperand == undefined) secondOperand = firstOperand;
    if (expression.textContent.includes("=")) {
    } else {
        expression.append(secondOperand, '=');
    };
    calculate(firstOperand, secondOperand, operator);
};

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            sum = firstOperand + secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "-":
            sum = firstOperand - secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "x":
            sum = firstOperand * secondOperand;
            display.textContent = sum;
            changeValue(sum);
            break;
        case "÷":
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
    if (sum == secondOperand && expression.textContent.includes(firstOperand)) return;
    return firstOperand = sum;
};

const allClear = clearButton.addEventListener("click", function () {
    clear();
    buttonAnimation(this.classList[1]);
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
};

const del = delButton.addEventListener("click", function () {
    remove();
    buttonAnimation(this.classList[1]);
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

function buttonAnimation(pressedKey) {


    const activeKey = document.querySelector("." + pressedKey);

    activeKey.classList.add("pressed");

    setTimeout(function () {
        activeKey.classList.remove("pressed");
    }, 100);
};

