//------ids-------------
const result = document.getElementById("result"); //used to calculate also
const resetBtn = document.getElementById("reset");
const themeSlider = document.getElementById("theme-slider");
const resBox = document.getElementById("calc-result-box");
const keyboardBox = document.getElementById("calc-keyboard-box");
const delBtn = document.getElementById("del");
const equalBtn = document.getElementById("equal");
const calcTitle = document.getElementById("calc-title");
const themeTitle = document.getElementById("theme");
const bodyElement = document.getElementsByTagName("body");

//------classes------------------
const numberBtns = document.getElementsByClassName("number-btn"); //used to calculate also
const nums = document.getElementsByClassName("c-number");
const diffBtn = document.getElementsByClassName("diff-btn");

const themeNums = document.getElementsByClassName("t-number");
//--------------------------calculator--------------------------------------

let numbersAndOpArr = [];

for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", function () {
    checkCalcBtnTxt(numberBtns[i].innerText);
  });
}
function checkCalcBtnTxt(btnVal) {
  let btnValUpperCase = btnVal.toUpperCase();
  let numbersAndOpStr = "";

  //----check button clicked text
  if (btnValUpperCase === "RESET") {
    resetNumbersAndOpArr();
  } else if (btnValUpperCase === "DEL") {
    numbersAndOpArr.pop();
  } else {
    if (btnVal === "=") {
      numbersAndOpStr = arrToStr(numbersAndOpArr);
      return evaluateExp(numbersAndOpStr);
    } else {
      numbersAndOpArr.push(btnVal);
    }
  }

  //---------render text
  numbersAndOpStr = arrToStr(numbersAndOpArr);
  renderResult(numbersAndOpStr);
}

function evaluateExp(numbersAndOpStr) {
  let finalResult = 0;
  let isValidNumbers = true;
  let isValidExp = true;
  //validate numbers(and format array numbers)
  isValidNumbers = validateNumbers(numbersAndOpStr);

  //validate expression
  if (isValidNumbers) {
    isValidExp = validateExp();
    if (isValidExp) {
      //calculate if all valid
      finalResult = calculate();
    }
  } else {
    isValidNumbers = false;
  }

  //render result
  if (isValidNumbers && isValidExp) {
    renderResult(finalResult);
  } else {
    renderResult("Expression Error");
  }
}

function validateNumbers(numbersAndOpStr) {
  let numbersValues = [];
  //each clicked btn has a cell in array , so numbers need to be joined(formated)
  let numbersAndOpNewArr = formatNumbers(numbersAndOpStr);

  if (numbersAndOpNewArr.length) {
    //extract from new array the numbers only(without operators)
    numbersValues = numbersAndOpNewArr.filter((val) => {
      return val != "+" && val != "-" && val != "x" && val != "/";
    });

    //check if all numbers are valid (not 1....2 or operator)
    for (let i = 0; i < numbersValues.length; i++) {
      //extract points
      let val = numbersValues[i];
      let valArr = [];
      valArr.push(...val);
      let dots = valArr.filter((val) => {
        return val === ".";
      });
      //---------------
      //not valid
      if (isNaN(parseFloat(numbersValues[i])) || dots.length > 1) {
        return false;
      }
    }
    //if valid make the current array value = new formated array
    resetNumbersAndOpArr();
    numbersAndOpArr.push(...numbersAndOpNewArr);
    return true;
  } else {
    return false;
  }
}

function formatNumbers(numbersAndOpStr) {
  let numbersAndOpNewArr = [];
  let numStr = "";
  for (let i = 0; i < numbersAndOpStr.length; i++) {
    if (
      (numbersAndOpStr[i] === "+" ||
        numbersAndOpStr[i] === "-" ||
        numbersAndOpStr[i] === "x" ||
        numbersAndOpStr[i] === "/") &&
      i != 0
    ) {
      numbersAndOpNewArr.push(numStr);
      numbersAndOpNewArr.push(numbersAndOpStr[i]);
      numStr = "";
    } //join numbers in string until operator
    else {
      numStr += numbersAndOpStr[i];
    }
  }
  if (numStr.length) {
    numbersAndOpNewArr.push(numStr);
    numStr = "";
  }
  return numbersAndOpNewArr;
}

function validateExp() {
  if (numbersAndOpArr.length >= 3) {
    let firstVal = numbersAndOpArr[0];
    let opIsEven = false;
    if (isNaN(parseInt(firstVal))) {
      opIsEven = true;
    }
    let ops = [];
    let nums = [];
    if (opIsEven) {
      ops = numbersAndOpArr.filter((val, index) => {
        return index % 2 === 0 && isNaN(parseInt(val));
      });
      nums = numbersAndOpArr.filter((val, index) => {
        return index % 2 !== 0 && !isNaN(parseInt(val));
      });
    } else {
      ops = numbersAndOpArr.filter((val, index) => {
        return index % 2 !== 0 && isNaN(parseInt(val));
      });

      nums = numbersAndOpArr.filter((val, index) => {
        return index % 2 === 0 && !isNaN(parseInt(val));
      });
    }
    //-------------
    if (nums.length - 1 === ops.length) {
      return true;
    }
  }
  return false;
}

