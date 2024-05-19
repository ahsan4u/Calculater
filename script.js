let mainInput = document.getElementById("mainInput");
let inputContainer = document.querySelector('.mainInput');
let fns = document.querySelectorAll('#fn');
let sbtn = document.querySelector('#fn:last-child');
let numBtns = document.querySelectorAll('#num');
let oprBtns = document.querySelectorAll('#opr');
let price = document.getElementById('price');
let RorG = document.getElementById('RorG');
let equal = document.getElementById('equal');
let style = window.getComputedStyle(mainInput);
let numStr = ""; let oprStr = ""; let numBtnIs = true;
let rateStr = ""; let grStr =""; let grResult = "";

const btnContainer = document.querySelector('.buttons');
const vh = window.innerHeight;
inputContainer.style.height = `${vh -price.offsetHeight -btnContainer.offsetHeight -30}px`;
mainInput.style.top = `${inputContainer.offsetHeight -parseFloat(style.getPropertyValue('line-height'))}px`;

numBtns.forEach((numBtn)=> {
  numBtn.addEventListener("click", (e)=>{
    let btnText = e.target.textContent;
 
    if(numBtnIs) {

      if(numStr == "0") {
        numStr = btnText;
        mainInput.value = numStr;
      } else {
        numStr += btnText;
        mainInput.value = numStr;

        inputFieldTextSize();
        inputFieldMotion();
      }
      numToNextLineFromOpr();
      
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

  });     
});

oprBtns.forEach((oprBtn)=>{
  oprBtn.addEventListener('click', (e)=>{
    let btnText = e.target.textContent
    let li = numStr[numStr.length-1];
    if(numStr != "") {
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

fns.forEach((fn)=> {
  fn.addEventListener('click', (e)=> {
    const fnText = e.target.textContent;
    
    if(fnText == "AC") {
      if(equal.textContent == "=") {
        numStr=""; mainInput.value = numStr;
        mainInput.style.fontSize = "60px";
        setTimeout(()=> {
          mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))}px`;
        },180);
      } else if(equal.textContent.includes("=>") == true) {
        rateStr = ""; price.value = rateStr;
      } else {
        grStr = ""; RorG.value = grStr;
      }

    }else if(fnText == "Del") {
      if(equal.textContent == "=") {
        numStr = numStr.slice(0, -1);
        mainInput.value = numStr;
 
        inputFieldTextSize();
        inputFieldMotion();

      } else if(equal.textContent.includes("=>") == true) {
        rateStr = rateStr.slice(0, -1);
        price.value = rateStr;
      } else {
        grStr = grStr.slice(0,-1);
        RorG.value = grStr;
      }
    } else if(fnText.includes('a') || fnText.includes('₹') || fnText.includes('G')) {
        numBtnIs = false;
        if(fnText == "Cal") {
          grStr = ""; RorG.value = grStr;
          rateStr = ""; price.value = rateStr;
          price.style.opacity = "1";
          RorG.style.opacity = "1";
          equal.textContent = "=> G";
          e.target.textContent = "₹";
          RorG.placeholder = "Gram";
        } else if(fnText == "₹") {
          RorG.style.background = "rgb(83, 209, 244)";
          price.style.background = "rgb(2, 253, 2)";
          equal.textContent = "=> ₹"
          e.target.textContent = "gram";
          RorG.placeholder = "₹";
        } else {
          RorG.style.background = "rgb(83, 209, 244)";
          price.style.background = "rgb(2, 253, 2)";
          price.style.opacity = "0";
          RorG.style.opacity = "0";
          equal.textContent = "=";
          e.target.textContent = "Cal";
          numBtnIs = true;
        }
      }

    
  });
});

equal.addEventListener('click', (e)=>{
  const btnText = e.target.textContent;
  
  if(btnText == "=" && numStr !="") {
    let last = numStr[numStr.length-1];
    if(last == "+" || last == "-" || last == "×" || last == "÷") {
      numStr = numStr.slice(0, -1);
    }
    numStr = numStr.replace(/÷/g, "/");
    numStr = numStr.replace(/×/g, "*");
    numStr = numStr.replace(/\n/g, '');
    numStr = eval(numStr).toString();
    mainInput.value = numStr;
    mainInput.style.fontSize = "60px";
    
  } else if(btnText.includes("=>") && price.value != "") {
    RorG.style.background = "rgb(2, 253, 2)";
    price.style.background = "rgb(83, 209, 244)";
    e.target.textContent = "add";
  } else if(btnText == "add" && RorG.value != "") {
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
    if( numStr != "" && !'+-×÷'.includes(check) ){
      numStr += "+"+grResult;
    } else {
      numStr += grResult;
    }

    mainInput.value = numStr;
    rateStr = ""; grStr = "";
    
    setTimeout(()=>{
      mainInput.value = numStr;
      if(equal.textContent != "add") {
        mainInput.style.fontSize = "40px";
      } 
      equal.textContent = "=";
    },200)
    
    setTimeout(()=>{
      if(numStr[numStr.length-1] == "₹") {
        numStr = numStr.slice(0, -2);
      } else { numStr = numStr.slice(0, -5); } 
      mainInput.value=numStr;
    },1000);
    
    
    price.style.opacity = "0";
    RorG.style.opacity = "0";
    numBtnIs = true;
    document.querySelector('.cal').textContent = "Cal";
  }
});








function inputFieldTextSize() {
  if(numStr.length >= 10){
    mainInput.style.fontSize = "55px";
    if(numStr.length >= 11) {
      mainInput.style.fontSize = "50px";
      if(numStr.length >= 12) {
       mainInput.style.fontSize = "45px";
        if(numStr.length >= 13) {
         mainInput.style.fontSize = "40px";
          if(numStr.length >= 14) {
            mainInput.style.fontSize = "35px";
          } else {
            mainInput.style.fontSize = "40px";
          }
        } else {
          mainInput.style.fontSize = "45px";
        }
      } else {
        mainInput.style.fontSize = "50px";
      }
    } else {
      mainInput.style.fontSize = "55px";
    }
  } else {
    mainInput.style.fontSize = "60px";
  }
}



function inputFieldMotion() {
  if(numStr.length > 18) {
    mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*2}px`;
    if(numStr.length > 36) {
      mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*3}px`;
      if(numStr.length > 54) {
        mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*4}px`;
        if(numStr.length > 72) {
          mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*5}px`;
          if(numStr.length > 90) {
            mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*6}px`;
            if(numStr.length > 114) {
              mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*7}px`;
              if(numStr.length > 152) {
                mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*8}px`;
                if(numStr.length > 171) {
                  mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*9}px`;
                } else {
                  mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*8}px`;
                }
              } else {
                mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*7}px`;
              }
            } else {
              mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*6}px`;
            }
          } else {
            mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*5}px`;
          }
        } else {
          mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*4}px`;
        }
      } else {
        mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*3}px`;
      }
    } else {
      mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*2}px`;
    }
  } else {
    mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))}px`;
  }
}




function numToNextLineFromOpr() {
     if(numStr.length > 17 || numStr.length > 34 || numStr.length > 51) {

        for (let i = numStr.length-1; i >= 5; i--) {
          const value = numStr.charAt(i);
          if ((value == '+' || value == '-' || value == '×' || value == '÷')) {
            numStr = numStr.slice(0, i)+'\n'+numStr.slice(i, numStr.length);
            mainInput.value = numStr;
            break;
          }
        }
     }
}