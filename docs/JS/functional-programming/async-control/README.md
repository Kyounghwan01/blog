---
title: 함수형 프로그래밍 - 비동기 제어
meta:
  - name: description
    content: 함수형 프로그래밍 - 비동기 제어
  - property: og:title
    content: 함수형 프로그래밍 - 비동기 제어
  - property: og:description
    content: 함수형 프로그래밍 - 비동기 제어
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/iterator/
tags: ["JS", "functional"]
---

# 비동기 제어

## go 함수 비동기 제어

- go 함수는 reduce를 기반으로 하기 때문에 reduce 함수를 수정하도록합니다.

```js
// 들어오는 데이터가 프로미스라면 then 이후 나온 결과값을 가지고 두번째 들어온 함수 실행
const goPromise = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  return goPromise(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) {
        return acc.then(recur);
      }
    }
    return acc;
  });
});

go(
  Promise.resolve(1),
  a => a + 10,
  a => a + 1000,
  a => a + 100000,
  log
).catch(a => console.log(a)); // 101011

go(
  Promise.resolve(1),
  a => a + 10,
  a => Promise.reject("error"),
  log
).catch(a => console.log(a)); // error
```

## map 함수 비동기 제어

```js
go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => a + 10)
  log
).catch(a => console.log(a));
// [promise, promise, promise]
```

위처럼 map 함수에 Promise를 인자로 받은 경우, map함수에 비동기 처리를 하지않아 기다리지 않고, 바로 promise pending 상태로 리턴합니다.

그래서 map함수에 promise값을 핸들링 가능하도록 합니다.
위에서 쓴 `goPromise`함수를 응용합니다.

```js
const goPromise = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

L.map = curry(function*(f, iter) {
  for (const a of iter) {
    // goPromise함수에 의해 프로미스를 받은 값은 대기 후 실행 결과 리턴
    yield goPromise(a, f);
  }
});
```

## take 함수 비동기 제어

위처럼 map가 promise를 받아줬다면, map에서 리턴하는 값을 최종 제어하는 take 함수도 비동기제어를 하도록 합니다.

```js
const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      // 들어오는 값이 promise면 then이후 값을 push, 다음 값이 promise가 아닐 수 있으니 재귀로 평가
      if (a instanceof Promise)
        return a.then(a => ((res.push(a), res).length === l ? res : recur()));
      if ((res.push(a), res).length === l) return res;
    }

    return res;
  })();
});

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => a + 10),
  take(2),
  log
); // [11, 12]
```

## filter 함수 비동기 제어

아래의 코드를 실행하기 위해서는 filter에 대해서 비동기 값을 핸들링 해야합니다.

```js
go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  take(2),
  log
);
```

현재 코드에서 실행할 경우 filter에서는 비동기 값을 제어하지 않아 `promise<pending>`값이 뜨게 됩니다.

```js
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    // 여기에서 a 값이 promise이기 때문이죠, 위에서 정의한 goPromise 함수를 활용합니다.
    if (f(a)) res.push(a);
  }
  return res;
};
```

```js
const nop = Symbol("nop");

L.filter = curry(function*(f, iter) {
  for (const a of iter) {
    const b = goPromise(a, f);
    // b는 아직 promise그래서 분기처리, 다음 함수로 값을 보내지 않을땐 promise.reject
    // promise.reject값이 에러핸들링인지 무시인지 모르기때문에 nop을 정의하고, promise.reject 처리합니다 (take에서)
    if (b instanceof Promise) yield b.then(b => (b ? a : Promise.reject(nop)));
    else {
      if (b) yield a;
    }
  }
});
```

위처럼 filter함수에서도 promise값을 핸들링하였고, 이후, take함수에서도 promise 값을 받아주도록 합니다.

take내에 들어오는 값이 promise일 경우 then으로 값을 풀고, 푼 값에 에러가 있고 그 값이 nop일 경우 다음 iter를 실행합니다.

```js
const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      // 들어오는 값이 promise면 then이후 값을 push, 다음 값이 promise가 아닐 수 있으니 재귀로 평가
      // promise에 들어온 값이 위에서 날린 nop면 recur 실행해서 값 무시
      if (a instanceof Promise)
        return a
          .then(a => ((res.push(a), res).length === l ? res : recur()))
          .catch(e => (e === nop ? recur() : Promise.reject()));
      if ((res.push(a), res).length === l) return res;
    }

    return res;
  })();
});
```
