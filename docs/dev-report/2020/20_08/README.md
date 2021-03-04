# 2020.08월

## 8월 이슈 요약

- react로 기존 네이티브 앱 웹뷰로 만들기 진행 중
- 기존 vue 웹 유지보수

## 에러 해결 모음

### 1. Warning: Functions are not valid as a React child.

```
Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
```

- 함수인데 실행 안하고 render 부분에 코딩한 경우입니다.
- 함수 코드를 render에 넣었으니 당연히 정상적인 실행이 안되겠죠

```jsx
const Example = () => {
  const bookingStateTime = () => {
    switch (booking.status) {
      case "booking_confirmed":
      case "booked":
        return `예약 일시 : ${booking.created_at}`;
      case "cancel":
        return `취소 일시 : ${booking.lecture.course.updated_at}`;
      default:
        return `수정 일시 : ${booking.lecture.course.updated_at}`;
    }
  };
  return <span>{bookingStateTime}</span>;
};
```

- 위처럼 특정 함수를 만들고 render 부분에서 실행 안하고 함수만 호출시 위 같은 에러가 뜹니다.
- 해결방법은 함수 실행해주면 됩니다.

```jsx
const Example = () => {
  const bookingStateTime = () => {
    switch (booking.status) {
      case "booking_confirmed":
      case "booked":
        return `예약 일시 : ${booking.created_at}`;
      case "cancel":
        return `취소 일시 : ${booking.lecture.course.updated_at}`;
      default:
        return `수정 일시 : ${booking.lecture.course.updated_at}`;
    }
  };
  return <span>{bookingStateTime()}</span>;
};
```

## 에러 해결 모음

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

## 배운점

### 1. react - 공용 컴포넌트

- `this.props.children` 다루는 법
- 중복 컴포넌트 최소화 시키기
- [정리](https://kyounghwan01.github.io/blog/React/common-component/)

### 2. python - 네이버 기사 크롤링

- `request`, `bs4` 이용하여 네이버 기사 크롤링
- [정리](https://kyounghwan01.github.io/blog/기타/python/naver-news-crawling/)

### 3. html - dataset 사용법

- [정리](https://kyounghwan01.github.io/blog/기타/html/dataset/)

### 4. React - createRef vs useRef

- [정리](https://kyounghwan01.github.io/blog/React/useRef-createRef/)

#### 5. npm 배포하기

- [npm 코드 배포하기](https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm/)
- [컴포넌트 npm에 배포하기](https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm-react-component/)
- [여러 컴포넌트 npm에 배포하기](https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm-react-multi-component/)

<Comment />
