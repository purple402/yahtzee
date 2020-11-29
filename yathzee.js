const dice = document.querySelectorAll('input');
const form = document.querySelector('form');
const firstGame = document.querySelectorAll('[data-game-01]');
let diceValue = {};



//점수 계산
function makeScore() {
    let aces = 0;
    let twos = 0;
    let threes = 0;
    let fours = 0;
    let fives = 0;
    let sixes = 0;

    for (let i=0; i<5; i++){
        switch(diceValue[i]) {
            case 1 :
                aces = aces + 1;
                break;
            case 2 :
                twos = twos + 2;
                break;
            case 3 :
                threes = threes + 3;
                break;
            case 4 :
                fours = fours + 4;
                break;
            case 5 :
                fives = fives + 5;
                break;
            case 6 :
                sixes = sixes + 6;
                break;
        }
    }
    
    firstGame[0].innerText = aces;
    firstGame[1].innerText = twos;
    firstGame[2].innerText = threes;
    firstGame[3].innerText = fours;
    firstGame[4].innerText = fives;
    firstGame[5].innerText = sixes;
}

function handleSubmit(event) {
    event.preventDefault();

    for(let i=0; i < 5; i++){
        let value = parseInt(event.target[i].value);

        diceValue[i] = value;
    }
    makeScore();
}

function clicked(event) {
    const div = event.target;

    div.classList.add(CONFIRM);
    countTotal(div);
    // 다시 클릭하지 못하게 함
    div.removeEventListener('click', clicked);
}

function init(){
    // submit 한 value 처리
    form.addEventListener("submit", handleSubmit)
    // 숫자를 클릭하면 확정되도록 함
    firstGame.forEach(div => {
        div.addEventListener('click', clicked)
    })
}
init();