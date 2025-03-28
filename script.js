const resultBox = document.getElementById('result-box');

function appendValue(value) {
    // Append the provided value (like (), numbers, operators) to the result box
    resultBox.value += value;
}


function clearAll() {
    resultBox.value = '';
}

function clearResult() {
    resultBox.value = resultBox.value.slice(0, -1);
}

function toggleSign() {
    const expression = resultBox.value;
    const cursorPosition = resultBox.selectionStart;

    if (cursorPosition === 0 || expression[cursorPosition - 1] === '(') {
        resultBox.value = expression.slice(0, cursorPosition) + '-' + expression.slice(cursorPosition);
    } else if (expression[cursorPosition - 1] === '-') {
        resultBox.value = expression.slice(0, cursorPosition - 1) + expression.slice(cursorPosition);
    } else {
        resultBox.value = expression.slice(0, cursorPosition) + '(-' + expression.slice(cursorPosition);
    }

    resultBox.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
}

function calculateResult() {
    try {
        resultBox.value = eval(resultBox.value);
    } catch (error) {
        resultBox.value = 'Error';
    }
}

let parenthesesCount = 0;

function appendParentheses() {
    if (parenthesesCount === 0 || resultBox.value.endsWith('(')) {
        resultBox.value += '(';
        parenthesesCount++;
    } else if (parenthesesCount > 0 && !resultBox.value.endsWith('(')) {
        resultBox.value += ')';
        parenthesesCount--;
    }
}

//for keyboard to display
document.addEventListener("keydown", (event) => {
    const allowedKeys = "0123456789+-*/().%";
    const resultBox = document.getElementById("result-box");

    if (allowedKeys.includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        clearResult();
    } else if (event.key === "c") {
        clearAll();
    }
});