---
title: react 에러 모음
meta:
  - name: description
    content: react 에러 모음
  - property: og:title
    content: react 에러 모음
  - property: og:description
    content: react 에러 모음
  - property: og:url
    content: https://kyounghwan01.github.io/blog/dev-report/error-report/React/
tags: ["react"]
---

# 에러 해결 모음

## Can't perform a React state update on an unmounted component.

```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

- route 이동후 이전 route에서 값을 변경하는 경우 뜨는 메세지

```jsx
const changePassword = async () => {
  const params = {
    ...passwordData,
    user_account: {
      password: text.confirmPassword
    }
  };
  try {
    setLoading(true);
    const res = await apis.auth.changePassword(
      passwordData.user_id,
      _.omit(params, ["step", "user_id"])
    );
    setLoading(false);
    if (res.status === 200) {
      history.push({
        pathname: "/success",
        state: {
          title: "비밀번호 찾기 완료",
          body: "회원님의 비밀번호가 성공적으로 변경되었습니다."
        }
      });
    }
  } catch (e) {
    alert(e.response.data.message);
    setLoading(false);
  } finally {
    setLoading(false);
    // route이동 후, 실행되기에 위 에러가 뜬다
  }

  // finally 문을 router이동 전으로 옮긴다.
};
```

- [정리](https://kyounghwan01.github.io/blog/React/cant-perform-a-React-state-update-on-an-unmounted-component/)

## a tag 사용시 redux가 초기화 됨

- a tag 속성이 브라우저를 새로고침하면서 이동하기 때문
- react router의 link는 브라우저를 새로고침하지 않고 url을 이동하기에 redux의 state가 유지된다.
- [정리](https://kyounghwan01.github.io/blog/React/a-tag-trap/#a-tag%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90)

## 체크박스 with label

- id랑 htmlFor 값을 동일하게 맞추면 라벨을 눌렀을때 onChange 실행됨

```jsx
<input type="checkbox" id="check3" onChange={onCheckBox} /> Fish
<label htmlFor="check3"><span class="fa fa-check"/></label
```

## React.memo에서 특정 props만 비교하여 리렌더링 제어

- 전달받는 prop이 객체인 경우 deep comparison을 수행하거나, 여러개 중 특정 prop의 변화만을 고려하기 위해 아래와 같이 구현할 수도 있습니다.

```jsx
const equalComparison = (prevProps, nextProps) =>
  prevProps.notiParams.min_id === nextProps.notiParams.min_id;

