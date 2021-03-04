---
title: Redux Toolkit을 사용하여 간단하게 상태 관리하기
meta:
  - name: description
    content: Redux Toolkit을 사용하여 간단하게 상태 관리하기, reselect, redux, react, immer, redux-action, FSA, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:title
    content: Redux Toolkit을 사용하여 간단하게 상태 관리하기,reselect, redux, react, immer, redux-action, FSA, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:description
    content: Redux Toolkit을 사용하여 간단하게 상태 관리하기, reselect, redux, react, immer, redux-action, FSA, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/
tags: ["react", "redux", "redux-toolkit"]
---

# redux-toolkit

## 사용하는 이유

redux를 아무 라이브러리 없이 사용할 때 (actionType 정의 -> 액션 함수 정의 -> 리듀서 정의) 1개의 액션을 생성합니다.
이렇게 필요하지만 너무 많은 코드가 생성되니 redux-actons라는 것을 사용하게 되었고, 불변성을 지켜야하는 원칙 때문에 immer를 사용하게되고,
store 값을 효율적으로 핸들링하여 불필요 리렌더링을 막기 위해 reselect를 쓰게 되었으며,
비동기를 수월하게 하기위해, thunk나 saga를 설치하여 redux를 더 효율적으로 사용하게 됩니다.
지금 말한 것만 총 4~5개의 라이브러리를 설치하여야 위처럼 사용할 수 있습니다.

그런데, redux-toolkit은 redux가 공식적으로 만든 라이브러리로, saga를 제외한 위 기능 모두 지원합니다. 또한 typeScript 사용자를 위해 action type, state type 등 TypeScript를 사용할 때 필요한 Type Definition을 공식 지원합니다.
어떻게 사용하는지 아래를 통해 알아봅시다.

## 지원하는 기능

1. redux-action
2. reselect
3. immer의 produce
4. redux-thunk
5. Flux Standard Action 강제화
6. Type Definition

## redux-action

redux-action에서 사용했던 `createAction`를 지원합니다.
원래 사용하시던 대로 아래와 같이 사용하시면 됩니다.

```js
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

function counter(state = 0, action) {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    default:
      return state;
  }
}

const store = configureStore({
  reducer: counter
});

document.getElementById("increment").addEventListener("click", () => {
  store.dispatch(increment());
});
```

- 저의 경우 `createSlice`라는 기능을 사용합니다. 이 기능을 사용하면 `createAction`을 통해 따로 액션타입을 정의하지 않아도 자동으로 액션타입을 만들어줍니다.

## createSlice

예제는 다음과 같으며 setTitle 함수를 실행하면 `action.type = 'todo/setTitle'`, `payload = {name: xxx, content: xxx}`로 실행됩니다.

```tsx
const name = "todo";
type stateType = {
  title: { name: string; content: number };
};

const initialState: stateType = {
  title: { name: "ttttt", content: 0 },
};

export const todoSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTitle: (
      state,
      action: PayloadAction<{ name: string; content: string }>
    ) => {
      state.title.name = action.payload.name;
    },
  },
  extraReducers: {},
});
export const { setTitle } = todoSlice.actions;

export default todoSlice.reducer;

// 사용할 컴포넌트
export function Counter() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(setTitle({ name: 'hi' }, content: 'con' }))}>
      setTitle
    </button>
  );
}
```

## reselect

createSelector로 실행할 수 있습니다. vue에서 vuex의 getter와 동일한 기능이라고 보시면 되겠습니다.

### reselect의 이점

- redux store 값을 가져와 계산을 해서, redux가 적은 양의 필요한 데이터만 가지고 있게 도와줍니다
- 구조가 바뀌어도 연관된 컴포넌트 바꿀필요없이 selector만 바꾸면 됩니다.
- 메모되어 재계산 방지 효율적

### reselect를 안쓰면?

1. state의 값을 useSelector를 이용해 컴포넌트로 이동하여, 컴포넌트에서 값을 핸들링할 수 있으나, 컴포넌트가 리렌더링 될때마다 함수가 재실행되는 낭비
2. store 내부에서 함수를 이용하여 값을 바꾸는 방법

```tsx
// reducer.js
export const getCompletedTodos = state =>
  state.todo.todos.filter.map(todo => todo.isCompleted);
```

그러나 이방법도 문제가 있다. store가 업데이트 될 때마다 getCompleteTodos는 매 번 계산을 하게된다.
그래서 createSelector를 이용해 값을 먼저 계산하고, 나온 값을 컴포넌트로 옮기는 방법을 사용한다. 위에서 말했듯 memoization을 이용한다. 즉, 이전에 계산된 값을 캐시에 저장하여 불필요한 계산을 없앤다.

### reselect 예시

selector로서 인자로 받는 state에서 우리가 필요한 부분을 가져오는 역할을 한다. 그 다음 인자인 함수에서는 inputSelectors에서 반환된 값을 인자로 받아 계산을 수행한다.

```tsx
const listState = (state: RootState) => state.todoSlice.lists;

export const getFilterLike = createSelector(listState, lists => {
  return lists.filter(({ likes }: { likes: number }) => likes > 10);
});
```

reselect는 memoization이 적용되는데, 그 기준이 되는 값은 inputSelector의 결과값이다. 이 값이 바뀌지 않고 store가 업데이트 되었을 때, reselect는 저장된 cache 값을 사용하여 불필요한 재계산을 하지 않도록 해준다.

