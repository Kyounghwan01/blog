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
    content: https://kyounghwan01.github.io/blog/error-report/React/
tags: ["react"]
---

# 에러 해결 모음

## React

### 1. Can't perform a React state update on an unmounted component.

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

### 2. a tag 사용시 redux가 초기화 됨

- a tag 속성이 브라우저를 새로고침하면서 이동하기 때문
- react router의 link는 브라우저를 새로고침하지 않고 url을 이동하기에 redux의 state가 유지된다.
- [정리](https://kyounghwan01.github.io/blog/React/a-tag-trap/#a-tag%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90)

### 3. 체크박스 with label

- id랑 htmlFor 값을 동일하게 맞추면 라벨을 눌렀을때 onChange 실행됨

```jsx
<input type="checkbox" id="check3" onChange={onCheckBox} /> Fish
<label htmlFor="check3"><span class="fa fa-check"/></label
```

### 4. React.memo에서 특정 props만 비교하여 리렌더링 제어

- 전달받는 prop이 객체인 경우 deep comparison을 수행하거나, 여러개 중 특정 prop의 변화만을 고려하기 위해 아래와 같이 구현할 수도 있습니다.

```jsx
const equalComparison = (prevProps, nextProps) =>
  prevProps.notiParams.min_id === nextProps.notiParams.min_id;

export default React.memo(NotificationPresenter, equalComparison);
```

### 5. useEffect 내부에서 props, state를 사용 할 경우 dependency를 추가해 줘야한다.

- [정리](https://kyounghwan01.github.io/blog/React/exhaustive-deps-warning/)

### 6. dispatch 잘못된 형식으로 실행

- 아래와 같이 실행하면 뜬다. dispatch 내부의 값이 함수인데 객체로 실행한 경우 뜨는 에러

```
Actions must be plain objects. Use custom middleware for async actions
```

```js
dispatch(thisIsFunction);
```

- 아래와 같이 고친다

```js
dispatch(thisIsFunction());
```

### 7. render에 영향을 안미치고 즉시 바뀌는 값(flag?)이 필요한 경우

- useRef를 통해 ref값을 사용하면 된다
- [자세한 내용](https://kyounghwan01.github.io/blog/React/react-hook/#useref)은 여기서 useRef 부분

### 8. antd, antd-mobile 라이브러리 번들 사이즈 줄이기

```
You are using a whole package of antd-mobile, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

- 전체 번들 import 하지 말고, 필요한 컴포넌트만 써라
- [정리](https://kyounghwan01.github.io/blog/React/antd-resize-bundle-size/)

### 9. ref 정보를 props으로 내릴때

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

## TypeScript

### 1. Expected 0 type arguments, but got 1.

```
Expected 0 type arguments, but got 1.
```

- params애 들어올 값의 타입을 정의한 것 없는 데, params을 넣은 경우

### 2. Property context does not exist on type NodeRequire

```
Property context does not exist on type NodeRequire
```

- require가 뭔지 몰라서 나오는 에러
- fix: `npm install @types/webpack-env` 설치시 해결

### 3. No overload matches this call.

```
No overload matches this call.
```

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

### 4. 객체가 nesting된 경우 key로 객체에 접근할 때 나오는 에러

```
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type

```

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

### 5. props로 내린 값을 사용하지 않을 때, 나오는 에러

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

### 6. window 객체 접근

- typescript는 window 객체에 대한 정의를 해주지 않으면 에러 발생
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
