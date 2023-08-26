"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-color', color);
    card.addEventListener('click', handleCardClick);

    let front = document.createElement('div');
    front.classList.add('front');
    front.textContent += "front";
    card.append(front);

    let back = document.createElement('div');
    back.classList.add('back');
    back.textContent += "back";
    back.style.backgroundColor = color;
    card.append(back);

    gameBoard.append(card);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.target.classList.toggle('flipped');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  console.log("Unflipped")
  if(card.target){
    card.target.classList.remove('flipped');
    card.target.style.backgroundColor = 'white';
  } else {
    card.classList.remove('flipped');
    card.style.backgroundColor = 'white';
  }

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  // ... you need to write this ...
  // cardList contains all elements with the card class
  let cardList = document.querySelectorAll('.card');
  let flipped = [];


  for(let card of cardList){
    if(card.classList.contains('flipped') && !card.classList.contains('matched')){
      flipped.push(card);
    }
  }

  if(flipped.length < 2 && !e.target.classList.contains('matched') && !e.target.classList.contains('flipped')){
    flipCard(e);
    flipped.push(e.target);
  }


  console.log(flipped)
  if(flipped.length === 2){
    console.log("Triggered")
    if(flipped[0].dataset.color === flipped[1].dataset.color){
      flipped.forEach((x)=> {
        x.classList.add('matched');
      })
    } else {
      setTimeout(() => {
        flipped.forEach((x) => {
          console.log(x)
          unFlipCard(x);
        })
      }, 1000);
    }
  }

  console.log("Flipped", flipped);
}

// Add event listener to start
function initStart(){
  let startButton = document.querySelector('.begin-button');
  let restartButton = document.querySelector('.restart-button');
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', restartGame);
}

// Hide start menu and start game
function startGame(){
  let start = document.querySelector('.start');
  start.classList.add('hide');
}

//Restart game
function restartGame(){
  document.querySelectorAll('.card').forEach(x => x.remove());

  let colors = shuffle(COLORS);
  createCards(colors);
}

initStart();

// 2am - 5
// 7pm

