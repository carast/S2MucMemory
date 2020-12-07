const cards = document.querySelectorAll('.memory-card');
let scoreDisplay = document.getElementById("score");
let present = document.getElementById("present");
const overlay = document.getElementById("overlay");

let totalCards = 16;
let discoveredCards = 0;

let unsuccessfulDraws = 0;
let score = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){

    if(lockBoard) return;
    if(this == firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    
    hasFlippedCard = false;
    secondCard = this;

    //match?
    checkForMatch();

}

function checkForMatch(){
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;

    document.getElementById("overlay").style.display = "block";


    isMatch ? cardsMatched() : unflipCards();

}

function cardsMatched(){
    disableCards();

    updateScore();

    discoveredCards = discoveredCards+2;

    if(discoveredCards >= totalCards){
        win();
    }
}

function updateScore(){
    score = score + Math.round(20/(unsuccessfulDraws+1));

    console.log(present);

    setTimeout(() => {
        scoreDisplay.innerHTML = score;
    },500);
    
    present.classList.toggle('scored');


    unsuccessfulDraws = 0;
}



function win(){
    scoreDisplay.innerHTML = score + " 🥳 You won! 🥳";
    cards.forEach(card => {
        card.classList.add("won");
    }); 
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    setTimeout(() => {
        firstCard.classList.add('discovered');
        secondCard.classList.add('discovered');
        resetBoard(); 
    },500);

    
}

function restartGame(){
    cards.forEach(card => card.addEventListener('click',flipCard));
    cards.forEach(card => card.classList.remove('flip'));
    shuffleCards();
    resetBoard();
    discoveredCards = 0;
    unsuccessfulDraws = 0;
    score = 0;

    overlay.style.display = "none";

}

function unflipCards(){

    unsuccessfulDraws = unsuccessfulDraws+1;

    lockBoard = true;

    present.classList.remove('scored');

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); 
    }, 1200);
}

function resetBoard(){
   [hasFlippedCard, lockBoard] = [false,false];
   [firstCard,secondCard] = [null,null];
}

function shuffleCards(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()* 12);
        card.style.order = randomPos;

    });
}



(function setUpGame(){
    shuffleCards();
})();

cards.forEach(card => card.addEventListener('click',flipCard));