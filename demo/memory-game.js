"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
let cardNum = 10;
const colors = shuffle(COLORS);




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

function createCards() {
  const gameBoard = document.getElementById("game");
  let imageArr = shuffle(imageList());

  for (let image of imageArr) {
    // missing code here ...
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-image', image);
    card.addEventListener('click', handleCardClick);

    let front = document.createElement('div');
    front.classList.add('front');
    // front.textContent += "front";
    card.append(front);

    let back = document.createElement('div');
    back.classList.add('back');
    // back.textContent += "back";
    back.style.backgroundImage = 'url(' + image + ')';
    card.append(back);

    gameBoard.append(card);
  }

  // for (let image = 0; image < 1200; image++) {
  //   // missing code here ...
  //   let card = document.createElement('div');
  //   card.classList.add('card');
  //   card.classList.add('flipped');
  //   card.setAttribute('data-image', image);
  //   card.addEventListener('click', handleCardClick);

  //   let front = document.createElement('div');
  //   front.classList.add('front');
  //   // front.textContent += "front";
  //   card.append(front);

  //   let back = document.createElement('div');
  //   back.classList.add('back');
  //   // back.textContent += "back";
  //   back.style.backgroundImage = 'url(https://picsum.photos/id/' + image + '/100/100)';
  //   card.append(back);

  //   gameBoard.append(card);
  // }
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

  if(flipped.length === 2){
    if(flipped[0].dataset.image === flipped[1].dataset.image){
      flipped.forEach((x)=> {
        x.classList.add('matched');
      })
    } else {
      setTimeout(() => {
        flipped.forEach((x) => {
          unFlipCard(x);
        })
      }, 1000);
    }
  }
  gameOver();
}

// Add event listener to start
function initStart(){
  let startButton = document.querySelector('.begin-button');
  let restartButton = document.querySelectorAll('.restart-button');
  let submit = document.querySelector('input[type="submit"]');

  createCards();

  submit.addEventListener('click', function(e){
    e.preventDefault();
    changeCardNum();
  })
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
  createCards();
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
  return true;
}


//Increase score
let score = 0;
let lowestScore = Infinity;
function increaseScore(){
  let scoreBoard = document.querySelectorAll('#score');
  score++;
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

//Return string of image url
function imageLink(num){
  return "https://picsum.photos/id/" + num + "/100/100";
}

//Generate image array
function imageList(){
  let imageNum = [];
  let invalidNum = [86, 97, 105, 138, 148, 150, 205, 207, 224, 226, 245, 246, 262, 285, 286, 298, 303, 332, 333, 346, 359,
    394, 414, 422, 438, 462, 463, 470, 489, 540, 561, 578, 587, 589, 592, 595, 597, 601, 624, 632, 636,
    644, 647, 673, 697, 706, 707, 708, 709, 710, 711, 712, 713, 714, 720, 725, 734, 745, 746, 746, 747,
    748, 749, 750, 751, 752, 753, 754, 759, 761, 762, 763, 771, 792, 801, 812, 843, 850, 854, 895, 897,
    899, 917, 920, 934, 956, 963, 968, 1007, 1017, 1030, 1034, 1046];
  let images = [];


  for(let i = 0; i < cardNum; i++){
    let randomNum = null;
    while(true){
      randomNum = Math.floor(Math.random() * 1084);
      console.log(invalidNum.length)
      console.log(!imageNum.includes(randomNum) && !invalidNum.includes(randomNum))
      if(!imageNum.includes(randomNum) && !invalidNum.includes(randomNum)){
        imageNum.push(randomNum);
        break;
      }
    }
    let image = imageLink(randomNum);

    images.push(image);
    images.push(image);
  }
  return images;
}

//Changes the number of cards
function changeCardNum(){
  let cardNumInput = Number(document.querySelector('#card-number').value);
  let lowestScoreBoard = document.querySelector('#lowest-score');
  let warning = document.querySelector(".input-warning");

  // Check if
  if(cardNumInput % 2 === 0
      && !isNaN(cardNumInput)
      && cardNumInput
      && cardNumInput <= 1982
    ){
    cardNum = cardNumInput/2;
    restartGame();
    lowestScore = Infinity;
    lowestScoreBoard.textContent = "Best Score: 0";
  } else {
    warning.classList.add('triggered');
    setTimeout(() => {
      warning.classList.remove('triggered');
    }, 1300)
  }
}

initStart();

// 2am - 5
// 7pm - 9
// 12am - 5
// 5