export default React.memo(NotificationPresenter, equalComparison);
```

## useEffect 내부에서 props, state를 사용 할 경우 dependency를 추가해 줘야한다.

- [정리](https://kyounghwan01.github.io/blog/React/exhaustive-deps-warning/)

## Actions must be plain objects. Use custom middleware for async actions

- dispatch 잘못된 형식으로 실행 아래와 같이 실행하면 뜬다. dispatch 내부의 값이 함수인데 객체로 실행한 경우 뜨는 에러

```js
dispatch(thisIsFunction);
```

### fix 아래와 같이 고친다

```js
dispatch(thisIsFunction());
```

## render에 영향을 안미치고 즉시 바뀌는 값(flag?)이 필요한 경우

- useRef를 통해 ref값을 사용하면 된다
- [자세한 내용](https://kyounghwan01.github.io/blog/React/react-hook/#useref)은 여기서 useRef 부분

## You are using a whole package of antd-mobile, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.

- 전체 번들 import 하지 말고, 필요한 컴포넌트만 써라
- [정리](https://kyounghwan01.github.io/blog/React/antd-resize-bundle-size/)

## ref 정보를 'ref'로 props으로 내릴때

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

### fix

그래서, ref라는 이름을 쓰지 않고 다른 이름을 사용하여 prop 내립니다.

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

## Error: You may not call store.getState() while the reducer is executing.

reducer내에서 다른 reducer state를 참조하고 할때 뜨는 에러

### createStore export

redux를 사용했다면 분명 `createStore`를 사용했을 것입니다. 그 값을 받은 변수를 export 시킵니다.

```js
export const store = createStore(rootReducer, enhancer);
```

### 사용을 원하는 reducer에서 Import store

import 후, getState()함수를 이용하여 접근합니다.

```js
import { store } from "index";
console.log(store.getState().studio.currentStudioData);
```

### 에러

```
Error: You may not call store.getState() while the reducer is executing.
```

실행을 하면 reducer내에서 getState를 사용할 수 없다는 에러가 나올 수 있습니다.

### fix

1. 크롬 확장 프로그램인 `redux-devtools`를 삭제하면 된다는 말도 있고,
2. `redux-devtools-extension`를 사용하는 경우 `composeWithDevTools`사용을 중지하면 된다는 경우도 있습니다.

저의 경우 두가지 다 되지 않고, 해결방법을 찾지 못해서 굳이 reducer에서 다른 state를 참조하는 것이 맞는가 부터 다시 생각하게 되었습니다.

그래서 저는 결론적으로는 reducer에서만 `getState`가 실행되지 않는 것으로 보이니, saga에서 해당 action을 가진 함수가 실행될때 param으로 같이 태워보내는 방향으로 진행하였습니다.

## router로 이동할때, 스크롤이 맨위에 있지 않고 이전 페이지 스크롤에 고정된 경우

### fix

페이지가 이동할때, cleanup 함수를 발동시켜 다음 페이지에서는 스크롤의 위치를 0,0으로 만든다.
모든 페이지에 적용하기 위해 router의 최상단에 컴포넌트를 위치시킨다.

```tsx
// components/ScrollToTop.tsx
import { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

function ScrollToTop() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);

// routes.tsx
<Router>
  <ScrollToTop />
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
</Router>;
```

## 날짜 객체 비교

- new Date를 비교하려면 `-` 연산을 이용해 크고 작음을 비교하는데, Date 타입은 빼기가 안되니 nunmber로 바꾼다.

```tsx
// new Date 비교
(res: bookingType[]) => [...res].sort((a, b) => +new Date(a.start_on) - +new Date(b.start_on)),
```

## styled-components createGlobalStyle 내 css 반영 안되는 버그

dev 환경에서는

```tsx
onst GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap');
  ${normalize}
`;

export default GlobalStyle;
```

위와 같이 커스텀 css를 import 할 수 있으나, styled-components v5 버전 이후 `createGlobalStyle`의 `@import` 문제로 위와 같은 코드가 `production`에 배포시 하위 css가 반영되지 않음

### fix

index.html에 style 태그로 직접 import 시킨다

```html
<style type="text/css">
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap");
</style>
```

## TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type undefined

### fix

1. package.json의 "react-scripts" 버전 확인 "^3.4.0" 이상으로 수정
2. rm -rf node_moduled
3. yarn install
4. yarn start

## Expected 0 type arguments, but got 1.

- params애 들어올 값의 타입을 정의한 것 없는 데, params을 넣은 경우

## Property context does not exist on type NodeRequire

- require가 뭔지 몰라서 나오는 에러
- fix: `npm install @types/webpack-env` 설치시 해결

## No overload matches this call.

- 정의한 타입과, 받은 타입이 다른 경우
  - 불리언인데 string, number를 넣은 경우
- 직접 빌드를 해서 터미널로 에러를 보는게 디테일하게 에러를 관찰 할 수 있다.

```ts
import Button from "antd-mobile/lib/button";
// --> node_mobule/antd-mobile/lib/button/PropType.d.ts

export interface ButtonPropsType {
  type?: "primary" | "warning" | "ghost";
  size?: "large" | "small";
  disabled?: boolean;
  loading?: boolean;
}
// 위 prop type을 보고 코딩하면 편하다
```

## Element implicitly has an 'any' type because expression of type 'string' can't be used to index type

