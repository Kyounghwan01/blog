---
title: JavaScript - 바로 쓸 수 있는 es6 정리
meta:
  - name: description
    content: JavaScript - 바로 쓸 수 있는 es6 정리, const,...,비구조할당,객체키할당
  - property: og:title
    content: JavaScript - 바로 쓸 수 있는 es6 정리
  - property: og:description
    content: JavaScript - 바로 쓸 수 있는 es6 정리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/es2015/
tags: ["JS"]
---

# ES2015

## var / let / const

### var

- scope : functional
- Var 속성은 하단에서 정의해도 호이스팅에 의해 정의는 되나 undefined
- 중복으로 정의하면 이후에 나온 변수로 overload된다.

```js
// Using var declaration #1
var a = 1;

if (true) {
  var b = 2;
}

console.log(a + b);

// Using var declaration #2
console.log(i); //undefined
for (var i = 0; i < 10; i++) {
  console.log(i); //1~10
}

console.log(i); //undefined
```

### let

- scope : {}에 의한 scope, var와 다르게 function에 의해 나눠지지 않고 if문 for문 등 {}에 의해 나뉜다.
- 전역변수로 선언해도 window객체에 포함되지 않는다. (Ex 6 참조)
- var와 다르게 코드 상단부에 정의하지 않으면 ReferenceError 도출 (Ex 7 참조)

```js
/*

  "let" variable declaration
	es2015에서는 let으로 변수를 생성한다. 
	
 */

// Example #1
let c = 1;

if (true) {
  let d = 2;
  /*
  let으로 변수 선언하면 let의 스코프가 var와 다르다
  let은 if문 내부에서만 접근 가능
  var는 함수문 이외에는 전역변수로 취급
  */
}

console.log(c + d); // d가 정의되지 않음

// Example #2
let a = 1;

if (true) {
  let a = 2;
  console.log(a); // 2
}

console.log(a); // 1

// Example #3
for (let i = 0; i < 10; i++) {
  //let은 {} 중괄호 기준으로 블락형성
  console.log(i); //0~9
}

console.log(i); // i is not defined

// Example #4

for (let i = 1; i < 11; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}

// Example #5
{
  let jason = {
    codename: "blackbriar",
    kill: function(target) {
      //var target = operator;
      target = null;
    }
  };

  let operator = {
    codename: "onion",
    answer: function() {
      alert("run away!");
    }
  };
  //객체이므로 위치값을 주는 것 reference;
  //값 자체가 바뀌지 않는다.
  jason.kill(operator);

  //console.log(jason.codename);
  console.log(operator.codename); //onion
}

console.log(jason.codename); //let 범위는 중괄호 이므로 undefined
console.log(operator.codename);

// Example #6
var x = "global";
let y = "global";

console.log(this.x); // "global"
//let은 전역변수로 사용해도 언디파인;
//let은 한번 선언하면 동일한 식별자로 재선언 불가
console.log(this.y); // undefined

// Example #7
function doSomething() {
  console.log(bar); // undefined 호이스팅
  console.log(foo);
  // ReferenceError - let은 변수를 선언해야지만 사용 가능(초기화)
  var bar = 1;
  let foo = 2;
}

doSomething();

// Example #8
// Must Read "Temporal Dead Zone": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone
console.log(typeof undeclaredVariable); // "undefined"
console.log(typeof i); // ReferenceError
let i = 10;
```

### const

- 한번 정의하면 못바꾸는 성질
- const 이름으로 된 변수에 객체를 정의할 경우 그 객체는 변경 가능 (Ex 2 참조)

```js
/*

  "const" variable declaration

 */

// Example #1
const foo = 2;
foo = 3; // 못바꾼다

// Example #2
const obj = {
  arr: [1, 2, 3]
};

obj = []; // error
//obj에 관한 값만 못바꾸고 그 안의 값들은 다 바꿀 수 있다.
obj.arr.length = 0; // 0
obj.arr.push(1); // 4
obj.arr = null; //null

{
  const bagooni = {
    items: ["gold", "silver", "bronze"],
    owner: "ken huh",
    address: 11101
  };

  const dodook = {
    criminalRecord: null,
    careerLevel: 12,
    storage: {},
    steal: function(target) {
      this.storage[target.owner] = target.items;
      this.careerLevel++;
      target.items = null;
    }
  };

  dodook.steal(bagooni);

  const police = {
    catchDodook: function() {
      dodook.criminalRecord = dodook.criminalRecord || 1;
      dodook = null;
    }
  };

  police.catchDodook();
}

const prison = {
  cells: [],
  addPrisoner: function(name) {
    const prisoner = {
      name: name,
      attitude: 0
    };

    this.cells.push(prisoner);
  }
};

const saminjo = ["kjm", "kks", "by"];

function startCatching() {
  const count = 0;

  while (count < 10) {
    if (saminjo.length) {
      prison.addPrisoner(saminjo[0]);
      saminjo.splice(0, 1);
    }

    count++;
  }

  if (!saminjo.length) {
    return "good job";
  } else {
    return "try harder";
  }
}
```

