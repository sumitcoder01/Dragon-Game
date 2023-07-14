console.log("Welcome To iDragon...");

//Initilization----
let music = new Audio('music.mp3');
let cross = true;
let over = false;
let scoreValue = 0;
let gameover = new Audio('gameover.mp3');
let dino = document.querySelector('.dino');
let obstacle = document.querySelector('.obstacle');
let state = document.querySelector('.state');
let score = document.getElementById('score');
let reset = document.querySelector('.reset');

//Keys Response
const keys = (e) => {
    let key = e.keyCode;
    if (key == 38) {
        dino.classList.add('dinoanimate');
        setTimeout(() => {
            dino.classList.remove('dinoanimate');
        }, 1000);
    }
    else if (key == 40) {
        if (dino.style.transform == 'scaleX(1)') {
            dino.style.transform = 'scaleX(-1)';
        }
        else {
            dino.style.transform = 'scaleX(1)';
        }
    }
    else if (key == 39) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 145 + "px";
    }
    else if (key == 37) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 150) + "px";
    }
    else {
        console.log('No Response Key Presed...')
    }
}

//Game Started
setTimeout(() => {
    music.play();
    music.loop = true;
    console.log("Game Started...");
}, 1000);
//Keyboard Key Response
document.onkeydown = keys;

//Collision Detection
setInterval(() => {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    let dragX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let dragY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    let offsetX = Math.abs(dinoX - dragX);
    let offsetY = Math.abs(dinoY - dragY);
    if (over == false && offsetX <= 93 && offsetY < 70) {
        over = true;
        console.log("Game Over...");
        music.pause();
        document.onkeydown = () => {
            console.log('Game Over You can not Press Any Key please Reload To continue');
        }
        state.innerHTML = `<h1>Game Over-Try Again</h1>`;
        reset.style.visibility = 'visible';
        obstacle.style.animationPlayState='paused';
        setTimeout(() => {
            gameover.play();
            setTimeout(() => {
                gameover.pause;
            }, 700);
        }, 1000);
    }
    else if (over == false && cross == true  && offsetX < 135) {
        cross = false;
        scoreValue += 1;
        score.innerHTML = `Your Score:${scoreValue}`;
        setTimeout(() => {
            cross = true;
            let dur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration')) - 0.4;
            obstacle.style.animationDuration = dur + 's';
        }, 1500);
    }
}, Infinity);

//Reset
reset.addEventListener('click', () => {
    location.reload();
});