- 객체가 nesting된 경우 key로 객체에 접근할 때 나오는 에러
- 아래 예시대로 해결

```ts
// 객체 nesting된 경우 key로 접근하려할 때 띄우는 에러
const [checked, setCheckBox] = useState({
  useAgree: false,
  infoAgree: false
});

const onCheckBox = (e: { target: { id: any } }) => {
  const { id } = e.target;
  setCheckBox({
    ...checked,
    [id]: !checked[id]
  });
};

// !checked[id] 이렇게 접근하려 할때 checked의 타입이 뭔지 모른다고 한다.

// fix
const [checked, setCheckBox] = useState<{ [key: string]: boolean }>({
  useAgree: false,
  infoAgree: false
});
```

## reduce에서 객체를 dynamic key, value로 접근하고, 일반적으로 dot notion으로도 접근해야 할 때,

- 위와 같은 경우 4번 방법으로 해결되지 않습니다. 저는 `Record`를 이용해서 해결했습니다.

```ts
// types.ts
type sortTypeProps = {
  type: string;
  value: string;
  content: string;
  current: boolean;
};

export type IUsageProps = {
  // Record<key, value>
  // key 값으로 무조건 string만 받는다. value는 지정한 타입만 받는다.
  filters: Record<string, sortTypeProps[]>;
};

// reducer.ts
export const initialState: IUsageProps = {
  filters: {
    sortedBy: [
      { type: "s", value: "asc", content: "오름차순", current: true },
      { type: "s", value: "desc", content: "내림차순", current: false }
    ],
    status: [
      { type: "x", value: "b", content: "예약 (0)", current: true },
      { type: "x", value: "bw", content: "예약대기 (0)", current: false }
    ]
  }
};
export const usage = (
  state: IUsageProps = initialState,
  action: ActionRequest
) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BOOKING_FILTER:
        draft.filters[action.payload.type].map(
          (el: any) => (el.current = action.payload.value === el.value)
        );
        draft.filters.status[0].content = `예약 (11)`;
        break;
      default:
        return state;
    }
  });
```

## xx is not assignable to type

props로 내린 값을 사용하지 않을 때, 나오는 에러

```
loading: boolean; onChange: (e: any) => Promise<void>; onSubmit: (e: any) => Promise<void>; }' is not assignable to type 'IntrinsicAttributes & Pick<Pick<{ loginEmail: any; password: any; valid: any; loading: any; onChange: any; onSubmit: any; }, never> & Pick<InferProps<{ loginEmail: Requireable<ReactText>; ... 4 more ...; onSubmit: Requireable<...>; }>, "valid" | ... 4 more ... | "onSubmit">, never> & Partial<...> & Partial<...>'.
  Property 'error' does not exist on type 'IntrinsicAttributes & Pick<Pick<{ loginEmail: any; password: any; valid: any; loading: any; onChange: any; onSubmit: any; }, never> & Pick<InferProps<{ loginEmail: Requireable<ReactText>; ... 4 more ...; onSubmit: Requireable<...>; }>, "valid" | ... 4 more ... | "onSubmit">, never> & Partial<...> & Partial<...>'.ts(2322)
```

```tsx
<LoginPresenter
  loginEmail={loginEmail}
  password={password}
  valid={valid}
  error={error}
  loading={loading}
  onChange={onChange}
  onSubmit={onSubmit}
/>;

// error를 loginPresenter로 내리고 있으나 loginPresenter에서는 error 값을 사용하지 않고 있움

function Login({ loginEmail, password, valid, loading, onChange, onSubmit }) {}
```

## window 객체 접근

## TS2339: Property '' does not exist on type 'Window & typeof globalThis'.

- typescript는 window 객체에 대한 정의를 해주지 않으면 에러 발생

### fix

- tsconfig.json에 window 함수를 declear 한 파일을 넣어줘야한다

