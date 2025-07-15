const emojy = ["🛡️","🛡️","🫀","🫀","🇧🇭","🇧🇭","👀","👀","🦅","🦅","🙈","🙈","😎","😎","🦠","🦠"];

let preventClick = false;
let winSound = new Audio("./win.mp3"); 
let playAgain = document.querySelector(".playAgain");
let memoryGame = document.querySelector("#memoryGame");
let timerElement = document.querySelector(".timer");

let selectedTime = 120; // default

// 🕓 Set timer based on level page
const pageName = location.pathname.split("/").pop();
if (pageName === "level1.html") selectedTime = 120;   // Easy
else if (pageName === "level2.html") selectedTime = 60;   // Medium
else if (pageName === "level3.html") selectedTime = 30;   // Hard

let rem = selectedTime;
let isRun = false;
let timerInterval;

function render (){
    memoryGame.innerHTML = "";
    preventClick = false;
    let shuf_emojy = shuffle([...emojy]);

    for (let i=0; i<emojy.length; i++){
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuf_emojy[i];

        box.onclick = function() {
            if (preventClick || this.classList.contains('boxMatch') || this.classList.contains('boxOpen')) return;

            this.classList.add('boxOpen');
            preventClick = true;

            setTimeout(function() {
                let openBoxes = document.querySelectorAll('.boxOpen');

                if (openBoxes.length > 1) {
                    if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                        openBoxes[0].classList.add('boxMatch');
                        openBoxes[1].classList.add('boxMatch');
                        openBoxes[0].classList.remove('boxOpen');
                        openBoxes[1].classList.remove('boxOpen');

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
                        openBoxes[0].classList.remove('boxOpen');
                        openBoxes[1].classList.remove('boxOpen');
                    }
                }

                preventClick = false;
            }, 600);
        };

        memoryGame.appendChild(box);
    }

    isRun = true;
    rem = selectedTime;
    clearInterval(timerInterval);
    timerInterval = setInterval(startTimer, 1000);
}

function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        let o = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[o]] = [arr[o], arr[i]];
    }
    return arr;
}

function startTimer() {
    if (isRun) {
        if (rem >= 0) {
            let min = Math.floor(rem / 60);
            let sec = rem % 60;
            let showSec = sec < 10 ? "0" + sec : sec;
            timerElement.innerHTML = `${min}:${showSec}`;
            rem--;
        } else {
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

playAgain.addEventListener('click', () => {
    document.querySelector(".win")?.remove();
    document.querySelector(".lose")?.remove();
    rem = selectedTime;
    isRun = true;
    render();
});

// 🌙 Dark mode toggle
let dark1 = false;
document.querySelector(".dark")?.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = dark1 ? "🌙" : "☀️";
    dark1 = !dark1;
});

render();
