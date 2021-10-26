const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

let form = $('.form');
let addSquaresDiv = $('.add-new-square');
let squares = $('.squares');
let addSquareIcon = $('.add-square');
let isPalindromeText = $('.is-palindrome');

form.addEventListener('submit', addSquares);
squares.addEventListener('click', removeSquare);
squares.addEventListener('keyup', enterText);
addSquareIcon.addEventListener('click', addSquare);

function addSquares(e) {
  e.preventDefault();
  form.style.display = 'none';
  addSquaresDiv.style.display = 'flex';
  let no = $('#no').value;
  for (let index = 0; index < no; index++) {
    addSquare();
  }
  isPalindromeText.style.display = 'block';
}

function addSquare() {
  const square = document.createElement('div');
  square.className = 'square';

  const squareInput = document.createElement('input');
  squareInput.className = 'square-input';
  squareInput.maxLength = '1';
  squareInput.type = 'text';

  square.appendChild(squareInput);

  const delBtn = document.createElement('button');
  delBtn.className = 'del-btn';
  delBtn.appendChild(document.createTextNode('X'));
  square.appendChild(delBtn);

  square.appendChild(delBtn);

  squares.appendChild(square);
}

function enterText(e) {
  if (e.target.classList.contains('square-input')) {
    if (!e.target.value.match(/^[a-zA-Z ]*$/)) {
      e.target.parentElement.style.border = '2px solid red';
      setPolindromeElement('red', 'Unijeta rijec nije palindrom!');
      return;
    }
    updateCharactersAndPolindrome();
    e.target.parentElement.style.border = 'none';
  }
}

function removeSquare(e) {
  if (e.target.classList.contains('del-btn')) {
    if (confirm('Are You Sure?')) {
      let div = e.target.parentElement;
      squares.removeChild(div);
      updateCharactersAndPolindrome();
    }
  }
}

function updateCharactersAndPolindrome() {
  const characters = Array.from(squares.children).map((square) => {
    return square.firstChild.value;
  });
  if (checkPalindrome(characters.join(''))) {
    setPolindromeElement('green', 'Unijeta rijec je palindrom');
  } else {
    setPolindromeElement('red', 'Unijeta rijec nije palindrom!');
  }
}

function checkPalindrome(str) {
  return (
    str.toLowerCase() === str.split('').reverse().join('').toLowerCase() &&
    !str.match(/\d/)
  );
}

function setPolindromeElement(color, text) {
  isPalindromeText.style.backgroundColor = color;
  isPalindromeText.innerHTML = text;
}
