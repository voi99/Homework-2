console.log('CHALLENGE 1');
function addTwo(num) {
  return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));

console.log('CHALLENGE 2');
function addS(word) {
  return `${word}s`;
}

// uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));

console.log('CHALLENGE 3');
function map(array, callback) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i]));
  }
  return newArray;
}

console.log(map([1, 2, 3], addTwo));

console.log('CHALLENGE 4');

function forEach(array, cb) {
  for (let i = 0; i < array.length; i++) {
    array[i] = cb(array[i]);
  }
}

const forArr = [1, 2, 3, 4, 5];
let newForArr = [];
forEach(forArr, (el) => {
  newForArr.push(addTwo(el));
});

console.log(newForArr);

// see for yourself if your forEach works!

console.log('CHALLENGE 5');
function mapWith(array, callback) {
  let arr = [];
  forEach(array, (el) => {
    arr.push(callback(el));
  });
  return arr;
}

console.log(mapWith([1, 2, 3], addTwo));

console.log('CHALLENGE 6');
function reduce(array, callback, initialValue) {
  forEach(array, (el) => {
    initialValue = callback(initialValue, el);
  });
  return initialValue;
}

const nums = [4, 1, 3];
const add = function (a, b) {
  return a + b;
};
console.log(reduce(nums, add, 0));

console.log('CHALLENGE 7');
function intersection(...arrays) {
  return arrays.reduce((accumulator, array) => {
    return array.filter((el) => accumulator.includes(el));
  });
}

console.log(
  intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20])
);
// should log: [5, 15]

console.log('CHALLENGE 8');
function union(...arrays) {
  return arrays.reduce((accumulator, array) => {
    return accumulator.concat(array.filter((el) => !accumulator.includes(el)));
  });
}

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

console.log('CHALLENGE 9');
function objOfMatches(array1, array2, callback) {
  let obj = {};
  return array2.reduce((accumulator, value, index) => {
    if (value === callback(array1[index])) {
      accumulator[array1[index]] = value;
    }
    return accumulator;
  }, obj);
}

console.log(
  JSON.stringify(
    objOfMatches(
      ['hi', 'howdy', 'bye', 'later', 'hello'],
      ['HI', 'Howdy', 'BYE', 'LATER', 'hello'],
      function (str) {
        return str.toUpperCase();
      }
    )
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

console.log('CHALLENGE 10');
function multiMap(arrVals, arrCallbacks) {
  let obj = {};
  return arrVals.reduce((accumulator, arrValue) => {
    accumulator[arrValue] = arrCallbacks.map((func) => {
      return func(arrValue);
    });
    return accumulator;
  }, obj);
}

console.log(
  JSON.stringify(
    multiMap(
      ['catfood', 'glue', 'beer'],
      [
        function (str) {
          return str.toUpperCase();
        },
        function (str) {
          return str[0].toUpperCase() + str.slice(1).toLowerCase();
        },
        function (str) {
          return str + str;
        },
      ]
    )
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

console.log('CHALLENGE 11');
function objectFilter(obj, callback) {
  let object = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key) && callback(key) === obj[key]) {
      object[key] = obj[key];
    }
  }
  return object;
}

const cities = {
  London: 'LONDON',
  LA: 'Los Angeles',
  Paris: 'PARIS',
};
console.log(JSON.stringify(objectFilter(cities, (city) => city.toUpperCase()))); // Should log { London: 'LONDON', Paris: 'PARIS'}

console.log('CHALLENGE 12');
function majority(array, callback) {
  let counterTrue = 0;
  let counterFalse = 0;

  array.forEach((el) => {
    callback(el) ? counterTrue++ : counterFalse++;
  });

  return counterTrue > counterFalse ? true : false;
}

/*** Uncomment these to check your work! ***/
const isOdd = function (num) {
  return num % 2 === 1;
};
console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
console.log(majority([2, 3, 4, 5], isOdd)); // should log: false

console.log('CHALLENGE 13');
function prioritize(array, callback) {
  return array.reduce((accumulator, arrValue) => {
    callback(arrValue)
      ? accumulator.unshift(arrValue)
      : accumulator.push(arrValue);
    return accumulator;
  }, []);
}

/*** Uncomment these to check your work! ***/
const startsWithS = function (str) {
  return str[0] === 's' || str[0] === 'S';
};
console.log(
  JSON.stringify(
    prioritize(
      ['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'],
      startsWithS
    )
  )
);
// should log: ['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends'];

console.log('CHALLENGE 14');
function countBy(array, callback) {
  return array.reduce((accumulator, arrValue) => {
    if (accumulator[callback(arrValue)]) {
      accumulator[callback(arrValue)] = accumulator[callback(arrValue)] + 1;
    } else {
      accumulator[callback(arrValue)] = 1;
    }
    return accumulator;
  }, {});
}

/*** Uncomment these to check your work! ***/
console.log(
  JSON.stringify(
    countBy([1, 2, 3, 4, 5], function (num) {
      if (num % 2 === 0) return 'even';
      else return 'odd';
    })
  )
); // should log: { odd: 3, even: 2 }

console.log('CHALLENGE 15');
function groupBy(array, callback) {
  return array.reduce((accumulator, arrValue) => {
    accumulator[callback(arrValue)]
      ? accumulator[callback(arrValue)].push(arrValue)
      : (accumulator[callback(arrValue)] = [arrValue]);
    return accumulator;
  }, {});
}

/*** Uncomment these to check your work! ***/
const decimals = [1.3, 2.1, 2.4];
const floored = function (num) {
  return Math.floor(num);
};
console.log(JSON.stringify(groupBy(decimals, floored))); // should log: { 1: [1.3], 2: [2.1, 2.4] }

console.log('CHALLENGE 16');
function goodKeys(obj, callback) {
  let arr = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key) && callback(obj[key])) {
      arr.push(key);
    }
  }
  return arr;
}

