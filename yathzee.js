const dice = document.querySelectorAll('input');
const form = document.querySelector('form');
const firstGame = document.querySelectorAll('[data-game-01]');
let diceValue = [];
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
    console.log(upperSubtotal);
    
    // check bonus
    if (upperSubtotal > 62) {
        firstGame[7].innerText = '+ 35';
        firstGame[7].classList.remove('bonus')
    } else if (upperSubtotal <= 62) {
        firstGame[7].innerText = upperSubtotal - 63;
    }

    total = upperSubtotal + lowerSubtotal;
    firstGame[17].innerText = total;
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
    /*
    let ace = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;

    for (let i=0; i<5; i++){
        switch(diceValue[i]) {
            case 1 :
                ace = ace + 1;
                break;
            case 2 :
                two = two + 1;
                break;
            case 3 :
                three = three + 1;
                break;
            case 4 :
                four = four + 1;
                break;
            case 5 :
                five = five + 1;
                break;
            case 6 :
                six = six + 1;
                break;
        }
    }
    checkConfirm(0, ace);
    checkConfirm(1, two*2);
    checkConfirm(2, three*3);
    checkConfirm(3, four*4);
    checkConfirm(4, five*5);
    checkConfirm(5, six*6);
    */
   
    // 반복되는 횟수 세기
    let count = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    for (let i=0; i<5; i++){
        switch(diceValue[i]) {
            case 1 :
                count[1] = count[1] + 1;
                break;
            case 2 :
                count[2] = count[2] + 1;
                break;
            case 3 :
                count[3] = count[3] + 1;
                break;
            case 4 :
                count[4] = count[4] + 1;
                break;
            case 5 :
                count[5] = count[5] + 1;
                break;
            case 6 :
                count[6] = count[6] + 1;
                break;
        }
    }
    
    checkConfirm(0, count[1]);
    checkConfirm(1, count[2]*2);
    checkConfirm(2, count[3]*3);
    checkConfirm(3, count[4]*4);
    checkConfirm(4, count[5]*5);
    checkConfirm(5, count[6]*6);

    // lower section
    // chance
    let chance = 0;
    for(let i=0; i<5; i++){
        chance = chance + diceValue[i];
    }
    checkConfirm(8, chance);

    // 3 of a kind
    // count 에 값이 있으면 => 실행으로 바꿔야함
    for(let i=1; i<7; i++){
        let kindValue = count[i]*i;
        if(count[i] === 3){
            checkConfirm(9, kindValue);
            checkConfirm(10, 0);
            checkConfirm(14, 0);
        } else if(count[i] === 4){
            checkConfirm(9, kindValue);
            checkConfirm(10, kindValue);
            checkConfirm(14, 0);
        } else if(count[i] === 5){
            checkConfirm(9, kindValue);
            checkConfirm(10, kindValue);
            checkConfirm(14, 50);
        }
        
    }
}

function handleSubmit(event) {
    event.preventDefault();

    for(let i=0; i < 5; i++){
        let value = parseInt(event.target[i].value);
        diceValue.push(value);
    }

    diceValue.sort();
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