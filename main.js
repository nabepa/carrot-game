'use strict';

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');

let isPlay = false;
let timer = undefined;
let restTime = 10;

gameBtn.addEventListener('click', () => {
  if (!isPlay) {
    startGame();
  } else {
    pauseGame();
  }
});

function initGame() {
  isPlay = false;
  restTime = 5;
  makeObjects('carrot', 5, './img/carrot.png');
  makeObjects('bug', 5, './img/bug.png');
  hideObjects();
}

function startGame() {
  isPlay = true;
  showPauseBtn();
  showObjects();
  startTimer();
}

function pauseGame() {
  isPlay = false;
  showPlayBtn();
  hideObjects();
  stopTimer();
}

function finishGame() {
  isPlay = false;
  stopTimer();
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

function showRestTime(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  gameTimer.textContent = `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
}

function makeObjects(type, number, imgPath) {
  for (let i = 0; i < number; ++i) {
    const newObjects = document.createElement('div');
    newObjects.classList.add(type);
    newObjects.innerHTML = `<img src=${imgPath} alt=${type} />`;
    gameField.appendChild(newObjects);
  }
}

function showObjects() {
  const carrots = document.querySelectorAll('.carrot');
  const bugs = document.querySelectorAll('.bug');

  carrots.forEach(carrot => {
    carrot.style.visibility = 'visible';
  });
  bugs.forEach(bug => {
    bug.style.visibility = 'visible';
  });
}

function hideObjects() {
  const carrots = document.querySelectorAll('.carrot');
  const bugs = document.querySelectorAll('.bug');

  carrots.forEach(carrot => {
    carrot.style.visibility = 'hidden';
  });
  bugs.forEach(bug => {
    bug.style.visibility = 'hidden';
  });
}

function startTimer() {
  timer = setInterval(() => {
    --restTime;
    showRestTime(restTime);
    if (restTime <= 0) {
      finishGame();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

initGame();
