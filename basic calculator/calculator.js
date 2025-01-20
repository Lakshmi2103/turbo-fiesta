let expression = "";
const buttons = document.querySelectorAll(".calc-btn");
const display = document.querySelector(".calc-display");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      expression = "";
    } else if (button.classList.contains("equals")) {
      try {
        expression = eval(expression);
      } catch {
        expression = "Error";
      }
    } else {
      expression += value;
    }

    display.value = expression;
  });
});