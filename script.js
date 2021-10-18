'use strict';

// Selecting elements
const btnNew = document.querySelector('.btn--new');
const diceRollEl = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Starting conditions
let score, currentScore, activePlayer, playing;

// Init function
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice
diceRollEl.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check if it is 1
    if (diceRoll !== 1) {
      // add dice rol l to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // switch player
    } else {
      switchPlayer();
    }
  }
});

// Holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. Check if current score is >= 100
    if (score[activePlayer] >= 100) {
      // Player  wins
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Switch player
    } else {
      switchPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener('click', init);