## Rest parameter

- …으로 사용하며, … 뒤 나머지 매개변수들을 **배열**로 만들어 출력한다
- Argument : js내부인자로 …와 상관 없이 함수 안의 인자를 전부 다 가진다. 배열은 아니다.

```js
/*

  rest parameter
  - ...뒤의 값들을 매개변수로 만들어 나머지 값들을 배열로 넣는다.
 */

// Example #1
function foo (a, b, ...c) {
  console.log(c);                // ['2','3','4','5']
  console.log(Array.isArray(c)); // true -> 배열이다!
}

foo('0', '1', '2', '3', '4', '5');



// "arguments" is different
//함수에 들어온 인자 값을 전부다 가진다. 배열이 아닌 유사 배열
function foo2 (a, b, ...c) {
  console.log(arguments); //[1,2,3,4,5 ...]
  console.log(Array.isArray(arguments)); //false
}

foo2(1, 2, 3, 4, 5);



// NO GOOD
// Rest parameter must be last parameter
function foo (...a, b) {
  console.log(a);
}
//나머지를 받는것이 ... 인데 ...뒤에 뭔가 있는건 불가능 하다
foo(1,2,3);
```

## spread operator

- rest parameter는 …뒤에 인자를 받으나 spread operator는 …뒤에 변수를 가진다.
- …변수를 사용함으로 변수를 그대로 넣어주는 효과를 가짐

```js
/*

  spread operator ...으로 배열을 퍼지게 한다. 
  rest parameter ...은 함수의 매개변수의 마지막에 쓰는 것.
  
 */

// Example #1
var arr1 = [[6, 6, 6], 2, 3];
var arr2 = [4, 5, 6];

var total = [...arr1, ...arr2];

console.log(total); // [[6,6,6],2,3,4,5,6]
//...뒤에 있는 배열을 그 자리에 위치한다.

// Example #2
function foo(a, b, c) {
  return a + b + c;
}

foo(...[1, 2, 3]); // 6
```

## Rest/Spread together

```js
/*

  Rest & Spread together

 */

const codingInstitutes = [
  { name: "FF", grade: -10 },
  { name: "VC", grade: 10 }
];

const mommy = {
  money: 100,
  decide: function(...choices) {
    if (this.money > 100) {
      const decision = null;

      choices.forEach(function(choice) {
        if (decision && decision.grade < choice.grade) {
          decision = choice;
        } else if (!decision) {
          decision = choice;
        }
      });

      return decision;
    } else {
      return null;
    }
  }
};

const studentA = {
  name: "kyuljungjangae",
  mommy: mommy,
  decide: function(...institutes) {
    const final = this.mommy.decide(...institutes);
    return final;
  }
};

let result = studentA.decide(...codingInstitutes);

console.log(result); // ?

result = null; // ?

// Hmm..
var agentA = {
  codeName: "oi",
  powerLevel: -999
};

var agentAA = {
  ...agentA,
  category: "chaeso"
};

console.log(agentAA);
```

## destructuring 비구조할당

- 기존의 문법을 부셔서 편리한 코딩을 위한 패치
- 객체 호출 후, 객체의 인자 값으로 변수를 다시 만들어 정의 (Ex 1 참조)
- 같은 방법으로 함수, 배열 정의 가능

```js
/*

  destructuring - 비구조할당

 */

// Example #1 - Object Destructuring
var address = {
  city: "new york",
  state: "NY",
  zipcode: "10003"
};

var { city, state } = address;
//새로운 변수안에 속성이 들어가고 그 것은 이전 변수의 이름이다.

console.log(city + ", " + state);

// Example #2 - Object Destructuring
var address = {
  city: "new york",
  state: "NY",
  zipcode: "10003"
};
var city = "seoul";
var { city: c, state: s } = address;

console.log(c + ", " + city + ", " + s);

// Example #3 - Object Destructuring
var address = {
  city: "new york",
  state: "NY",
  zipcode: "10003"
};
//매개변수를 비구조화
function logAddress({ city, state }) {
  console.log(city + ", " + state);
}

logAddress(address);

// Example #4 - 객체 안에 객체 안에 객체 비구조화
const person = {
  name: "Lee",
  address: {
    zipCode: "03068",
    city: "Seoul"
  }
};
const {
  address: { city }
} = person;
console.log(city); // 'Seoul'

// Example #1 - Array Destructuring
var numbers = [1, 2, 3, 4, 5];

var [one, two, three, four, five] = numbers;

var one = number[0];

console.log(one);
console.log(two);

// Example #2 - Array Destructuring
var numbers = [1, 2, 3, 4, 5];

var [one, , , , five] = numbers;

console.log(one);
console.log(five);

// Example #3 - Array Destructuring
var numbers = [1, 2, 3, 4, 5];

function sum([a, b, c, d, e]) {
  console.log(a + b + c + d + e);
}

sum(numbers);

// Example #4 - Array Destructuring
var numbers = [1, 2, 3, 4, 5];

function sum([a, b, c]) {
  console.log(a + b + c);
}

sum(numbers);

// Example #5 - Array Destructuring
var numbers = [1, 2, 3, 4, 5];

function sum([a, b, ...c]) {
  console.log(c);
}
//3,4,5

function sum(target) {
  var a = target[0];
  var b = target[1];
  console.log(a + b);
}

sum(numbers);

// Example #6 - Rest with Destructuring
const guicheokPeople = [1, 2, 3, 4, 5];

function punish(...people) {
  //  ...people = [[1,2,3,4,5]]
  console.log(people[0][2]);
  const [[a, b, c, d, e]] = people;
  return c;
}

const result = punish(guicheokPeople);
result;
```

