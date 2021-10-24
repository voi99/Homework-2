const $ = (e) => document.querySelector(e);

var form = $('.addForm');
let itemList = $('#items');
let search = $('.search');
let firstClick = true;
let selectedItem;
let prev, current;

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', selectElement);
search.addEventListener('keyup', searchItems);

document.addEventListener('keydown', function (event) {
  if (event.target.tagName === 'BODY') {
    if (event.code === 'ArrowDown') {
      handleKey(() => {
        current++;
      });
    } else if (event.code === 'ArrowUp') {
      handleKey(() => {
        current--;
      });
    } else if (event.code === 'Enter') {
      itemList.children[current].classList.remove('selected');
      let text = itemList.children[current].firstChild.textContent;
      search.value = text;
      filterItems((arg) => {
        return arg.toLowerCase() === text.toLowerCase();
      });
    }
  }
});

function handleKey(cb) {
  if (firstKeyClick()) return;
  prev = current;
  cb();
  handleCurrent();
  itemList.children[prev].classList.remove('selected');
  itemList.children[current].classList.add('selected');
}

function handleCurrent() {
  if (current > itemList.children.length - 1) {
    current = 0;
  } else if (current < 0) {
    current = itemList.children.length - 1;
  }
}

function firstKeyClick() {
  if (firstClick) {
    firstClick = !firstClick;
    current = 0;
    prev = current;
    itemList.children[current].classList.add('selected');
    return true;
  }
}

function addItem(e) {
  e.preventDefault();

  let newItem = $('#item').value;
  $('#item').value = '';

  addLiToDOM(newItem);

  setCookie('items', getCookie('items') + newItem + '/');
}

function addLiToDOM(text) {
  let li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(text));

  let delBtn = document.createElement('button');
  delBtn.className = 'del-btn';
  delBtn.appendChild(document.createTextNode('X'));
  li.appendChild(delBtn);
  itemList.appendChild(li);
}

function removeItem(e) {
  if (e.target.classList.contains('del-btn')) {
    if (confirm('Are You Sure?')) {
      let li = e.target.parentElement;
      itemList.removeChild(li);
      let cookie = getCookie('items');
      cookie = cookie.replaceAll(li.firstChild.textContent + '/', '');
      setCookie('items', cookie);
    }
  }
}

function searchItems(e) {
  let text = e.target.value.toLowerCase();
  filterItems((arg) => {
    return arg.toLowerCase().startsWith(text);
  });
}

function selectElement(e) {
  if (!e.target.classList.contains('del-btn')) {
    let text = e.target.firstChild.textContent;
    search.value = text;
    filterItems((arg) => {
      return arg.toLowerCase() === text.toLowerCase();
    });
  }
}

function filterItems(cb) {
  let items = itemList.getElementsByTagName('li');
  Array.from(items).forEach((item) => {
    let itemName = item.firstChild.textContent;
    if (cb(itemName)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function init() {
  if (!getCookie('items')) {
    setCookie('items', '');
  } else {
    const items = getCookie('items').split('/').slice(0, -1);
    items.forEach((element) => {
      addLiToDOM(element);
    });
  }
}

function setCookie(cookieName, cookieValue) {
  document.cookie = cookieName + '=' + cookieValue;
}

function getCookie(cookieName) {
  const name = cookieName + '=';
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

init();
