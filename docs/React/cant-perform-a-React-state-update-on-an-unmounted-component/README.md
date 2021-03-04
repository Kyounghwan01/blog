---
title: router 이동시 메모리 lack 에러 (Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.)
meta:
  - name: description
    content: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
  - property: og:title
    content: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
  - property: og:description
    content: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/cant-perform-a-React-state-update-on-an-unmounted-component/
tags: ["react"]
---

# router 이동시 메모리 lack 에러

> 리엑트로 router를 이동시 아래와 같은 에러가 나올 수 있습니다

```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup
```

> 언마운트된 컴포넌트에서는 상태를 추적할 수 없고, 상태를 추적하지 않기에 작업이 수행되지는 않지만, 메모리 누수가 발생할 수 있으니, useEffect의 cleanup 함수를 이용해라

## 발생 이유

1. router 이동 후, 이동 전 컴포넌트에서 state를 바꾸려는 시도가 있을 때
2. 비동기 처리 과정
   > 예 : 모달 로딩 - 모달 띄우고, 비동기 과정에 의해 loading이 true로 바뀌고, 현재 로딩중이라는 모습이 사용자에게 보여짐 -> 비동기 작업 완료로 모달 꺼지고 -> loading false로 변경<br>

## 해결

> 위 1,2번 모두 동일한 해결방법이 있습니다.

1. 라우터를 이동 전, 또는 모달이 꺼지기 직전에 해당 컴포넌트에서 state변경 작업을 모두 완료 후, 라우터 이동 or 모달 꺼짐 (컴포넌트 언마운트)을 시킨다.
2. react 조언대로 useEffect의 cleanup 함수를 이용한다.

## 문제 코드

- 아래와 같이 회원가입 함수가 있습니다.
- try문 안에서 api 호출을 하기전 loading이라는 state를 setLoading함수를 통해 true로 만들고 api 통신을 한 이후, success를 받고 router를 이동시킵니다.
- 하지만 finally로 인해서 router가 이동한 후에(컴포넌트가 언마운트 된 후) setLoading을 한번더 하면서, 위에서 말한 `발생 이유 1번` 사항에 걸렸습니다.

```jsx
const signUp = async () => {
  try {
    setLoading(true);
    const res = await apis.auth.signUp({ email, password });
    if (res.data.message === "success") {
      alert(`중복 되지 않습니다.`);
      return history.push({
        pathname: "/success",
        state: {
          title: "회원가입 완료",
          body:
            "스튜디오메이트 가입이 완료되었습니다 \n 프로필을 등록해주세요.",
          loginData: { email: text.email, password: text.password }
        }
      });
    }
  } catch (error) {
    if (error.response.data.data) {
      alert(
        `중복된 휴대폰 번호입니다. \n해당 번호로 가입된 이메일을 확인해주세요. \n${error.response.data.data[0]}`
      );
    } else {
      alert(error.response.data.message);
    }
  } finally {
    // 에러발생지점!! - router이동 후, state 변경
    setLoading(false);
  }
};
```

## 해결 코드

### 1. 아래와 같이 router가 이동하기 전에 loading을 멈추고, 언마운트 시키면 위 에러가 사라집니다.

```jsx
const signUp = async () => {
  try {
    setLoading(true);
    const res = await apis.auth.signUp({ email, password });
    // router이동 전 state 변경
    setLoading(false);
    if (res.data.message === "success") {
      alert(`중복 되지 않습니다.`);
      return history.push({
        pathname: "/success",
        state: {
          title: "회원가입 완료",
          body:
            "스튜디오메이트 가입이 완료되었습니다 \n 프로필을 등록해주세요.",
          loginData: { email: text.email, password: text.password }
        }
      });
    }
  } catch (error) {
    if (error.response.data.data) {
      alert(
        `중복된 휴대폰 번호입니다. \n해당 번호로 가입된 이메일을 확인해주세요. \n${error.response.data.data[0]}`
      );
    } else {
      alert(error.response.data.message);
    }
    setLoading(false);
  }
};
```

### 2. useEffect의 cleanup 함수를 만듭니다.

```jsx
useEffect(() => {
  return () => setLoading(false);
}, []);
```

- 개인적으로 굳이 cleanup함수만을 위해 useEffect를 쓰는 건 좋아하지 않아, useEffect를 쓰지 않는 컴포넌트에서는 1번 방법을 이용합니다.

<TagLinks />

<Comment />
