
    const emojy= ["🛡️","🛡️","🫀","🫀","🇧🇭","🇧🇭","👀","👀","🦅","🦅","🙈","🙈","😎","😎","🦠","🦠"];

                let shuf_emojy = emojy.sort(() => (Math.random() > .5)? 2 : -1 );
                let preventClick = false;
                let winSound = new Audio("./win.mp3"); 
                let playAgain = document.querySelector(".playAgain");
                let memoryGame = document.querySelector("#memoryGame");

    function render (){
        memoryGame.innerHTML = "";
        preventClick = false;
        let shuf_emojy = shuffle([...emojy]);
        for (let i=0; i<emojy.length;i++){
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
                        openBoxes[1].classList.remove('boxOpen');
                        openBoxes[0].classList.remove('boxOpen');


                        if (document.querySelectorAll('.boxMatch').length === emojy.length) {
                        let win = document.createElement("div");
                            win.className = "win";
                            win.innerHTML="You Win 🏆 ";
                            document.body.appendChild(win);
                            winSound .volume=0.5; 
                            winSound .play();
                        }
                    } 
                    
                    else {
                        openBoxes[1].classList.remove('boxOpen');
                        openBoxes[0].classList.remove('boxOpen');
                    }
                }

                preventClick = false; }, 600);
        };

        document.querySelector('#memoryGame').appendChild(box);
    }

    }

    let dark1 = false;

    document.querySelector(".dark").onclick = function () {
    if (!dark1) {
        document.body.classList.add("dark-mode");
        this.textContent = "☀️"; 
        dark1 = true;
    } else {
        document.body.classList.remove("dark-mode");
        this.textContent = "🌙"; 
        dark1 = false;
    }
    };


    //new
    function shuffle(arr){
        for(let i = arr.length -1 ; i > 0  ; i--){
            let o = Math.floor(Math.random() *(i + 1));
            [arr[i] ,arr[o]] = [arr[o] ,arr[i]];
            }
            return arr;
    }

    playAgain.addEventListener('click',()=>{
            document.querySelector(".win")?.remove();
            render();
    })


    render();

    