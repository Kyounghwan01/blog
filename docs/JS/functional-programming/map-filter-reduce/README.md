---
title: 함수형 프로그래밍 - map, filter, reduce, go, pipe
meta:
  - name: description
    content: 함수형 프로그래밍 - map, filter, reduce, go, pipe
  - property: og:title
    content: 함수형 프로그래밍 - map, filter, reduce, go, pipe
  - property: og:description
    content: 함수형 프로그래밍 - map, filter, reduce, go, pipe
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/map-filter-reduce/
tags: ["JS", "functional"]
---

# map, filter, reduce, go, pipe

## map

### 명령형 로직 예시

```js
let price = [];
for (const p of products) {
  price.push(p.price);
}
log(...price);
```

- products의 price, name마다 함수를 다 만들어야함

### 함수형 로직 예시

```js
const log = console.log;

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
log(map(p => p.name, products));
```

### 이터러블 프로토콜을 따른 map의 다형성

`document.querySelectorAll("*")`의 경우 type이 array가 아니기 때문에 내장 함수 `map`을 쓸 수가 없다.
그러나 `document.querySelectorAll("*")`는 이터레이터를 가지고 있다.

```js
const it = document.querySelectorAll("*")[Symbol.iterator]();
log(it.next()); // {value: html, done: false}
```

그렇기 때문에 우리가 위에서 만든 map 함수를 적용할 수 있다. (우리가 만든 함수는 for of 문을 쓰기에 이터레이터가 없으면 사용 불가능)

```js
log(map(el => el.nodeName, document.querySelectorAll("*"))); // ['HTML', 'HEAD', 'BODY', 'SCRIPT']
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
log(new Map(map(([k, a]) => [k, a * 2], m)));
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
log(...under20000);
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
log(...filter(p => p.price < 20000, products));

// 2번째 인자가 이터러블이면 모두 사용 가능
log(filter(el => el % 2, [1, 2, 3, 4])); // [1, 3];

// 이터러블 하지 않은 값이라면, 제너레이터를 이용하여 이터러블을 리턴하여 사용가능
log(
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
log(total);
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

log(reduce(add, 0, nums)); // 15
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

log(reduce(add, nums));

// 보조함수를 이용해 다형성 이용 가능
log(reduce((total, product) => total + product.price, 2000, products)); // 60000

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

- 함수, 인자를 전달받아 즉시 값으로 리턴

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

## pipe

- 함수를 리턴하는 함수

```js
const pipe = (...fs) => a => go(a, ...fs);

const f = pipe(a + 1, a + 10, a + 100);

log(f(0)); // 111
```

### go, pipe add 함수 (인자 2개)

```js
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

go(
  add(0, 1),
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
);

const f = ((a, b) => a + b, a => a + 10, a => a + 100);

log(f(0, 1));
```

### product 예제 go로 변환

```js
go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);
```

## curry

함수를 값으로 다뤄 원하는 시기에 실행 (부분적으로 함수 실행 가능)
함수를 받아서 함수를 리턴하고, 인자를 받아서, 원하는 수의 인자가 들어오면 받은 함수를 실행

```js
// 인자의 갯수가 있으면 받은 인수로 실행, 인자가 없다면, 미리 설정한 인자로 실행
// 함수를 받아 함수를 리턴, 함수를 실행할때, 인자가 2개이상이라면 받은 함수를 즉시실행, 인자가 2개 미만이면 함수를 리턴하고 이후에 받은 인자를 기반으로 실행

// curry함수에 인자가 2개이상 또는 실행 2번, 인자 1개이상 있으면 바로 실행, 없으면 다음 함수 실행될때까지 대기
const curry = f => (a, ..._) => {
  console.log(..._); // null
  return _.length
    ? f(a, ..._)
    : (..._) => {
        console.log(..._); // 1,2,3
        return f(a, ..._);
      };
};

const mult = curry((a, b) => {
  console.log(a, b); // 3,1
  return a * b;
});

const mult3 = mult(3)(1, 2, 3); // 3, 첫번째 함수 실행 때, 인자가 1개이므로, 다음 함수 살행 대기 한후, 다음 함수 실행 첫번째 인자 받아 곱샘 리턴

