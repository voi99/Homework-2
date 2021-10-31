console.log('CHALLENGE 1');
function createFunction() {
  return () => {
    console.log('hello');
  };
}

/*** Uncomment these to check your work! ***/
const function1 = createFunction();
function1(); // => should console.log('hello');

console.log('CHALLENGE 2');
function createFunctionPrinter(input) {
  return () => {
    console.log(input);
  };
}

/*** Uncomment these to check your work! ***/
const printSample = createFunctionPrinter('sample');
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter('hello');
printHello(); // => should console.log('hello');

console.log('CHALLENGE 3');
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  return () => {
    counter++;
    console.log('counter', counter);
  };
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  return (input) => {
    return x + input;
  };
}

/*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
console.log(addByTwo(1)); // => should return 3
console.log(addByTwo(2)); // => should return 4
console.log(addByTwo(3)); // => should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); // => should return 4
console.log(addByThree(2)); // => should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); // => should return 8
console.log(addByFour(5)); // => should return 9

console.log('CHALLENGE 4');
function once(func) {
  let first = true;
  let output;
  return (input) => {
    if (first) {
      output = func(input);
      first = false;
    }
    return output;
  };
}

/*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

console.log('CHALLENGE 5');
function after(count, func) {
  let counter = 1;
  return () => {
    if (counter === count) func();
    counter++;
  };
}

/*** Uncomment these to check your work! ***/
const called = function () {
  console.log('hello');
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

console.log('CHALLENGE 6');
function delay(func, wait) {
  return setTimeout(() => {
    func();
  }, wait);
}

delay(() => {
  console.log('wait is over');
}, 1000);

console.log('CHALLENGE 7');
function rollCall(names) {
  let counter = 0;
  return () => {
    if (counter === names.length) return 'Everyone accounted for';
    counter++;
    return names[counter - 1];
  };
}

/*** Uncomment these to check your work! ***/
const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth']);
console.log(rollCaller()); // => should log 'Victoria'
console.log(rollCaller()); // => should log 'Juan'
console.log(rollCaller()); // => should log 'Ruth'
console.log(rollCaller()); // => should log 'Everyone accounted for'

console.log('CHALLENGE 8');
function saveOutput(func, magicWord) {
  const obj = {};
  return (arg) => {
    if (arg === magicWord) {
      return obj;
    }
    let result = func(arg);
    obj[arg] = result;
    return result;
  };
}

/*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(JSON.stringify(multBy2AndLog('boo'))); // => should log { 2: 4, 9: 18 }

console.log('CHALLENGE 9');
function cycleIterator(array) {
  let counter = 0;
  return () => {
    if (counter < array.length) {
      counter++;
      return array[counter - 1];
    } else {
      counter = 0;
      return array[counter];
    }
  };
}

/*** Uncomment these to check your work! ***/
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

console.log('CHALLENGE 10');
function defineFirstArg(func, arg) {
  return (arg2) => {
    return func(arg, arg2);
  };
}

/*** Uncomment these to check your work! ***/
const subtract = function (big, small) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

console.log('CHALLENGE 11');
function dateStamp(func) {
  return (arg) => {
    const date = new Date();
    const obj = {
      date: date.toDateString(),
      output: func(arg),
    };
    return obj;
  };
}

/*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp((n) => n * 2);
console.log(JSON.stringify(stampedMultBy2(4))); // => should log { date: (today's date), output: 8 }
console.log(JSON.stringify(stampedMultBy2(6))); // => should log { date: (today's date), output: 12 }

console.log('CHALLENGE 12');
function censor() {
  const pairs = [];
  return (...args) => {
    if (args.length > 1) {
      pairs.push([args[0], args[1]]);
    } else {
      let argsChanged = args.toString();
      pairs.forEach((pair) => {
        argsChanged = argsChanged.replaceAll(pair[0], pair[1]);
      });
      return argsChanged;
    }
  };
}

/*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // => should log 'The slow, brown fox jumps over the lazy cats.'

console.log('CHALLENGE 13');
function createSecretHolder(secret) {
  let secretProp = secret;

  return {
    setSecret: (secret) => {
      secretProp = secret;
    },
    getSecret: () => {
      return secretProp;
    },
  };
}

/*** Uncomment these to check your work! ***/
obj = createSecretHolder(5);
console.log(obj.getSecret()); // => returns 5
obj.setSecret(2);
console.log(obj.getSecret()); // => returns 2

console.log('CHALLENGE 14');
function callTimes() {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
}

/*** Uncomment these to check your work! ***/
let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
console.log(myNewFunc1()); // => 1
console.log(myNewFunc1()); // => 2
console.log(myNewFunc2()); // => 1
console.log(myNewFunc2()); // => 2

console.log('CHALLENGE 15');
function russianRoulette(num) {
  return () => {
    num--;
    if (num > 0) {
      return 'click';
    } else if (num === 0) {
      return 'bang';
    } else {
      return 'reload to play again';
    }
  };
}

/*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // => should log 'click'
console.log(play()); // => should log 'click'
console.log(play()); // => should log 'bang'
console.log(play()); // => should log 'reload to play again'
console.log(play()); // => should log 'reload to play again'

console.log('CHALLENGE 16');
function average() {
  let arr = [];
  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length || 0;

  return (arg = null) => {
    if (arg === null) {
      return average(arr);
    } else {
      arr.push(arg);
      return average(arr);
    }
  };
}

/*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

console.log('CHALLENGE 17');
function makeFuncTester(arrOfTests) {
  return (cb) => {
    return arrOfTests.every((arr) => {
      return cb(arr[0]) === arr[1];
    });
  };
}

/*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(['hello', 'hellO']);
capLastTestCases.push(['goodbye', 'goodbyE']);
capLastTestCases.push(['howdy', 'howdY']);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str) => str.toUpperCase();
const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

console.log('CHALLENGE 18');
function makeHistory(limit) {
  let history = [];
  return (str) => {
    if (str === 'undo' && history.length > 0) {
      let undo = history.pop();
      return `${undo} undone`;
    } else if (str === 'undo' && history.length <= 0) {
      return 'nothing to undo';
    }
    if (history.length === limit) {
      history.shift();
    }
    history.push(str);
    return `${str} done`;
  };
}

/*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions('jump')); // => should log 'jump done'
console.log(myActions('undo')); // => should log 'jump undone'
console.log(myActions('walk')); // => should log 'walk done'
console.log(myActions('code')); // => should log 'code done'
console.log(myActions('pose')); // => should log 'pose done'
console.log(myActions('undo')); // => should log 'pose undone'
console.log(myActions('undo')); // => should log 'code undone'
console.log(myActions('undo')); // => should log 'nothing to undo'

console.log('CHALLENGE 19');
function blackjack(array) {
  let counter = 0;
  return (a, b) => {
    let sum;
    let first = true;
    let second = false;
    let bust = false;
    return () => {
      if (!bust) {
        if (first) {
          first = false;
          second = true;
          return a + b;
        } else if (second) {
          sum = array[counter] + a + b;
          second = false;
        } else {
          sum += array[counter];
        }
        counter++;
        if (sum > 21) {
          bust = true;
          return 'bust';
        } else {
          return sum;
        }
      } else {
        return 'you are done!';
      }
    };
  };
}

// /*** Uncomment these to check your work! ***/

/*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

/*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

/*** BELOW LINES ARE FOR THE BONUS ***/

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