```ts
// global.d.ts
declare interface Window {
  ReactNativeWebView: any;
}
```

```json
{
  ...
  "include": ["src", "global.d.ts"]
}
```

### 7. Type 'typeof import("\*.png")' is not assignable to type 'string | undefined'.

png를 가져올 때, webpack, ts에서 나오는 에러

### fix

1. require 문을 사용한다 (import 문 사용하지 않음)

```ts
const imageSrc = require("/assets/logo-large.png");
```

2. 1번 방법으로 해결이 안되거나, import를 사용할시 `~.d.ts`파일로 해결

- `~.d.ts` 파일 생성

```ts
// src/types/image.d.ts
declare module "*.png" {
  const value: any;
  export = value;
}
```

- `tsconfig.json`에 `~.d.ts` 로드 추가

```json
// tsconfig.json
{
  "compilerOptions": {
		...
  },
  "include": ["src", "types"]
}
```

## ' ' is not assignable to parameter of type 'EffectCallback'.

useEffect cleanup 함수 에러

### fix

```tsx
// error
useEffect(() => {
  dispatch(getBookingCount(currentStudioData.ticket.id));
  // error
  return () => dispatch(initalizeBooking());
}, []);

// fix
useEffect(() => {
  dispatch(getBookingCount(currentStudioData.ticket.id));
  // fix
  return () => {
    dispatch(initalizeBooking());
  };
}, []);
```

## The left -hand and right hand side of an arithmetic operation must be of type 'any', 'number' or an enum type

new Date 값을 비교할 때 나오는 에러

### fix

```ts
const res = action.data.data.sort(
  (a: { start_on: string }, b: { start_on: string }) =>
    (new Date(a.start_on) as any) - (new Date(b.start_on) as any)
);
```

## saga 제네릭 함수에서 takeLatest내부에 오는 type 값 에러

```
No overload matches this call.
The last overload gave the following error.
Argument of type 'string' is not assignable to parameter of type 'TakeableChannel<unknown>'.
```

```ts {16}
function* postGroupBookingSaga(action: {
  userTicketId: number;
  lectureId: number;
}) {
  try {
    const result = yield call(() =>
      booking.patchBooking(action.userTicketId, action.lectureId)
    );
  } catch (err) {
    console.log(err);
  }
}

function* watchPostGroupBooking() {
  // 에러
  yield takeLatest(POST_GROUP_BOOKIG_R, postGroupBookingSaga);
}
```

### fix

내부적으로 action type이 string으로 내려주니까 type 정의할때 `type: string`을 넣어줘야한다.

```ts {4}
type test = {
  userTicketId: number;
  lectureId: number;
  type: string;
};
function* postGroupBookingSaga(action: test) {
  try {
    const result = yield call(() =>
      booking.patchBooking(action.userTicketId, action.lectureId)
    );
  } catch (err) {
    console.log(err);
  }
}

function* watchPostGroupBooking() {
  yield takeLatest(POST_GROUP_BOOKIG_R, postGroupBookingSaga);
}
```

### useSelector - Property '' does not exist on type 'DefaultRootState'

타입스크립트에서 useSelector을 쓸때는 state type을 정의해야한다. store에 RootState를 정의했을 것이니 그것을 가져오면 된다.

```tsx
import RootState from "store";
const isDialogOpen = useSelector(
  (state: RootState) => state.tsReducer.isDialogOpen
);
```

## 안드로이드 fastlane 배포 에러

### bundler update 에러

- `cd android` -> 번들러 업데이트 명령어 실행

## firebase_cli_path: missing path to firebase cli tool. Please install firebase in \$PATH or specify path

- Fastfile path를 제대로 지정해주지 않음
- firebase_cli_path: "/Users/kyounghwan/.yarn/bin/firebase"

### Could not initialize class org.codehaus.groovy.runtime.InvokerHelper

- `./andriod/gradle-wrapper.properties` 파일에 `distributionUrl=https\://services.gradle.org/distributions/gradle-6.3-all.zip` 추가

