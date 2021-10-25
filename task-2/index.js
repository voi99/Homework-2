const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const xClassAndText = 'x';
const oClassAndText = 'o';

let xTurnInfo = $('.playerXinfo');
let oTurnInfo = $('.playerOinfo');
let cells = $$('.cell');

let oTurn;

startGame();

function startGame() {
  oTurn = null;
  xTurnInfo.style.visibility = 'visible';
  oTurnInfo.style.visibility = 'hidden';

  cells.forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove(xClassAndText);
    cell.classList.remove(oClassAndText);
    cell.removeEventListener('click', handlePlayerClick);
    cell.addEventListener('click', handlePlayerClick, { once: true });
  });
}

function handlePlayerClick(e) {
  const cell = e.target;
  const sign = oTurn ? oClassAndText : xClassAndText;
  putSign(cell, sign);
  if (checkWin(sign)) {
    gameState('win');
  } else if (checkDraw()) {
    gameState('draw');
  } else {
    swapTurns();
  }
}

function putSign(cell, sign) {
  cell.innerHTML = sign;
  cell.classList.add(sign);
}

function swapTurns() {
  oTurn = !oTurn;
  oTurn
    ? ((xTurnInfo.style.visibility = 'hidden'),
      (oTurnInfo.style.visibility = 'visible'))
    : ((xTurnInfo.style.visibility = 'visible'),
      (oTurnInfo.style.visibility = 'hidden'));
}

function checkWin(sign) {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(sign);
    });
  });
}

function checkDraw() {
  return Array.from(cells).every((cell) => {
    return (
      cell.classList.contains(xClassAndText) ||
      cell.classList.contains(oClassAndText)
    );
  });
}

function gameState(state) {
  if (state === 'win') {
    message = `Igrač ${oTurn ? 'O' : 'X'} je pobjednik`;
  } else if (state === 'draw') {
    message = 'Nerijeseno';
  }
  setTimeout(function () {
    alert(message);
    startGame();
  }, 40);
}
