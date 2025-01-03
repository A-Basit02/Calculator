const display = document.getElementById('calc-display');

// Appends a value to the display at the cursor's current position
function appendValue(value) {
    const start = display.selectionStart || display.value.length;
    const end = display.selectionEnd || display.value.length;
    const currentValue = display.value;

    // Insert the value at the cursor position
    display.value =
        currentValue.substring(0, start) + value + currentValue.substring(end);

    // Update cursor position
    display.setSelectionRange(start + value.length, start + value.length);
}

// Clears the entire display
function clearDisplay() {
    display.value = '';
}

// Erases the last character from the display
function eraseLast() {
    const start = display.selectionStart || display.value.length;
    const end = display.selectionEnd || display.value.length;

    if (start === end) {
        // No selection, remove the character before the cursor
        display.value =
            display.value.slice(0, start - 1) + display.value.slice(end);
        display.setSelectionRange(start - 1, start - 1);
    } else {
        // If a selection exists, delete the selection
        display.value =
            display.value.slice(0, start) + display.value.slice(end);
        display.setSelectionRange(start, start);
    }

    if (display.value === '') {
        display.value = '0';
    }
}

// Evaluates the expression using BODMAS
function calculate() {
    try {
        // Parse and evaluate the expression using Function constructor for BODMAS
        const expression = display.value.replace('×', '*').replace('÷', '/');
        display.value = new Function(`return (${expression})`)();
    } catch (error) {
        display.value = 'Error';
    }
}
