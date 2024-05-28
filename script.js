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
let MovingValue = 1;

const btnContainer = document.querySelector('.buttons');
const vh = window.innerHeight;
inputContainer.style.height = `${vh -price.offsetHeight -btnContainer.offsetHeight -100}px`;
mainInput.style.top = `${inputContainer.offsetHeight -parseFloat(style.getPropertyValue('line-height'))}px`;

numBtns.forEach((numBtn)=> {
  numBtn.addEventListener("click", (e)=>{
    let btnText = e.target.textContent;
 
    if(numBtnIs) {

      if(mainInput.lastElementChild.textContent == "0") {
        mainInput.lastElementChild.textContent = btnText;
      } else {
        mainInput.lastElementChild.textContent += btnText;
        inputFieldTextSize();
        inputFieldMotion();
        instantTotalFn();
        if(MovingValue > 7) mainInput.scrollTop = mainInput.scrollHeight;
      }
      
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
    let li = mainInput.lastElementChild.textContent[mainInput.lastElementChild.textContent.length-1];
    if(mainInput.lastElementChild.textContent != "") {
      if(li == "+" || li == "-" || li == "×" || li == "÷")  {
        mainInput.lastElementChild.textContent = mainInput.lastElementChild.textContent.slice(0, -1);
      }
      if(btnText == "+") {
        mainInput.lastElementChild.textContent += "+";
      } else if(btnText == "-") {
        mainInput.lastElementChild.textContent += '-';
      } else if(btnText == "×") {
        mainInput.lastElementChild.textContent += "×";
      } else if(btnText == "÷") {
        mainInput.lastElementChild.textContent += "÷";
      }
      
    }
  });
});

fns.forEach((fn)=> {
  fn.addEventListener('click', (e)=> {
    const fnText = e.target.textContent;
    
    if(fnText == "AC") {
      if(equal.textContent == "=") {
        mainInput.style.opacity = "0";
        setTimeout(()=>{
          mainInput.innerHTML = '<span>0</span>';
          document.querySelector('#instant-total').value = '';
        }, 300);
        mainInput.style.fontSize = "60px";
        setTimeout(()=>{
          MovingValue = 1;
          mainInput.style.top = `${inputContainer.offsetHeight -parseFloat(style.getPropertyValue('line-height'))*MovingValue}px`;
          mainInput.style.opacity = "1";
        },350);
      } else if(equal.textContent.includes("=>") == true) {
        rateStr = ""; price.value = rateStr;
      } else {
        grStr = ""; RorG.value = grStr;
      }
    }else if(fnText == "Del") {
      if(equal.textContent == "=") {
        if(mainInput.lastElementChild.textContent == '') {
          mainInput.innerHTML = mainInput.innerHTML.slice(0, -13);
          if(MovingValue < 8) {
            mainInput.style.top = `${inputContainer.offsetHeight -parseFloat(style.getPropertyValue('line-height'))*--MovingValue}px`;
          } else {
            MovingValue--;
          }
        }
        mainInput.lastElementChild.textContent = mainInput.lastElementChild.textContent.slice(0, -1);
        inputFieldTextSize();
        MovingValue = 1;
        if(mainInput.innerHTML == '') {
          mainInput.innerHTML = '<span>0</span>';
          mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*MovingValue}px`;
        }
        instantTotalFn();

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
          document.querySelector('#instant-total').style.display='none';
          price.style.display = 'block';
          RorG.style.display = 'block';
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
          document.querySelector('#instant-total').style.display='block';
          price.style.display = 'none';
          RorG.style.display = 'none';
          numBtnIs = true;
        }
      }

    
  });
});

equal.addEventListener('click', (e)=>{
  const btnText = e.target.textContent;
  
  if(btnText == "=" && mainInput.textContent !="") {
    let instantTotal = document.querySelector('#instant-total');
    if(!instantTotal.value.includes('+') && !instantTotal.value.includes('-') && !instantTotal.value.includes('×') && !instantTotal.value.includes('÷')) {
      console.log(instantTotal.value.includes('+'));
      console.log('here');
      instantTotal.value = mainInput.textContent;
    }
    let last = mainInput.textContent[mainInput.textContent.length-1];
    if(last == "+" || last == "-" || last == "×" || last == "÷") {
      mainInput.textContent = mainInput.textContent.slice(0, -1);
    }
    mainInput.textContent = mainInput.textContent.replace(/÷/g, "/");
    mainInput.textContent = mainInput.textContent.replace(/×/g, "*");
    mainInput.style.opacity = "0";
    setTimeout(()=>{ mainInput.innerHTML = `<span>${eval(mainInput.textContent).toString()}</span>`;}, 300);
    mainInput.style.fontSize = "60px";
    setTimeout(()=>{
      MovingValue = 1;
      mainInput.style.top = `${inputContainer.offsetHeight -parseFloat(style.getPropertyValue('line-height'))*MovingValue}px`;
      mainInput.style.opacity = "1";
    },350);
  }
  else if(btnText.includes("=>") && price.value != "") {
    RorG.style.background = "rgb(2, 253, 2)";
    price.style.background = "rgb(83, 209, 244)";
    e.target.textContent = "add";
  }
  else if(btnText == "add" && RorG.value != "") {
    RorG.style.background = "rgb(83, 209, 244)";
    price.style.background = "rgb(2, 253, 2)";
    let check = mainInput.textContent[mainInput.textContent.length-1];
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
    let resultSpan = document.createElement('span');
    if( mainInput.textContent != "" && !'+-×÷'.includes(check) ){
      resultSpan.textContent = "+"+grResult;
    } else {
      resultSpan.textContent = grResult;
    }
    rateStr = ""; grStr = "";
    
    if(mainInput.lastElementChild.textContent.length + resultSpan.textContent.length > 20) {
      mainInput.lastElementChild.style.display = 'block';
      mainInput.appendChild(resultSpan);
      if(MovingValue < 8) mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*++MovingValue}px`;
    } else {
      mainInput.lastElementChild.textContent += resultSpan.textContent;
    }

      inputFieldTextSize();
      equal.textContent = "=";
    
    setTimeout(()=>{
      if(mainInput.lastElementChild.textContent[mainInput.lastElementChild.textContent.length-1] == "₹") {
        mainInput.lastElementChild.textContent = mainInput.lastElementChild.textContent.slice(0, -2);
      } else { mainInput.lastElementChild.textContent = mainInput.lastElementChild.textContent.slice(0, -5); }
      instantTotalFn();
    },1000);
    
    
    price.style.opacity = "0";
    RorG.style.opacity = "0";
    price.style.display = 'none';
    RorG.style.display = 'none';
    document.querySelector('#instant-total').style.display='block';
    numBtnIs = true;
    document.querySelector('.cal').textContent = "Cal";
  }
});








function inputFieldTextSize() {
  if(mainInput.textContent.length >= 7){
    mainInput.style.fontSize = "55px";
    if(mainInput.textContent.length >= 8) {
      mainInput.style.fontSize = "52px";
      if(mainInput.textContent.length >= 9) {
       mainInput.style.fontSize = "49px";
        if(mainInput.textContent.length >= 10) {
         mainInput.style.fontSize = "46px";
          if(mainInput.textContent.length >= 11) {
            mainInput.style.fontSize = "43px";
            if(mainInput.textContent.length >= 12) {
              mainInput.style.fontSize = "40px";
              if(mainInput.textContent.length >= 13) {
                mainInput.style.fontSize = "37px";
                if(mainInput.textContent.length >= 14) {
                  mainInput.style.fontSize = "34px";
                } else {
                  mainInput.style.fontSize = "37px";
                }
              } else {
                mainInput.style.fontSize = "40px";
              } 
            } else {
              mainInput.style.fontSize = "43px";
            }
          } else {
            mainInput.style.fontSize = "46px";
          }
        } else {
          mainInput.style.fontSize = "49px";
        }
      } else {
        mainInput.style.fontSize = "52px";
      }
    } else {
      mainInput.style.fontSize = "55px";
    }
  } else {
    mainInput.style.fontSize = "60px";
  }
  mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*MovingValue}px`;
}


function inputFieldMotion() {
  if(mainInput.offsetWidth-15 < mainInput.lastElementChild.offsetWidth) {
    let restore='';
    for (let i = mainInput.lastElementChild.textContent.length-1; i >= 0; i--) {
      const value = mainInput.lastElementChild.textContent.charAt(i);
      if ((value == '+' || value == '-' || value == '×' || value == '÷')) {
        restore = mainInput.lastElementChild.textContent.slice(i, mainInput.lastElementChild.textContent.length);
        mainInput.lastElementChild.textContent = mainInput.lastElementChild.textContent.slice(0, i);
        break;
      }
    }
    
    mainInput.lastElementChild.style.display='block';
    let newSpan = document.createElement('span');
    newSpan.textContent= restore;
    mainInput.appendChild(newSpan);

    if(MovingValue < 8) {
      mainInput.style.top = `${inputContainer.offsetHeight -2 -parseFloat(style.getPropertyValue('line-height'))*++MovingValue}px`;
    }
  }
}

function instantTotalFn() {
  
  let valStr = mainInput.textContent;
  if(valStr !="" && (valStr.includes('+') || valStr.includes('-') || valStr.includes('×') || valStr.includes('÷'))) {
    let last = valStr[valStr.length-1];
    if(last == "+" || last == "-" || last == "×" || last == "÷") valStr = valStr.slice(0, -1);

    valStr = valStr.replace(/÷/g, "/");
    valStr = valStr.replace(/×/g, "*");
    document.querySelector('#instant-total').value = `${eval(valStr).toString()}`;
  } else {
    document.querySelector('#instant-total').value = '';
  }
}