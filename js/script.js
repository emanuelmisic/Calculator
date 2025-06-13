let currentOperation = "";
let storage = "";
let history = {
  number: "",
  prevResult: "",
  operator: "",
};
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
  clearHistory();
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
    if (getHistory()) {
      operate(history.prevResult, history.number, history.operator);
    } else {
      operate(storage, getDisplayContent(), currentOperation);
    }
  };

  for (let i = 0; i <= 9; i++) {
    getNumberButton(i).onclick = () => typeNumber(i);
  }
}

function getNumberButton(number) {
  return _getElement(`num${number}`);
}

function squareNumber(value) {
  if (_isDisplayInfinity()) return;
  const number = parseFloat(value);
  setDisplay((number * number).toString());
}

function negateNumber(value) {
  if (_isDisplayInfinity()) return;
  const number = parseFloat(value);
  setDisplay((-number).toString());
}

function deleteNumber(value) {
  if (_isDisplayInfinity()) return;
  if (value.length <= 1) {
    setDisplay("0");
    return;
  }
  setDisplay(value.slice(0, -1));
}

function addComma() {
  if (_isDisplayInfinity()) return;
  const displayContent = getDisplayContent();
  if (!displayContent.includes(".")) addToDisplay(".");
}

function operate(a, b, operator) {
  if (_isDisplayInfinity()) return;
  switch (operator) {
    case "+":
    case "-":
    case "*":
      _performOperationAndUpdateDisplay(a, b, operator);
      break;
    case "/":
      if (b == 0) return;
      _performOperationAndUpdateDisplay(a, b, operator);
      break;
  }
}

function typeNumber(number) {
  if (_isDisplayInfinity()) return;
  if (getDisplayContent() === "0") {
    setDisplay(number.toString());
    return;
  }
  addToDisplay(number.toString());
}

function handleOperation(operator) {
  clearHistory();
  if (_isDisplayInfinity()) return;
  if (!storage) {
    storeValue(getDisplayContent());
    setOperation(operator);
    setDisplay("0");
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
      if (b === 0) return;
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
  if (value.toString().length > 24) return;
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
  const storeElement = _getElement("store");
  storeElement.innerHTML = value;
  storeElement.style = `font-size: ${
    storeElement.textContent.length > 16 ? "1.6rem" : "2rem"
  }`;
}

function setOperator(value) {
  _getElement("operator").innerHTML = value;
}

function getHistory() {
  if (history.number && history.prevResult && history.operator) {
    return history;
  }
}

function clearHistory() {
  history = {
    number: "",
    prevResult: "",
    operator: "",
  };
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
  history = {
    number: b.toString(),
    prevResult: result.toString(),
    operator: operator,
  };
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

function _isDisplayInfinity() {
  return getDisplayContent() === "Infinity";
}
