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
const store = document.querySelector("#store");
const operator = document.querySelector("#operator");

let operation = "";
let storage = "";
let result;

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
deleteBtn.onclick = () => deleteNumber(display.innerHTML);
equalsBtn.onclick = () => operate(storage, display.innerHTML, operation);
addBtn.onclick = () => {
  if (storage == "") {
    storeValue(display.innerHTML);
    display.innerHTML = "0";
    setOperation("+");
  } else {
    setOperation("+");
    operateNext(storage, operation, display.innerHTML);
    // addToStore(display.innerHTML);
  }
};
subtractBtn.onclick = () => {
  storeValue(display.innerHTML);
  display.innerHTML = "0";
  setOperation("-");
};
divideBtn.onclick = () => {
  storeValue(display.innerHTML);
  display.innerHTML = "0";
  setOperation("/");
};
multiplyBtn.onclick = () => {
  storeValue(display.innerHTML);
  display.innerHTML = "0";
  setOperation("*");
};
negativeBtn.onclick = () => negateNumber(display.innerHTML);
squareBtn.onclick = () => squareNumber(display.innerHTML);
commaBtn.onclick = () => addComma();

function clearAll() {
  display.innerHTML = "0";
  operator.innerHTML = "";
  store.innerHTML = "";
  operation = "";
}

function clearScreen() {
  display.innerHTML = "0";
  operator.innerHTML = "";
  store.innerHTML = "";
}

function typeNumber(num) {
  if (display.innerHTML === "0") {
    display.innerHTML = "";
  }
  display.innerHTML += num;
}

function storeValue(value) {
  storage = value;
  store.innerHTML = value;
}

function addToStore(value) {
  const newStorage = parseFloat(storage) + parseFloat(value);
  storage = newStorage;
  store.innerHTML = newStorage;
}

function setOperation(value) {
  operation = `${value}`;
  operator.innerHTML = value;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      result = parseFloat(a) + parseFloat(b);
      clearScreen();
      display.innerHTML = result;
      break;
    case "-":
      result = parseFloat(a) - parseFloat(b);
      clearScreen();
      display.innerHTML = result;
      break;
    case "*":
      result = parseFloat(a) * parseFloat(b);
      clearScreen();
      display.innerHTML = result;
      break;
    case "/":
      if (b != 0) {
        result = parseFloat(a) / parseFloat(b);
        clearScreen();
        display.innerHTML = result;
      } else {
        clearAll();
        alert("Warning! Division by zero is not allowed!");
      }
      break;
    default:
      break;
  }
}

function operateNext(storage, operator, mainDisplay) {
  switch (operator) {
    case "+":
      result = parseFloat(mainDisplay) + parseFloat(storage);
      display.innerHTML = "0";
      storeValue(result);
      break;
    case "-":
      result = parseFloat(a) - parseFloat(b);
      display.innerHTML = "0";
      storeValue(result);
      break;
    case "*":
      result = parseFloat(a) * parseFloat(b);
      display.innerHTML = "0";
      storeValue(result);
      break;
    case "/":
      if (b != 0) {
        result = parseFloat(a) / parseFloat(b);
        display.innerHTML = "0";
        storeValue(result);
      } else {
        clearAll();
        alert("Warning! Division by zero is not allowed!");
      }
      break;
    default:
      break;
  }
}

function negateNumber(value) {
  display.innerHTML = value * -1;
}

function deleteNumber(value) {
  if (display.innerHTML == "0") return;
  else if (display.innerHTML.length == 1 && display.innerHTML != "0")
    display.innerHTML = "0";
  else display.innerHTML = value.slice(0, value.length - 1);
}

function squareNumber(value) {
  display.innerHTML = parseInt(value * value);
}

function addComma() {
  if (display.innerHTML == 0) {
    display.innerHTML = "0.";
  } else if (display.innerHTML.includes(".")) {
    return;
  } else {
    display.innerHTML += ".";
  }
}
