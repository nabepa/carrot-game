'use strict';

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up--hidden');
const replay = document.querySelector('.pop-up__replay');

let isStart = false;
let timer = undefined;
let restTime = 10;

gameBtn.addEventListener('click', () => {
  if (!isStart) {
    startGame();
  } else {
    pauseGame();
  }
});

replay.addEventListener('click', () => {
  initGame();
  startGame();
});

function initGame() {
  isStart = false;
  restTime = 5;
  gameField.innerHTML = '';
  showRestTime();
  makeObjects('carrot', 5, './img/carrot.png');
  makeObjects('bug', 5, './img/bug.png');
}

function startGame() {
  isStart = true;
  showPauseBtn();
  showObjects();
  startTimer();
  hidePopup();
}

function pauseGame() {
  isStart = false;
  showPlayBtn();
  hideObjects();
  stopTimer();
  showPopup();
}

function finishGame() {
  isStart = false;
  hideObjects();
  stopTimer();
  showPopup();
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

function showRestTime() {
  const min = Math.floor(restTime / 60);
  const sec = restTime % 60;
  gameTimer.textContent = `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
}

function showPopup() {
  popUp.classList.remove('pop-up--hidden');
  popUp.classList.add('pop-up');
}

function hidePopup() {
  popUp.classList.remove('pop-up');
  popUp.classList.add('pop-up--hidden');
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
    if (restTime <= 0) {
      finishGame();
    } else {
      --restTime;
      showRestTime();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

initGame();