## default parameter

디폴트 파라미터 : 값이 없는 것을 방지한다. 값이 있으면 아무 효과 없다

값이 undefined인가 아닌가에 따라 디폴트파라미터가 발동 or non 발동

```js
/*

  default parameter

 */

// Example #1

//
function logName(name = "ken") {
  console.log(name);
}

logName(); //ken
logName("wan"); //wan

// Example #2
function logNumber(num = 666) {
  console.log(num);
}

logNumber(); //666
logNumber(100); //100
logNumber(0); //0

// Example #3
function getNumber() {
  console.log("Getting number..");
  return 666;
}

function logNumber(num = getNumber()) {
  console.log(num);
}

logNumber(); // Getting number , 666리턴
logNumber(false); // 안출력
logNumber(null); // null
logNumber(undefined); // Getting number , 666리턴
```

## String Interpolation

`` : 중간에 변수를 넣을 때만 사용한다. 일반적인 string 값은 ''로 표현

```js
/*

  String Interpolation (Template Literals)

  http://jsbin.com/yilikal/edit?js,console

 */

// Example #1
const s = "ken";
console.log(`my name is ${s}`);
```

## Arrow Functions

함수 선언식을 변형하여 쓰기 쉽게 만든 형태

일반 함수방식과 다르게 this , argument 가 없다

```js
/*

  Arrow Functions

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

 */

// -> thin arrow
// => fat arrow
// 표현식으로만 쓴다 : 할당이 되어야만 사용한다.

const fn = a => {
  console.log(a);
};

fn();

//인자가 하나일 경우 소괄호 안써도 된다.

const fn = a => {
  console.log(a);
};

//함수 안에서 실행하는 실행문이 1개 이다
//나오는 값이 자동으로 리턴 값이 된다.
function multiply(a, b) {
  return a * b;
}

const multiply = (a, b) => a * b;

//function 키워드를 쓰면 this를 사용할 수 있는데
//가장 중요한 것은 this와 argument가 없다는 것이다.

let name = "ni";

const obj = {
  name: "ken",
  logName: () => {
    console.log(this.name);
    console.log(arguments);
  }
};

obj.logName(1, 2, 3);

// Arrow functions do not have its own`this`, `arguments`.
```

## 객체에 동적으로 키 저장

- 객체에 동적으로 키를 저장하는 방법은 이전에 [포스팅](https://kyounghwan01.github.io/blog/JS/JSbasic/jsonDynamicAllocation/) 한적이 있으나, 지금 기술하는 방법이 더 효율적입니다

```js
const name = "who";
const obj = { [name]: "nkh" };
```

- 위 처럼 객체의 키를 대괄호로 감싸 주면 변수의 값이 키에 할당 됩니다
- 이때, 주의해야 할 점은 객체에 키가 할당된 이후에는 `name`값이 바뀌어도 `obj`의 키 값은 바뀌지 않는다는 점입니다.

```js
let name = "who";
const obj = { [name]: "nkh" };
name = "isChange";
console.log(obj); // { who: 'nkh' }
```

- 키애 할당될 값 연산이 끝난 이후에, 객체에 할당하면 되겠습니다.

## 함수 default 값 설정

- es6 자바스크립트에서 함수에 인자가 다 오지 않으면 default 값을 넣는 방법은 아래와 같았습니다.

```js
function useDefault(_a, _b, _c) {
  const a = typeof _a === "undefined" ? 1 : _a;
  const b = typeof _b === "undefined" ? 1 : _b;
  const c = typeof _c === "undefined" ? 1 : _c;
  console.log([a, b, c]);
}
useDefault(1, 2, 3); // [1, 2, 3]
useDefault(1, 2); // [1, 2, 1]
```

- 그러나 es6에서는 함수 인자에 값을 할당하여, 함수 호출시 인자가 할당되지 않으면, 선언시 default로 정한 값이 들어가게 됩니다.

```js
function defaultParams(a = 1, b = 2, c = 3) {
  console.log([a, b, c]);
}
defaultParams(1, 2, 3); // [1, 2, 3]
defaultParams(1, 2); // [1, 2, 3]
defaultParams(1, undefined, 4); // [1, 2, 4]
```

<TagLinks />

<Comment />