/*** Uncomment these to check your work! ***/
const sunny = {
  mac: 'priest',
  dennis: 'calculating',
  charlie: 'birdlaw',
  dee: 'bird',
  frank: 'warthog',
};
const startsWithBird = function (str) {
  return str.slice(0, 4).toLowerCase() === 'bird';
};
console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']

console.log('CHALLENGE 17');
function commutative(func1, func2, value) {
  return func2(func1(value)) === func1(func2(value));
}

/*** Uncomment these to check your work! ***/
const multBy3 = (n) => n * 3;
const divBy4 = (n) => n / 4;
const subtract5 = (n) => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false

console.log('CHALLENGE 18');
function objFilter(obj, callback) {
  let object = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key) && callback(key) === obj[key]) {
      object[key] = obj[key];
    }
  }

  return object;
}

/*** Uncomment these to check your work! ***/
const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n) => n / 2;
console.log(JSON.stringify(objFilter(startingObj, half))); // should log: { 2: 1, 6: 3 }

console.log('CHALLENGE 19');
function rating(arrOfFuncs, value) {
  let counter = 0;
  arrOfFuncs.forEach((func) => {
    if (func(value)) counter++;
  });
  return (counter / arrOfFuncs.length) * 100;
}

/*** Uncomment these to check your work! ***/
const isEven = (n) => n % 2 === 0;
const greaterThanFour = (n) => n > 4;
const isSquare = (n) => Math.sqrt(n) % 1 === 0;
const hasSix = (n) => n.toString().includes('6');
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75

console.log('CHALLENGE 20');
function pipe(arrOfFuncs, value) {
  return arrOfFuncs.reduce((accumulator, func) => {
    accumulator = func(accumulator);
    return accumulator;
  }, arrOfFuncs[0](value));
}

/*** Uncomment these to check your work! ***/
const capitalize = (str) => str.toUpperCase();
const addLowerCase = (str) => str + str.toLowerCase();
const repeat = (str) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'

console.log('CHALLENGE 21');
function highestFunc(objOfFuncs, subject) {
  let highest = null;
  let keyForHighest;
  for (const key in objOfFuncs) {
    if (Object.hasOwnProperty.call(objOfFuncs, key)) {
      if (objOfFuncs[key](subject) > highest) {
        highest = objOfFuncs[key](subject);
        keyForHighest = key;
      }
    }
  }
  return keyForHighest;
}

/*** Uncomment these to check your work! ***/
const groupOfFuncs = {};
groupOfFuncs.double = (n) => n * 2;
groupOfFuncs.addTen = (n) => n + 10;
groupOfFuncs.inverse = (n) => n * -1;
console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

console.log('CHALLENGE 22');
function combineOperations(startVal, arrOfFuncs) {
  return arrOfFuncs.reduce((accumulator, func) => {
    return func(accumulator);
  }, startVal);
}

function add100(num) {
  return num + 100;
}
function addTen(num) {
  return num + 10;
}

function divByFive(num) {
  return num / 5;
}

function multiplyByThree(num) {
  return num * 3;
}

function multiplyByFive(num) {
  return num * 5;
}

/*** Uncomment these to check your work! ***/
console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
console.log(combineOperations(0, [divByFive, multiplyByFive, addTen])); // Should output 10

console.log('CHALLENGE 23');
function myFunc(array, callback) {
  return array.findIndex(callback);
}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOdd1(num) {
  return num % 2 !== 0;
}

/*** Uncomment these to check your work! ***/
console.log(myFunc(numbers, isOdd1)); // Output should be 1
console.log(myFunc(evens, isOdd1)); // Output should be -1

console.log('CHALLENGE 24');
function myForEach(array, callback) {
  for (const arrayEl of array) {
    callback(arrayEl);
  }
}

let sum = 0;

function addToSum(num) {
  sum += num;
}

/*** Uncomment these to check your work! ***/
const numss = [1, 2, 3];
myForEach(numss, addToSum);
console.log(sum); // Should output 6
