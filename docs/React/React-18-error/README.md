---
title: destory is not function 에러 해결법
meta:
  - name: description
    content: destory is not function 에러 해결법, react, react18, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, next
  - property: og:title
    content: destory is not function 에러 해결법
  - property: og:description
    content: destory is not function 에러 해결법, react, react18, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, next
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/React-18-error/
tags: ["react", "react18"]
---

# destory is not function 에러 해결법

react 18 버전으로 기존 코드를 마이그레이션을 하면서 `destory is not function`라는 에러가 생겼습니다.

## 원인

`useEffect` hook 내부에는 동기 함수만 있어야 합니다. async 함수를 넣어서 promise 객체를 리턴하면 `useEffect` 내에서 unmount 될때 `destory is not function`라는 에러를 내게 돕니다. 그래서 아래와 같은 코드가 있을때 에러를 냅니다.

```jsx
useEffect(async () => {
  const res = await getApi();
}, []);
```

## 해결

`useEffect` 내부에 promise 객체를 제거하기 위해 async를 제거하고 비동기 함수를 따로 빼내면 정상 작동합니다.

```jsx
useEffect(() => {
  getApis();
}, []);

const getApis = async () => {
  const res = await getApi();
};
```

<TagLinks />

<Comment />
