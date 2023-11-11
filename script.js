let mainInput = document.getElementById("mainInput");
let holdOne = document.getElementById("secInput");
let holdTwo = document.getElementById("thInput");
let holdThree = document.getElementById("frInput");
let holdFour = document.getElementById("fvInput");
let sbtn = document.getElementById("swapBtn");
let numBtn = document.querySelectorAll('#num');
let oprBtn = document.querySelectorAll('#opr');
let price = document.getElementById('price');
let RorG = document.getElementById('RorG');
let equal = document.getElementById('equal');
let numStr = ""; let oprStr = ""; let numBtnIs = true;
let rateStr = ""; let grStr =""; let grResult = "";

numBtn.forEach(function(pop) {
  pop.addEventListener("click", (e)=>{
    let btnText = e.target.textContent;
 
    if(btnText == "AC") {
      numBtnIs = true;
      if(equal.textContent == "=") {
        mainInput.style.opacity = "0";
        numStr=""; holdTwo.value = ""; holdOne.value = "";
        holdThree.value = ""; holdFour.value = "";
        setTimeout(()=>{
          mainInput.style.opacity = "1";
          mainInput.value = numStr;
        },200)
        holdOne.style.top = "320px";
        holdTwo.style.top = "320px";
        holdThree.style.top = "320px";
        holdFour.style.top = "320px";
      } else if(equal.textContent.includes("=>") == true) {
        rateStr = "";
        price.value = rateStr;
      } else {
        grStr = "";
        RorG.value = grStr;
      }
    } else if(btnText == "Del") {
      numBtnIs = true;
      if(equal.textContent == "=") {
        if(numStr.length == 1) {
          mainInput.style.display = "none";
          if(holdFour.value == "") {
            if(holdThree.value == "") {
              if(holdTwo.value == "") {
                if(holdOne.value != "") {
                  numStr = holdOne.value+numStr; holdOne.style.top = "320px";
                  setTimeout(()=>{holdOne.value="";},180);
                }
              } else {
                numStr = holdTwo.value+numStr; holdTwo.style.top = "320px";
                holdOne.style.top = "280px";
                setTimeout(()=>{holdTwo.value="";},180);
              }
            } else {
              numStr = holdThree.value+numStr; holdThree.style.top = "320px";
              holdTwo.style.top = "280px"; holdOne.style.top = "240px";
              setTimeout(()=>{holdThree.value="";},180);
            }
          } else {
            numStr = holdFour.value+numStr; holdFour.style.top = "320px";
            holdThree.style.top = "280px"; holdTwo.style.top = "240px"; holdOne.style.top = "200px";
            setTimeout(()=>{holdFour.value="";},180);
          }
        }
        
        setTimeout(()=>{mainInput.style.display = "inline";},180);
        numStr = numStr.slice(0, -1);
        mainInput.value = numStr;
        
        if(numStr.length >= 17) {
          mainInput.style.fontSize = "30px";
        } else if(numStr.length < 17) {
          mainInput.style.fontSize = "40px";
        }
      } else if(equal.textContent.includes("=>") == true) {
        rateStr = rateStr.slice(0, -1);
        price.value = rateStr;
      } else {
        grStr = grStr.slice(0,-1);
        RorG.value = grStr;
      }
    } else {
      if(sbtn.value == "Cal" && numBtnIs == true) {
        if(numStr.length > 19) {
          let cut = ""; let restore = "";
          for(let i=numStr.length-1; i>=5; i--) {
            let a = numStr.charAt(i);
            if(a == "+" || a == "-" || a == "×" || a == "÷") {
              restore = numStr.slice(i+1, numStr.length);
              cut = numStr.slice(0, i+1);
              break;
            } else {
              cut = numStr;
            }
          }
          if(holdOne.value != "") {
            if(holdTwo.value != "") {
              if(holdThree.value != "") {
                if(holdFour.value == "") {
                  holdFour.value = cut; numStr = "";
                  holdFour.style.top = "280px";
                  holdOne.style.top = "160px";
                  holdTwo.style.top = "200px";
                  holdThree.style.top = "240px";
                }
              } else {
                holdThree.value = cut; numStr = "";
                holdThree.style.top = "280px";
                holdOne.style.top = "200px";
                holdTwo.style.top = "240px";
              }
            } else {
              holdTwo.value = cut; numStr = "";
              holdTwo.style.top = "280px";
              holdOne.style.top = "240px";
            }
          } else {
            holdOne.value = cut; numStr = "";
            holdOne.style.top = "280px";
          }
          numStr = restore;
        }
        if(numStr == "0") {
          numStr = btnText;
          mainInput.value = numStr;
        } else {
          numStr += btnText;
          mainInput.value = numStr;
        }
        if(holdFour.value != "" && numStr.length > 18) { numBtnIs = false; }
      } else if(equal.textContent.includes("=>") == true) {
        if(rateStr.length < 8) {
          if(rateStr == "0") {
            rateStr = btnText;
            price.value = rateStr;
          } else {
            rateStr += btnText;
            price.value = rateStr;
          }
        }
      } else {
        if(grStr.length < 8) {
          if(grStr == "0") {
            grStr = btnText; 
            RorG.value = grStr;
          } else {
            grStr += btnText; 
            RorG.value = grStr;
          }
        }
      }
    }
    
      if(holdOne.value == "" && numStr.length < 16) {
        mainInput.style.fontSize = "40px";
        mainInput.style.top = "290px";
      } else {
        mainInput.style.fontSize = "30px";
        mainInput.style.top = "320px";
      }
  });     
});

