const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const header = $('.header');
const tasks = $$('.task');
const footer = $('footer');

function init() {
  header.classList.add('animate__animated', 'animate__fadeIn');
  Array.from(tasks).forEach((task, index) => {
    task.classList.add('animate__animated', 'animate__fadeIn');
    task.style.animationDelay = `${index + 0.5}s`;
  });
  footer.classList.add('animate__animated', 'animate__fadeIn');
  footer.style.animationDelay = '7s';
}

init();