function calculate() {
  let res = 0;
  let firstVal = parseFloat(numbersAndOpArr[0]);
  res += firstVal;
  for (let i = 1; i < numbersAndOpArr.length; i++) {
    let secVal = parseFloat(numbersAndOpArr[i + 1]);
    if (numbersAndOpArr[i] === "+") {
      res += secVal;
    } else if (numbersAndOpArr[i] === "-") {
      res -= secVal;
    } else if (numbersAndOpArr[i] === "x") {
      res *= secVal;
    } else if (numbersAndOpArr[i] === "/") {
      res /= secVal;
    }
  }
  //remove expression from result box and replace with the calculated result
  resetNumbersAndOpArr();
  numbersAndOpArr.push(res.toString());
  return res;
}

function arrToStr(numbersAndOpArr) {
  if (numbersAndOpArr.length) {
    return numbersAndOpArr.join("");
  } else {
    return "0";
  }
}
function renderResult(numbersAndOpStr) {
  result.innerText = numbersAndOpStr;
}
function resetNumbersAndOpArr() {
  numbersAndOpArr = [];
}
///---------------------themes---------
themeSlider.oninput = function () {
  let bodyBackground = "hsl(0, 0%, 90%)";
  let themeSliderBg = "hsl(0, 5%, 81%)";
  let sliderThumbBg = "hsl(25, 99%, 27%)";
  let title = "hsl(60, 10%, 19%)";
  let calcNumsTxt = "hsl(60, 10%, 19%)";
  let resBoxBg = "hsl(0, 0%, 93%)";
  let keyboardBoxBg = "hsl(0, 5%, 81%)";
  let numBtnsBg = "hsl(45, 7%, 89%)"; //edit
  let numBtnsShadow = "hsl(28, 16%, 65%)";
  let txtBtnShadow = "hsl(185, 58%, 25%)";
  let txtBtnBg = "hsl(185, 42%, 37%)";
  let equalBtnBg = "hsl(25, 98%, 40%)";
  let equalBtnShadow = "hsl(25, 99%, 27%)";
  let diffBtnTxt = "white";
  if (themeSlider.value === "0") {
    bodyBackground = "hsl(222, 26%, 31%)";
    themeSliderBg = "hsl(223, 31%, 20%)";
    sliderThumbBg = "hsl(6, 70%, 34%)";
    title = "white";
    calcNumsTxt = "hsl(221, 14%, 31%)";
    resBoxBg = "hsl(224, 36%, 15%)";
    keyboardBoxBg = "hsl(223, 31%, 20%)";
    numBtnsBg = "hsl(30, 25%, 89%)";
    numBtnsShadow = "hsl(28, 16%, 65%)";
    txtBtnBg = "hsl(225, 21%, 49%)";
    txtBtnShadow = "hsl(224, 28%, 35%)";
    equalBtnBg = "hsl(6, 63%, 50%)";
    diffBtnTxt = "white";
  } else if (themeSlider.value == "2") {
    bodyBackground = "hsl(268, 75%, 9%)";
    themeSliderBg = "hsl(268, 71%, 12%)";
    sliderThumbBg = "hsl(177, 92%, 70%)";
    title = "hsl(52, 100%, 62%)";
    calcNumsTxt = "hsl(52, 100%, 62%)";
    resBoxBg = "hsl(268, 71%, 12%)";
    keyboardBoxBg = "hsl(268, 71%, 12%)";
    numBtnsBg = "hsl(268, 47%, 21%)";
    numBtnsShadow = "hsl(290, 70%, 36%)";
    txtBtnBg = "hsl(281, 89%, 26%)";
    txtBtnShadow = "hsl(285, 91%, 52%)";
    equalBtnBg = "hsl(176, 100%, 44%)";
    equalBtnShadow = "hsl(177, 92%, 70%)";
    diffBtnTxt = "white";
  }
  //------------------------------------------------
  bodyElement[0].style.backgroundColor = bodyBackground;
  themeSlider.style.backgroundColor = themeSliderBg;
  let style = document.querySelector('[data="test"]');
  style.innerHTML = `.custom-slider::-webkit-slider-thumb 
  {background-color:${sliderThumbBg}  !important`;
  calcTitle.style.color = title;
  themeTitle.style.color = title;
  result.style.color = title;
  for (let i = 0; i < themeNums.length; i++) {
    themeNums[i].style.color = title;
  }
  //
  resBox.style.backgroundColor = resBoxBg;
  keyboardBox.style.backgroundColor = keyboardBoxBg;
  for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].style.backgroundColor = numBtnsBg;
    numberBtns[i].style.boxShadow = `0 6px 2px -2px ${numBtnsShadow}`;
    nums[i].style.color = calcNumsTxt;
  }

  //
  delBtn.style.backgroundColor = txtBtnBg;
  delBtn.style.boxShadow = `0 6px 2px -2px ${txtBtnShadow}`;
  resetBtn.style.backgroundColor = txtBtnBg;
  resetBtn.style.boxShadow = `0 6px 2px -2px ${txtBtnShadow}`;
  //
  equalBtn.style.backgroundColor = equalBtnBg;
  equalBtn.style.boxShadow = `0 6px 2px -2px ${equalBtnShadow}`;
  for (let i = 0; i < diffBtn.length; i++) {
    diffBtn[i].style.color = diffBtnTxt;
    if (themeSlider.value === "2" && i === 2) {
      diffBtn[i].style.color = "black";
    }
  }
};
