const dice = document.querySelectorAll('input');
const form = document.querySelector('form');
const firstGame = document.querySelectorAll('[data-game-01]');
let diceValue = [];
let count = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};
let upperSubtotal = null;
let lowerSubtotal = null;
let total = null;
const CONFIRM = 'confirmed';

function countTotal(div){
    // upperSubtotal 계산
    for(let i=0; i<6; i++){
        if(firstGame[i].classList.contains(CONFIRM)){
            upperSubtotal = upperSubtotal + parseInt(firstGame[i].innerText);
        } else {
            // 점수 없는 곳은 removeEventListener
            firstGame[i].removeEventListener('click', clicked);
        }
        firstGame[6].innerText = upperSubtotal;
    }
    if (upperSubtotal === null){
        firstGame[6].innerText = 0;
        console.log(upperSubtotal);
    }
    
    // check bonus
    if (upperSubtotal > 62) {
        firstGame[7].innerText = '+ 35';
        firstGame[7].classList.remove('bonus')
        firstGame[7].classList.add(CONFIRM);
    } else if (upperSubtotal <= 62) {
        firstGame[7].innerText = upperSubtotal - 63;
    }

    // lowerSubtotal 계산
    for(let i=8; i<16; i++){
        if(firstGame[i].classList.contains(CONFIRM)){
            lowerSubtotal = lowerSubtotal + parseInt(firstGame[i].innerText);
        } else {
            firstGame[i].removeEventListener('click', clicked);
        }
        firstGame[16].innerText = lowerSubtotal;
    }
    if (lowerSubtotal === null){
        firstGame[16].innerText = 0;
    }

    //total 계산
    total = upperSubtotal + lowerSubtotal;
    firstGame[17].innerText = total;

    // reset
    upperSubtotal = null;
    lowerSubtotal = null;
    total = null;
}

// 확정된 점수는 변화시키지 않음
function checkConfirm(i, score){
    //upper section
    if(firstGame[i].classList.contains(CONFIRM)) {
        return;
    } else {
        firstGame[i].innerText = score;
        // 점수 클릭 할 수 있는 곳만 addEventListener
        firstGame[i].addEventListener('click', clicked);
    }
}

function resetValues() {
    diceValue = [];
    count = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };
    return;
}

function countNumbers() {

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
}
// 점수 계산
function makeScore() {
    // 반복되는 횟수 세기
    countNumbers();
    
    // upper section
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

        if(count[i] === 3){
            checkConfirm(9, kindValue);
    // 3 of a kind, 4 of a kind, yathzee
    // 많이 나온 주사위 찾기
    let sortObj = [];
    for (let number in count) {
        sortObj.push([number, count[number]]);
    }
    // value 큰 순서대로 정렬
    sortObj.sort(function(a, b) {
        return b[1] - a[1];
    })
    let largestCount = sortObj[0][1];
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
        } else {
            checkConfirm(9, 0);
            checkConfirm(10, 0);
            checkConfirm(14, 0);
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
    form.addEventListener("submit", handleSubmit);
}
init();