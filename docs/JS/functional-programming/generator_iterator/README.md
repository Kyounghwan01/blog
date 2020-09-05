---
title: 함수형 프로그래밍 - 제너레이터 정의
meta:
  - name: description
    content: 함수형 프로그래밍 - 제너레이터 정의
  - property: og:title
    content: 함수형 프로그래밍 - 제너레이터 정의
  - property: og:description
    content: 함수형 프로그래밍 - 제너레이터 정의
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/generator_iterator/
tags: ["JS", "functional"]
---

# 제너레이터 정의

제너레이터는 이터레이터이자, 이터러블을 생성하는 함수를 말합니다.

- 이터레이터를 리턴하는 함수
- 일반함수에 `*`를 붙여 제너레이터 함수를 붙입니다.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  // 제너레이터에는 리턴값을 만들수 있고, done이 true일때 value로 박힌다
  // 순회 할때는 리턴값 무시한다.
  return 100;
}
// 제너레이터 함수를 실행한 결과는 이터레이터입니다.
let iter = gen();
// iter는 이터레이터이자 이터러블이기도 합니다. 즉, 또 다른 이터레이터를 반환하여 생성할 수 있습니다.
console.log(iter[Symbol.iterator]() === iter); // true
for (const a of iter) {
  console.log(a); // 1,2,3 (* 100 없음)
}

console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 100, done: true}
```

### 제너레이터를 이용하면 모든 값을 순회하도록 만들 수 있습니다.

논리를 펼치면 다음과 같습니다.

1. 이터러블이면 순회를 할 수 있다.
2. 제너레이터에는 어떠한 값도 들어갈 수 있다.
3. 제너레이터는 함수를 통해 순회 가능한 값(이터러블)을 산출 할 수 있다.
4. 즉, 제너레이터를 통해 js의 어떠한 값, 로직도 순회 가능하게 만들 수 있다.

## 홀수 발생 예시

```js
const log = console.log;

// 무한 수열
function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odd(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

for (const a of odd(40)) {
  log(a);
}

// 제너레이터를 사용해 이터레이터가 있으니 전개 연산자, 비구조할당 등등 사용가능
log([...odd(10), ...odd(20)]);
const [head, ...tail] = odd(5); // 1 [3, 5]
```
