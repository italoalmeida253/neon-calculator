window.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") deleteChar();
  if (e.key == "Enter") showResult();
  if (e.key == "+") addChar(e.key);
  if (e.key == "-") addChar(e.key);
  if (e.key == "*") addChar(e.key);
  if (e.key == "/") addChar(e.key);
  try {
    if (typeof eval(e.key) == "number") {
      addChar(e.key);
    }
  } catch(err) {
    return;
  }
})
const calculator = document.querySelector(".calculator");
const calculatorPainel = document.querySelector(".calculator-painel");
const calculatorButton = document.querySelectorAll(".calculator-button");
const background = document.querySelector(".background");
const calculatorConfig = document.querySelector(".calculator-config");
const errorModal = document.querySelector(".error-modal");
const root = document.querySelector(":root");
const themeColor = document.querySelector("#theme-color");
let currentPar = "(";
let hiddenModal = true;
let darkTheme = true;

for (let i = 2; i < calculatorButton.length; i++) {
  let char = calculatorButton[i].innerHTML;
  
  if (!(i > 17)) {
    calculatorButton[i].addEventListener("click", () => addChar(char));
    calculatorButton[i].addEventListener("click", lightUpNumbers);
  }
}

function addChar(char) {
  calculatorPainel.innerHTML += char;
}

function addPar() {
  if (currentPar == "(") {
    calculatorPainel.innerHTML += "(";
    currentPar = ")";
    return;
  }
  if (currentPar == ")") {
    calculatorPainel.innerHTML += ")";
    currentPar = "(";
    return
  }
}

function deleteChar() {
  calculatorPainel.innerHTML = calculatorPainel.innerHTML.substring(
    0,
    calculatorPainel.innerHTML.length - 1
    );
  }
  
  function showResult() {
    try {
      let result = eval(calculatorPainel.innerHTML.replace("%", "/100*"));

      if (typeof result != "undefined") {
        if (result != "Infinity") {
          if (result == result) {
            calculatorPainel.innerHTML = result;
          } else showModalError();
        } else showModalError();
      }

    } catch (error) {
      showModalError();
    }
  }
  
  const addBgNum = setInterval(() => {
    background.appendChild(createNumEl());
  }, 1);
  
  function createNumEl() {
    let newNumEl = document.createElement("span");
    newNumEl.classList.add("number");
    newNumEl.innerHTML = getRandomNum();

    return newNumEl;
  }

function getRandomNum() {
  let randomNum = Math.random() * (9 - 0) + 0;
  randomNum = Math.round(randomNum);
  
  return randomNum;
}

function lightUpNumbers() {
  let BgNumbers = document.querySelectorAll(".number");
  this.removeEventListener("click", lightUpNumbers);
  
  for (let i in BgNumbers) {
    if (BgNumbers[i].innerHTML == this.innerHTML) {
      BgNumbers[i].classList.add("turnOnNumber");
    }
  }
  setTimeout(() => {
    this.addEventListener("click", lightUpNumbers);
    for (let i in BgNumbers) {
      if (BgNumbers[i].innerHTML == this.innerHTML) {
        BgNumbers[i].classList.remove("turnOnNumber");
      }
    }
  }, 800);
}

function showModalError() {
  if (hiddenModal) {
    calculatorPainel.innerHTML = "";
    hiddenModal = false;
    errorModal.classList.add("show-error-modal");
    changeLightColor("#ff4d4d");

    setTimeout(() => {
      hiddenModal = true;
      errorModal.classList.remove("show-error-modal");

      let lightColor = document.querySelector("#lights-color");
      changeLightColor(lightColor.value);
    }, 3000);
  }
  else {
    return
  }
}

function changeLightColor(color=false) {
  if (!color) {
    let lightColor = document.querySelector("#lights-color");
  
    root.style.setProperty("--lights-color", lightColor.value);
    root.style.setProperty("--bg-lights-color", lightColor.value + "30");
  }
  if (color) {
    root.style.setProperty("--lights-color", color);
    root.style.setProperty("--bg-lights-color", color + "30");
  }
}

function changeThemeColor() {
  if (darkTheme) {
    themeColor.innerHTML = "&#127770;";

    root.style.setProperty("--number-color", "#f0f0f0");
    root.style.setProperty("--button-color", "#ffffff");
    root.style.setProperty("--calculator-bg", "#f0f0f0");
    root.style.setProperty("--calc-painel-bg", "#ffffff");
    root.style.setProperty("--calc-config-bg", "#f0f0f0");
    root.style.setProperty("--body-bg", "#ffffff");

    darkTheme = false;
    return;
  }
  if (!darkTheme) {
    themeColor.innerHTML = "&#127774;";

    root.style.setProperty("--number-color", "#181818");
    root.style.setProperty("--button-color", "#161616");
    root.style.setProperty("--calculator-bg", "#212121");
    root.style.setProperty("--calc-painel-bg", "#161616");
    root.style.setProperty("--calc-config-bg", "#222222");
    root.style.setProperty("--body-bg", "#121212");

    darkTheme = true;
    return;
  }
}

setInterval(() => {
  let BgNumbers = document.querySelectorAll(".number");

  let randomPos = Math.random() * (BgNumbers.length - 0) + 0;
  randomPos = Math.round(randomPos);

  BgNumbers[randomPos].classList.add("turnOnNumber");

  setTimeout(() => {
    BgNumbers[randomPos].classList.remove("turnOnNumber");
  }, 800);

}, 200)

setTimeout(() => {
  clearInterval(addBgNum);
}, 5000);
