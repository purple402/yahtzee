const dice = document.querySelectorAll('input');
let diceValue = {};


function handleInput(id, value) {
    var diceNumber = id.charAt(id.length - 1);

    diceValue[`${diceNumber}`] = value;
    makeScore();
}

dice.forEach(input => {
    input.addEventListener('change', () => {
        handleInput(input.id, input.value)
    })
})
