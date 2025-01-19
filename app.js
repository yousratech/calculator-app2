document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.textContent = '0';
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            } else if (value === '=') {
                if (firstOperand !== null && operator && currentInput) {
                    const secondOperand = parseFloat(currentInput);
                    display.textContent = calculate(firstOperand, operator, secondOperand);
                    currentInput = '';
                    operator = '';
                    firstOperand = null;
                    confettiEffect();
                }
            } else {
                if (display.textContent === '0') {
                    display.textContent = '';
                }
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(first, operator, second) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return second !== 0 ? first / second : 'Error';
            default:
                return second;
        }
    }

    function confettiEffect() {
        confetti({
            particleCount: 2000,
            spread: 700,
            origin: { y: 0.9 }
        });
    }
});