---
title: svg 다루기
meta:
  - name: description
    content: React.js - svg 다루기 react svg
  - property: og:title
    content: React.js - svg 다루기
  - property: og:description
    content: React.js - svg 다루기, react, setState, component
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/handling-svg/
tags: ["react"]
---

# svg 다루기

svg는 png와 다르게 아이콘의 색, 크기 등 요소를 디자인에 따라 바꿀 수 있는 파일입니다.
리엑트에서는 어떻게 svg를 이용하는지 알아보겠습니다.

## svg 예시

- 파일경로 : assets/icon-24-reservation.svg

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
>
  <path fill="#fff" fill-rule="evenodd" d="...." />
</svg>
```

## 사용법

- 위처럼 svg 예시가 있습니다.

### 1. img src에 이용

```jsx
import Reservation from 'assets/icon-24-reservation.svg'

<img src={Reservation}>
```

위처럼 img로 넣을 수도 있지만, 저는 2번 방식을 더 즐겨 사용합니다.

### 2. svg를 컴포넌트로 만들기

```jsx
import { ReactComponent as Reservation } from "assets/icon-24-reservation.svg";

<Reservation />;
```

## svg 색, 크기 바꾸기

2번 방식을 사용하시면 아래 방법으로 svg의 색, 크기를 쉽게 변경 할 수 있습니다.

### 먼저 svg에서 바꾸고자 하는 요소를 `current`로 바꿔줍니다.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="current"
  height="current"
  viewBox="0 0 24 24"
>
  <path fill="current" fill-rule="evenodd" d="...." />
</svg>
```

### 사용하는 컴포넌트에 props로 current 값을 지정하여 내려줍니다.

```jsx
import { ReactComponent as Reservation } from "assets/icon-24-reservation.svg";

<Reservation width="10" height="10" fill="blue" />;
```

위 방법을 사용하면 하나의 svg로 다양한 크기, 색상을 이용할 수 있습니다.

<TagLinks />

<Comment />
