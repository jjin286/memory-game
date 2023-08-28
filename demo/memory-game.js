"use strict";

let cardNum = 10;
let score = 0;
let lowestScore = Infinity;
init();

/** Memory game: find matching pairs of cards and flip both of them. */

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

//Create a card for each image
function createCards() {
  const gameBoard = document.getElementById("game");
  // Generate a shuffle array of images from https://picsum.photos/
  let imageArr = shuffle(imageList());

  // Create a card and add to the gameboard for each image
  // Each have:
  // - A card div which holds the url to compare for matches in data-image
  //   and the eventListener for clicks
  // - A front div for the front of the card
  // - A back div for back of the card, background is the image
  for (let image of imageArr) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-image', image);
    card.addEventListener('click', handleCardClick);

    let front = document.createElement('div');
    front.classList.add('front');
    card.append(front);

    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + image + ')';
    card.append(back);

    gameBoard.append(card);
  }
}

/** Flip a card face-up. */
function flipCard(card) {
  card.target.classList.toggle('flipped');
  increaseScore();
}

/** Flip a card face-down. */
function unFlipCard(card) {
    card.classList.remove('flipped');
    card.style.backgroundColor = 'white';
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(e) {
  let cardList = document.querySelectorAll('.card');
  // Holds cards with the flipped class
  let flipped = [];

  // Checks all cards divs for flipped class
  // If card has flipped class, and is not already matched add to flipped array
  for(let card of cardList){
    if(card.classList.contains('flipped') && !card.classList.contains('matched')){
      flipped.push(card);
    }
  }

  // Checks if a card should be flipped
  // Checks if:
  // - There are already 2 cards flipped
  // - Card is already flipped
  // - Card is already matched
  // If not, flip the card and add it to flipped
  if(
    flipped.length < 2
    && !e.target.classList.contains('matched')
    && !e.target.classList.contains('flipped')
    ){
    flipCard(e);
    flipped.push(e.target);
  }

  // If there are 2 cards in the flipped array
  // Check if the two cards' images are the same
  // (The card div contains data-image which is the url for the image)
  // If same, add the matched class to each and check if game is over
  // Else, unflip the cards after 1 second
  if(flipped.length === 2){
    if(flipped[0].dataset.image === flipped[1].dataset.image){
      flipped.forEach((x)=> {
        x.classList.add('matched');
      })
      gameOver();
    } else {
      setTimeout(() => {
        flipped.forEach((x) => {
          unFlipCard(x);
        })
      }, 1000);
    }
  }

}

//Add eventListeners to elements and create cards required for start of game
function init(){
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
  let gameBoard = document.getElementById("game");

  gameBoard.classList.remove('hide');
  start.classList.add('hide');
}

//Restart game
function restartGame(){
  let over = document.querySelector('.game-over');
  // Remove all card divs
  document.querySelectorAll('.card').forEach(x => x.remove());

  // Reset cards and score
  createCards();
  resetScore();

  // Hides game over screen when reset
  if(!gameOver()){
    over.classList.remove('triggered');
    setTimeout(() => {
      over.style.zIndex = -1;
    }, 300)
  }
}

//Check if game is over and show game over screen
function gameOver(){
  let cards = document.querySelectorAll('.card');
  let over = document.querySelector('.game-over');

  // Checks if all cards have the matched class
  for(let card of cards){
    if(!card.classList.contains('matched')){
      return false;
    }
  }

  // Show the game over screen
  over.classList.add('triggered');
  over.style.zIndex = 5;

  checkLowestScore(score);

  return true;
}

//Increase score
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

//Return string of image url for https://picsum.photos/
function imageLink(num){
  return "https://picsum.photos/id/" + num + "/100/100";
}

//Generate an array of images from https://picsum.photos/
function imageList(){
  // Hold images that have already been added
  let imageCode = [];
  // List of image codes that don't return an image
  let invalidNum = [86, 97, 105, 138, 148, 150, 205, 207, 224, 226, 245, 246,
    262, 285, 286, 298, 303, 332, 333, 346, 359, 394, 414, 422, 438, 462, 463,
    470, 489, 540, 561, 578, 587, 589, 592, 595, 597, 601, 624, 632, 636, 644,
    647, 673, 697, 706, 707, 708, 709, 710, 711, 712, 713, 714, 720, 725, 734,
    745, 746, 746, 747, 748, 749, 750, 751, 752, 753, 754, 759, 761, 762, 763,
    771, 792, 801, 812, 843, 850, 854, 895, 897, 899, 917, 920, 934, 956, 963,
    968, 1007, 1017, 1030, 1034, 1046];
  // Holds the url of images to be used when creating cards
  let images = [];

  // Get an unique image code and add to imageCode array
  for(let i = 0; i < cardNum; i++){
    let randomNum = null;

    // Once image code that is not already added, and isn't invalid, end loop
    while(true){
      randomNum = Math.floor(Math.random() * 1084);
      if(!imageCode.includes(randomNum) && !invalidNum.includes(randomNum)){
        imageCode.push(randomNum);
        break;
      }
    }

    let image = imageLink(randomNum);

    images.push(image);
    images.push(image);
  }

  return images;

}

//Changes the number of cards on gameboard, resets best score
function changeCardNum(){
  let cardNumInput = Number(document.querySelector('#card-number').value);
  let lowestScoreBoard = document.querySelector('#lowest-score');
  let warning = document.querySelector(".input-warning");

  // Check if input is even, exists/isn't 0, less than or equal to 1982
  // 1982 is the maximum number of unique images
  if(cardNumInput % 2 === 0
      && !isNaN(cardNumInput)
      && cardNumInput
      && cardNumInput <= 1982
    ){
    // Half because we will be adding 2 of each unique image
    cardNum = cardNumInput/2;
    // Restart the game and lowest score
    restartGame();
    lowestScore = Infinity;
    lowestScoreBoard.textContent = "Best Score: 0";
  } else {
    // Triggers a warning about valid inputs
    warning.classList.add('triggered');
    setTimeout(() => {
      warning.classList.remove('triggered');
    }, 1300)
  }
}



//16 hours