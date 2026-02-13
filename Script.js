function tickUp() {
    let counterElement = document.getElementById("counter");
    let currentValue = parseInt(counterElement.textContent);
    counterElement.textContent = currentValue + 1;
}

function tickDown() {
    let counterElement = document.getElementById("counter");
    let currentValue = parseInt(counterElement.textContent);
    counterElement.textContent = currentValue - 1;
}

function runForLoop() {
    let counterElement = document.getElementById("counter");
    let counterValue = parseInt(counterElement.textContent);
    let resultElement = document.getElementById("forLoopResult");
    
    let result = "";
    for (let i = 0; i <= counterValue; i++) {
        result += i + " ";
    }
    
    resultElement.textContent = result.trim();
}

function showOddNumbers() {
    let counterElement = document.getElementById("counter");
    let counterValue = parseInt(counterElement.textContent);
    let resultElement = document.getElementById("oddNumberResult");
    
    let result = "";
    for (let i = 1; i <= counterValue; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }
    
    resultElement.textContent = result.trim();
}

function addMultiplesToArray() {
    let counterElement = document.getElementById("counter");
    let counterValue = parseInt(counterElement.textContent);
    
    let multiplesArray = [];
    
    for (let i = counterValue; i >= 5; i--) {
        if (i % 5 === 0) {
            multiplesArray.push(i);
        }
    }
    
    console.log(multiplesArray);
}

function printCarObject() {
    let carType = document.getElementById("carType").value;
    let carMPG = document.getElementById("carMPG").value;
    let carColor = document.getElementById("carColor").value;
    
    let carObject = {
        cType: carType,
        cMPG: carMPG,
        cColor: carColor
    };
    
    console.log(carObject);
}

function loadCar(carNumber) {
    let carObject;
    
    if (carNumber === 1) {
        carObject = carObject1;
    } else if (carNumber === 2) {
        carObject = carObject2;
    } else if (carNumber === 3) {
        carObject = carObject3;
    }
    
    document.getElementById("carType").value = carObject.cType;
    document.getElementById("carMPG").value = carObject.cMPG;
    document.getElementById("carColor").value = carObject.cColor;
}

function changeColor(colorNumber) {
    let paragraph = document.getElementById("styleParagraph");
    
    if (colorNumber === 1) {
        paragraph.style.color = "red";
    } else if (colorNumber === 2) {
        paragraph.style.color = "green";
    } else if (colorNumber === 3) {
        paragraph.style.color = "blue";
    }
}