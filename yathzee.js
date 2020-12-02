const dice = document.querySelectorAll('input');
const form = document.querySelector('form');
const firstGame = document.querySelectorAll('[data-game-01]');
let diceValue = {};
let upperSubtotal = null;
let lowerSubtotal = null;
let total = null;
const CONFIRM = 'confirmed';

function countTotal(div){
    // subtotal 계산
    for(let i=0; i<5; i++){
        if(firstGame[i].classList.contains(CONFIRM)){
            upperSubtotal = upperSubtotal + parseInt(firstGame[i].innerText);
        }
    }
    firstGame[6].innerText = upperSubtotal;
    
    // check bonus
    if (subtotal > 62) {
        firstGame[7].innerText = '+ 35';
        firstGame[7].classList.remove('bonus')
    } else if (subtotal <= 62) {
        firstGame[7].innerText = upperSubtotal - 63;
    }

    total = upperSubtotal + lowerSubtotal;
}

// 확정된 점수는 변화시키지 않음
function checkConfirm(i, score){
    //upper section
    if(firstGame[i].classList.contains(CONFIRM)) {
        return;
    } else {
        firstGame[i].innerText = score;
    }
}

// 점수 계산
function makeScore() {
    //upper section
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
    
    checkConfirm(0, aces);
    checkConfirm(1, twos);
    checkConfirm(2, threes);
    checkConfirm(3, fours);
    checkConfirm(4, fives);
    checkConfirm(5, sixes);

    // lower section
    // chance
    let chance = 0;
    for(let i=0; i<5; i++){
        chance = chance + diceValue[i];
    }
    checkConfirm(8, chance);

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