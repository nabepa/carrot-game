'use strict';

const gameBtn = document.querySelector('.game__btn');
const gameField = document.querySelector('.game__field');

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
  makeObjects('carrot', 5, './img/carrot.png');
  makeObjects('bug', 5, './img/bug.png');
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

function makeObjects(type, number, imgPath) {
  for (let i = 0; i < number; ++i) {
    const newObjects = document.createElement('div');
    newObjects.classList.add(type);
    newObjects.innerHTML = `<img src=${imgPath} alt=${type} />`;
    gameField.appendChild(newObjects);
  }
}

function showObjects() {}

function hideObjects() {}

initGame();