const mult4 = mult(4, 5); // 20, 첫번째 함수 실행 때, 인자가 2개이상 들어갔기에 다음 함수 안 기다리고 바로 완료
```

### curry 응용

이 커리함수를 이용해 위에 만든 `go`함수를 개선하기 전, curry함수를 map, filter, reduce에 적용

```js
const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    // 함수형 프로그래밍은 어떤 값(name or price)을 수집하는지 명령하지 않고 추상화 시킨다
    // res.push(p.name);
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    // acc는 1부터 시작, nums = [2,3,4,5]로 시작
    acc = iter.next().value;
  }

  for (const n of iter) {
    acc = f(acc, n);
  }
  return acc;
});

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);

// currey 로직에 의해 아래와 같이 변경됩니다.
go(
  products,
  products => filter(p => p.price < 20000)(products),
  products => map(p => p.price)(products),
  prices => reduce(add)(prices),
  log
);

// 그리고, product를 받아 그대로 filter, map, reduce로 product를 전달한다는 것은 아래와 같이 개선할 수 있습니다.
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);
```

## go 함수 중복 제거

만약 price가 20000 미만인 값을 다 가져오거나, 10000 미만인 값을 다 가져올 경우 아래와 같이 작성할 수 있습니다.

```js
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);

go(
  products,
  filter(p => p.price < 10000),
  map(p => p.price),
  reduce(add),
  log
);
```

여기서, filter, map, reduce가 중복됩니다.
아래와 같이 개선 할 수 있습니다.

```js
const mapFilterTotalPrice = callback =>
  pipe(
    filter(callback),
    map(p => p.price),
    reduce(add)
  );
go(
  products,
  mapFilterTotalPrice(p => p.price < 15000),
  log
);
go(
  products,
  mapFilterTotalPrice(p => p.price < 10000),
  log
);
```

함수형 프로그래밍은 고차함수를 잘게 나누면서 중복 제거하고, 많은 방법으로 조합할 수 있습니다.

## 종합 예제

```js
const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: false }
];

const totalQuantity = products =>
  go(
    products,
    map(products => products.quantity),
    reduce(add)
  );

const total = products =>
  go(
    products,
    map(products => products.quantity * products.price),
    reduce(add)
  );

console.log(totalQuantity(products)); // 15
console.log(total(products)); // 345000

// products를 바로 go에 넣어 products를 사용한다는 것은 아래와 같다.
const totalQuantityPipe = pipe(
  map(products => products.quantity),
  reduce(add)
);

const totalPipe = pipe(
  map(products => products.quantity * products.price),
  reduce(add)
);

// 위에서 map, reduce가 중복되니 좀더 추상화 시키면
const sum = (fn, iter) => go(iter, map(fn), reduce(add));

let totalSum = sum(p => p.quantity * p.price, products);
// typeof totalSum === number;
console.log(totalSum);

// totalSum 함수가 products를 받아서 그대로 쓰므로 위에서 쓴 curry를 이용하면 더 개선할 수 있다.
totalSum = curry(sum(p => p.quantity * p.price));
// typeof totalSum === Function;
console.log(totalSum(products));
```

위처럼 추상화를 시키면 다른 예시로도 사용가능합니다.

```js
log(
  sum(p => p.usage, [
    { id: 1, usage: 100 },
    { id: 3, usage: 11 }
  ])
);
// 111
```

## dom html로 함수형 프로그래밍 만들기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML 출력해보기 - 장바구니</title>
    <script src="../lib/fx.js"></script>
  </head>
  <body>
    <div id="cart"></div>

    <script>
      const products = [
        { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
        { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
        { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
        { name: "후드티", price: 30000, quantity: 4, is_selected: false },
        { name: "바지", price: 25000, quantity: 5, is_selected: false }
      ];

      const add = (a, b) => a + b;

      const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

      const total_quantity = sum(p => p.quantity);

      const total_price = sum(p => p.price * p.quantity);

      document.querySelector("#cart").innerHTML = `
    <table>
      <tr>
        <th></th>
        <th>상품 이름</th>
        <th>가격</th>
        <th>수량</th>
        <th>총 가격</th>
      </tr>
      ${go(
        products,
        sum(
          p => `
          <tr>
            <td><input type="checkbox" ${p.is_selected ? "checked" : ""}></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><input type="number" value="${p.quantity}"></td>
            <td>${p.price * p.quantity}</td>
          </tr>
      `
        )
      )}
      <tr>
        <td colspan="3">합계</td>
        <td>${total_quantity(filter(p => p.is_selected, products))}</td>
        <td>${total_price(filter(p => p.is_selected, products))}</td>
      </tr>
    </table>
  `;
    </script>
  </body>
</html>
```
