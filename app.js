
 const emojy= ["🛡️","🛡️","🫀","🫀","🇧🇭","🇧🇭","👀","👀","🦅","🦅","🙈","🙈","😎","😎","🦠","🦠"];

            let shuf_emojy = emojy.sort(() => (Math.random() > .5)? 2 : -1 );
            let preventClick = false;

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








