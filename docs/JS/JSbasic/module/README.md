---
title: JavaScript - es6의 module 패턴 알아보기 (import, export)
meta:
  - name: description
    content: JavaScript - es6의 module 패턴 알아보기 (import, export)
  - property: og:title
    content: JavaScript - es6의 module 패턴 알아보기 (import, export)
  - property: og:description
    content: JavaScript - es6의 module 패턴 알아보기 (import, export)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/module/
tags: ["JS"]
---

# es6의 module 패턴 알아보기

- 자바스크립트의 경우 변수 선언이 매우 자유로워 글로벌 스코프로 변수를 정의 할 경우 변수 오염되기 쉽습니다.
- 그래서 기존에는 name-space 방식 또는 requrejs 같은 라이브러리로 해결 했었습니다.
- 그러나 `es6에서 module를 채택하므로 함수, 변수를 관리하기 쉽게 되었습니다.`

## 변수 오염되는 예시

```js
// app.js
var num = 10;
const getNum = () => console.log(num);
```

```js
// main.js
var num = 20;
const getNum = () => console.log(num);
```

```html
<html>
  <body>
    <script src="./app.js"></script>
    <script src="./main.js"></script>
    <script>
      getNum(); // app.js의 num이라는 변수가 main.js에도 쓰여 변수가 오염되고 20이 출력된다
    </script>
  </body>
</html>
```

## name-space 방식

```js
var app = {
  num: 10
};
var main = {
  num: 20
};
```

## es6 모듈 방식

```js
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```

```js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

```js
// app.js
import exp, { pi, e } from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

- 위 처럼 모듈(`import`, `export`)을 사용하여 하나의 함수 또는 변수를 모듈로 관리함으로 다른 파일에서도 모듈을 합치거나, 활용할 수 있습니다.

<TagLinks />

<Comment />
