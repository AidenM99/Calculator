const calcButton = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const calcInput = document.querySelector(".input");
const equals = document.querySelector(".equals");

let operator;
let firstOperand;
let secondOperand;
let sum;

calcButton.forEach(function (button) {
    button.addEventListener("click", function () {
        // Show user input on calculator display
        const userInput = calcInput.append(this.innerHTML);
        // Retrieve user inputted values 
        if (!operator) {
            firstOperand = +calcInput.innerHTML;
            return firstOperand;
        } else {
            secondOperand = +calcInput.innerHTML;
            return secondOperand;
        };
    });
});

// Clear calculator display and reset values
const clear = clearButton.addEventListener("click", function () {
    calcInput.innerHTML = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
});

// Retrieve operator
operators.forEach(function (button) {
    button.addEventListener("click", function () {
        calcInput.innerHTML = "";
        operator = this.id;
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
    }
};

// Change ValueOne to equal the sum of last input for long expressions
function changeValue(sum) {
    return firstOperand = sum;
}









