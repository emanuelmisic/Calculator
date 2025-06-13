let currentOperation = "";
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
  currentOperation = "";
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
  _getElement("divide").onclick = () => handleOperation("/");
  _getElement("clear").onclick = () => clearAll();
  _getElement("multiply").onclick = () => handleOperation("*");
  _getElement("subtract").onclick = () => handleOperation("-");
  _getElement("add").onclick = () => handleOperation("+");
  _getElement("delete").onclick = () => deleteNumber(getDisplayContent());
  _getElement("comma").onclick = () => addComma();
  _getElement("equals").onclick = () => {
    operate(storage, getDisplayContent(), currentOperation);
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

function operate(a, b, operator) {
  switch (operator) {
    case "+":
    case "-":
    case "*":
      _performOperationAndUpdateDisplay(a, b, operator);
      break;
    case "/":
      if (b == 0) {
        clearAll();
        alert("Warning! Division by zero is not allowed!");
      }
      _performOperationAndUpdateDisplay(a, b, operator);
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

function handleOperation(operator) {
  if (!storage) {
    storeValue(getDisplayContent());
    setDisplay("0");
    setOperation(operator);
  } else if (storage && currentOperation == operator) {
    operateNext(storage, currentOperation, getDisplayContent());
  } else if (storage && currentOperation != operator) {
    operateNext(storage, currentOperation, getDisplayContent());
    setOperation(operator);
  }
}

function operateNext(a, b, operator) {
  switch (operator) {
    case "+":
    case "-":
    case "*":
      _performOperationAndStoreValue(a, b, operator);
      break;
    case "/":
      if (b === 0) {
        clearAll();
        alert("Warning! Division by zero is not allowed!");
      }
      _performOperationAndStoreValue(a, b, operator);
      break;
  }
}

function storeValue(value) {
  storage = value;
  setStore(value);
}

function setOperation(value) {
  currentOperation = value;
  setOperator(value);
}

function getDisplayContent() {
  return _getElement("display").innerHTML;
}

function setDisplay(value) {
  const displayElement = _getElement("display");
  if (displayElement.textContent.length > 24) return;
  displayElement.innerHTML = value;
  displayElement.style = `font-size: ${
    displayElement.textContent.length > 16 ? "1.6rem" : "2rem"
  }`;
}

function addToDisplay(value) {
  const displayElement = _getElement("display");
  if (displayElement.textContent.length > 24) return;
  displayElement.innerHTML += value;
  displayElement.style = `font-size: ${
    displayElement.textContent.length > 16 ? "1.6rem" : "2rem"
  }`;
}

function setStore(value) {
  _getElement("store").innerHTML = value;
}

function setOperator(value) {
  _getElement("operator").innerHTML = value;
}

function _performOperationAndUpdateDisplay(a, b, operator) {
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

function _performOperationAndStoreValue(a, b, operator) {
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
  storeValue(result);
  setDisplay(result.toString());
}

function _getElement(name) {
  return document.querySelector(`#${name}`);
}
