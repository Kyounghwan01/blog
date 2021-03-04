---
title: redux-saga 사용법
meta:
  - name: description
    content: redux-saga 사용법, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:title
    content: redux-saga 사용법, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:description
    content: redux-saga 사용법, react-redux 사용법, redux, react, react16, state management, flux, store, reducer, dispatch, action
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/redux/redux-saga/
tags: ["react", "redux", "redux-saga"]
---

# redux-saga 사용법

## 사용하는 이유

redux는 무조건 동기적으로 dispatch가 이루어집니다. 또한 diapatch를 여러번 할 경우 컴포넌트 파일에서 dispatch로직을 2번 써야하니 불편하기도 합니다. 그래서 나온 미들웨어가 redux-saga입니다. redux-saga는 비동기적으로 dispatch를 사용할 수 있으며(put), 내부 메소드를 활용하여, 사용자의 부주의로 인하여 동일한 api를 여러번 req할 경우 가장 최근 or 가장 마지막(takeleast) req의 res만 받아오도록 하는 기능도 있습니다. (thuttle, debounce)

### 선수지식 (generator)

본격적으로 알아보기 전, saga에서 사용하는 자바스크립트 문법 제너레이터에 대해 간략하게 알아보고 넘어가겠습니다.

- 함수에 `*`를 붙이고, yield라는 문법을 사용합니다.
- `next()`를 이용하여 다음 yield를 호출 합니다.

```js
const gen = function* () {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield;
  console.log(4)
}
const gener = gen()
// gener() - gener{<suspended>}
gener().next() -> 1
gener().next() -> 2
gener().next() -> 3
gener().next() -> 4
gener().next() -> undifined
```

- 위 개념을 이용하면 절대 멈추지 않는 제너레이터 생성이 가능합니다.

```js
let i = 0
const gen = function*() {
while(true){
    yield i++;
  }
}
const g = gen()
g.next() // {value: 0, done: false}
g.next() // {value: 1, done: false}
g.next() // {value: 2, done: false}
g.next() // {value: 3, done: false}
... 무한 가능
// 저 방법을 응용한게 saga 이펙트 takeEvery
```

## react에서 saga 사용하기

### 1. index.js에 saga 넣기

```js
// index.js
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import App from "./App";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  document.getElementById("root")
);
```

### 2. rootSaga 만들기

```js
// sagas/index.js
import { all, fork } from "redux-saga/effects";

import userTicket from "./userTicket";

export default function* rootSaga() {
  yield all([fork(userTicket)]);
}
```

### 3. saga 모듈 만들기

```js
// sagas/userTicket.js
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  GET_USER_TICKET_REQUEST,
  GET_USER_TICKET_SUCCESS,
  GET_USER_TICKET_FAILURE
} from "constants/actionTypes";

function getUserTicketApi(params) {
  return axios.get("/api/userTicket/", params);
}

function* getUserTicket(action) {
  try {
    // api 통신할때는 call
    const result = yield call(getUserTicketApi, action.params);

    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({ type: GET_USER_TICKET_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: GET_USER_TICKET_FAILURE, data: err.response.data });
  }
}

function* watchGetUserTickets() {
  yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

export default function* userTicketSaga() {
  yield all([fork(watchGetUserTickets)]);
}
```

#### 중요!

```js
yield put({ type: GET_USER_TICKET_SUCCESS, data: result.data });
```

- 위처럼 saga에서 `GET_USER_TICKET_SUCCESS`가 실행되면, `GET_USER_TICKET_SUCCESS`타입을 리슨하고 있는 reducer가 반응한다는 것입니다.
- 즉 위 액션이 발동하면 아래 reducer가 실행됩니다.

```js
// reducers/userTicket.js
import produce from "immer";
import {
  GET_USER_TICKET_REQUEST,
  GET_USER_TICKET_SUCCESS,
  GET_USER_TICKET_FAILURE
} from "constants/actionTypes";

export const getUserTicket = params => ({
  type: GET_USER_TICKET_REQUEST,
  /** 중요! - 이 params은 saga의
  const result = yield call(getUserTicketApi, action.params);
  여기의 params로 들어갑니다. */
  params
});

export const setTicket = ticket => ({ type: SET_TICKET, ticket });

const initalState = {
  userTicket: [],
  loading: false
};

const userTicket = (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_TICKET_REQUEST:
        draft.loading = true;
        break;

      // 요기가 saga에 의해 실행된다.
      case GET_USER_TICKET_SUCCESS:
        draft.userTicket = action.data;
        draft.loading = false;
        break;
      case GET_USER_TICKET_FAILURE:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default userTicket;
```

