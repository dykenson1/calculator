const inputScreen = document.getElementById("display");
        const buttons = document.querySelectorAll(".button");
        const operators = document.querySelectorAll(".operateur");
        const equal = document.querySelector(".equal");
        const clear = document.querySelector(".cls");

        let currentInput = "";
        let currentOperator = "";
        let previousInput = "";

        function add(a, b) {
            return a + b;
        }
        function subs(a, b) {
            return a - b;
        }
        function mult(a, b) {
            return a * b;
        }
        function divide(a, b) {
            if (b === 0) {
                return "Error: Division by zero";
            }
            return a / b;
        }

        function roundResult(result) {
            return Math.round(result * 100) / 100;
        }

        function operate(val1, op, val2) {
            switch (op) {
                case "+":
                    return roundResult(add(val1, val2));
                case '-':
                    return roundResult(subs(val1, val2));
                case '*':
                    return roundResult(mult(val1, val2));
                case '/':
                    return roundResult(divide(val1, val2));
                default:
                    return "ERROR";
            }
        }

        function display() {
            inputScreen.value = currentInput;
        }

        function clearAll() {
            currentInput = "";
            previousInput = "";
            currentOperator = "";
            display();
        }

        function operato(opera) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = parseFloat(currentInput);
                    currentOperator = opera;
                    currentInput = '';
                } else {
                    let result = operate(previousInput, currentOperator, parseFloat(currentInput));
                    currentInput = result.toString();
                    display(currentInput);
                    currentOperator = opera;
                    previousInput = parseFloat(currentInput);
                    currentInput = '';
                }
            }
        }

        function calculate() {
            if (currentInput !== "" && previousInput !== "" && currentOperator !== "") {
                const result = operate(parseFloat(previousInput), currentOperator, parseFloat(currentInput));
                if (result === "Error: Division by zero") {
                    inputScreen.value = result;
                } else {
                    currentInput = String(result);
                    previousInput = "";
                    currentOperator = "";
                    display();
                }
            }
        }

        
        
        

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.value === "=") {
                    calculate();
                } else if (button.value === "C") {
                    clearAll();
                } else if (button.value === ".") {
                    if (!currentInput.includes('.')) {
                        currentInput += button.value;
                        display();
                    }
                } else if (button.value === "backspace") {
                    currentInput = currentInput.slice(0, -1);
                    display();
                } else {
                    currentInput += button.value;
                    display();
                }
            });
        });
        
        

        operators.forEach(operator => {
            operator.addEventListener("click", () => {
                operato(operator.value);
            });
        });

        clear.addEventListener("click", () => {
            clearAll();
            inputScreen.value = 0
        });

        equal.addEventListener("click", () => {
            calculate();
            previousInput = "";
            currentOperator = "";
            currentInput = ''
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    display();
                }
            } else if (event.key === 'Backspace') {
                currentInput = currentInput.slice(0, -1);
                display();
            } else if (event.key === '/') {
                operato('/');
            }
        });