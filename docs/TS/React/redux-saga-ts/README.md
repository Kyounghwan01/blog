---
title: typescript에 redux saga 추가하기 예제
meta:
  - name: description
    content: typescript에 redux saga 추가하기 예제
  - property: og:title
    content: typescript에 redux saga 추가하기 예제
  - property: og:description
    content: typescript에 redux saga 추가하기 예제
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/React/redux-ts/
tags: ["react", "TS"]
---

# typescript에 redux saga 추가하기 예제

## 사전 학습

- [redux-typescript 사용법](https://kyounghwan01.github.io/blog/TS/React/redux-ts/) 이 포스팅을 먼저 보고 오시면 이해에 더욱 좋습니다.

## package.json 설치

```
yarn add redux-saga
```

## 파일 구조

| 폴더/파일명           | 설명                     |
| :-------------------- | :----------------------- |
| **/src**              |                          |
| **ㅣㅡ /store**       | reduce store             |
| **ㅣㅡㅡ /counter**   | counter store            |
| **ㅣㅡㅡㅡ /action**  | counter action 함수 모음 |
| **ㅣㅡㅡㅡ /reducer** | counter reducer 모음     |
| **ㅣㅡㅡㅡ /sagas**   | counter saga 모음        |
| **ㅣㅡㅡㅡ /types**   | counter types 모음       |

## types.ts

```ts
export const CHANGE_NUMBER = "CHANGE_NUMBER" as const;
export const CHANGE_NUMBER_SAGA_REQUEST = "CHANGE_NUMBER_SAGA_REQUEST" as const;
export const CHANGE_NUMBER_SAGA_SUCCESS = "CHANGE_NUMBER_SAGA_SUCCESS" as const;
export const CHANGE_NUMBER_SAGA_FAILURE = "CHANGE_NUMBER_SAGA_FAILURE" as const;

export type counterProps = {
  count: number;
  loading: false;
};
```

## actions.ts

```ts
import {
  CHANGE_NUMBER,
  CHANGE_NUMBER_SAGA_REQUEST,
  CHANGE_NUMBER_SAGA_SUCCESS,
  CHANGE_NUMBER_SAGA_FAILURE
} from "store/counter/types/";

export const changeNumber = (number: number) => ({
  type: CHANGE_NUMBER,
  payload: { data: number }
});

export const changeNumberRequest = () => ({
  type: CHANGE_NUMBER_SAGA_REQUEST
});

export const changeNumberSuccess = (number: number) => ({
  type: CHANGE_NUMBER_SAGA_SUCCESS,
  payload: { data: number }
});

export const changeNumberFailure = () => ({
  type: CHANGE_NUMBER_SAGA_FAILURE
});

export type ActionRequest =
  | ReturnType<typeof changeNumber>
  | ReturnType<typeof changeNumberSuccess>
  | ReturnType<typeof changeNumberFailure>;
```

## reducer.ts

```ts
import produce from "immer";
import {
  CHANGE_NUMBER,
  CHANGE_NUMBER_SAGA_REQUEST,
  CHANGE_NUMBER_SAGA_SUCCESS,
  CHANGE_NUMBER_SAGA_FAILURE,
  counterProps
} from "store/counter/types";
import { ActionRequest } from "store/counter/actions";

export const initalState: counterProps = {
  count: 0,
  loading: false
};

export const counter = (
  state: counterProps = initalState,
  action: ActionRequest
) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NUMBER:
        draft.count = action.payload.data;
        break;
      case CHANGE_NUMBER_SAGA_REQUEST:
        draft.loading = true;
        break;
      case CHANGE_NUMBER_SAGA_SUCCESS:
        draft.loading = false;
        draft.count = action.payload.data;
        break;
      case CHANGE_NUMBER_SAGA_FAILURE:
        draft.loading = false;
        draft.count = 0;
        break;
      default:
        return state;
    }
  });
```

## sagas.ts

```ts
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { CHANGE_NUMBER_SAGA_REQUEST } from "store/counter/types";
import {
  changeNumberSuccess,
  changeNumberFailure
} from "store/counter/actions";

function* changeCountSaga() {
  try {
    const result: AxiosResponse<{ count: number }> = yield call(
      $api.changeCounter
    );
    yield put(changeNumberSuccess(result.count));
  } catch (err) {
    yield put(changeNumberFailure());
  }
}

function* watchChangeCount() {
  yield takeLatest(CHANGE_NUMBER_SAGA_REQUEST, changeCountSaga);
}

export default function* counterSaga() {
  yield all([fork(watchChangeCount)]);
}
```
