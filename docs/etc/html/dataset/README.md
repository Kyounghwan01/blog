---
title: html - 데이터 속성 data-set 사용법
meta:
  - name: description
    content: html - data-set 사용법
  - property: og:title
    content: html - data-set 사용법
  - property: og:description
    content: html - data-set 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/dataset/
tags: ["html"]
---

# data-set 사용법

HTML 태그안에 데이터 속성을 넣어 그 값을 JS, CSS에서 사용할 수 있습니다.
저의 경우 클릭, hover에 대상에 대한 정보를 가져올 때, 자주 사용하였습니다.
react를 자주 사용하니 react를 예시로 살펴보겠습니다.

## HTML

- 먼저 HTML 태그안에 데이터 속성을 삽입합니다.
- `data-...` 형태로 입력합니다.

```jsx
const exampleValue = {
  sortValue: "asc",
  bookingType: "booked"
};
return (
  <div
    className="example"
    data-index="1"
    data-sort={sortValue}
    data-book={bookingType}
  >
    클릭할 대상
  </div>
);
```

## react

- 데이터 속성을 `e.target.dataset`으로 받습니다.

```jsx
const exampleValue = {
  sortValue: "asc",
  bookingType: "booked"
};
const exampleClick = e => {
  console.log(e.target.dataset);
  // {sort: 'asc', book: 'booked', index: '1'}
};
return (
  <div
    className="example"
    data-index="1"
    data-sort={sortValue}
    data-book={bookingType}
    onClick={exampleClick}
  >
    클릭할 대상
  </div>
);
```

## javascript

- 자바스크립트라면 아래와 같이 사용합니다.

```js
const exampleDom = document.querySelector(".example");

console.log(exampleDom.index); // 1
```

## css

- 주어진 dataset를 css에서도 사용할 수 있습니다.

```css
.example[data-index="1"] {
  display: none;
}
```
