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
  increaseScore();
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
  gameOver();
  console.log("Flipped", flipped);
}

// Add event listener to start
function initStart(){
  let startButton = document.querySelector('.begin-button');
  let restartButton = document.querySelectorAll('.restart-button');
  startButton.addEventListener('click', startGame);
  restartButton.forEach((x) => {
    x.addEventListener('click', restartGame);
  })
}

// Hide start menu and start game
function startGame(){
  let start = document.querySelector('.start');
  start.classList.add('hide');
}

//Restart game
function restartGame(){
  let over = document.querySelector('.game-over');
  document.querySelectorAll('.card').forEach(x => x.remove());
  let colors = shuffle(COLORS);
  createCards(colors);
  resetScore();

  if(!gameOver()){
    over.style.display = 'none';
  }
}

//Check if game is over/game over screen
function gameOver(){
  let cards = document.querySelectorAll('.card');
  let over = document.querySelector('.game-over');

  for(let card of cards){
    if(!card.classList.contains('matched')){
      return false;
    }
  }

  over.style.display = 'grid';
  checkLowestScore(score);
  console.log("GAME OVER")
  return true;
}


//Increase score
let score = 0;
let lowestScore = Infinity;
function increaseScore(){
  let scoreBoard = document.querySelectorAll('#score');
  score++;
  console.log("Score", score)
  scoreBoard[0].textContent = "Score: " + score;
  scoreBoard[1].textContent = score;
}

//Reset score
function resetScore(){
  let scoreBoard = document.querySelectorAll('#score');
  score = 0;
  scoreBoard[0].textContent = "Score: " + score;
  scoreBoard[1].textContent = score;
}

//Check lowest score
function checkLowestScore(score){
  let lowestScoreBoard = document.querySelector('#lowest-score');
  if(score < lowestScore){
    lowestScore = score;
    lowestScoreBoard.textContent = "Best Score: " + lowestScore;
  }
}

initStart();

// 2am - 5
// 7pm - 9
// 12am

