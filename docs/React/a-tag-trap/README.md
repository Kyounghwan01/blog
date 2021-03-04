---
title: react-redux state 초기화
meta:
  - name: description
    content: react-redux state 초기화, redux state initalize, 초기화됨, react, redux, setState
  - property: og:title
    content: react-redux state 초기화
  - property: og:description
    content: react-redux state 초기화, redux state initalize, 초기화됨, react, redux, setState
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/a-tag-trap/
tags: ["react", "styled-components"]
---

# react-redux state 초기화

redux 사용시 갑자기 내부 state가 초기화 되는 경우가 있습니다. 아래와 같은 경우인지 확인해 보고 같은 에러를 겪지 않으셨으면 좋겠습니다.

react에서 우리는 버튼을 클릭시 다른 페이지로 이동할 때, 흔히 `a` tag를 사용할 수 있습니다. 아래처럼 말이죠.

```jsx {9}
const Ex = () => {
  return (
    <Tabs key="/login" to="/login">
      로그인으로 이동
    </Tabs>
  );
};

const Tabs = styled.a`
  color: #f2f2f2;
`;
```

## a tag의 문제점

- a 태그를 사용하면 라우트를 이동시 redux의 전역 state가 모두 **초기화** 됩니다. 이유는 아래와 같습니다.

  :::tip TIP a 태그 속성
  a 태그의 기본 속성은 페이지를 이동시키면서, 페이지를 새로 불러옵니다
  그렇게 되면서 react 앱이 지닌 상태도 초기화 됩니다
  :::

- 위 이유 때문에 우리는 react에서 페이지를 이동시킬 때 무조건 react-router의 `Link` 컴포넌트를 사용해야 합니다
- `Link`컴포넌트는 브라우저 주소만 바꾸고, 페이지를 새로고침 하지 않기 때문에 react 앱의 state를 초기화 하지 않습니다. 위 예제를 `Link`태그에 맞게 수정하면 아래와 같습니다

```jsx {11}
import { Link } from "react-router-dom";

const Ex = () => {
  return (
    <Tabs key="/login" to="/login">
      로그인으로 이동
    </Tabs>
  );
};

const Tabs = styled(Link)`
  color: #f2f2f2;
`;
```

- 클릭을 이용해 이동할 때는 위처럼 `Link` 컴포넌트를 사용하고, 함수내에서 페이지를 이동할 때는 `useHistory`안의 `history` 객체를 사용하면 됩니다
- `useHistory`는 `react-router` v5에 새로 도입된 문법입니다
- 또한 아래와 같이 페이지를 이동하면서 state를 담아 보낼 수 있습니다

```jsx {6-12}
import { useHistory, Link } from "react-router-dom";

const ExChangePage = () => {
  const history = useHistory();
  const changePage = () => {
    history.push({
      pathname: "/success",
      state: {
        title: "비밀번호 찾기 완료",
        body: "회원님의 비밀번호가 성공적으로 변경되었습니다."
      }
    });
  };
};
```

- 이동한 페이지에서 state를 받는 방법은 `location` props를 이용하면 됩니다
- 또는 `useLocation`을 사용합니다

```jsx {1}
function Success({ location }) {
  return (
    <div className="success">
      제목:
      {location.state.title}
      내용:
      {location.state.body}
    </div>
  );
}
```

## 결론

#### 외부 홈페이지로 경로를 이탈할 때만 a 태그를 쓰고 나머지 상황에서는 Link 쓰자!

<TagLinks />

<Comment />
