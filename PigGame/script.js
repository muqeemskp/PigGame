"use strict";
// Understanding the Project
// 1. Roll-dice button
// 2. Hold button
// 3. New game button
// 4. Refactoring the code by declairing functions to make code dry

// Divide problems into sub-problems
// Access elements and store them in variables.
const scoreEl0 = document.getElementById("score--0");
const scoreEl1 = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const diceRollBtn = document.querySelector(".btn--roll");
const scoreHoldBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const activePlayerBg = document.querySelector(".player--active");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const swithPlayer = function () {
  // Before switch make sure previous and current score of both players = 0
  currentScore0.textContent = 0;
  currentScore = 0;
  currentScore1.textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // Toggle check if specific class is present then simply remove it
  // Background change as player switch.
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
// We can use variables globally by declair them outside function
let currentScore, totalScores, activePlayer, playing;
const init = function () {
  // Re-assigning them
  currentScore = 0;
  totalScores = [0, 0];
  activePlayer = 0;
  playing = true;
  // Starting conditions
  diceImg.classList.add("hidden");
  // Finish game section
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
// 1. Roll-dice button
diceRollBtn.addEventListener("click", function () {
  if (playing) {
    // a. Generate random numbers
    const diceNumbers = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${diceNumbers}.png`;
    // Save diceNumber in current score until it is one
    if (diceNumbers !== 1) {
      // Check the active player than add the score in current score
      currentScore += diceNumbers;
      // We select 0 player as our player 1.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Select the next Player
      swithPlayer();
    }
  }
});
// 2. Hold Score Button

scoreHoldBtn.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to final score as per active player
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    // 2. check if >=100 ? current player wins.
    if (totalScores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceImg.classList.add("hidden");
      // No one can play
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--actve");
    } else {
      // 3. Switch Player
      swithPlayer();
    }
  }
});
// 3. New Game Button
newGameBtn.addEventListener("click", init);
// The End
