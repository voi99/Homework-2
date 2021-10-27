const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

let startBtn = $('.start-btn');
let stopBtn = $('.stop-btn');
let resetBtn = $('.reset-btn');
let modes = $('.modes').children;
let clock = $('.clock');
let controls = $('.controls');
let minutesUI = $('.minutes');
let secondsUI = $('.seconds');
let minutes;
let seconds;
var timer;
let started;
let firstClick;
let finished;
let mode;
let title = $('title');
let audio = new Audio('audio.mp3');

function init() {
  Array.from(modes).forEach((mode) => {
    mode.addEventListener('click', setMode);
  });
}

function setMode(e) {
  Array.from(modes).forEach((mode) => {
    mode.removeAttribute('id');
  });
  e.target.id = 'active';
  mode = e.target.textContent;
  handleReset();
  setClockAndControls(mode);
  updateUI();
  handleTitle();
  firstClick = true;
}

function setClockAndControls(mode) {
  started = false;
  if (mode === 'Pomodoro') {
    minutes = 25;
    seconds = '00';
  } else if (mode === 'Short Break') {
    minutes = 5;
    seconds = '00';
  } else if (mode === 'Long Break') {
    minutes = 10;
    seconds = '00';
  }
}

function updateUI() {
  clock.style.display = 'flex';
  controls.style.display = 'flex';
  updateClock();
  stopBtn.textContent = 'Stop';
}

function updateClock() {
  if (minutes.toString().length < 2) {
    minutesUI.innerHTML = `0${minutes}`;
  } else {
    minutesUI.innerHTML = minutes;
  }
  if (seconds.toString().length < 2) {
    secondsUI.innerHTML = `0${seconds}`;
  } else {
    secondsUI.innerHTML = seconds;
  }
}

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);

function handleStart(e) {
  if (finished) {
    handleReset();
    finished = false;
  }

  if (firstClick) {
    setTimeout(() => {
      minutes--;
      seconds = 59;
      updateClock();
      handleTitle();
      firstClick = false;
    }, 300);
  }

  if (!started) {
    timer = setInterval(handleTimer, 1000);
    started = true;
  }
}

function handleTimer() {
  seconds--;
  updateClock();
  handleTitle();
  if (seconds <= 0) {
    minutes--;
    handleTitle();
    if (minutes < 0) {
      clearInterval(timer);
      audio.play();
      finished = true;
      return;
    }
    seconds = 59;
    updateClock();
    handleTitle();
  }
}

function handleStop(e) {
  if (started) {
    clearInterval(timer);
    started = false;
  }
}

function handleReset() {
  firstClick = true;
  clearInterval(timer);
  setClockAndControls(mode);
  updateUI();
  handleTitle();
}

function handleTitle() {
  title.textContent = `(${minutesUI.textContent}:${secondsUI.textContent}) ${mode}`;
}

init();
