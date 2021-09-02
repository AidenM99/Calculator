const calcButton = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const calcInput = document.querySelector(".input");
const equals = document.querySelector(".equals");

let operator;
let valueOne;
let valueTwo;

calcButton.forEach(function (button) {
    button.addEventListener("click", function () {
// Show user input on calculator display
        const userInput = calcInput.append(this.innerHTML);        
// Retrieve user inputted values 
        if (!operator) {                                           
            valueOne = +calcInput.innerHTML;                                
            return valueOne;
        } else {                                                         
            valueTwo = +calcInput.innerHTML;
            return valueTwo;
        };
    });
});

// Clear calculator display and reset values
const clear = clearButton.addEventListener("click", function () {   
    calcInput.innerHTML = "";
    valueOne = "";
    valueTwo = "";
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
    calculate(valueOne, valueTwo, operator);
});

// Calculation function
function calculate(valueOne, valueTwo, operator) {                       
    switch (operator) {
        case "add":
            calcInput.innerHTML = valueOne + valueTwo;
            break;
        case "subtract":
            calcInput.innerHTML = valueOne - valueTwo;
            break;
        case "multiply":
            calcInput.innerHTML = valueOne * valueTwo;
            break;
        case "divide":
            calcInput.innerHTML = valueOne / valueTwo;
            break;
        default:
            console.log("Invalid Operator!");
    }
}











