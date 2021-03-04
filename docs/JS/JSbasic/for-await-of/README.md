---
title: JavaScript - async/await를 for loop에서 사용하기
meta:
  - name: description
    content: JavaScript - async/await를 for loop에서 사용하기, promise, promise.all, for of, for in, for await of
  - property: og:title
    content: JavaScript - async/await를 for loop에서 사용하기, promise, promise.all, for of, for in, for await of
  - property: og:description
    content: JavaScript - async/await를 for loop에서 사용하기, promise, promise.all, for of, for in, for await of
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/for-await-of/
tags: ["JS"]
---

# async/await를 for loop에서 사용하기

우리는 배열의 요소를 돌면서 ajax 통신을 하는 등 비동기 작업을 할 때가 있습니다. loop을 돌때는 for, forEach를 많이 쓰게 되죠.

그렇다면 for, forEach 내부에 async/await 비동기 처리를 하게 되는데 이때 치명적인 버그가 발생합니다.

## 하면 안되는 코드

```js
const params = [1, 2, 3, 4];

const resArray = [];
params.forEach(async param => {
  const res = await axios.get(`https://localhost/?id=${param}`);
  resArray.push(res.data);
});

console.log(resArray); // []
```

위 코드는 아주 전형적인 for loop안에서 비동기 통신을 하는 코드입니다. 코드를 돌려보시면 알겠지만 콘솔에서는 빈 배열이 나오게 됩니다.

**즉, for, forEach에서는 모든 비동기 작업이 끝나는 것을 대기하지 않습니다.**

## loop에서 비동기 하는 법

그래서 아래와 같은 방법들로 loop을 비동기로 돌 수 있습니다.

## for await of

[for await of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for-await...of) 이곳을 참조했습니다.

보통 비동기에 대응하는 열거자를 나열할 때 쓰입니다.

```js
const params = [1, 2, 3, 4];

const resArray = [];
for await (const param of params) {
  const res = await axios.get(`https://localhost/?id=${param}`);
  resArray.push(res.data);
}

console.log(resArray); // [x, x, x, x]
```

## for of/for in

`for await of`와 비슷한 방식으로 `for of` 또는 `for in`으로도 비동기 제어를 할 수 있습니다.

```js
for (const param of params) {
  const res = await axios.get(`https://localhost/?id=${param}`);
  resArray.push(res.data);
}

for (const index in params) {
  const res = await axios.get(`https://localhost/?id=${params[index]}`);
  resArray.push(res.data);
}
```

## Promise.all

위의 코드들은 1번 비동기가 끝날때까지 기다리고 2번 비동기 실행, 2번 끝나면 3번 실행으로 순차적으로 코드가 기다려집니다.

그러나 우리는 1,2,3이 모두 실행되고 1,2,3이 끝나면 그때 코드를 흘러가게 할 때도 있습니다. 이때 `Promise.all`을 사용합니다.

```js
const res = await Promise.all(
  paramsList.map(async params => this.$api.getAll(params))
);

console.log(res); // [결과1, 결과2, 결과3]
```

모든 비동기가 끝나면 코드가 흐릅니다. 한번에 비동기가 실행되기 때문에 **결과가 순서대로 들어가지 않습니다.**

비동기의 결과가 param의 순서대로 들어가야한다면 promise.all이 아닌 async await으로 하나 끝나면 결과 넣고, 두번째 시작하는 방법으로 로직을 구현해야합니다.

또는 promise.all로 순서없이 배열에 추가 후, 원하는 기준으로 sort하는 방법도 있습니다.

<TagLinks />

<Comment />
