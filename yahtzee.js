const dice = document.querySelectorAll('input');
const form = document.querySelector('form');
let diceValue = [];
let count = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};
let yahtzeeCount = 0;
let upperSubtotal = null;
let lowerSubtotal = null;
let total = null;
const CONFIRM = 'confirmed';

function countTotal(div){
    // upperSubtotal 계산
    for(let i=0; i<6; i++){
        if(gameScore[i].classList.contains(CONFIRM)){
            // Assignment operators (x += y) === (x = x + y)
            upperSubtotal += parseInt(gameScore[i].innerText);
        } else {
            // 점수 없는 곳은 removeEventListener
            gameScore[i].removeEventListener('click', clicked);
        }
    }
    gameScore[6].innerText = upperSubtotal;
    if (upperSubtotal === null){
        gameScore[6].innerText = 0;
    }
    
    // check bonus
    if (upperSubtotal > 62) {
        gameScore[7].innerText = '+ 35';
        gameScore[7].classList.remove('bonus')
        gameScore[7].classList.add(CONFIRM);
    } else if (upperSubtotal <= 62) {
        gameScore[7].innerText = upperSubtotal - 63;
    }

    // lowerSubtotal 계산
    for(let i=8; i<15; i++){
        if(gameScore[i].classList.contains(CONFIRM)){
            lowerSubtotal += parseInt(gameScore[i].innerText);
        } else {
            gameScore[i].removeEventListener('click', clicked);
        }
    }

    // yahtzee bonus 확인
    if(gameScore[15].innerText !== ''){
        lowerSubtotal += parseInt(gameScore[15].innerText);
    }

    gameScore[16].innerText = lowerSubtotal;

    if (lowerSubtotal === null){
        gameScore[16].innerText = 0;
    }

    //total 계산
    total = upperSubtotal + lowerSubtotal;
    if(gameScore[7].classList.contains(CONFIRM)){
        total += 35;
    }
    gameScore[17].innerText = total;

    // reset
    upperSubtotal = null;
    lowerSubtotal = null;
    total = null;
}

// 확정된 점수는 변화시키지 않음
function checkConfirm(i, score){
    //upper section
    if(gameScore[i].classList.contains(CONFIRM)) {
        return;
    } else {
        gameScore[i].innerText = score;
        // 점수 클릭 할 수 있는 곳만 addEventListener
        gameScore[i].addEventListener('click', clicked);
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
                count[1] += 1;
                break;
            case 2 :
                count[2] += 1;
                break;
            case 3 :
                count[3] += 1;
                break;
            case 4 :
                count[4] += 1;
                break;
            case 5 :
                count[5] += 1;
                break;
            case 6 :
                count[6] += 1;
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
        chance += diceValue[i];
    }
    checkConfirm(8, chance);

    // 3 of a kind, 4 of a kind, yahtzee
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
    switch(largestCount){
        case 3:
            checkConfirm(9, chance);
            checkConfirm(10, 0);
            checkConfirm(14, 0);
            break;
        case 4:
            checkConfirm(9, chance);
            checkConfirm(10, chance);
            checkConfirm(14, 0);
            break;
        case 5:
            // check yahtzee bonus
            if(gameScore[14].classList.contains(CONFIRM)){
                if(yahtzeeCount !== 0){
                // more than second
                checkConfirm(9, chance);
                checkConfirm(10, chance);
                checkConfirm(15, 100*yahtzeeCount);
                yahtzeeCount += 1;
                } else {
                // secondtime but didn't check yahtzee at firstTime
                checkConfirm(9, chance);
                checkConfirm(10, chance);
                }
            } else {
                // firstTime
                checkConfirm(9, chance);
                checkConfirm(10, chance);
                checkConfirm(14, 50);
            }
            break;
        default:
            checkConfirm(9, 0);
            checkConfirm(10, 0);
            checkConfirm(14, 0);
            break;
    }

    // full house
    if (largestCount === 3 && sortObj[1][1] === 2) {
        checkConfirm(11, 25);
    } else {
        checkConfirm(11, 0);
    }
    
    // straight
    let checkStraight = false;
    // L.straight
    // https://slee2540.tistory.com/49 object를 JSON.stringify 통해 비교해야한다
    const lgStraight = [
        [1, 2, 3, 4, 5], [2, 3, 4, 5, 6]
    ];
    for(let i=0; i<2; i++){
        if (JSON.stringify(diceValue) === JSON.stringify(lgStraight[i])){
            checkConfirm(12, 30);
            checkConfirm(13, 40);
            checkStraight = true;
        }
    }
    
    // S.straight
    let newArray = Array.from(new Set(diceValue));
    const smStraight = [
        [1, 2, 3, 4], [1, 2, 3, 4, 6], [2, 3, 4, 5], [1, 3, 4, 5, 6], [3, 4, 5, 6]
    ];
    for(let i=0; i<5; i++){
        if (JSON.stringify(newArray) === JSON.stringify(smStraight[i])) {
            checkConfirm(12, 30);
            checkConfirm(13, 0);
            checkStraight = true;
        }
    }
    // straight 아닌 경우
    if (checkStraight === true){
        checkStraight = false;
    } else if (checkStraight === false) {
        checkConfirm(12, 0);
        checkConfirm(13, 0);
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
    resetValues();
}

function clicked(event) {
    const div = event.target;

    div.classList.add(CONFIRM);
    countTotal(div);
    
    // 다시 클릭하지 못하게 함
    div.removeEventListener('click', clicked);
    
    // input 비우기
    for(let i=0; i<5; i++){
        dice[i].value = '';
    }

function init(){
    // submit 한 value 처리
    form.addEventListener("submit", handleSubmit);
}
init();