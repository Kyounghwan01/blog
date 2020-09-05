---
title: 함수형 프로그래밍 - map, filter, reduce
meta:
  - name: description
    content: 함수형 프로그래밍 - map, filter, reduce
  - property: og:title
    content: 함수형 프로그래밍 - map, filter, reduce
  - property: og:description
    content: 함수형 프로그래밍 - map, filter, reduce
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/map-filter-reduce/
tags: ["JS", "functional"]
---

# map, filter, reduce

## map

### 명령형 로직 예시

```js
let price = [];
for (const p of products) {
  price.push(p.price);
}
console.log(...price);
```

- products의 price, name마다 함수를 다 만들어야함

### 함수형 로직 예시

```js
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    // 함수형 프로그래밍은 어떤 값(name or price)을 수집하는지 명령하지 않고 추상화 시킨다
    // res.push(p.name);
    res.push(f(a));
  }
  return res;
};

// 보조함수를 전달하여 어떤 값 매핑할지 정의 - 고차함수
console.log(map(p => p.name, products));
```

### 이터러블 프로토콜을 따른 map의 다형성

`document.querySelectorAll("*")`의 경우 type이 array가 아니기 때문에 내장 함수 `map`을 쓸 수가 없다.
그러나 `document.querySelectorAll("*")`는 이터레이터를 가지고 있다.

```js
const it = document.querySelectorAll("*")[Symbol.iterator]();
console.log(it.next()); // {value: html, done: false}
```

그렇기 때문에 우리가 위에서 만든 map 함수를 적용할 수 있다. (우리가 만든 함수는 for of 문을 쓰기에 이터레이터가 없으면 사용 불가능)

```js
console.log(map(el => el.nodeName, document.querySelectorAll("*"))); // ['HTML', 'HEAD', 'BODY', 'SCRIPT']
```

또한 이터레이터를 리턴한 모든 함수에 대입 가능합니다.

```js
function* gen() {
  yield 1;
  if (false) yield 3;
  yield 5;
}
map(a => a * a, gen()); // 1,9,25

let m = new Map();
m.set("a", 20);
m.set("b", 30);
console.log(new Map(map(([k, a]) => [k, a * 2], m)));
// Map { 'a' => 40, 'b' => 60 }
```

즉, 배열 뿐만이 아니라, 이터레이터를 가진 모든 값, 함수(모든 것에)에 모두 map을 사용가능하다.

## filter

### 명령형 로직 예시

```js
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
console.log(...under20000);
```

- products의 price, name마다 함수를 다 만들어야함

### 함수형 로직 예시

```js
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

// 보조함수를 전달하여 어떤 값 매핑할지 정의 - 고차함수
console.log(...filter(p => p.price < 20000, products));

// 2번째 인자가 이터러블이면 모두 사용 가능
console.log(filter(el => el % 2, [1, 2, 3, 4])); // [1, 3];

// 이터러블 하지 않은 값이라면, 제너레이터를 이용하여 이터러블을 리턴하여 사용가능
console.log(
  filter(
    el => el % 2,
    (function*() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
); // [1, 3, 5];
```

## reduce

여러 값을 하나의 값으로 축약하는 함수

### 명령형 로직 예시

```js
const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total += n;
}
console.log(total);
```

### 함수형 로직 예시

```js
const nums = [1, 2, 3, 4, 5];

const reduce = (f, acc, iter) => {
  for (const n of iter) {
    acc = f(acc, n);
  }
  return acc;
};

const add = (a, b) => a + b;

console.log(reduce(add, 0, nums)); // 15
```

acc 값을 생략하면 내부적으로 `nums[0]`이 acc가 되게

```js
const nums = [1, 2, 3, 4, 5];]

const reduce = (f, acc, iter) => {
  if (!iter) {
    // nums값은 이터러블임으로 next를 실행하지 못
    iter = acc[Symbol.iterator]();
    // acc는 1부터 시작, nums = [2,3,4,5]로 시작
    acc = iter.next().value;
  }
  for (const n of iter) {
    acc = f(acc, n);
  }
  return acc;
};

const add = (a, b) => a + b;

console.log(reduce(add, nums));

// 보조함수를 이용해 다형성 이용 가능
console.log(reduce((total, product) => total + product.price, 2000, products)); // 60000

```

## map + filter + reduce

- products에서 20000원 이하 가격의 총합

```js
const reduceFilterMap = reduce(
  add,
  filter(
    n => n < 20000,
    map(p => p.price, products)
  )
);
```

## 위처럼 중첩된 코드를 읽기 좋게 만들기

## go

```js
const go = (...args) => {
  reduce((a, f) => f(a), args);
};

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
);
```
