const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

let gallery = $('.gallery');
let gallerySlide = $('.gallery-slide');
let images = $$('.img');
let header = $('.header');

let backBtn = $('.fa-arrow-left');
let nextBtn = $('.fa-arrow-right');
let closeBtn = $('.del-btn');

let counter = 0;
let mouseState = false;

backBtn.addEventListener('click', handleSlide);
nextBtn.addEventListener('click', handleSlide);
gallery.addEventListener('mouseover', setMouseState);
gallery.addEventListener('mouseout', setMouseState);
document.addEventListener('keydown', handleKeySlide);

handleArrows();
startSlide();

function startSlide() {
  reset();
  images[counter].style.display = 'block';
}

function handleSlide(e) {
  reset();
  e.target.classList.contains('fa-arrow-left')
    ? (counter--, (images[counter].style.animation = '1.5s slideRight'))
    : (counter++, (images[counter].style.animation = '1.5s slideLeft'));
  images[counter].style.display = 'block';
  handleArrows();
}

function setMouseState(e) {
  mouseState = !mouseState;
}

function handleKeySlide(e) {
  if (mouseState) {
    reset();
    if (e.code === 'ArrowLeft' && counter > 0) {
      counter--;
      images[counter].style.animation = '1.5s slideRight';
    } else if (e.code === 'ArrowRight' && counter < images.length - 1) {
      counter++;
      images[counter].style.animation = '1.5s slideLeft';
    }
    images[counter].style.display = 'block';
    handleArrows();
  }
}

function reset() {
  images.forEach((img) => {
    img.style.display = 'none';
  });
}

function handleArrows() {
  counter >= images.length - 1
    ? (nextBtn.style.visibility = 'hidden')
    : (nextBtn.style.visibility = 'visible');
  counter <= 0
    ? (backBtn.style.visibility = 'hidden')
    : (backBtn.style.visibility = 'visible');
}

images.forEach((image) => {
  image.addEventListener('click', imageGrow);
});

function imageGrow() {
  reset();
  images[counter].style.display = 'block';
  gallery.classList.add('growGallery');
  images.forEach((img) => {
    img.classList.add('imgGrow');
  });
  header.style.display = 'none';
  closeBtn.style.display = 'inline-block';
}

closeBtn.addEventListener('click', closeGrow);

function closeGrow() {
  gallery.classList.remove('growGallery');
  images.forEach((img) => {
    img.classList.remove('imgGrow');
  });
  header.style.display = 'flex';
  closeBtn.style.display = 'none';
}
