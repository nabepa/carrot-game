'use strict';

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameRestCarrot = document.querySelector('.game__rest-carrot');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up--hidden');
const replay = document.querySelector('.pop-up__replay');

const bgm = new Audio('./sound/bg.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const bugPull = new Audio('./sound/bug_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');
const alert = new Audio('./sound/alert.wav');

let isStart = false;
let timer = undefined;
let restTime = 0;
let numCarrot = 0;

gameBtn.addEventListener('click', () => {
  if (!isStart) {
    startGame();
  } else {
    pauseGame();
  }
});

gameField.addEventListener('click', event => {
  const target = event.target;
  if (target.className === 'carrot') {
    target.remove();
    --numCarrot;
    gameRestCarrot.textContent = numCarrot;
    carrotPull.play();
    if (numCarrot <= 0) {
      const isWin = true;
      finishGame(isWin);
    }
  } else if (target.className === 'bug') {
    const isWin = false;
    bugPull.play();
    finishGame(isWin);
  }
});

replay.addEventListener('click', () => {
  initGame();
  startGame();
});

function initGame() {
  const numBug = getRandomInt(5, 15);
  isStart = false;
  restTime = getRandomInt(5, 15);
  numCarrot = getRandomInt(5, 15);
  gameField.innerHTML = '';
  showRestTime();
  gameRestCarrot.textContent = numCarrot;
  makeObjects('carrot', numCarrot, './img/carrot.png', CARROT_SIZE);
  makeObjects('bug', numBug, './img/bug.png', BUG_SIZE);
}

function startGame() {
  isStart = true;
  showPauseBtn();
  showObjects();
  startTimer();
  hidePopUp();
  bgm.currentTime = 0;
  bgm.play();
}

function pauseGame() {
  isStart = false;
  showPlayBtn();
  hideObjects();
  stopTimer();
  showPopUp('restart?');
  bgm.pause();
  alert.play();
}

function finishGame(isWin) {
  isStart = false;
  gameBtn.style.visibility = 'hidden';
  hideObjects();
  stopTimer();
  bgm.pause();
  if (isWin) {
    gameWin.play();
    showPopUp('You won🥕🥕🥕');
  } else {
    showPopUp('You lost🙊🙊🙊');
  }
}

function showPauseBtn() {
  const btn = gameBtn.querySelector('.fas');
  gameBtn.style.visibility = 'visible';
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

function showPopUp(msg) {
  const popUpMsg = document.querySelector('.pop-up__message');
  popUpMsg.textContent = msg;
  popUp.classList.remove('pop-up--hidden');
  popUp.classList.add('pop-up');
}

function hidePopUp() {
  popUp.classList.remove('pop-up');
  popUp.classList.add('pop-up--hidden');
}

function makeObjects(type, number, imgPath, padding) {
  for (let i = 0; i < number; ++i) {
    const newObjects = document.createElement('img');
    const x = getRandomInt(0, gameField.clientWidth - padding);
    const y = getRandomInt(0, gameField.clientHeight - padding);
    newObjects.classList.add(type);
    newObjects.setAttribute('src', `${imgPath}`);
    newObjects.setAttribute('alt', `${type}`);
    newObjects.innerHTML = `<img src=${imgPath} alt=${type} />`;
    newObjects.style.position = 'absolute';
    newObjects.style.top = `${y}px`;
    newObjects.style.left = `${x}px`;
    newObjects.style.visibility = 'hidden';
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
      const isWin = false;
      finishGame(isWin);
    } else {
      --restTime;
      showRestTime();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

initGame();
