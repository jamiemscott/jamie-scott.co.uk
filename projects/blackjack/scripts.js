// JS goes in here

// To try
// Destructuring arrays?
// For of loop for each card in the hand
// Arrow functions?
// simplify the functions by passing parameters between them
// try includes on the hand array when checking for a duplicate card
// crete a deck and remove a card from the deck
// create the card and hand as their own class

const suits = [ "Hearts", "Diamonds", "Clubs", "Spades" ];
const cards = [ "Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
const handCont = document.getElementById("hand-cont");
const handScore = document.getElementById("hand-score");
const startBtn = document.getElementById("start-btn");
const dealBtn = document.getElementById("deal-btn");
let gameActive = "false"
let hand = [];
let handTotal = 0;
let card = [];

dealBtn.disabled = true;

function pickCard() {
    const card = cards[(Math.floor(Math.random() * cards.length))];
    return card;
};

function pickSuit() {
    const suit = suits[(Math.floor(Math.random() * suits.length))];
    return suit;
};

function randomCard() {
    let name = pickCard();
    let suit = pickSuit();
    let value = "";
    
    if (name === "Ace") {
        value = 11;
    } else if (name === "King" || name === "Queen" || name === "Jack") {
        value = 10;
    } else {
        value = name;
    };
    card = [name, suit, value];

    for (let i = 0; i < hand.length; i++) {
        if (hand[i] === card) {
            randomCard();
        } else {
            return card;
        }
    }
};

function renderCard() {
    randomCard();
    hand.push(card);
    handTotal += card[2];
    handCont.innerHTML += `
        <div class="card ${card[1]}">
            <p>${card[0]} of ${card[1]}</p>
        </div>
    `;
    checkTotal();
};

function checkTotal() {
    if (handTotal == 21) {
        handScore.innerHTML = `<p>Blackjack! Your score is ${handTotal}, you win 🥳</p>`;
        dealBtn.disabled = true;
    }
    else if (handTotal > 21) {
        handScore.innerHTML = `<p>Bust! Your score is ${handTotal}, you lose 😟</p>`;
        dealBtn.disabled = true;
    } else {
        handScore.innerHTML = `<p>Your score is ${handTotal}, would you like another card 🤔?<p>`;
    };
};

dealBtn.addEventListener("click", function() {
    if (gameActive) {
        renderCard();
    } else {
    dealBtn.disabled = true
    };
    
});

startBtn.addEventListener("click", function() {
    if (hand.length > 0) {
        hand = [];
        handTotal = 0;
        handCont.innerHTML = "";
        handScore.innerHTML = "";
        startBtn.textContent = "Start the game";
    } else {
        for (let i = 0; i < 2; i++) {
            renderCard();
            dealBtn.disabled = false;
            gameActive = true;
        }
        startBtn.textContent = "Restart the game"
    };   
});