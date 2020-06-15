---
title: immer.js 개념 및 예시
meta:
  - name: description
    content: immer.js 개념 및 예시
  - property: og:title
    content: immer.js 개념 및 예시
  - property: og:description
    content: immer.js 개념 및 예시
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/immer-js/
tags: ["react", "react-hook"]
---

# immer.js

## immer.js란?

- react에서 불변성을 유지하는 코드를 작성하기 쉽게 해주는 라이브러리입니다.

## 불변성이란?

> 쉽게 말하면 `상태를 변경하지 않는 것`입니다.<br>
> 상태를 변경하는데, 상태를 변경하지 않으면서 원하는 상태를 바꾼다는게 어불성설이지만 react가 어떻게 컴포넌트를 유지하는지(기본 속성) 알면 왜 저런 말이 나오는지 이해하게 됩니다

## react 기본 속성

> react는 기본적으로 부모 컴포넌트가 리렌더링을 하면 자식 컴포넌트도 리렌더링하게 됩니다 <br>
> 이 과정은 가상 dom에서만 이뤄지는 렌더링이며, 렌더링을 마치면 react의 비교 알고리즘에 의해 변화가 일어난 컴포넌트만 실제로 업데이트되어 우리 눈에 보이게 되는 것이죠.<br>
> 문제는 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 영향을 받는다는 점입니다. 가상 dom에서만 리렌더링 되나, 그래도 cpu에는 낭비가 이루어지게 되죠. 이런게 대규모 어플리케이션에서 모이면 서비스의 버벅임까지 일어날 수 있습니다.<br>

immer.js가 가진 불변성을 유지하여 코딩을 하면 데이터가 변하지 않은 자식컴포넌트는 리렌더링 하지 않도록 최적화가 가능합니다.

- class component에서는 `shouldComponentUpdate` 또는 `PureComponent`를 사용하면 됩니다.

```jsx
import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 같을 경우 리렌더링 하지 않는다.
    return nextProps.users !== this.props.users;
  }
}

export default UserList;
```

## 작성 중...
