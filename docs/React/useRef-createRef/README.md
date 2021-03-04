---
title: react - React.createRef and React.useRef 차이
meta:
  - name: description
    content: react - React.createRef and React.useRef 차이
  - property: og:title
    content: react - React.createRef and React.useRef 차이
  - property: og:description
    content: react - React.createRef and React.useRef 차이
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/useRef-createRef/
tags: ["react"]
---

## createRef, useRef의 차이

특정 dom을 잡아야 할때 ref를 사용합니다.
ref를 쓸 때, createRef와 useRef 두 방식으로 ref를 만들 수 있습니다.

## class 컴포넌트

class형 컴포넌트에서는 아래와 같은 예제로 `createRef`를 통해 ref를 사용합니다.

```jsx
class App extends React.Component {
  componentDidMount() {
    this.divRef = React.createRef();
  }
  render() {
    return (
      <div>
        <div id="divR" ref={this.divRef}>
          App, here
        </div>
      </div>
    );
  }
}
```

## 함수형 컴포넌트

함수형 컴포넌트에서는 `useRef`를 사용합니다.

```jsx
import React, { useRef } from "react";

const App = () => {
  const divRef = React.useRef();
  const valueRef = React.useRef(90);
  return (
    <div>
      값 : {valueRef.current}
      <div id="divR" ref={divRef}>
        App, here
      </div>
      <button onClick={() => (valueRef.current = 88)}> 증가 </button>
    </div>
  );
};

export default App;
```

- 위 코드를 실행하면 valueRef값이 88로 바뀌지 않는 다는 것을 알 수 있습니다.
- 만약 반응형으로 바뀌도록 의도한다면, 일부러 useState를 실행하면 됩니다.

```jsx
import React, { useState, useRef } from "react";

const App = () => {
  const divRef = React.useRef();
  const valueRef = React.useRef(90);
  const [, setState] = useState();
  return (
    <div>
      값 : {valueRef.current}
      <div id="divR" ref={divRef}>
        App, here
      </div>
      <button onClick={() => ((valueRef.current = 88), setState({}))}>
        증가
      </button>
    </div>
  );
};

export default App;
```

그러나 createRef를 함수형 컴포넌트에서 사용할 경우 문제점이 있습니다.
예를 들어 함수형 컴포넌트에서 `createRef`를 사용하면

```jsx
import React, { useState, createRef } from "react";

const App = () => {
  const valueRef = createRef();
  const [, setState] = useState();
  return (
    <div>
      값 : {valueRef.current}
      <button onClick={() => ((valueRef.current = 88), setState({}))}>
        증가
      </button>
    </div>
  );
};

export default App;
```

렌더링의 문제는 없지만, 증가 버튼을 클릭해도 이전 과 같이 88로 바뀌지 않는 다는 것을 볼 수 있습니다.

이유는 App 컴포넌트가 setState에 의해 리렌더링 되면 App 컴포넌트를 초기화 하고 다시 만듭니다. 그에 따라 `createRef`도 다시 실행되는데, 이 때 `createRef`에 의해 만들어진 값은 무조건 `null`로 다시 초기화 됩니다.

[react의 createRef 코드](https://github.com/facebook/react/blob/8ccfce460f141299d61290f877745407e05e531e/packages/react/src/ReactCreateRef.js#L14)를 참고하세요

그래서 함수혐 컴포넌트의 수명 내내 ref의 current 값을 유지하기 위해 `useRef` hook이 만들어진 것입니다.

`useRef`로 만들어진 값은 함수가 리렌더링 되어도 ref가 null로 초기화 되지 않습니다. (ref 값이 다시 재생성되지 않음)

## 결론

class형 컴포넌트에서 ref를 잡아야하는 경우 `React.createRef`를 사용한다.

함수형 컴포넌트의 경우 `React.createRef`와 `React.useRef` 둘다 사용가능 하지만 `React.createRef`를 사용할 경우 리렌더링 될때마다 ref 값이 초기화되어 원하는 값을 얻지 못할 것이다. 그러니 `useRef`를 사용한다.

<TagLinks />

<Comment />
