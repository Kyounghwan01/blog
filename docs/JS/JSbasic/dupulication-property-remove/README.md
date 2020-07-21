---
title: 배열 내 객체 중복 id 값 제거
meta:
  - name: description
    content: 배열 내 객체 중복 id 값 제거
  - property: og:title
    content: 배열 내 객체 중복 id 값 제거
  - property: og:description
    content: 배열 내 객체 중복 id 값 제거
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

```js
example.filter(
  (arr, index, callback) => index === callback.findIndex((t) => t.id === arr.id)
);
```

## new Set()

- Set을 이용하여 중복제거합니다.
- map을 두번 써서 비효율적인것 같습니다.

```js
[...new Set(example.map(JSON.stringify)).map(JSON.parse)];
```

<TagLinks />

<Disqus />
