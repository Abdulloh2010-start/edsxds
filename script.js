const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
const cardGrid = document.getElementById('card-grid');
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    cardGrid.appendChild(card);
}
function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('open');
    this.textContent = this.dataset.value;
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;
    checkMatch();
}
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
function startGame() {
    shuffle(cards);
    cards.forEach(value => createCard(value));
}
startGame();