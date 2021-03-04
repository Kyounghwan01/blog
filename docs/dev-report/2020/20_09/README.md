# 2020.09월

## 9월 이슈 요약

- 함수형 프로그래밍 공부 시작
- redux-toolkit으로 상태 관리

## 에러 해결 모음

### 1. ts에서 new Date 값 비교 에러

```
The left -hand and right hand side of an arithmetic operation must be of type 'any', 'number' or an enum type
```

### 2. react - store 접근 에러

```
Error: You may not call store.getState() while the reducer is executing.
```

## 배운점

### 1. 함수형 프로그래밍 - 이터레이터

- 이터레이터가 뭔지, 어떻게 사용하는지
- [정리](https://kyounghwan01.github.io/blog/JS/functional-programming/iterator/)

### 2. ts - Omit

- 정의된 타입에서 원하는 속성 제거

### 3. react, ts - reduce에서 객체를 dynamic key, value로 접근하고, 일반적으로 dot notion으로도 접근해야 할 때,

- `Record`로 해결

### 4. vue 한글 방지 input component

- [정리](https://kyounghwan01.github.io/blog/Vue/vue/prevent-hangle/)

### 5. 글로벌 변수 수정

#### 라이브러리 글로벌 import

- 라이브러리의 alert를 기본 alert로 대체하고 싶은 상황
- 라이브러리의 alert를 부르기 위해서는 계속 import 라이브러리를 해야하는 상황
- 글로벌 alert를 라이브러리 alert로 바꿈으로 해결

### fix

```tsx
import * as mobiscroll from "@mobiscroll/react";
window.mobiscrollAlert = mobiscroll.alert;
window.mobiscrollConfirm = mobiscroll.confirm;

/**
 tsconfig.json의 include내에
 global-d-ts에
 mobiscrollConfirm, mobiscrollAlert를 사용한다고 정의해야함
*/
```

### 6. redux-toolkit

- redux의 액션 및 reselect, immer, thunk 등 라이브러리를 붙여야 할 기능을 redux-toolkit에서 모두 지원한다.
- [정리](https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/)

<Comment />
