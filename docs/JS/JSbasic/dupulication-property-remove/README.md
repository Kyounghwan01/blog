---
title: JavaScript - 배열 내 객체 중복 id 값 제거
meta:
  - name: description
    content: JavaScript - 배열 내 객체 중복 id 값 제거
  - property: og:title
    content: JavaScript - 배열 내 객체 중복 id 값 제거
  - property: og:description
    content: JavaScript - 배열 내 객체 중복 id 값 제거
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/dealingDate/
tags: ["JS"]
---

# 배열 내 객체 중복 id 값 제거

배열 내 객체 프로퍼티 값 중에 중복으로 들어간 것을 제거하는 작업은 정말 많이 쓰입니다.
여러가지 방법으로 해결해보겠습니다.

### 예시

```js
// id가 중복되는 것을 제거하시오

let example = [{ id: 123 }, { id: 456 }, { id: 123 }];
```

## lodash

- loadsh를 사용하신다면 아주 간편하게 한줄로 중복을 제거 할 수있습니다.

```js
_.uniqBy(example, "id");
```

## reduce

- accumulator를 이용하여 중복제거합니다.

```js
example.reduce(function(acc, current) {
  if (acc.findIndex(({ id }) => id === current.id) === -1) {
    acc.push(current);
  }
  return acc;
}, []);
```

## filter

### 1번 풀이

```js
example.filter((item, i) => {
  return (
    example.findIndex((item2, j) => {
      return item.id === item2.id;
    }) === i
  );
});
```

### 2번 풀이

- filter에는 3번째 인자로 callback 함수가 들어갑니다. 이것을 이용한 방법

```js
example.filter(
  (arr, index, callback) => index === callback.findIndex(t => t.id === arr.id)
);
```

## new Set()

- Set을 이용하여 중복 제거합니다.

```js
[...new Set(example.map(JSON.stringify))].map(JSON.parse);
```

- 하나의 맹점이 있습니다
  - id가 같으나, 다른 속성이 있다면, 중복이라 생각하지 않고 리턴합니다. 아래와 같은 경우입니다.
  ```js
  const example2 = [
    { id: 123, name: "nkh" },
    { id: 123, name: "ddd" },
    { id: 5456, name: "zxc" }
  ];
  console.log([...new Set(example2.map(JSON.stringify))].map(JSON.parse));
  // [{id: 123,  name: 'nkh'}, {id: 123, name: 'ddd'}, {id: 5456, name: 'zxc'}]
  ```
- 즉, 객체의 속성이 1개만 있거나, 객체 값이 완전히 같은 것을 중복 제거 할 경우만 `new Set`을 써야합니다.

<TagLinks />

<Comment />
