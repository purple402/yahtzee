const gameScore = document.querySelectorAll('[data-score]');
const form = document.querySelector('form');
const dice = form.querySelectorAll('input');
const resetBtn = document.querySelector('[data-reset]');
let diceValue = [];
let rollCount = 0;
const FILLED = 'filled';

function chooseScore(event){
    const div = event.target;

    div.classList.add(FILLED);
}

function showScore(i, score){
    const div = gameScore[i];
    
    // 이미 점수가 적혀있는 곳인지 확인
    if(div.classList.contains(FILLED)) {
        return;
    } else {
        div.innerText = score;
        div.classList.add('active');
        div.addEventListener('click', chooseScore);
    }
}

function calculateScore() {
    let diceCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    // count numbers
    for(let i=0; i<5; i++) {
        number = diceValue[i];
        diceCount[number] += 1;
    }

    // upper section
    for(let i=0; i<6; i++) {
        showScore(i, diceCount[i+1]*(i+1));
    }

    // lower section
    // chance
    let chance = 0;
    for(let i=0; i<5; i++) {
        chance += diceValue[i];
    }
    showScore(14, chance);

    // 3 of a kind, 4 of a kind, yahtzee
    // 많이 나온 주사위 눈의 값 찾기
    let sortObj = [];
    sortObj = Object.values(diceCount);
    sortObj.sort(function(a, b) {
        return b - a;
    });
    let largestCount = sortObj[0]
    switch(largestCount) {
        case 3:
            showScore(8, chance);
            showScore(9, 0);
            showScore(13, 0);
            break;
        case 4:
            showScore(8, chance);
            showScore(9, chance);
            showScore(13, 0);
            break;
        case 5:
            showScore(8, chance);
            showScore(9, chance);
            showScore(13, 50);
            break;
        default:
            showScore(8, 0);
            showScore(9, 0);
            showScore(13, 0);
            break;
    }

    // full house
    if(largestCount === 3 && sortObj[1] === 2) {
        showScore(10, 25);
    } else {
        showScore(10, 0);
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
}
init();