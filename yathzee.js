const dice = document.querySelectorAll('input');


function handleInput(id, value) {

}

dice.forEach(input => {
    input.addEventListener('change', () => {
        handleInput(input.id, input.value)
    })
})
