---
title: JavaScript - setInterval, setTimeout 사용법
meta:
  - name: description
    content: JavaScript - setInterval, setTimeout 사용법
  - property: og:title
    content: JavaScript - setInterval, setTimeout 사용법
  - property: og:description
    content: JavaScript - setInterval, setTimeout 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/intervalFunction/
tags: ["JS"]
---

# setInterval, setTimeout 사용법

## setInterval

**setInterval()** 함수는 주기적으로 인자를 실행하는 함수입니다.

- 보통 아래와 같이 사용합니다.

```js
//Hello!라는 문자열을 콘솔에 3초에 1번씩 실행합니다.
function test() {
  console.log("Hello!");
}
setInterval(test, 3000);
```

- 위 test 함수에 인자가 있다면?

```js
function test(string) {
  console.log(string);
}
setInterval(function() {
  test("Hello!");
}, 3000);
```

- 위 방법을 응용하여 여러 함수를 인자로 넣어서 실행해 봅시다!

```js
function test1(string) {
  console.log("test1 : " + string);
}

function test2(string) {
  console.log("test2 : " + string);
}

setInterval(function() {
  test1("Hello!");
  test2("World!");
}, 3000);
//위와 같이 setInterval 함수 안에 함수를 인자로 넣고 실행하면 두개의 함수가 3초에 한번씩 실행됩니다.
```

```html
test1 : Hello! test2 : World! test1 : Hello! test2 : World!
```

## clearInterval

**clearInterval()** 함수는 현재 진행되고 있는 함수의 진행을 **멈추는데** 쓰입니다.

```js
var interval = setInterval(function() {
  console.log("Interval");
}, 1000);

//인자로 함수 이름 넣어줍니다.
clearInterval(interval);
```

```js
var interval = setInterval(function() {
  count++;
  if (count === 10) {
    clearInterval(interval);
  }
}, 3000);
```

## setTimeout

**setTimeout()** 함수는 일정시간이 지난 후 인자로 받은 함수를 **한번** 실행해주는 메소드입니다.<br>
함수 실행 후 return 값으로 상수를 리턴합니다(1). 함수 실행 때 마다 1씩 추가되어 리턴합니다. <br>
응용 : setTimeout의 리턴 값이 상수, 상수는 true 값을 이용하여 setTimeout의 조건을 넣을 수 있다.

```js
//5초 후에 oneTime이라는 string를 콘솔에 1번 찍고 종료합니다.
setTimeout(function() {
  console.log("oneTime");
}, 5000);

self.scrollState = false;
if (!self.scrollState) {
  self.mainElem.classList.add("running");
}
self.scrollState = setTimeout(function() {
  self.mainElem.classList.remove("running");
}, 500);
//setTimeout이 실행되면 상수를 리턴 함으로 true로 바뀐다.
```

<TagLinks />

<Comment />
