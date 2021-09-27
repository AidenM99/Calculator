const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const expression = document.querySelector(".expression");
const delButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const display = document.querySelector(".input");
const operators = ["+", "-", "x", "÷", "/", "*"];
const previousOperator = [];


let firstOperand = 0;
let secondOperand;
let operator;
let sum;


window.addEventListener('load', () => {
    display.textContent = 0;
});


numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        appendNumber(e.target.textContent);
        buttonAnimation(e.target.classList[1]);
    });
});


operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        appendOperator(e.target.textContent);
        buttonAnimation(e.target.classList[1]);
    });
});


equals.addEventListener("click", (e) => {
    calcCheck();
    buttonAnimation(e.target.classList[1]);
});


clearButton.addEventListener("click", (e) => {
    clear();
    buttonAnimation(e.target.classList[1]);
});


delButton.addEventListener("click", (e) => {
    remove();
    buttonAnimation(e.target.classList[1]);
});


window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") calcCheck();
    if (e.key == "Delete") clear();
    if (e.key == "Backspace") remove();
    appendNumber(e.key);
    appendOperator(e.key);
    buttonAnimation(e.code, e.shiftKey);
});


function appendNumber(button) {
    const currentKey = button;

    if (isNaN(currentKey) && currentKey != ".") return;

    if (display.textContent.includes("You")) clear();

    if (expression.textContent.includes('=')) clear(button);

    // Replace default '0' with number
    if (display.textContent[0] == 0 && !display.textContent.includes('.')) {
        display.textContent = "";
    };

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

    updateValue();
};

// Store value shown on calc display
function updateValue() {
    if (!operator) {
        firstOperand = parseFloat(display.textContent);
        return firstOperand;
    } else {
        secondOperand = parseFloat(display.textContent);
        return secondOperand;
    };
};


function appendOperator(button) {
    if (!operators.includes(button)) return;

    if (display.textContent.includes("You")) clear();

    const currentOperator = button;
    operator = currentOperator;
    previousOperator.push(currentOperator);

    // Replaces current operator on display if clicked in succession
    if (expression.textContent[expression.textContent.length - 1] != "=") {
        const newExpression = expression.textContent.slice(0, expression.textContent.length - 1);
        expression.textContent = newExpression;
    };

    if (expression.textContent.includes('=')) {
        expression.textContent = "";
    };

    if (display.textContent[display.textContent.length - 1] == ".") remove();

    // Call calculate function if operator is clicked with first and second operand present
    if (display.textContent == secondOperand) {
        expression.textContent = "";
        calculate(firstOperand, secondOperand, previousOperator[previousOperator.length - 2]);
    };

    // Change keyboard divide and multiply symbols to display properly
    if (currentOperator == "/") {
        expression.append(display.textContent, "÷")
    } else if (currentOperator == "*") {
        expression.append(display.textContent, "x")
    } else {
        expression.append(display.textContent, currentOperator);
    }
    display.textContent = "";
    return;
};


// Checks values before evaluating expression
function calcCheck() {
    if (secondOperand == undefined) secondOperand = firstOperand;

    if (operator == "*") operator = "x";
    if (operator == "/") operator = "÷";

    if (expression.textContent.includes("=")) {
        if (!expression.textContent.includes(operator)) {
            return;
        } else {
            expression.textContent = sum + operator + secondOperand + "=";
        };
    };

    if (secondOperand == 0) {
        if (operator == "÷" || operator == "/") {
            display.textContent = "You cannot divide by 0";
            return;
        };
    };

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
            break;
        case "-":
            sum = firstOperand - secondOperand;
            break;
        case "x":
        case "*":
            sum = firstOperand * secondOperand;
            break;
        case "÷":
        case "/":
            sum = firstOperand / secondOperand;
            break;
        default:
            sum = firstOperand;
    };
    sum = Number((sum).toFixed(3));
    display.textContent = sum;
    changeValue(sum);
};


// Change firstOperand to equal the sum of last input for long expressions
function changeValue(sum) {
    if (sum == secondOperand && expression.textContent.includes(firstOperand)) return;
    return firstOperand = sum;
};


function clear(button) {
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


function remove() {
    const newDisplay = display.textContent.slice(0, display.textContent.length - 1);

    if (expression.textContent.includes('=')) {
        return expression.textContent = "";
    };

    if (display.textContent == sum) return;

    display.textContent = newDisplay;

    if (display.textContent.length == 0) {
        display.textContent = 0;
    };

    updateValue();
};


function buttonAnimation(pressedKey, shiftKey) {
    let activeKey;

    if (shiftKey == true && pressedKey == "Digit8") {
        activeKey = document.querySelector("." + "multiply");
    };
    if (shiftKey == false && pressedKey == "Equal") {
        return;
    } else {
        activeKey = document.querySelector("." + pressedKey);
    };

    if (!activeKey) return;

    activeKey.classList.add("pressed");

    setTimeout(function () {
        activeKey.classList.remove("pressed");
    }, 100);
};