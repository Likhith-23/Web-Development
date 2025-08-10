const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value) {
            currentInput += value;
            display.value = currentInput;
        }

        if (button.id === "equals") {
            try {
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }

        if (button.id === "clear") {
            currentInput = "";
            display.value = "";
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
        currentInput += event.key;
        display.value = currentInput;
    } else if (event.key === "Enter") {
        try {
            currentInput = eval(currentInput).toString();
            display.value = currentInput;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    } else if (event.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (event.key.toLowerCase() === "c") {
        currentInput = "";
        display.value = "";
    }
});
