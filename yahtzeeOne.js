const gameScore = document.querySelectorAll('[data-score]');
const form = document.querySelector('form');
const dice = form.querySelectorAll('input');
const resetBtn = document.querySelector('[data-reset]');
let diceValue = [];
let diceCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};
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
    // count numbers
    for (let i=0; i<5; i++){
        number = diceValue[i];
        diceCount[number] += 1;
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
    for(let i=0; i<5; i++){
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