### 빌드 완료 후, 웹뷰 URL 호출시 에러 ERR_CLEARTEXT_NOT_PERMITTED

- 외부 url에 접속하는 권한 문제
- `AndroidManifest.xml` application 태그에 `android:usesCleartextTraffic="true"` 추가

## Error: EMFILE: too many open files, watch at FSEvent.FSWatcher.\_handle.onchange (internal/fs/watchers.js:123:28)

- 프로젝트가 너무 많이 열리면 나오는 에러
- watchman 설치
  Watchman은 문제없이 임의의 많은 파일을 볼 수 있도록 특별히 설계되었으며, 사람들은 일반적으로 Jest가 iirc 어딘가의 문서에서 권장하기 때문에 응용 프로그램이 그렇게 커질 때마다 설치합니다.

```
brew update
brew install watchman
```

## ios beta 배포

```
fastline 추가
sudo gem install fastlane -NV -- 처음 비번 (릴리즈 처음 만든 ㄴ사람이 설정한 비번), 로그인은 회사 구글 계정으로 로그인
fastlane match development --readonly

yarn global add firebase-tools
firebase login:ci 로그인은 회사 구글 계정으로 로그인
which firebase로 나온 값 Fastfile의 firebase_app_distribution.firebase_cli_path에 복붙
yarn beta:ios

```

## next- html 태그 사용시 에러

```
Your custom Document (pages/_document) did not render all the required subcomponent.
Missing component: <Html />
Read how to fix here: https://err.sh/next.js/missing-document-component
```

### fix

`_document.tsx`에 `<Html>` 태그를 next에서 가져온다 (`<html>`태그 사용 금지)

```tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return <Html lang="en">...</Html>;
  }
}
```

## next - Warning: Failed prop type: Invalid prop `component` supplied to `ForwardRef(ButtonBase)`. Expected an element type that can hold a ref

```
Warning: Failed prop type: Invalid prop component supplied to ForwardRef(ButtonBase). Expected an element type that can hold a ref. Did you accidentally provide a plain function component instead? For more information see https://material-ui.com/r/caveat-with-refs-guide
```

라이브러리 커스텀 레이아웃을 쓰면 나오는 에러

### fix

`ForwardRef` 를 사용해야한다.

[https://ko.reactjs.org/docs/forwarding-refs.html](https://ko.reactjs.org/docs/forwarding-refs.html) 리엑트 공식 문서로 들어가서 Forwarding ref 컴포넌트를 가져와서 사용하면 에러 없어짐

```tsx
export const MaterialUiLink = React.forwardRef<
  HTMLAnchorElement,
  MaterialUiLinkProps
>((props, ref) => (
  <Component ... />
));
```

## next - 'React' must be in scope when using JSXeslintreact/react-in-jsx-scope

- 모든 로직 다 맞는데 위처럼 뜨면 아래가 없는 것이다

```jsx
import React from "react";
```

## Unexpected lexical declaration in case block.eslintno-case-declarations

- switch case에서 위처럼 에러 뜰때는 case문 내부에 let, const를 선언한 경우 중괄호로 렉시컬 범위를 쳐주지 않으면 나오는 에러이다. 아래처럼 중괄호로 감싸주면 끝

```js
swicth (data){
	case 1: {
		let test = 1;
		break;
	}
	default:
		break;
}
```

## warning: LF will be replaced by CRLF in my-app/.gitignore.

- os 마다 문서 처리에 이상이 있어서 나오는 에러

### fix

- 터미널에서 아래 명령 실행

```jsx
git config --global core.autocrlf false
```

## mobx - Error: [mobx] missing option for computed: get

```js
@computed get info() { /** return 없음 **/ }
```

- computed를 쓰고 있는데 get 이후 함수가 없거나 return 값이 없는 경우

### fix

computed를 쓰지 않거나 computed 로직을 완성시킴
