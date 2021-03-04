# 2020.07월

## 7월 이슈 요약

- react로 기존 네이티브 앱 웹뷰로 만들기 진행 중
- 기존 vue 웹 유지보수
- vuepress blog 개선

## 에러 해결 모음

### 1. Property or method "" not defined

```
[Vue warn]: Property or method "" is not defined on the instance but referenced during render.
Make sure that this property is reactive, either in the data option,
or for class-based components, by initializing the property.
See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
```

- property, method를 정의하지 않고 사용하는 경우
- [정리](https://kyounghwan01.github.io/blog/Vue/vue/property-not-defined/)

### 2. antd, antd-mobile 라이브러리 번들 사이즈 줄이기

```
You are using a whole package of antd-mobile, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

- 전체 번들 import 하지 말고, 필요한 컴포넌트만 써라
- [정리](https://kyounghwan01.github.io/blog/React/antd-resize-bundle-size/)

### 3. ref 정보를 props으로 내릴때

- ref 정보를 props으로 내릴때 property 값을 ref으로 내리면 에러가 뜬다. 아래와 같은 상황에 에러가 발생한다

```jsx
import React, { useRef } from "react";

const RefPropsExample = () => {
  const testRef = useRef();
  // 이렇게 prop으로 내릴 때 ref라는 property를 쓰면 PropRefComponent 컴포넌트에서는 ref props을 인식하지 못합니다.
  return <PropRefComponent ref={testRef} />;
};

const PropRefComponent = ({ref}) => {
  // 에러!
  return <input ref={ref}>
}
```

- 그래서, ref라는 이름을 쓰지 않고 다른 이름을 사용하여 prop 내립니다.

```jsx
import React, { useRef } from 'react';

const RefPropsExample = () => {
  const testRef = useRef();
  return <PropRefComponent refs={testRef} />
}

const PropRefComponent = ({refs}) => {
  return <input ref={refs}>
}

```

## 배운점

### 1. vuepress - blog 댓글 만들기

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-content/)

### 2. vuepress - 플러그인 사용법

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-plugin/)

### 3. vuepress - tag 시스템 구축

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-tag/)

### 4. vuepress - public 폴더 관리

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-public/)

### 5. react - 스크롤 이벤트

- intersection observer를 이용한 무한 스크롤
- [이벤트 발생시 스크롤 가장 밑으로 내리기](https://kyounghwan01.github.io/blog/React/event-scroll-bottom/)

### 6. react - image upload & 압축

- [정리](https://kyounghwan01.github.io/blog/React/image-upload/)

### 7. html - email 보내기

- [정리](https://kyounghwan01.github.io/blog/기타/html/mailto/)

### 8. redux-persist - 새로고침해도 redux store state 유지하기

- [정리](https://kyounghwan01.github.io/blog/React/redux/redux-persist/)

### 8. redux-persist - 새로고침해도 redux store state 유지하기

- [정리](https://kyounghwan01.github.io/blog/React/redux/redux-persist/)

### 9. html - img - onLoad, onError

- [정리](https://kyounghwan01.github.io/blog/기타/html/img-onload)

<Comment />
