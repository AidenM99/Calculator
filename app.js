const calcInput = document.querySelector(".input");
const calcButton = document.querySelectorAll(".calculator-button");
const clearButton = document.querySelector(".clear");

calcButton.forEach (function(button) {                    //Shows user input on calculator display
    button.addEventListener("click", function() {       
        calcInput.append(this.innerHTML);
    });
});

clearButton.addEventListener("click", function() {   //Clear calculator display
    calcInput.innerHTML = "";
});