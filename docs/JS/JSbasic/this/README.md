---
title: 자바스크립트에서 this의 규칙
meta:
  - name: description
    content: 자바스크립트에서 this의 규칙
  - property: og:title
    content: 자바스크립트에서 this의 규칙
  - property: og:description
    content: 자바스크립트에서 this의 규칙
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/this/
tags: ["JS"]
---

# this 사용 규칙

> JavaScript에서 가장 난해하게 쓰이는 곳 마다 바뀌는 `this` 입니다. 이 `this` 는 4가지 규칙으로 쓰이고 그 공식을 바탕으로 정해진 결과를 가져옵니다.
>
> 결론부터 말씀드리면 **this가 실행되는 곳**을 보면 됩니다. 함수안에서 `this`를 쓰면 함수의 내용만으로는 `this`가 어떤 값을 가져오는 지 알 수 없습니다. **함수가 어떤 방식으로 실행하느냐에 따라 this 결정**됩니다.

## 1. 일반 함수 실행 방식

- 아래 있는 strict mode가 아닌 이상 무조건 글로벌 객체를 가리킵니다.

```js
var age = 1; // global object
function foo() {
  console.log(this.age);
  //this === global object : 브라우저에서는 window를 가리킨다.
}

foo(); // 1 (글로벌 객체 실행)

new foo(); // undefined (실행 방식이 다르다 (4번 방식))
```

```js
var age = 100;

function foo() {
  var age = 99;
  bar(age);
}
function bar(age) {
  console.log(this.age); // 100
}

foo(); // 100
```

### 1-1. Strict mode : 엄격한 모드

- 개발 면접에 [strict mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode) 질문이 많이 나옵니다. 꼭! 숙지하세요.
- 엄격한 모드에서 일반 함수 실행 방식을 쓰면 **window객체를 가리키지 않습니다.** 그 결과 `this`는 undefined가 되어 `error`가 출력됩니다.
- 개발 할 때 window 객체를 본인도 모르게 건드려 에러 발생을 막기 위해 채택했다고 합니다.

```js
"use strict";

var name = "ken";

function foo() {
  console.log(this.name); // 'this' === undefined // error
}
foo();
```

## 2. 점 방식

- `ken . foo()` : foo함수에서의 `this`는 `ken`을 가리킵니다.

```js
var age = 100;

var ken = {
  age: 35,
  foo: function foo() {
    console.log(this.age);
  }
};

ken.foo(); // 점 앞의 값(ken)이 this값에 할당된다.

/*
ken.foo(); = 
function foo(){
    console.log(ken.age);
  }
*/
```

```js
function foo() {
  console.log(this.age);
}
var age = 100;
var ken = {
  age: 36,
  foo: foo
};
var wan = {
  age: 32,
  foo: foo
};
var fn = ken.foo;

ken.foo(); // 36
wan.foo(); // 32
fn(); // 100
```

## 3. function.prototype.call, apply, bind

- 위 세가지 함수는 `this` 값을 개발자 마음대로 지정 할 수 있습니다.

### 3-1. function.prototype.call()

- [call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)함수의 인자 값으로 변수를 넣어줌으로 `this`를 변수로 할당한다. 아무 인자도 넣지 않으면 `일반 함수 실행`과 동일합니다.

```js
var age = 100;
function foo() {
  console.log(this.age);
}

var ken = {
  age: 36,
  log: foo
};

foo(); // 100
foo.call(); // 100
foo.call(ken); // 36
// foo를 실행하고, this 값을 ken으로 지정함 => this는 ken이다
// call : foo 함수를 실행한다 call에 인자를 줌으로 this를 지정한다.
```

- `call` 함수의 인자 값으로 첫 번째는 `this` 에 할당하는 값, 두 번째 부터는 호출하는 함수에 대한 인자 목록을 무제한으로 넣을 수 있습니다.

```js
//call은 인자를 무제한 받는다. this는 ken을 받고 뒤 1,2,3은 foo의 인자 값으로 들어간다.
function foo(a, b, c) {
  console.log(this.age);
  console.log(a, b, c);
}
const ken = { age: 123 };
foo.call(ken, 1, 2, 3);
/*
123
1 2 3
*/
```

### 3-2. function.prototype.apply()

