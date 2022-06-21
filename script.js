const squareBtn = document.querySelector("#square");
const negativeBtn = document.querySelector("#negative");
const divideBtn = document.querySelector("#divide");
const clearBtn = document.querySelector("#clear");
const num7Btn = document.querySelector("#num7");
const num8Btn = document.querySelector("#num8");
const num9Btn = document.querySelector("#num9");
const multiplyBtn = document.querySelector("#multiply");
const num4Btn = document.querySelector("#num4");
const num5Btn = document.querySelector("#num5");
const num6Btn = document.querySelector("#num6");
const subtractBtn = document.querySelector("#subtract");
const num1Btn = document.querySelector("#num1");
const num2Btn = document.querySelector("#num2");
const num3Btn = document.querySelector("#num3");
const addBtn = document.querySelector("#add");
const deleteBtn = document.querySelector("#delete");
const num0Btn = document.querySelector("#num0");
const commaBtn = document.querySelector("#comma");
const equalsBtn = document.querySelector("#equals");

const display = document.querySelector("#display");

let operation = "";

num1Btn.onclick = () => typeNumber(1);
num2Btn.onclick = () => typeNumber(2);
num3Btn.onclick = () => typeNumber(3);
num4Btn.onclick = () => typeNumber(4);
num5Btn.onclick = () => typeNumber(5);
num6Btn.onclick = () => typeNumber(6);
num7Btn.onclick = () => typeNumber(7);
num8Btn.onclick = () => typeNumber(8);
num9Btn.onclick = () => typeNumber(9);
num0Btn.onclick = () => typeNumber(0);
clearBtn.onclick = () => clearAll();

function clearAll() {
  display.innerHTML = "0";
}

function typeNumber(num) {
  if (display.innerHTML === "0") {
    display.innerHTML = "";
  }
  display.innerHTML += num;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      a + b;
    case "-":
      a - b;
    case "*":
      a * b;
    case "/":
      a / b;
    default:
      break;
  }
}