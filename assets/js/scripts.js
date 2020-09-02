// select all cards and add them to array using spread operator
let card = document.getElementsByClassName("card");
let cards = [...card];

// declare variable for all cards in deck
const memoryDeck = document.getElementById("card-deck");

// declare variable for any cards which have matched class tagged
let matchedCards = document.getElementsByClassName("match");


// shuffle used on start up
function shuffle(array) {
    var currentIndex = array.length, tmp, rnd;

    do {
        rnd = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tmp = array[currentIndex];
        array[currentIndex] = array[rnd];
        array[rnd] = tmp;
    }
    while (currentIndex !== 0); 
    return array;
};

// starts game upon page load / refresh / play again button
document.body.onload = startGame();

// on button for user to restart game
function playAgain(){
    startGame();
};

// shuffles cards, loops through array 
function startGame(){
 
// ensure the openCards array is
openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (const i in cards){
        memoryDeck.innerHTML = "";
        Array.prototype.forEach.call(cards, function(item) {
            memoryDeck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
};


// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

 // array for opened cards
 var openedCards = [];

// adding opened cards to openedCards array and checking for match
//  nested if statement to stop console error after one choice
function cardOpen() {
    openedCards.push(this);
    if (openedCards.length === 2) {
        if (openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// called if cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
};


// called if cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
};


// disable cards so user can't double click on opened card
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
};


// remove disabled from unmatched cards and add disabled to matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(i = 0; i < matchedCards.length; i++){
            matchedCards[i].classList.add("disabled");
        }
    });
};


// looping through original cards array to add event listeners to each card
for (const i in cards){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
};