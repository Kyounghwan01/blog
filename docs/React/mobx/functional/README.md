---
title: mobx - 함수형 컴포넌트에서 사용하기
meta:
  - name: description
    content: mobx - 함수형 컴포넌트에서 사용하기, react, mobx, state management
  - property: og:title
    content: mobx - 함수형 컴포넌트에서 사용하기
  - property: og:description
    content: mobx - 함수형 컴포넌트에서 사용하기, react, mobx, state management
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/basic/
tags: ["react", "mobx"]
---

# mobx - 함수형 컴포넌트에서 사용하기

기존 mobx-react에 의해 `observer`로 래핑된 함수형 컴포넌트의 경우 hook (useState 등등)을 사용할 경우 `훅은 함수형 컴포넌트에서만 사용할 수 있다`라는 오류를 발생시킵니다.<br>
mobx-react의 `observer`가 클래스 컴포넌트를 리턴하기 때문입니다. 그래서 mobx와 함수형 컴포넌트를 사용하려면 `mobx-react-lite`를 사용합니다.

## mobx-react-lite

mobx-react-lite는 함수형 컴포넌트에서만 사용할수 있는 api만을 제공합니다. 그래서 mobx-react-lite는 `Provide`, `inject`를 제공하지 않습니다.<br>
대신 `React.createContext` api를 사용하여 store를 가져오는 방법을 제안합니다.

<TagLinks />

<Disqus />
