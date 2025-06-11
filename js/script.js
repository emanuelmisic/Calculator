main();

function main() {
  const screenElements = initScreenElements();
  const functions = initFunctions(screenElements);
  const buttonSet = initButtons(functions);

  let operation = "";
  let storage = "";
  let result;

  initActionButtons(
    buttonSet,
    functions,
    operation,
    storage,
    screenElements.display
  );

  buttonSet.clearBtn.onclick = () => functions.clearAll();
  buttonSet.deleteBtn.onclick = () =>
    functions.deleteNumber(screenElements.display.innerHTML);
  buttonSet.equalsBtn.onclick = () =>
    functions.operate(storage, screenElements.display.innerHTML, operation);
  buttonSet.negativeBtn.onclick = () =>
    functions.negateNumber(screenElements.display.innerHTML);
  buttonSet.squareBtn.onclick = () =>
    functions.squareNumber(screenElements.display.innerHTML);
  buttonSet.commaBtn.onclick = () => functions.addComma();
}

function initButtons(functions) {
  const squareBtn = document.querySelector("#square");
  const negativeBtn = document.querySelector("#negative");
  const divideBtn = document.querySelector("#divide");
  const clearBtn = document.querySelector("#clear");
  const multiplyBtn = document.querySelector("#multiply");
  const subtractBtn = document.querySelector("#subtract");
  const addBtn = document.querySelector("#add");
  const deleteBtn = document.querySelector("#delete");
  const commaBtn = document.querySelector("#comma");
  const equalsBtn = document.querySelector("#equals");

  for (let i = 0; i <= 9; i++) {
    const button = document.querySelector(`#num${i}`);
    button.addEventListener("click", () => {
      functions.typeNumber(i);
    });
  }

  return {
    squareBtn,
    negativeBtn,
    divideBtn,
    clearBtn,
    multiplyBtn,
    subtractBtn,
    addBtn,
    deleteBtn,
    commaBtn,
    equalsBtn,
  };
}

function initScreenElements() {
  const display = document.querySelector("#display");
  const store = document.querySelector("#store");
  const operator = document.querySelector("#operator");

  display.innerHTML = "0";
  store.innerHTML = "";
  operator.innerHTML = "";

  return { display, store, operator };
}

// NEXT TO IMPLEMENT in script2.js
function initActionButtons(buttonSet, functions, operation, storage, display) {
  buttonSet.addBtn.onclick = () => {
    if (storage == "") {
      functions.storeValue(display.innerHTML);
      display.innerHTML = "0";
      functions.setOperation("+");
    } else if (storage != "" && operation == "+") {
      functions.operateNext(storage, operation, display.innerHTML);
    } else if (storage != "" && operation != "+") {
      functions.operateNext(storage, operation, display.innerHTML);
      functions.setOperation("+");
    }
  };

  buttonSet.subtractBtn.onclick = () => {
    if (storage == "") {
      functions.storeValue(display.innerHTML);
      display.innerHTML = "0";
      functions.setOperation("-");
    } else if (storage != "" && operation == "-") {
      functions.operateNext(storage, operation, display.innerHTML);
    } else if (storage != "" && operation != "-") {
      functions.operateNext(storage, operation, display.innerHTML);
      functions.setOperation("-");
    }
  };

  buttonSet.divideBtn.onclick = () => {
    if (storage == "") {
      functions.storeValue(display.innerHTML);
      display.innerHTML = "0";
      functions.setOperation("/");
    } else if (storage != "" && operation == "/") {
      functions.operateNext(storage, operation, display.innerHTML);
    } else if (storage != "" && operation != "/") {
      functions.operateNext(storage, operation, display.innerHTML);
      functions.setOperation("/");
    }
  };

  buttonSet.multiplyBtn.onclick = () => {
    if (storage == "") {
      functions.storeValue(display.innerHTML);
      display.innerHTML = "0";
      functions.setOperation("*");
    } else if (storage != "" && operation == "*") {
      functions.operateNext(storage, operation, display.innerHTML);
    } else if (storage != "" && operation != "*") {
      functions.operateNext(storage, operation, display.innerHTML);
      functions.setOperation("*");
    }
  };
}

function initFunctions(screenElements) {
  function clearAll() {
    screenElements.display.innerHTML = "0";
    screenElements.operator.innerHTML = "";
    store.innerHTML = "";
    operation = "";
    storage = "";
  }

  function clearScreen() {
    screenElements.display.innerHTML = "0";
    screenElements.operator.innerHTML = "";
    store.innerHTML = "";
  }

  function typeNumber(num) {
    if (screenElements.display.innerHTML === "0") {
      screenElements.display.innerHTML = "";
    }
    screenElements.display.innerHTML += num;
  }

  function storeValue(value) {
    storage = value;
    store.innerHTML = value;
  }

  function setOperation(value) {
    operation = `${value}`;
    screenElements.operator.innerHTML = value;
  }

  function operate(a, b, operator) {
    switch (operator) {
      case "+":
        result = parseFloat(a) + parseFloat(b);
        clearScreen();
        display.innerHTML = result;
        storage = "";
        break;
      case "-":
        result = parseFloat(a) - parseFloat(b);
        clearScreen();
        display.innerHTML = result;
        storage = "";
        break;
      case "*":
        result = parseFloat(a) * parseFloat(b);
        clearScreen();
        display.innerHTML = result;
        storage = "";
        break;
      case "/":
        if (b != 0) {
          result = parseFloat(a) / parseFloat(b);
          clearScreen();
          display.innerHTML = result;
          storage = "";
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
        result = parseFloat(storage) + parseFloat(mainDisplay);
        display.innerHTML = "0";
        storeValue(result);
        break;
      case "-":
        result = parseFloat(storage) - parseFloat(mainDisplay);
        display.innerHTML = "0";
        storeValue(result);
        break;
      case "*":
        result = parseFloat(storage) * parseFloat(mainDisplay);
        display.innerHTML = "0";
        storeValue(result);
        break;
      case "/":
        if (mainDisplay != 0) {
          result = parseFloat(storage) / parseFloat(mainDisplay);
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

  return {
    clearAll,
    clearScreen,
    typeNumber,
    storeValue,
    setOperation,
    operate,
    operateNext,
    negateNumber,
    deleteNumber,
    squareNumber,
    addComma,
  };
}
