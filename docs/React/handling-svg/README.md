---
title: react, next에서 svg 다루기
meta:
  - name: description
    content: React.js - svg 다루기 react, next svg, next
  - property: og:title
    content: React.js - svg 다루기
  - property: og:description
    content: React.js - svg 다루기, react, setState, component, next
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/handling-svg/
tags: ["react", "next"]
---

# svg 다루기

svg는 png와 다르게 아이콘의 색, 크기 등 요소를 디자인에 따라 바꿀 수 있는 파일입니다. 또한 용량이 png와 다르게 매우 작아서 프로젝트 관리가 더욱 용이합니다.

그렇다면 react와 next에서는 어떻게 svg를 다루는지 알아보겠습니다.

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

## react에서 svg 사용법

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

## next에서 svg 사용하기

next에서는 react에서 사용하는 방식으로 svg를 읽으면 svg를 읽을 수 없다는 에러가 뜹니다. 그렇기 때문에 아래와 같이 진행합니다.

### @svgr/webpack 설치

```
yarn add -D @svgr/webpack
```

### next.config.js 수정

```js
module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {
    // 아래를 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
});
```

### svg 읽어오기

- 위와 같이 세팅을 완료했으면 아래와 같이 컴포넌트 형식으로 svg를 가져올 수 있습니다.

```tsx
import Ci from "assets/svg/ci.svg";

const Index = () => {
  return <Ci />;
};
export default Index;
```

<TagLinks />

<Comment />
