let display = document.getElementById('display'); 
let memory = 0; 
let currentOperator = null; 
let isOperatorPressed = false; 
let isEqualPressed = false; 
let memoryHistory = []; //array to store memory values


function appendNumber(number) {
    if (number === '.' && display.textContent.includes('.')) {
        return; 
    }
    if (display.textContent === '0' || isOperatorPressed || isEqualPressed) {
        display.textContent = number; 
        isEqualPressed = false; 
    } else {
        display.textContent += number;
    }
    isOperatorPressed = false; 
}

function setOperator(operator) {
    if (currentOperator != null) {
        calculate(); 
    }
    memory = parseFloat(display.textContent); // Store value
    currentOperator = operator; 
    isOperatorPressed = true; 
    isEqualPressed = false; 
}

function calculate() {
    if (currentOperator == null) {
        return; 
    }
    let currentValue = parseFloat(display.textContent); // get the value
    if (currentOperator == '+') {
        display.textContent = memory + currentValue; // add
    } else if (currentOperator == '-') {
        display.textContent = memory - currentValue; // minus
    } else if (currentOperator == '*') {
        display.textContent = memory * currentValue; //mutiply
    } else if (currentOperator == '/') {
        if (currentValue == 0) {
            alert('Cannot divide by zero!');
            return;
        }
        display.textContent = memory / currentValue; //divide
    }
    currentOperator = null; 
    isEqualPressed = true; 
}

function clearDisplay() {
    //Reset
    display.textContent = '0'; 
    currentOperator = null;
}

document.getElementById('ms').onclick = function () {
    memory = parseFloat(display.textContent); // Store (memory)
    memoryHistory.push(`${memory}`);
    alert('Stored ' + memory + ' in memory.'); 
};

document.getElementById('mr').onclick = function () {
    // Recall memory value to display
    alert('Recalled ' + memory + ' from memory.');
   display.textContent = memory; //redisplay the content on memory read
};

document.getElementById('mplus').onclick = function () {
    memory = memory + parseFloat(display.textContent); // Add (memory)
    alert('Added to memory. New memory value: ' + memory); 
    memoryHistory.push(`${memory}`);
};

document.getElementById('mminus').onclick = function () {
    memory = memory - parseFloat(display.textContent); // Subtract (memory)
    alert('Subtracted from memory. New memory value: ' + memory); 
    memoryHistory.push(`${memory}`);
};

document.getElementById('mc').onclick = function () {
    memory = 0; // Reset
    alert('Memory cleared.'); 
};

function decimalToBinary() {
    let currentValue = parseFloat(display.textContent);
    display.textContent = (currentValue >>> 0).toString(2);
    isEqualPressed = true;
}

function decimalToOctal() {
    let currentValue = parseFloat(display.textContent);
    display.textContent = (currentValue >>> 0).toString(8);
    isEqualPressed = true; 
}

function decimalToHexadecimal() {
    let currentValue = parseFloat(display.textContent);
    display.textContent = (currentValue >>> 0).toString(16).toUpperCase();
    isEqualPressed = true;
}

document.getElementById('historyButton').onclick = function () {
    const historyContent = memoryHistory.join('\n') || 'No history available.';
    alert(historyContent);
};


document.getElementById('backSpace').onclick = function() {
    if (display.textContent.length > 1) {
        let textArray = display.textContent.split(''); 
        textArray.pop(); 
        display.textContent = textArray.join('');
    } else {        
        display.textContent = '0';
    }
};