## immer의 produce

redux의 경우 객체 불변성(immutable)을 지켜야 합니다. 이 말이 무엇을 뜻하는지 모르시는 분은 [불변성을 지켜야하는 이유](https://kyounghwan01.github.io/blog/React/redux/redux-basic/#reducer-정의)를 꼭 참조하기시 바랍니다.
immer에 관한 내용은 [immer 정리](https://kyounghwan01.github.io/blog/React/immer-js/#immer-js란)

## redux-thunk

redux-thunk 기능을 공식적으로 지원합니다. redux-toolkit에서는 `createAsyncThunk`를 이용하여 thunk 처럼 사용합니다. 맨 아래 총 예시를 보시고 모르시는 부분은 [공식사이트](https://redux-toolkit.js.org/api/createAsyncThunk)를 참조해주세요.

## FSA 강제화

redux-toolkit에서는 FSA 방식을 사용하지 않으면 무조건 에러를 띄웁니다. 즉, `action.payload`를 통해 접근해야만 합니다.

```tsx
export interface Action<Payload> extends AnyAction {
  type: string;
  payload: Payload;
  error?: boolean;
  meta?: Meta;
}
```

## Type Definition

redux의 reducer의 `RootState`에 대한 타이브 action 함수, payload에 대한 타입을 신경써야 하는 번거로움이 있었습니다. [typescript에서 redux-saga 사용하기](https://kyounghwan01.github.io/blog/TS/React/redux-saga-ts/) 여기만 봐도 state, action에 대한 타입정의가 굉장히 번거로움이 있다는 것을 알 수 있습니다. 결론은 redux-toolkit에서 이 부분을 해결하여, 내장 타입으로 지원하기에 편리하게 코딩할 수 있습니다.

## 종합 예제

```tsx
// store/index.ts
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import todoSlice from "./example/exampleSlice";

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice
  },
  middleware: getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

```tsx
// store/example/exampleSlice
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector
} from "@reduxjs/toolkit";
import { getSplashImage } from "api";
import { RootState } from "../index";

const name = "todo";

export const fetchTodo = createAsyncThunk(
  `${name}/fetchTodo`, // 액션 이름을 정의해 주도록 합니다.
  async ({ test1, test2 }: { test1: number; test2: number }, thunkAPI) => {
    try {
      return (await getSplashImage(1)).data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

type stateType = {
  title: { name: string; content: number };
  content: string;
  loading: boolean;
  lists: any;
};

const initialState: stateType = {
  title: { name: "ttttt", content: 0 },
  content: "",
  loading: false,
  lists: []
};

export const todoSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTitle: (
      state,
      action: PayloadAction<{ name: string; content: number }>
    ) => {
      state.title.name = action.payload.name;
    }
  },
  extraReducers: {
    [fetchTodo.pending.type]: (state, action) => {
      // 호출 전
      state.loading = true;
    },
    [fetchTodo.fulfilled.type]: (state, action) => {
      // 성공
      state.loading = true;
      state.lists = action.payload;
    },
    [fetchTodo.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.loading = true;
      state.title.name = action.payload.message;
      state.lists = [];
    }
  }
});

const listState = (state: RootState) => state.todoSlice.lists;

export const getFilterLike = createSelector(listState, lists => {
  return lists.filter(({ likes }: { likes: number }) => likes > 10);
});
export const { setTitle } = todoSlice.actions;

export const lists = (state: RootState) => state.todoSlice.lists;
export const titles = (state: RootState) => state.todoSlice.title;

export default todoSlice.reducer;
```

```tsx
// 함수 실행할 컴포넌트 - components/Example.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  lists,
  titles,
  getFilterLike,
  setTitle
} from "store/example/exampleSlice";

import { fetchTodo } from "store/example/exampleSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const list = useSelector(lists);
  const title = useSelector(titles);
  const filterLikes = useSelector(getFilterLike);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo({ test1: 321, test2: 123 }));
  }, [dispatch]);

  return (
    <div>
      <p>{title.name}</p>
      {filterLikes.map(({ id }: { id: string }, index: React.ReactNode) => (
        <p key={id}>
          {id}
          {index}
        </p>
      ))}
      <button onClick={() => dispatch(setTitle({ name: "z", content: 2 }))}>
        setTitle
      </button>
    </div>
  );
}
```

## 정리

저는 지금 진행하는 프로젝트에 saga에 의해 액션 타입, 액션이 너무 많이 늘어나고, 추가 개발을 진행할 때도 디버깅은 편하지만, 공수가 많이 들어 `redux-toolkit`을 사용하는 것을 건의할 예정입니다. 한번 정리해보니 저것을 쓰면 많은 패키지도 삭제되고, 코드양도 많이 줄어드는 이점이 보이기 때문입니다. 위 예제로 이해가 되지 않으신 분들은 [cra-template-redux-typescript](https://github.com/reduxjs/cra-template-redux-typescript) 여기에 들어가셔서 프로젝트 코드를 분석해보시기 바랍니다.

### 참조

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [https://github.com/reduxjs/cra-template-redux-typescript](https://github.com/reduxjs/cra-template-redux-typescript)
- [redux-toolkit을 소개합니다.](https://jbee.io/react/introduce-redux-starter-kit/)

<TagLinks />

<Comment />
