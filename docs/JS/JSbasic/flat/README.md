---
title: JavaScript - 배열의 하위 배열 까지 합치는 flat(), flatMap() 사용법
meta:
  - name: description
    content: JavaScript - 배열의 하위 배열 까지 합치는 flat(), flatMap() 사용법
  - property: og:title
    content: JavaScript - 배열의 하위 배열 까지 합치는 flat(), flatMap() 사용법
  - property: og:description
    content: JavaScript - 배열의 하위 배열 까지 합치는 flat(), flatMap() 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/flat/
tags: ["JS"]
---

# flat()

ES2019에 추가된 메소드로 배열 내부의 하위 배열을 쉽게 합칠 수 있는 아주아주 유용한 메서드입니다.

**1. 왜 쓰나요?**

```js
const exampleArray = ["a", ["b"], ["c"]];
//이런 배열을 ['a', 'b', 'c'] 와 같이 만들고 싶을때가 있어요

//기존 방법으로는 concat, reduce를 사용해서 배열을 합했죠
const newArray = [].concat.apply([], exampleArray);
//['a', 'b', 'c']
const reduceNewArray = exampleArray.reduce((acc, x) => acc.concat(x), []);
//['a', 'b', 'c']
```

**2. flat()**

- flat은 위 처럼 하위 배열을 합칠때 사용합니다. 사용법은 매우 간단합니다.

```js
const exampleArray = ["a", ["b"], ["c"]];
const newArray = exampleArray.flat();
//newArray = ['a','b','c'];
```

- 빈 요소가 있으면 무시됩니다.

```js
const exampleArray = ["a", , ["b"], ["c"]];
const newArray = exampleArray.flat();
//newArray = ['a','b','c'];
```

- depth에 따라 합치는 정도를 나눌 수 있습니다.

```js
const exampleArray = ["a", ["b", ["c"]]];
const newArray = exampleArray.flat();
//newArray = ['a','b',['c']];

const flat1 = exampleArray.flat(1);
//newArray = ['a','b',['c']];

const flat2 = exampleArray.flat(2);
//newArray = ['a','b','c'];
```

**3. flatMap()**

- flatMap 메소드는 flat과 map을 합친 메소드입니다. map대신 flatMap을 사용하시면 됩니다.
- 위처럼 하위배열을 결합하는데 조건에 따라 결합을 할때 사용하시면 됩니다.

```js
let arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]
```

<TagLinks />

<Comment />
