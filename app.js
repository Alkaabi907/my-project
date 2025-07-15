// List of emoji pairs for the memory game
const emojy = ["🛡️", "🛡️", "🫀", "🫀", "🇧🇭", "🇧🇭", "👀", "👀", "🦅", "🦅", "🙈", "🙈", "😎", "😎", "🦠", "🦠"];

let preventClick = false; // Prevents double-clicks during checking
let winSound = new Audio("./win.mp3"); // Win sound effect
let playAgain = document.querySelector(".playAgain");
let memoryGame = document.querySelector("#memoryGame");
let timerElement = document.querySelector(".timer");

let selectedTime = 120; // Default time (2 minutes)





// Set time based on the current level/page name
const pageName = location.pathname.split("/").pop();
if (pageName === "level1.html") selectedTime = 120;  // Easy
else if (pageName === "level2.html") selectedTime = 60;  // Medium
else if (pageName === "level3.html") selectedTime = 30;  // Hard

let rem = selectedTime;
let isRun = false;
let timerInterval;




// Main function to build the game board
function render() {
    memoryGame.innerHTML = "";         // Clear the board
    preventClick = false;
    let shuf_emojy = shuffle([...emojy]); // Shuffle emojis

    // Create each box/card
    for (let i = 0; i < emojy.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuf_emojy[i];

        // On card click
        box.onclick = function () {
            if (preventClick || this.classList.contains('boxMatch') || this.classList.contains('boxOpen')) return;

            this.classList.add('boxOpen');
            preventClick = true;

            // Check for match after short delay
            setTimeout(function () {
                let openBoxes = document.querySelectorAll('.boxOpen');

                if (openBoxes.length > 1) {
                    if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                        // Match found
                        openBoxes[0].classList.add('boxMatch');
                        openBoxes[1].classList.add('boxMatch');
                        openBoxes[0].classList.remove('boxOpen');
                        openBoxes[1].classList.remove('boxOpen');

                        // Win condition
                        if (document.querySelectorAll('.boxMatch').length === emojy.length) {
                            clearInterval(timerInterval);
                            let win = document.createElement("div");
                            win.className = "win";
                            win.innerHTML = "You Win 🏆";
                            document.body.appendChild(win);
                            winSound.volume = 0.5;
                            winSound.play();
                        }
                    } else {
                        // Not matched
                        openBoxes[0].classList.remove('boxOpen');
                        openBoxes[1].classList.remove('boxOpen');
                    }
                }

                preventClick = false;
            }, 600);
        };

        memoryGame.appendChild(box);
    }



    // Start timer
    isRun = true;
    rem = selectedTime;
    clearInterval(timerInterval);
    timerInterval = setInterval(startTimer, 1000);
}

// Shuffle array using Fisher–Yates algorithm
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let o = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[o]] = [arr[o], arr[i]];
    }
    return arr;
}

// Timer logic
function startTimer() {
    if (isRun) {
        if (rem >= 0) {
            let min = Math.floor(rem / 60);
            let sec = rem % 60;
            let showSec = sec < 10 ? "0" + sec : sec;
            timerElement.innerHTML = `${min}:${showSec}`;
            rem--;
        } else {
            // Time's up
            isRun = false;
            preventClick = true;
            clearInterval(timerInterval);
            timerElement.innerHTML = "⏰ Time's Up!";
            let lose = document.createElement("div");
            lose.className = "lose";
            lose.innerHTML = "You Lose ⌛";
            document.body.appendChild(lose);
        }
    }
}

// Reset and start a new game when Play Again is clicked
playAgain.addEventListener('click', () => {
    document.querySelector(".win")?.remove();
    document.querySelector(".lose")?.remove();
    rem = selectedTime;
    isRun = true;
    render();
});

// Dark mode toggle
let dark1 = false;
document.querySelector(".dark")?.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = dark1 ? "🌙" : "☀️";
    dark1 = !dark1;
});

// Start the game on page load
render();
