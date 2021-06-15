const gameScore = document.querySelectorAll('[data-score]');
const upperBonus = document.querySelector('[data-score-bonus]');
const form = document.querySelector('form');
const dice = form.querySelectorAll('input');
const resetBtn = document.querySelector('[data-reset]');
let diceValue = [];
let rollCount = 0;
const ACTIVE = 'active';
const FILLED = 'filled';

function endGame() {
    console.log('endgame');
}

function countTotal() {
    let subTotal = null;
    
    // upperSubTotal
    for(let i=0; i<6; i++) {
        if(gameScore[i].classList.contains(FILLED)) {
            subTotal += parseInt(gameScore[i].innerText);
        }
    }
    upperBonus.innerText = `(${subTotal - 63})`;
    
}

function chooseScore(event){
    const div = event.target;

    // 0점 선택한 경우 확인창 띄우기
    if(div.innerText == 0) {
        let checkZero = confirm("0점을 선택하시겠습니까?")
        if (!checkZero) return;
    }

    rollCount = 0;
    for(let i=0; i<5; i++) {
        dice[i].value = '';
    }

    div.classList.add(FILLED);
    gameScore.forEach(div => {
        div.classList.remove(ACTIVE);
        div.removeEventListener('click', chooseScore);
    });

    // 보너스, 합계 계산
    countTotal();

    // 점수 비우기 & 게임종료 확인
    let scored = 0;
    for(let i=0; i<13; i++) {
        gameScore[i].classList.contains(FILLED) ? scored += 1 : gameScore[i].innerText = '';
    }
    // 모든 칸이 채워지면 게임을 종료한다
    if(scored === 13) endGame();
}

function showScore(i, score){
    const div = gameScore[i];
    
    // 이미 점수가 적혀있는 곳인지 확인
    if(div.classList.contains(FILLED)) {
        return;
    } else {
        div.innerText = score;
        div.classList.add(ACTIVE);
        div.addEventListener('click', chooseScore);
    }
}

function calculateScore() {
    let diceCount = [0, 0, 0, 0, 0, 0]

    // count numbers
    for(let i=0; i<5; i++) {
        number = diceValue[i];
        diceCount[number -1] += 1;
    }
    
    // upper section
    for(let i=0; i<6; i++) {
        showScore(i, diceCount[i]*(i+1));
    }

    // lower section
    // chance
    let chance = 0;
    for(let i=0; i<5; i++) {
        chance += diceValue[i];
    }
    showScore(6, chance);

    // 3 of a kind, 4 of a kind, yahtzee
    // 많이 나온 주사위 눈의 값 찾기
    let sortCount = [];
    sortCount = Object.values(diceCount);
    sortCount.sort(function(a, b) {
        return b - a;
    });
    let largestCount = sortCount[0]
    switch(largestCount) {
        case 3:
            showScore(7, chance);
            showScore(8, 0);
            showScore(12, 0);
            break;
        case 4:
            showScore(7, chance);
            showScore(8, chance);
            showScore(12, 0);
            break;
        case 5:
            showScore(7, chance);
            showScore(8, chance);
            showScore(12, 50);
            break;
        default:
            showScore(7, 0);
            showScore(8, 0);
            showScore(12, 0);
            break;
    }

    // full house
    if(largestCount === 3 && sortCount[1] === 2) {
        showScore(9, 25);
    } else {
        showScore(9, 0);
    }

    // straight
    let checkStraight = false;
    // L.straight
    const lgStraight = [
        [1, 2, 3, 4, 5], [2, 3, 4, 5, 6]
    ];
    for(let i=0; i<2; i++) {
        if(JSON.stringify(diceValue) === JSON.stringify(lgStraight[i])) {
            showScore(10, 30);
            showScore(11, 40);
            checkStraight = true;
        }
    }
    // S.straight
    let setDiceValue = Array.from(new Set(diceValue));
    const smStraight = [
        [1, 2, 3, 4], [1, 2, 3, 4, 6], [1, 3, 4, 5, 6], [2, 3, 4, 5], [3, 4, 5, 6]
    ];
    if(!checkStraight) {
        for(let i=0; i<5; i++) {
            if(JSON.stringify(setDiceValue) === JSON.stringify(smStraight[i])) {
                showScore(10, 30);
                showScore(11, 0);
                checkStraight = true;
            }
        }
    }
    // Straight 아닌 경우
    if(checkStraight) {
        // checkStraight 초기화
        checkStraight = false;
    } else {
        showScore(10, 0);
        showScore(11, 0);
    }
}

function handleSubmit(event){
    event.preventDefault();

    // check rollCount
    if(rollCount == 3) {
        alert('더 이상 주사위를 굴릴 수 없습니다. 점수를 선택해 주세요.')
        return;
    }

    // 주사위 점수 입력
    for(let i=0; i<5; i++) {
        let value = parseInt(event.target[i].value);
        diceValue.push(value);
    }
    diceValue.sort();
    calculateScore();
    
    // reset values
    diceValue = [];
    rollCount++;
}

function init(){
    form.addEventListener('submit', handleSubmit);
    resetBtn.addEventListener('click', endGame);
}
init();