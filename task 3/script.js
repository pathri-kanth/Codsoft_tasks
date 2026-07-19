let currentExpression = "";
const screen = document.getElementById("screen");

// Appends a number to the display
function appendNumber(num) {
    if (currentExpression === "0") {
        currentExpression = num;
    } else {
        currentExpression += num;
    }
    updateScreen();
}

// Appends an operator to the display safely
function appendOperator(op) {
    if (currentExpression === "") return;
    
    // Check if the last character is already an operator
    const lastChar = currentExpression.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        // Replace the old operator with the new one
        currentExpression = currentExpression.slice(0, -1) + op;
    } else {
        currentExpression += op;
    }
    updateScreen();
}

// Clears the entire input screen
function clearScreen() {
    currentExpression = "0";
    updateScreen();
}

// Updates the HTML screen view
function updateScreen() {
    screen.innerText = currentExpression || "0";
}

// Evaluates the math calculation
function calculate() {
    try {
        if (currentExpression === "") return;
        
        // Evaluate expression safely
        let result = Function('"use strict";return (' + currentExpression + ')')();
        
        // Handle division by zero or errors
        if (result === Infinity || isNaN(result)) {
            currentExpression = "Error";
        } else {
            // Keep decimal places reasonable
            currentExpression = Number(result.toFixed(4)).toString();
        }
    } catch (error) {
        currentExpression = "Error";
    }
    updateScreen();
}
