'use strict';

const gameBtn = document.querySelector('.game__btn');

let isPlay = false;

gameBtn.addEventListener('click', () => {
  if (!isPlay) {
    startGame();
  } else {
    pauseGame();
  }
  console.log(isPlay);
});

function initGame() {
  isPlay = false;
  makeObjects();
}

function startGame() {
  isPlay = true;
  showPauseBtn();
  showObjects();
}

function pauseGame() {
  isPlay = false;
  showPlayBtn();
  hideObjects();
}

function finishGame() {
  isPlay = false;
}

function showPauseBtn() {
  const btn = gameBtn.querySelector('.fas');
  btn.classList.remove('fa-play');
  btn.classList.add('fa-pause');
}

function showPlayBtn() {
  const btn = gameBtn.querySelector('.fas');
  btn.classList.remove('fa-pause');
  btn.classList.add('fa-play');
}

function makeObjects() {}

function showObjects() {}

function hideObjects() {}

initGame();
