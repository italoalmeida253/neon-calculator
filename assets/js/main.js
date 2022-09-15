const calculatorPainel = document.querySelector(".calculator-painel");
const calculatorButton = document.querySelectorAll(".calculator-button");
const background = document.querySelector(".background");
const root = document.querySelector(":root");
const hintTitle = document.querySelector("#hint-title");

for (let i = 0; i < calculatorButton.length; i++) {
  let char = calculatorButton[i].innerHTML;
  
  if (!(i > 17)) {
    calculatorButton[i].addEventListener("click", () => addChar(char));
    calculatorButton[i].addEventListener("click", lightUpNumbers);
  }
}

function addChar(char) {
  calculatorPainel.innerHTML += char;
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
      calculatorPainel.innerHTML = result;
    } catch (error) {
      alert("Operação inválida :(");
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

function changeThemeColor() {
  hintTitle.innerHTML = "Ótimo! ;D";
  hintTitle.classList.add("fade-animation");
  let themeColor = document.querySelector("#theme-color");
  
  root.style.setProperty("--theme-color", themeColor.value);
  root.style.setProperty("--bg-theme-color", themeColor.value + "30");
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
