# 2020.07월

## 7월 이슈 요약

- react로 웹뷰
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

## 배운점

### 1. vuepress - blog 댓글 만들기

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-content/)

### 2. vuepress - 플러그인 사용법

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-plugin/)

### 3. vuepress - tag 시스템 구축

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-tag/)

### 4. vuepress - public 폴더 관리

- [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-public/)

### 5. react - intersection observer를 이용한 무한 스크롤

### 6. react - image upload & 압축

- [정리](https://kyounghwan01.github.io/blog/React/image-upload/)

### 7. html - email 보내기

- [정리](https://kyounghwan01.github.io/blog/기타/html/mailto/)

<Disqus />