- [apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 함수와 `call` 함수의 실행하는 방법은 동일합니다.
- 다른 점은 `call` 의 경우 두번 째부터 인자 목록을 받으나 `apply` 는 인자 **배열 하나**를 받는 다는 것입니다.

```js
var age = 100;
function foo() {
  console.log(this.age);
}

var ken = {
  age: 36,
  log: foo
};

foo(); // 100
foo.call(); // 100
foo.apply(ken); // 36 => this : ken
```

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a, b, c);
}
const ken = { age: 123 };
// foo.call(ken,1,2,3,4,5,6);
foo.apply(ken, [1, 2, 3, 4, 5, 6]);
/*
123
1 2 3
*/
// 2번째 인자의 요소를 배열로 무제한 줄수있고 순서대로 a,b,c로 들어감
// 배열에 맞는 조건이면 apply  (apply은 인자가 2개 this가리키는 것, 배열)

//bind

//foo.bind(ken)
//bind : function.prototype.bind는 function에 인자로 넘긴 this가 바인딩된 새로운 함수를 리턴한다.
var checkbindthis = foo.bind(this);
checkbindthis(ken, 123);
```

### 3-3. function.prototype.bind()

- [bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 함수는 `this` 키워드를 주어진 변수로 설정하고, 앞쪽의 매개변수도 자신의 인자를 사용해 미리 순서대로 채워놓은 **새로운 함수를 반환**합니다.

```js
var age = 100;
function foo() {
  console.log(this.age);
}
var ken = {
  age: 35,
  log: foo
};
// 새로운 함수를 반환
var bar = foo.bind(ken);
var baz = foo;
bar(); // 35
baz(); // 100
foo.call(ken); // 35
```

- 부분 적용 함수
  - `call` 와 같이 첫번째 인자로 `this`에 들어갈 변수를 넣고 두번째 인자로 `arguments` 에 들어갈 인자 목록을 넣습니다.
  - 이때 받은 함수 안에 인자 목록을 넣으면 함수를 정의 한 인자 뒤에 붙습니다.

```js
var age = 100;
function foo() {
  console.log(this.age);
  console.log(arguments);
}
var ken = {
  age: 34
};
var bar = foo.bind(ken, 1, 2, 3);
bar(1, 2, 3, 4, 5);
/*
34
[1,2,3,1,2,3,4,5]
*/
```

## 4. 생성자 함수 new

- [new](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new) 함수를 실행하면 해당 함수의 값은 **빈 객체**가 됩니다.
- `new`와 같이 쓰는 `this`는 return 문이 없어도 자동으로 return으로 할당 됩니다

```js
function Person() {
  console.log(this.age); //undefined
  this.age = 100;
  // this 값은 new를 만나 자동으로 return 되어 아래 콘솔에 100할당됨.
  console.log(this.age); //100
}

new Person();
```

```js
function p(c, i) {
  this.c = c;
  this.i = i;
}
new p([1, 2, 3], 100); //this가 new를 만나 자동 return되어 p {c:[123],i:100}
```

- 강제로 **상수를 return** 시켜도 return문은 작동하지 않습니다.

```js
function foo() {
  this.age = 100;
  this.aa = 1;
  return 3; // return이 안먹어
}
new foo(); // {age: 100, aa: 1}
//new에서는 return이 없어도 this가 있으면 결과값이 들어감
```

- 그러나 **객체를 return**하면 **함수는 객체 return 값을 채택**합니다.

```js
function foo() {
  var age = 100;
  return { hahah: 100 };
}
new foo();
// {hahah : 100};
```

## 종합 예제

- **keyPoint** : `this`가 포함된 함수가 어디에서 호출됬는가!

### Ex_1 : this.age 값 추정

```js
var age = 100;

const something = {
  age: 1,
  speak: function() {
    console.log(this.age);
    // 이 this.age가 호출되었습니다. 이제 어느 함수에서 불렸는지 알아야 합니다.
  }
};

const butler = {
  age: 10,
  serve: function(cb) {
    cb(); // this.age는 여기에서 호출되었습니다.
    // 이 함수는 1번 유형인 일반호출이기 때문에 글로벌 age를 가져와서 결과는 100
  }
};

butler.serve(something.speak); // 100
```

### Ex_2 : alert가 실행되는가?

```js
//var isSmart = true;
function programmer() {
  this.isSmart = false; //new를 만나 isSmart는 초기화 됩니다.
  this.upgrade = function(version) {
    this.isSmart = !!version; //1.1은 trudy 값 즉, this.isSmart = true
    work();
    /* this가 여기에서 호출되었습니다. 
    이 함수는 1번 유형으로 글로벌 객체 isSmart를 가져옵니다. 
    isSmart는 undefined이므로 falsy 입니다. 
    즉, alert는 작동하지 않습니다.
    맨 위 주석이 풀려있다면 작동 합니다.
    */
  };
}

function work() {
  if (this.isSmart) {
    window.alert("I can do my work! I am smart!"); // ?
  }
}

var programmer = new programmer();
// THINK: What should happen?
programmer.upgrade(1.1);
```

<TagLinks />

<Comment />
