let display = document.getElementById('display');
let preview = document.getElementById('preview');
let memory = 0;
let memoryHistory = [];
let currentExpression = '';
let originalValue = null; // To store the original decimal value
let isEqualPressed = false;
let isMemoryRecalled = false; // New flag to track memory recall

function appendNumber(number) {
    // If display shows memory value or calculation result, reset it before appending
    if (isMemoryRecalled || isEqualPressed) {
        display.textContent = ''; // Clear display
        isMemoryRecalled = false; // Reset memory recall flag
        isEqualPressed = false; // Reset calculation result flag
    }

    if (display.textContent === '0' && number !== '.') {
        display.textContent = number; // Replace 0 with the number
    } else if (display.textContent === '0' && number === '.') {
        display.textContent = '0.'; // Append decimal point to 0
    } else if (number === '.' && display.textContent.includes('.')) {
        return; // Prevent multiple decimal points
    } else {
        display.textContent += number; // Append the number
    }
    originalValue = parseFloat(display.textContent); // Update original value
    updatePreview();
}

function setOperator(operator) {
    if (isEqualPressed) {
        currentExpression = display.textContent;
        isEqualPressed = false;
    }
    const currentValue = display.textContent;
    currentExpression += ` ${currentValue} ${operator}`;
    display.textContent = '0';
    updatePreview();
}

function calculate() {
    currentExpression += ` ${display.textContent}`;
    try {
        const result = eval(currentExpression.replace(/÷/g, '/').replace(/×/g, '*'));
        display.textContent = Number.isInteger(result) ? result : result.toFixed(5);
        preview.textContent = currentExpression + ' =';
        currentExpression = '';
        originalValue = parseFloat(display.textContent); // Update original value
    } catch {
        alert('Error in calculation');
    }
    isEqualPressed = true;
}

function calculatePercentage() {
    const value = parseFloat(display.textContent) / 100;
    display.textContent = value.toString();
    originalValue = value; // Update original value
    updatePreview();
}

function toggleSign() {
    const value = parseFloat(display.textContent);
    display.textContent = (-value).toString();
    originalValue = -value; // Update original value
    updatePreview();
}

function clearDisplay() {
    display.textContent = '0';
    preview.textContent = '0';
    currentExpression = '';
    originalValue = null; // Clear original value
    isEqualPressed = false;
    isMemoryRecalled = false; // Reset memory recall flag
}

function updatePreview() {
    preview.textContent = currentExpression + ` ${display.textContent}`;
}

// Memory Functions
document.getElementById('ms').onclick = function () {
    memory = parseFloat(display.textContent);
    memoryHistory.push(memory);
};

document.getElementById('mr').onclick = function () {
    display.textContent = memory.toString();
    originalValue = memory; // Update original value
    isMemoryRecalled = true; // Set memory recall flag
    updatePreview();
};

document.getElementById('mplus').onclick = function () {
    memory += parseFloat(display.textContent);
};

document.getElementById('mminus').onclick = function () {
    memory -= parseFloat(display.textContent);
};

// Conversion Functions
function decimalToBinary() {
    if (originalValue === null) originalValue = parseFloat(display.textContent); // Set original value if not set
    const binaryValue = (originalValue >>> 0).toString(2);
    display.textContent = binaryValue;
    preview.textContent = `${binaryValue}`;
    isEqualPressed = true;
}

function decimalToOctal() {
    if (originalValue === null) originalValue = parseFloat(display.textContent); // Set original value if not set
    const octalValue = (originalValue >>> 0).toString(8);
    display.textContent = octalValue;
    preview.textContent = `${octalValue}`;
    isEqualPressed = true;
}

function decimalToHexadecimal() {
    if (originalValue === null) originalValue = parseFloat(display.textContent); // Set original value if not set
    const hexValue = (originalValue >>> 0).toString(16).toUpperCase();
    display.textContent = hexValue;
    preview.textContent = `${hexValue}`;
    isEqualPressed = true;
}


// Event Listeners for Conversion Buttons
document.querySelector('.numberSystem:nth-child(1)').onclick = decimalToBinary;
document.querySelector('.numberSystem:nth-child(2)').onclick = decimalToOctal;
document.querySelector('.numberSystem:nth-child(3)').onclick = decimalToHexadecimal;
