const range = document.querySelector(".range");
const rangeNumber = document.querySelector("[data-sliderNumber]");

let passwordLength = 12;

 
handleSlider();
function handleSlider() {
    range.value = passwordLength;
    rangeNumber.innerText = passwordLength;    
    const min = range.min;
    const max = range.max;
    range.style.backgroundSize = ((passwordLength - min )*100/ (max-min)) +"% 100%";
    
};

range.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});


const indicator = document.querySelector("#indicator");

indColor('#ccc');
function indColor(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;   
}

function getRndInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function getLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function getNumbers() {
    return getRndInteger(0,10);
}

const specialSymbols = '~!@#$%^&*()_+<>?:{}|,./;[]\</>';

function getSymbols() {
    let randNum = getRndInteger(0,specialSymbols.length);
    return specialSymbols.charAt(randNum);
}



const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");

function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumbers = false;
    let hasSymbols = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumbers = true;
    if (symbols.checked) hasSymbols = true;

    if (hasUpper && hasLower && hasNumbers && hasSymbols && (passwordLength>=8) )
    {
        indColor("#0FFF50");

    }
    else if (hasUpper && hasLower && (hasNumbers || hasSymbols) && (passwordLength>=6) )
    {
        indColor("#E4D00A");
        
    }
    else
    {
        indColor("#FF5733");
        
    }
}; 




const copyText = document.querySelector(".copyMsg");
const passwordDisplay = document.querySelector(".passwordDisplay");

async function copyFunction() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyText.innerText = "Copied";
    }
    catch(e) {
        copyText.innerText = "Failed";
    }
    copyText.classList.add("active");

    setTimeout(() => {
        copyText.classList.remove("active");
    },2000);
    
};


const copyButton = document.querySelector("#copy");

copyButton.addEventListener('click', () => {
        if (passwordDisplay.value) {
            copyFunction();
        }
    });





const allCheckBox = document.querySelectorAll("input[type=checkbox]");

allCheckBox.forEach( (checkbox) => {
    // checkbox.addEventListener('change', countCheckBoxTick());
    countCheckBoxTick();
    
})

function countCheckBoxTick() {

    let count = 0;
    allCheckBox.forEach ( (checkbox) => {
        if (checkbox.checked)
        {
            count++;
        }
        
    })

    if (passwordLength<count)
        {
            passwordLength=count;
            handleSlider();
        }
};



const generateButton = document.querySelector(".getButton");

generateButton.addEventListener('click', () => {
    countCheckBoxTick();
    let password = '';
    
    let funcArr = [];

    if (uppercase.checked) 
    {
        funcArr.push(getUpperCase);
    }
        
    if (lowercase.checked)
        funcArr.push(getLowerCase);

    if (numbers.checked)
        funcArr.push(getNumbers);

    if (symbols.checked)
        funcArr.push(getSymbols);

    for ( let i=0; i<funcArr.length; i++)
    {
        password += funcArr[i]();
    }
    for (let i=0; i<passwordLength-funcArr.length; i++)
    {
        let randIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randIndex]();
    }
        

    passwordDisplay.value = password;
    calStrength();        
});

