---
title: React.js - presentational & container 디자인 패턴
meta:
  - name: description
    content: React.js - presentational & container 디자인 패턴, react
  - property: og:title
    content: React.js - presentational & container 디자인 패턴
  - property: og:description
    content: React.js - presentational & container 디자인 패턴, react
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/container-presenter-dessign-pattern/
tags: ["react"]
---

# presentational & container 디자인 패턴

> 회사에서 리엑트 프로젝트를 부여받고, atomic, presentation 등등 여러가지 파일 구조에 대해 찾아보고, 만들 프로젝트의 성격에 잘 맞는 패턴이 무엇인지 생각해보았습니다.

## presentational & container 디자인 패턴이란?

- 로직을 수행하는 컴포넌트와, markup을 통해 ui를 보여주는 컴포넌트가 분리된 패턴입니다.<br> 그에 따라 앱의 기능과 ui에 대한 구분이 쉬워집니다.
- 같은 state를 다른 container에게 props 내림으로 상태를 공유 할 수 있습니다.
- 로직수행, markUp이 다른 컴포넌트에서 하기 때문에 유지보수가 쉽고, 재사용성이 뛰어납니다. 특히, markup 변경에 매우 유연합니다.
- 동일한 마크업, 컨테이너 레이아웃 (header, footer)는 반복해서 작성하지 않도 `this.props.children` 구현 할 수 있습니다.

## presentational component

- 사용자가 직접 보고, 조작하는 컴포넌트 (ui와 관련 있습니다)
- state를 직접 조작하지 않으며, container component가 내려준 prop의 함수에 의해 state를 변경합니다. <br>
  그에 따라 useState, useCallback, dispatch등 state관련된 훅이 하나도 없습니다.
- 상태를 거의 가지지 않으며, 상태를 가진다면 데이터에 관한것이 아닌 ui 상태에 관한 것입니다.
- 종종, `this.props.children`을 통해 컴포넌트가 렌더됩니다.

## container component

- 어떻게 동작하는지, 어떤 로직을 수행하는지에 관련있습니다.
- markup을 사용하지 않습니다. 스타일을 사용하지 않습니다.
- 데이터와 데이터 조작에 관한 함수를 만들고 present component에 제공합니다.

## 컴포넌트 분리 팁

> 저의 경우 일단 컴포넌트 구분 없이 하나의 컴포넌트에 로직, markup작업을 다 합니다. 그 이후, container component를 만들어 로직을 분리시킵니다.

> 분리 시킬때, 생각보다 많은 코드가 중복된다는 것을 보실 수 있고, state 최적화 작업(불필요 리렌더링 등등)을 분리하면서 합니다.

## gist 예제

- 아래 예제는 [gist](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c)에서 가져온 예시입니다.

- container는 markup없이 데이터만 다루고, presenter에게 prop으로 내립니다.

```jsx
// CommentListContainer.js
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] };
  }

  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }));
  }

  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

- presenter는 받은 prop을 기반으로 render합니다.

```jsx
// CommentListPresenter.js
import React from "react";

const Commentlist = comments => (
  <ul>
    {comments.map(({ body, author }) => (
      <li>
        {body}-{author}
      </li>
    ))}
  </ul>
);
```

<TagLinks />

<Comment />
