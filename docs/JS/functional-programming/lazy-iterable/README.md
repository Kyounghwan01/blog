---
title: 함수형 프로그래밍 - 제너레이터를 이용하여 시간 효율성 높은 함수 만들기
meta:
  - name: description
    content: 함수형 프로그래밍 - 제너레이터를 이용하여 시간 효율성 높은 함수 만들기 (map, filter, reduce)
  - property: og:title
    content: 함수형 프로그래밍 - 제너레이터를 이용하여 시간 효율성 높은 함수 만들기
  - property: og:description
    content: 함수형 프로그래밍 - 제너레이터를 이용하여 시간 효율성 높은 함수 만들기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/lazy-iterable/
tags: ["JS", "functional"]
---

# 제너레이터를 이용하여 시간 효율성 높은 함수 만들기

## range 함수

### 명령형

```js
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

let list = range(50000);
log(reduce(add, list));
```

### 함수형

```js
const L = {};
L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    // log(lists.next()) 가 실행되어야 콘솔이 찍힘
    log(i, "L.range");
    yield i;
  }
};

const lists = L.range(50000);
log(lists); // L.range {<suspended>}
log(lists.next()); // 왼쪽 처럼 lists의 내부가 직접 로직에 포함되어야 순차적으로 하나씩 실행됨
log(reduce(add, lists));
```

### 차이

명령형에서는 list에 배열이 담기지만 함수형에서는 lists에 리터러블이 담기게 됩니다.
배열, 이터러블 둘다 for of를 사용 가능하다는 점은 공통점이지만, 명령형에 담긴 배열은 `let list = range(50000);`를 통해 list가 선언되자마자 length 5만의 배열이 생성된다는 되지만
`const lists = L.range(50000)`를 통해 생성된 리터버블은 5만개의 lenght가 바로 생성되는 것이 아니라, lists가 로직에 의해 루프를 돌때가 되어야 1개 씩 생성된다는 다른 점이 있습니다.

## take

```js
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

log(take(5, range(100)));

log(go(L.range(100), take(5), reduce(add)));
```

- 이터러블이 있는 대상만 사용 가능하고, l만큼 잘라서 넣는다.

## L.map

- 이전에 만든 map 함수를 제너레이터 형태로 만든다

```js
L.map = function*(f, iter) {
  for (const a of iter) yield f(a);
};

var it = L.map(a => a * 10, [1, 2, 3]);
log(it.next()); // {value: 10, done: false}
```

## L.filter

- iter의 length가 4일 때, 총 4번이 yield가 되는 것이 아니라 원하는 상황에서만 yield가 된다.

```js
L.filter = function*(f, iter) {
  for (const a of iter) if (f(a)) yield a;
};

var its = L.filter(a => a > 2, [1, 2, 3, 4]);
log(its.next()); // 1번 할때, 걸러지는 것이 나옴 { value: 3, done: false }
log(its.next()); // { value: 4, done: false }
log(its.next()); // { value: undefined, done: true }
```
