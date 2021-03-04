# 2020.06월

## 6월 이슈 요약

- react native || Flutter 기반 하이브리드 웹앱 시작
- react로 웹뷰 리드
  - 프로젝트 구조
  - 로직 일괄 작업

## 에러 해결 모음

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

## 배운점

### 1. react-hook

- [정리](https://kyounghwan01.github.io/blog/React/react-hook/)

### 2. styled-components

- [정리](https://kyounghwan01.github.io/blog/React/styled-components/)

### 3. immer

- [정리](https://kyounghwan01.github.io/blog/React/immer-js/)

### 4. props-types

- typescript로 변환하여 더이상 쓰지 않음 (20_08_27)

### 5. react project 구조

- 컴포넌트 디자인 패턴 (container, presenter 구조)
- [정리](https://kyounghwan01.github.io/blog/React/container-presenter-dessign-pattern/)

### 6. time localization

- ping으로 서버시간 받고, 현재 로컬 시간 가져와서 둘의 시간 차이 빼서, 로컬에 저장
- 서버로 부터 시간에 관한 값을 가져오면 무조건 로컬에 저장된 차이 시간 값을 조정하여 사용자에게 보여줌
- [정리](https://kyounghwan01.github.io/blog/React/time-localization/)

### 7. redux-saga

- redux의 비동기를 위한 미들웨어
- [정리](https://kyounghwan01.github.io/blog/React/redux/redux-saga/)

<Comment />
