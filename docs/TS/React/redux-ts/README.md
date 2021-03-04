---
title: redux - typeScript 사용법
meta:
  - name: description
    content: redux - typeScript 사용법
  - property: og:title
    content: redux - typeScript 사용법
  - property: og:description
    content: redux - typeScript 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/React/redux-ts/
tags: ["react", "TS"]
---

# redux - typeScript 사용법

## package.json 설치

```
yarn add redux react-redux @types/react-redux
```

### 액션 type 선언

```tsx
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;
```

`as const` 이 문법을 쓰면 액션 함수를 통해 액션 객체를 만들면 type의 typescript 타입이 string이 아닌 실제값을 가리킨다.

```tsx
const str = "heelo";
const strConst = "hello world" as const;

const object = { str }; // str: string;
const object2 = { strConst }; // strConst: 'hello world'
```

### 액션 생성 함수 선언

```tsx
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});
```

왠만하면 액션의 파라미터는 payload로 쓴다 [FSA 규칙](<[https://github.com/redux-utilities/flux-standard-action](https://github.com/redux-utilities/flux-standard-action)>) 준수

### 액션 객체 type 준비

```tsx
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
```

여기서 사용 된 ReturnType 은 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입입니다.

또는

```tsx
type CounterAction =
  | ReturnType<typeof increase>
  | { type: typeof decrease; data: {...} };
```

우리가 이전에 액션의 type 값들을 선언 할 때 as const 라는 키워드를 사용했었지요? 만약 이 작업을 처리하지 않으면 ReturnType을 사용하게 됐을 때 type 의 타입이 무조건 string 으로 처리되어버립니다. 그렇게 되면 나중에 리듀서를 제대로 구현 할 수가 없어요.

### 상태의 타입과 상태의 초기값 선언

counter 모듈의 상태타입, 초기값 선언

```tsx
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0
};
```

type, interface 둘중하나만 쓴다

### 리듀서 작성

함수의 반환 타입에 상태의 타입을 넣는 것을 잊지 마세요. 이를 통하여 사소한 실수를 방지 할 수 있습니다.

```tsx
function counter(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
```

## 루트 리듀서 반환

```tsx
// src/modules/index.ts

import { combineReducers } from "redux";
import counter from "./counter";

const rootReducer = combineReducers({
  counter
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
```

RootState 라는 타입을 만들어서 내보내주어야 한다는 것 입니다. 이 타입은 추후 우리가 컨테이너 컴포넌트를 만들게 될 때 스토어에서 관리하고 있는 상태를 조회하기 위해서 useSelector를 사용 할 때 필요로 합니다.

## 카운터 프레젠테이션 컴포넌트

```tsx
// src/components/Counter.tsx

import React from "react";

type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

function Counter({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy
}: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
```

## 카운터 컨테이너 컴포넌트

useSelector 부분에서 state 의 타입을 RootState로 지정해서 사용한다는 것 외에는 없습니다.

```tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase, decrease, increaseBy } from "../modules/counter";
import Counter from "../components/Counter";

function CounterContainer() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;
```

<TagLinks />

<Comment />
