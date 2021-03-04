---
title: focus, blur 예제
meta:
  - name: description
    content: React.js - focus, blur 예제, react event focus blue example
  - property: og:title
    content: React.js - focus, blur 예제
  - property: og:description
    content: React.js - focus, blur 예제, react event focus blue example, useRef
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/focus-blur/
tags: ["react"]
---

# focus, blur 예제

웹에서는 굳이 필요가 없었으나, 웹뷰로 전환하니, 모바일에서 input에 입력 후, submit을 해도 keyboard가 사라지지 않는 현상을 보니 input을 blur시키니 사라졌습니다.

그래서 form과 input을 이용해 데이터를 입력하고, 제출시, input에서 focus가 blur되는 방법을 예제로 알아보겠습니다.<br>

## react에서 focus, blur 하는법

### 1. foocus ,blur할 엘리먼트에 Ref를 가져옵니다.

- 예제의 경우 input의 포커싱을 블러 시킬 예정이니 input에 ref를 잡습니다.
- react에서 ref는 `useRef`를 이용해서 사용합니다.

```jsx
import React, { useRef } from "react";

const Example = () => {
  const inputRef = useRef();

  return (
    <form onSubmit={onSubmit}>
      <input refs={inputRef} />
    </form>
  );
};
export default Example;
```

### 2. form의 onSubmit이 호출되는 순간 ref를 이용해 blur 시킵니다.

```jsx
import React, { useRef } from "react";

const Example = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    inputRef.current.blur();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        refs={inputRef}
      />
    </form>
  );
};
export default Example;
```

- 위 코드 실행시 웹뷰의 ios의 경우 keyboard의 return을 누르면 onSubmit이 작동하여 `onSubmit`함수가 실행되고, input의 포커싱이 blur되면서 키보드가 사라짐을 확인할 수 있습니다.

- focus도 blur의 과정과 동일합니다 blur는 `searchBar.current.blur();`를 실행하여 잡았다면, focus는 `refName.current.focus();`를 이용하면 원하는 ref의 엘리먼트로 포커싱이 이동하는 것을 확인 할 수 있습니다.

<TagLinks />

<Comment />
