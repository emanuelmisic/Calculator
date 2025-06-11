let operation = "";
let storage = "";
main();

function main() {
  clearAll();
  initButtons();
}

function clearAll() {
  setDisplay("0");
  setStore("");
  setOperator("");
  operation = "";
  storage = "";
}

function clearScreen() {
  setDisplay("0");
  setStore("");
  setOperator("");
}

function initButtons() {
  _getElement("square").onclick = () => squareNumber(getDisplayContent());
  _getElement("negative").onclick = () => negateNumber(getDisplayContent());
  _getElement("divide").onclick = () => {};
  _getElement("clear").onclick = () => clearAll();
  _getElement("multiply").onclick = () => {};
  _getElement("subtract").onclick = () => {};
  _getElement("add").onclick = () => {};
  _getElement("delete").onclick = () => deleteNumber(getDisplayContent());
  _getElement("comma").onclick = () => addComma();
  _getElement("equals").onclick = () => {
    operate(storage, getDisplayContent(), operation);
  };

  for (let i = 0; i <= 9; i++) {
    getNumberButton(i).addEventListener("click", () => {
      typeNumber(i);
    });
  }
}

function getNumberButton(number) {
  return _getElement(`num${number}`);
}

function squareNumber(value) {
  const number = parseFloat(value);
  if (isNaN(number)) return;
  setDisplay((number * number).toString());
}

function negateNumber(value) {
  const number = parseFloat(value);
  if (isNaN(number)) return;
  setDisplay((-number).toString());
}

function deleteNumber(value) {
  if (value.length <= 1) {
    setDisplay("0");
    return;
  }
  setDisplay(value.slice(0, -1));
}

function addComma() {
  const displayContent = getDisplayContent();
  if (!displayContent.includes(".")) addToDisplay(".");
}

function operate(a, b, operation) {
  switch (operation) {
    case "+":
      performOperationAndUpdateDisplay(a, b, "+");
      break;
    case "-":
      performOperationAndUpdateDisplay(a, b, "-");
      break;
    case "*":
      performOperationAndUpdateDisplay(a, b, "*");
      break;
    case "/":
      if (b == 0) {
        clearAll();
        alert("Warning! Division by zero is not allowed!");
      }
      performOperationAndUpdateDisplay(a, b, "/");
      break;
  }
}

function typeNumber(number) {
  if (getDisplayContent() === "0") {
    setDisplay(number.toString());
    return;
  }
  addToDisplay(number.toString());
}

function performOperationAndUpdateDisplay(a, b, operator) {
  let result;
  switch (operator) {
    case "+":
      result = parseFloat(a) + parseFloat(b);
      break;
    case "-":
      result = parseFloat(a) - parseFloat(b);
      break;
    case "*":
      result = parseFloat(a) * parseFloat(b);
      break;
    case "/":
      result = parseFloat(a) / parseFloat(b);
      break;
  }
  clearScreen();
  setDisplay(result.toString());
  storage = "";
}

function getDisplayContent() {
  return _getElement("display").innerHTML;
}

function setDisplay(value) {
  _getElement("display").innerHTML = value;
}

function addToDisplay(value) {
  _getElement("display").innerHTML += value;
}

function setStore(value) {
  _getElement("store").innerHTML = value;
}

function setOperator(value) {
  _getElement("store").innerHTML = value;
}

function _getElement(name) {
  return document.querySelector(`#${name}`);
}