oprBtn.forEach((pop)=>{
  pop.addEventListener('click', (e)=>{
    let btnText = e.target.textContent
    let li = numStr[numStr.length-1];
    if(numStr != "" || holdOne.value != "") {
      if(li == "+" || li == "-" || li == "×" || li == "÷")  {
          numStr = numStr.slice(0, -1);
      }
      if(btnText == "+") {
        numStr += "+"; mainInput.value = numStr;
      } else if(btnText == "-") {
        numStr += "-"; mainInput.value = numStr;
      } else if(btnText == "×") {
        numStr += "×"; mainInput.value = numStr;
      } else if(btnText == "÷") {
        numStr += "÷"; mainInput.value = numStr;
      }
      
    }
  });
});

function swapBtn() {
  if(numBtnIs == true) {
    grStr = ""; RorG.value = grStr;
    rateStr = ""; price.value = rateStr;
    if(sbtn.value == "Cal") {
      price.style.opacity = "1";
      RorG.style.opacity = "1";
      equal.textContent = "=> G";
      sbtn.value = "₹";
      RorG.placeholder = "Gram";
    } else if(sbtn.value == "₹") {
      RorG.style.background = "rgb(83, 209, 244)";
      price.style.background = "rgb(2, 253, 2)";
      equal.textContent = "=> ₹"
      sbtn.value = "gram";
      RorG.placeholder = "₹";
    } else {
      RorG.style.background = "rgb(83, 209, 244)";
      price.style.background = "rgb(2, 253, 2)";
      price.style.opacity = "0";
      RorG.style.opacity = "0";
      equal.textContent = "=";
      sbtn.value = "Cal";
    }
  }
}

equal.addEventListener('click', (e)=>{
  let btnText = e.target.textContent;
  if(btnText == "=" && (numStr !="" || holdOne.value != "")) {
    mainInput.style.opacity = "0";
    numStr = holdOne.value + holdTwo.value + holdThree.value + holdFour.value + numStr;
    let last = numStr[numStr.length-1];
    if(last == "+" || last == "-" || last == "×" || last == "÷") {
      numStr = numStr.slice(0, -1);
    }
    numStr = numStr.replace(/÷/g, "/");
    numStr = numStr.replace(/×/g, "*");
    numStr = eval(numStr).toString();
    holdOne.value = ""; holdTwo.value=""; holdThree.value=""; holdFour.value="";
    setTimeout(()=>{
      mainInput.style.opacity = "1";
      mainInput.value = numStr;
      mainInput.style.fontSize = "40px";
      mainInput.style.top = "290px";
    },200)
  } else if(btnText.includes("=>") == true && price.value != "") {
    RorG.style.background = "rgb(2, 253, 2)";
    price.style.background = "rgb(83, 209, 244)";
    e.target.textContent = "add";
  } else if(btnText == "add" && RorG.value != "") {
  if(numStr.length > 15) {
    if(holdOne.value != "") {
      if(holdTwo.value != "") {
        if(holdThree.value != "") {
          if(holdFour.value != "") {
            numBtnIs = false;
          } else {
            holdFour.value = numStr; numStr = "";
            holdFour.style.top = "280px";
            holdOne.style.top = "160px";
            holdTwo.style.top = "200px";
            holdThree.style.top = "240px";
          }
        } else {
          holdThree.value = numStr; numStr = "";
          holdThree.style.top = "280px";
          holdOne.style.top = "200px";
          holdTwo.style.top = "240px";
        }
      } else {
        holdTwo.value = numStr; numStr = "";
        holdTwo.style.top = "280px";
        holdOne.style.top = "240px";
      }
    } else {
      holdOne.value = numStr; numStr = "";
      holdOne.style.top = "280px";
    }
  }
    RorG.style.background = "rgb(83, 209, 244)";
    price.style.background = "rgb(2, 253, 2)";
    let check = numStr[numStr.length-1];
    let r = Number(price.value);
    let g = Number(RorG.value);
    if(RorG.placeholder == "Gram") {
      let ans = r*g/1000;
      let val = Number(ans.toFixed("0"));
      if(val < ans) {
        val++;
      }
      val += " ₹";
      grResult = val.toString();
    } else {
      let ans = Math.floor(1000*g/r);
      ans += " Gram";
      grResult = ans.toString();
    }
    if(numStr != "" && check != "+" && check != "-" && check != "×" && check != "÷") {
      numStr += "+"+grResult;
    } else {
      numStr += grResult;
    }
    setTimeout(()=>{if(numStr[numStr.length-1] == "₹") {
      numStr = numStr.slice(0, -2);
      } else { numStr = numStr.slice(0, -5);
      } mainInput.value=numStr;},1000);
    setTimeout(()=>{
      mainInput.style.opacity = "1";
      mainInput.value = numStr;
      if(equal.textContent != "add") {
        mainInput.style.fontSize = "40px";
        mainInput.style.top = "290px";
        } equal.textContent = "=";
    },200)
    mainInput.value = numStr;
    rateStr = ""; grStr = "";
    
    price.style.opacity = "0";
    RorG.style.opacity = "0";
    sbtn.value = "Cal";
  }
});