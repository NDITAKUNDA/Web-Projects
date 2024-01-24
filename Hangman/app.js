// Initial Refrences
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("option-container");
const userInputContainer = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Option values for buttons
let options = {
    fruits: ["Mango", "Banana", "Apple", "Pineaple", "Peach", "Watermelon"],
    animals: ["Goat", "Dog", "Cat", "Lion", "Elephant", "Zebra"],
    countries: ["France", "Botswana", "Zimbabwe", "England", "Nigeria"]
};

// Count
let winCount = 0;
let count = 0;

// Display Option Buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select an option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
        optionsContainer.appendChild(buttonCon);
    }
};

// Block all the buttons
const blocker = () => {
    let optionsButton = document.querySelectorAll(".options");
    let letterButton = document.querySelectorAll(".letters");
    // disbale all options
    optionsButton.forEach((button) => {
        button.disabled = true;
    });
    // disable all letters
    letterButton.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

// word generator
const generateWord = (optionValue) => {
    let optionsButton = document.querySelectorAll(".options");
    // if optionValue matches the button innerText then highlight the button
    optionsButton.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    // initially hide the letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputContainer.innerText = "";

    let optionArray = options[optionValue];
    // Choose a random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    // Replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, `<span class="dashes">_</span>`);

    // Display each element as span
    userInputContainer.innerHTML = displayItem;
};

// Initial function (Called when user page loads/ user presses new game)
const initialiser = () => {
    winCount = 0;
    count = 1;

    // Initially erase all content and hide letters and new game button
    userInputContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    // For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        // Number to ASCIII[A-Z]
        button.innerText = String.fromCharCode(i);
        // Character button Click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            // if array contains clicked value then replace dash with letter else draw on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    // If character in array is same as clicked button
                    if (char === button.innerHTML) {
                        // Replace char with letter
                        dashes[index].innerHTML = char;
                        // Increment counter
                        winCount += 1
                        // If winCount equals word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class="win-msg">You win!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            // block all buttons
                            blocker();
                        }
                    } 
                });
            } else {
                // for drawing man
                drawMan(count);
                // lose count
                count += 1;
                // Count == 6 because heady, body, left arm, right arm, left leg, right leg
                if (count > 6) {
                    resultText.innerHTML = `<h2 class="lose-msg">Game Over!</h2><p>The word was <span>${chosenWord}</span></p>`
                    blocker();
                }
                
            }
            // Disable Clicked button 
            button.disabled = true;
        });
        letterContainer.append(button);
    }
    
    displayOptions();
    // Call to canvasCreator(for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    // InitialDrawing would draw the frame
    initialDrawing();
};

// Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //for drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    // Initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // bottom line
        drawLine(10, 130, 130, 130);
        // left line
        drawLine(10, 10, 10, 131);
        // top line
        drawLine(10, 10, 70, 10);
        // small top line
        drawLine(70, 10, 70, 20);
    };
    return {initialDrawing, head, body ,leftArm, rightArm, leftLeg, rightLeg};
};

// draw the man
const drawMan = (count) => {
    let { head, body ,leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

// New Game
newGameButton.addEventListener("click", initialiser);
window.onload = initialiser;