### 그렇다면? 같은 액션을 saga, reducer에서 동시에 실행하면 어느 곳이 먼저 실행될까?

- 콘솔 찍어보니까 reducer가 먼저 실행됩니다.

### 4. 액션 상수 constant.js로 빼기

```js
// constants/actionTypes.js
export const GET_USER_TICKET_REQUEST = "USER_TICKET/GET_USER_TICKET_REQUEST";
export const GET_USER_TICKET_SUCCESS = "USER_TICKET/GET_USER_TICKET_SUCCESS";
export const GET_USER_TICKET_FAILURE = "USER_TICKET/GET_USER_TICKET_FAILURE";
```

## 위 코드의 전체적인 실행 과정

1. `reducers/userTicket`의 `getUserTicket`가 view단에서 실행됨
2. `reducers/userTicket`의 `GET_USER_TICKET_REQUEST`가 실행됨
3. `sagas/userTicket`의 `GET_USER_TICKET_REQUEST`를 리슨하고 있는 `watchGetUserTickets`가 실행됨
4. `watchGetUserTickets`가 실행됨에 따라 `getUserTicket`가 실행되고, try, catch문에 따라 타입이 실행되고(성공시 `GET_USER_TICKET_SUCCESS`, 실패시 `GET_USER_TICKET_FAILURE`) data를 가지고, reducer의 같은 액션을 가진 아래 switch case가 실행됩니다.

```js
case GET_USER_TICKET_SUCCESS:
  /**
   * saga에서 넣어준 data파람이 아래에 들어감
   * yield put({ type: GET_USER_TICKET_SUCCESS, data: res.data });
   **/
  draft.userTicket = action.data; // res.data
  draft.loading = false;
  break;
```

## saga 이펙트 함수

- `all`은 배열을 받고, 받은 이펙트를 등록 (실행 아님, 등록임!!)
- `fork`는 함수를 실행
- `call`은 동기함수호출 (api가 리턴할때까지 기다림), `fork`은 비동기함수 호출 (안기다리고 리턴 다음꺼 이동)
  - 중요! 통신할때는 무조건 `call` (yield가 await과 비슷)
- `take` -> 한번만 실행되고 이벤트 삭제됨
- `takeEvery` -> 한번 실행되도, 이벤트 계속 리슨
- `takeLatest` -> 클릭 실수로 2번 했을때, 앞 이벤트 무시 마지막 이벤트 실행(보통 이거 많이씀)
  - 이미 완료됬다면 실행해줌 -> 둘다 팬딩이면 뒤에꺼만
  - **주의!** front -> back으로 2번 req를 보내긴함 -> 그러나 b->f로 res는 1번 보냄 (즉, 서버단에 저장 2번됬는지 확인 필요)
  - 즉 : 새로고침하면 2개가 반영될수있음
  - 위에꺼를 막기위해 throttle가 있음
- `throttle`: 초 이내에 req를 1번만 - 이거 많이써야겠네 - 스크롤 (마지막 함수가 호출된 후 일정 시간이 지나기전 재호출 안함)
- `debounce`: 검색 결과 - 초 이내에 req를 1번만 (연이어 호출되는 함수들 중 마지막 함수 or 가장 처음 함수만 호출)
- `takeLeading`: 첫번째 이벤트만 실행, 뒤에꺼 무시

## 정리

- saga와 reducer, view단에서 일어나는 로직의 흐름 및 데이터가 어느 진행방향에 맞추어 변해가는지 데이트 흐름을 파악하는 것이 정말 중요합니다.
- 그것을 도와주는 것이 [이전 포스팅](https://kyounghwan01.github.io/blog/React/redux/redux-basic/#react에서-redux-사용하기)에서도 보여드린 `redux-logger`가 정말 유용하게 쓰입니다. 로그에 찍히는 순서대로 내가 설계한 흐름으로 데이터가 바뀌는지 하나하나 확인하시고 코딩 진행하시면 쉽게 익숙해지실 것입니다.`redux-devtools-extension`도 같이 쓰이면 유용하게 디버깅이 가능하니 꼭! 숙지하시길 바라겠습니다.

<TagLinks />

<Comment />
