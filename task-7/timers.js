function sayHowdy() {
  console.log('Howdy');
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log('Partnah');
}
// After thinking it through, uncomment the following line to check your guess!
testMe(); // what order should these log out? Howdy or Partnah first?

function delayedGreet() {
  setTimeout(() => {
    console.log('welcome');
  }, 3000);
}
// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

function helloGoodbye() {
  console.log('hello');
  setTimeout(() => {
    console.log('good bye');
  }, 3000);
}
// Uncomment the following line to check your work!
helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

function brokenRecord() {
  const btn = document.querySelector('.btn');
  btn.addEventListener('click', handleStop);

  let interval = setInterval(() => console.log('hi again'), 1000);

  function handleStop() {
    clearInterval(interval);
  }
}
// Uncomment the following line to check your work!
brokenRecord(); // should log (every second): hi again

function limitedRepeat() {
  let interval = setInterval(hi, 1000);

  function hi() {
    console.log('hi for now');
  }
  setTimeout(() => clearInterval(interval), 5000);
}
// Uncomment the following line to check your work!
limitedRepeat(); // should log (every second, for 5 seconds): hi for now

function everyXsecsForYsecs(fn, interval, duration) {
  let intervalId = setInterval(fn, interval * 1000);
  setTimeout(() => clearInterval(intervalId), duration * 1000);
}
// Uncomment the following lines to check your work!
function theEnd() {
  console.log('This is the end!');
}
everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!

function delayCounter(target, wait) {
  return () => {
    let counter = 1;
    let interval = setInterval(printNo, wait);

    function printNo() {
      console.log(counter);
      counter++;
      if (counter > target) clearInterval(interval);
    }
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const countLogger = delayCounter(3, 1000);
countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

function promised(val) {
  return new Promise((res) => {
    setTimeout(() => res(val), 2000);
  });
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const createPromise = promised('wait for it...');
createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

class SecondClock {
  constructor(cb) {
    this.cb = cb;
    this.seconds = 0;
    this.id = undefined;
  }
  start() {
    this.id = setInterval(() => {
      this.seconds++;
      this.cb(this.seconds % 60);
    }, 1000);
  }
  reset() {
    this.seconds = 0;
    clearInterval(this.id);
  }
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const clock = new SecondClock((val) => {
  console.log(val);
});
console.log('Started Clock.');
clock.start();
setTimeout(() => {
  clock.reset();
  console.log('Stopped Clock after 6 seconds.');
}, 6000);

function debounce(callback, interval) {
  let counter = 0;
  let firstRun;
  return () => {
    let intervalId;
    if (!firstRun) {
      firstRun = true;
      intervalId = setInterval(() => counter++, 1);
      return callback();
    } else {
      if (counter < interval) {
        counter = 0;
        clearInterval(intervalId);
        intervalId = setInterval(() => counter++, 1);
        return undefined;
      } else {
        counter = 0;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          counter++, 1;
        });
        return callback();
      }
    }
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
function giveHi() {
  return 'hi';
}
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 2000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 4000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 8000); // -> 'hi'
