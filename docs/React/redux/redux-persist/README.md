---
title: redux-persist 사용법
meta:
  - name: description
    content: redux-persist 사용법, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:title
    content: redux-persist 사용법, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:description
    content: redux 새로고침시에도 state 유지하기, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/redux/redux-basic/
tags: ["react", "redux"]
---

# redux-persist 사용법

## 소개 & 사용하는 이유

`redux` 상태 관리 라이브러리를 많이 사용하실 것입니다.

리덕스의 store는 페이지를 새로고침 할 경우 state가 날아가는 것을 보실 수 있습니다.

이것에 대한 대응 방안으로 localStorage 또는 session에 저장하고자 하는 reducer state를 저장하여, 새로고침 하여도 저장공간에 있는 데이터를 redux에 불러오는 형식으로 이루어집니다.

위에서 말한 이 작동을 위해 `redux-persist`를 사용합니다.

redux가 이미 세팅되어 있다고 가정하고, redux-persist를 추가하는 작업을 진행하겠습니다.

## 설치

```
yarn add redux-persist
```

## reducer에 persist store 정의

- localStorage에 저장하고 싶으면 `import storage from 'redux-persist/lib/storage`
- session Storage에 저장하고 싶으면 `import storageSession from 'redux-persist/lib/storage/session`

```js
// reducers/index.js
import { combineReducers } from "redux";
➊ import { persistReducer } from "redux-persist";
➋ import storage from "redux-persist/lib/storage";

import auth from "./auth";
import board from "./board";
import studio from "./studio";

➌ const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["auth"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  auth,
  board,
  studio
});

➍ export default persistReducer(persistConfig, rootReducer);
```

## persist store 사용

```js
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
➊ import { persistStore } from "redux-persist";
➋ import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import configureStore from "./store";

const store = createStore(rootReducer);
➌ const persistor = persistStore(store);

const Root = () => (
  <Provider store={store}>
    ➍ <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
```

<TagLinks />

<Comment />
