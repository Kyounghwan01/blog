---
title: React18의 새로운 기능 flushsync
meta:
  - name: description
    content: React18의 새로운 기능 flushsync, react, react18, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, next
  - property: og:title
    content: React18의 새로운 기능 flushsync
  - property: og:description
    content: React18의 새로운 기능 flushsync, react, react18, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, next
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/React18/flushsync/
tags: ["react"]
---

# React18의 새로운 기능 flushsync

flushsync를 알기 전에 React 18에서 성능을 위해 개선하게 된 배칭에 대해서 알아야합니다

## React18 state 배칭

React18에서는 많은 상태를 업데이트 하여도 단 한번만 리렌더링 하였습니다. 예를 들면 아래와 같습니다.

```jsx
console.log("rerender"); // 한번만 호출됩니다!
function handleClick() {
  setCounter(c => c + 1); // 리렌더링 안함
  setCounter2(counter => counter + 1); // 리렌더링 안함
  // 리렌더링 함
}
```

setCounter 이후 setCounter2가 실행되기 전에 counter 값을 DOM에 리렌더링 시키고 싶을때는 어떻게 해야하지? 라는 문제가 생기게 됩니다. 그때 사용하는 것이 `flushSync`입니다.

아래 한가지 더 예시와 개발중 많이 생기는 문제 그리고 `flushSync` 사용법에 대해 알아보겠습니다.

## 스크롤 예시

이레 코드는 `handleApp`에 의해 todo가 추가되고, todo의 맨 하단으로 스크롤이 되도록 한다는 컨셉입니다. 하지만 실제는 todo가 추가되기 바로 직전 까지 스크롤이 내려갑니다. (codesandbox가 맨 아래에 있으니 지금은 눈으로 대강 훑어 주세요)

```jsx
import React, { useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);

  const handleApp = () => {
    setTodos([...todos, { id: uuid(), task: input }]);
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  return (
    <section>
      <h1>Todos</h1>
      <ul ref={listRef} style={{ height: 200, overflowY: "auto" }}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <AddTodo handleAdd={handleAdd} />
    </section>
  );
};

export default Index;
```

이유는 `useState`는 동기적으로 실행 되지 않기 때문에 setTodos에 새로운 todo가 들어가기 전에 이미 스크롤이 내려가 버리기 때문 입니다.

즉, react가 원하는대로 한번만 리렌더링이 되는 것이 아니라 setTodos가 실행될 때 한번, 스크롤이 내려갈 때 한번 리렌더링이 되어야 원하는대로 동작하게 됩니다.

이렇게 원하는 대로 동작하기 위해 `flushsync`가 필요합니다.

## flushsync

정말 간단하게 말하면 `async await`으로 보면돱니다. 비동기적인 코드를 강제로 동기적으로 만들고 react에서 리렌더링을 강제하도록 합니다. 아래와 같이 사용합니다.

```jsx
import React, { useState } from "react";
import { flushSync } from "react-dom";

const Index = () => {
  const [todos, setTodos] = useState([]);

  const handleApp = () => {
    flushSync(() => {
      setTodos([...todos, { id: uuid(), task: input }]);
    });
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  return (
    <section>
      <h1>Todos</h1>
      <ul ref={listRef} style={{ height: 200, overflowY: "auto" }}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <AddTodo handleAdd={handleAdd} />
    </section>
  );
};

export default Index;
```

이제 `handleApp`가 끝나지 않아도 배칭을 나누게 되었고 `setTodos`에 의해 todos에 새로운 값이 추가될때 까지 기다리고 그 다음 스크롤 코드가 동작하게 됩니다.

아래에 전체 예시코드를 codesandbox에 남기니 활용하시면 좋을 것 같습니다!!

<iframe src="https://codesandbox.io/embed/tender-cherry-4j4iyq?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tender-cherry-4j4iyq"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<TagLinks />

<Comment />
