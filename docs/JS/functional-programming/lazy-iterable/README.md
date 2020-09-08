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

## 쿼리스트링 함수 만들기 (reduce로 데이터 산출)

```js
//api params 쉽게만들기
const params = {limit: 10, type: notice, page: 1)

const queryStr = params => go(
	params,
	Object,entries,
	map([k, v] => `${k}=${v}`),
	reduce((a, b) => `${a}&${b}`)

const queryStr = pipe(
	Object,entries,
	map([k, v] => `${k}=${v}`),
	reduce((a, b) => `${a}&${b}`)

log(queryStr(params)); // limit=10&type=notice&page=1
```

## join (reduce로 만드는 함수)

Array join보다 다형성 높은 join함수 (array만 사용되는 join이 아닌 다른 값도 join 사용하기)

```js
const join = curry(sep=",", iter) =>
	reduce((a, b) => `${a}${sep}${b}`, iter))

const queryStr = pipe(
	Object,entries,
	L.map([k, v] => `${k}=${v}`),
	join('&')
);
log(queryStr(params));

// 배열 아니여도 사용가능
function *a() {
	yield 10;
	yield 11;
	yield 12;
	yield 13;
}
log(join(' - ', a())) // 10 - 11 - 12 - 13
```

- 함수형 프로그래밍을 할때는, pipe 사이의 함수를 조각내 재사용 높게 사용가능하다
- join은 reduce를 쓰고, 이러터블 프로토콜을 사용한다

  - 이터러블 프로토콜을 따른 다는 것은 지연성을 가진다는 것이다
  - join에게 오는 값을 지연할수있다.
    - map을 쓰는경우 모든 값이 map을 돌아야만 join이 실행되나, L.map을 사용하는 경우 요소 1개당 join을 바로 실행할 수 있어, 지연성을 가짐으로 take 같은 함수 실행시 빠르게 함수종료할수있다.

- Object.entries도 즉시 결과를 리턴하는 것 이므로 지연성을 가지게 만들수있다.

```js
L.entries = function *(obj) {
	for (const k in obj) yield [k, obj[k]
}

const queryStr = pipe(
	L.entries,
	L.map([k, v] => `${k}=${v}`),
	join('&')
);
log(queryStr(params));
```

## find (take를 이용해 만드는 함수)

### 비지연성

```js
const users = [{ age: 32 }, { age: 31 }, { age: 30 }, { age: 29 }, { age: 28 }];

const find = (f, iter) => go(iter, filter(f), take(1), ([a]) => a);

log(find(u => u.age < 30, users)); // {age: 29}
```

### 지연성

```js
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));
log(find(u => u.age < 30)(users)); // {age: 29}

// find가 받는 첫번째 값이 이터러블이기 때문에 아래와 같은 코드도 가능하다
go(
  users,
  L.map(u => u.age),
  find(n => n < 30),
  log
);
// 29
```

## L.map, L.filter로 map, filter 함수 만들기

### take(Infinity)

- 일부만 가져오는것이 아니라, map, filter에 들어오는 iter 전체를 리턴하는 함수

```js
L.map = curry(function*(f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

const takeAll = take(Infinity);

// const map = curry((f, iter) => go(iter, L.map(f), takeAll));
// const map = curry((f, iter) => go(L.map(f, iter), takeAll));
const map = curry(pipe(L.map, takeAll));

log(map(a => a + 10, L.range(4)));

// ## L.filter + take로 filter 만들기

L.filter = curry(function*(f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const filter = curry(pipe(L.filter, takeAll));

log(filter(a => a % 2, range(4)));
```

## L.flatten

- nesting된 배열을 일차원 배열로 펼쳐주는 함수

```js
L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

var its = L.flatten([[1, 2, 3], 4, 5, [6, 7, 8]]);
log([...its]); // [1,2,3,4,5,6,7,8]

log(take(5, L.flatten([[1, 2, 3], 4, 5, [6, 7, 8]])); // [1,2,3,4,5]
```

## L.deepFlat

- 여러번 nesting된 배열 일차원으로 펼치는 함수

```js
L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};
log([...L.deepFlat([1, [2, [3, [4, 5]]]])]); //[1,2,3,4,5]
```

## L.flatMap

- map 이후, flatten

```js
L.flatMap = curry(pipe(L.map, L.flatten));

var its = go(
  [
    [1, 2],
    [3, 4],
    [5, 6]
  ],
  L.flatMap(L.map(a => a * a)),
  takeAll
);

// [ 1, 4, 9, 16, 25, 36 ]
```

## 2차원 배열 예제

```js
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

var its = go(
  arr,
  L.flatten,
  L.filter(a => a % 2),
  L.map(a => a * a),
  takeAll,
  reduce(add)
);
console.log(its); // 84
```

## 지연성, 실무중심 코드

```js
var users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 }
    ]
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 }
    ]
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 }
    ]
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 }
    ]
  }
];

go(
  users,
  L.flatMap(u => u.family), // L.map(u => u.family), L.flatten,
  L.filter(u => u.age > 20),
  L.map(u => u.age),
  take(4),
  reduce(add),
  log
);
```

- 객체지향 프로그래밍은 데이터를 설계한 후, 메소드를 데이터에 맞게 만드는 것이고,
- 함수형 프로그래밍은 범용적인 메소드를 만든 후, 데이터를 이에 맞추는 것이다.
- 위처럼, flatMap, map, filter 같은 범용적인 메소드를 작성후, 그 함수에 맞게 데이터를 끼우면 더 쉽게 코드를 작성할 수 있다.
- 상황이 주어지면, map하고 filter하고, reduce한다라는 사고를 먼저하여 메소드의 순서를 정의하고, 데이터를 끼워 맞추는게 함수형 프로그래밍
