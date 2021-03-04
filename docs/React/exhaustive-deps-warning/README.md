---
title: React.js - exhaustive-deps-warning 해결법
meta:
  - name: description
    content: React.js - exhaustive-deps-warning
  - property: og:title
    content: React.js - exhaustive-deps-warning
  - property: og:description
    content: React.js - exhaustive-deps-warning
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/exhaustive-deps-warning/
tags: ["react"]
---

# exhaustive-deps-warning 해결법

```
React Hook useEffect has a missing dependency: 'xxx'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)
```

> react hook으로 개발을 하다 보면 위 warning(경고)를 정말 많이 보실 것입니다. <br>
> useEffect내에 사용하고 있는 state를 배열안에 추가시켜 달라는 의미입니다. <br>
> 2가지 방법으로 경고를 해결할 수 있습니다. 차근차근 코드로 알아볼께요.

## 1. useEffect내 state를 넣어줌

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);
```

- 가장 노멀하기 쓰이는 state를 배열안에 넣어주는 방법입니다.
- 다른 방법으로는 함수형 업데이트를 사용하는 방법입니다.

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  // state = 0
  setCount(state => state + 1);
}, []);
```

## 2. useEffect 내부에 함수를 정의한 경우

```jsx
const getInitNoti = async () => {
  const res = await apis.notification.getNotice(params);
  setNotiData(res.data.user_notices);
  }));
};

useEffect(() => {
  getInitNoti();
}, [getInitNoti]);
```

- 함수를 실행하는 것은 문제가 되지 않습니다. 그러나 useEffect내의 `getInitNoti`함수가 `params`라는 변수를 쓰기 때문에 이 값을 배열에 넣어줘야 경고가 나오지 않습니다.

```jsx
const getInitNoti = async () => {
  const res = await apis.notification.getNotice(params);
  setNotiData(res.data.user_notices);
  }));
};

useEffect(() => {
  getInitNoti();
}, [getInitNoti, params]);
```

- 또 다른 방법으로는 `useCallback`를 이용하는 방법이 있습니다.

```jsx
const getInitNoti = useCallback(async () => {
  const res = await apis.notification.getNotice(params);
  setNotiData(res.data.user_notices);
  }));
}, [params]);

useEffect(() => {
  getInitNoti();
}, [getInitNoti]);
```

- useCallback이 없다면 위 컴포넌트가 리렌더링 될때마다, 계속해서 `getInitNoti`함수를 만들게 되고, 새로운 참조값을 받기 때문에 `getInitNoti`함수를 실행하게 됩니다.<br>
- 하지만 useCallback을 정의 하면 `params`가 바뀔때 만 `getInitNoti`가 실행되어, 불필요한 함수 생성 및 실행을 막을 수 있습니다.

<TagLinks />

<Comment />
