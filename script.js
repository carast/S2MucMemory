const cards = document.querySelectorAll('.memory-card');
let scoreDisplay = document.getElementById("score");
let present = document.getElementById("present");
const overlay = document.getElementById("overlay");

const totalCards = 16;
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


    isMatch ? cardsMatched() : unflipCards();

}

function cardsMatched(){
    disableCards();

    updateScore();

    discoveredCards = discoveredCards+2;

    console.log("discovered Cards" + discoveredCards);

    if(discoveredCards >= totalCards){
        win();
    }
}

function updateScore(){
    score = score + Math.round(20/(unsuccessfulDraws+1));


    setTimeout(() => {
        scoreDisplay.innerHTML = score;
    },500);
    
    present.classList.toggle('scored');


    unsuccessfulDraws = 0;
}



function win(){

    //cards.forEach(card => card.classList.add('won'));
    party.element(document.getElementById("body"));

    setTimeout(() => {
        party.screen({ 
            count: 500 * (window.innerWidth / 1980),
            countVariation: 0.5,
            angleSpan: 0,
            yVelocity: -100,
            yVelocityVariation: 2,
            rotationVelocityLimit: 6,
            scaleVariation: 0.8
          });
    },500);

    party.screen({ 
        count: 500 * (window.innerWidth / 1980),
        countVariation: 0.5,
        angleSpan: 0,
        yVelocity: -100,
        yVelocityVariation: 2,
        rotationVelocityLimit: 6,
        scaleVariation: 0.8
      });

    setTimeout(() => {
        openOverlay();
    },3000);

}

function openOverlay(){
    document.getElementById("score-overlay").innerHTML = score;
    document.getElementById("overlay").style.display = "block";
}

document.addEventListener('keydown', (e) => {
    if (e.code === "KeyT") {
        
        win();
    }
  });

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
    //cards.forEach(card => card.classList.remove('won'));
    cards.forEach(card => card.addEventListener('click',flipCard));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.classList.remove('discovered'));
    shuffleCards();
    resetBoard();
    discoveredCards = 0;
    unsuccessfulDraws = 0;
    score = 0;
    scoreDisplay.innerHTML = score;

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
        let randomPos = Math.floor(Math.random()* 16);
        card.style.order = randomPos;

    });
}



(function setUpGame(){
    shuffleCards();
})();

cards.forEach(card => card.addEventListener('click',flipCard));