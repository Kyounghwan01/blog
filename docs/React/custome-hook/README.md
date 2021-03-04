---
title: React.js - 커스텀 훅 만들기
meta:
  - name: description
    content: React.js - 커스텀 훅 만들기, custom hook, react, hook, react16, setState
  - property: og:title
    content: React.js - 커스텀 훅 만들기
  - property: og:description
    content: React.js - 커스텀 훅 만들기, custom hook, react, hook, react16, setState
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/custome-hook/
tags: ["react"]
---

# 커스텀 훅 만들기

> login form, validation 등 비슷한 로직이 여러 컴포넌트에서 쓰이는 경우가 있습니다. <br>이럴 경우 중복되는 로직을 유틸 함수와 같은 느낌으로 `커스텀 훅`을 만들어 중복 로직을 최소화 시킵니다. <br>아래 예시를 통해 커스텀 훅을 만드는 방법 과커스텀 훅으로 만들기 전, 커스텀 훅으로 만든 후 코드의 차이에 대해 알아보겠습니다.

- 리엑트의 기본적인 훅(useState, useCallback)에 대한 설명은 생략합니다.

## 상황

- input form이 있고, 그 안에 데이터를 넣는 `onChange`함수가 있다.

## 훅 쓰기 전 로직

```jsx
// Login.jsx
import React, { useState, useCallback } from "react";

// state
const [text, setText] = useState({
  email: "",
  password: ""
});

// func
const onChange = useCallback(
  e => {
    const { value, name } = e.target;
    setText({ ...text, [name]: value });
  },
  [text]
);

return (
  <>
    <input id="email" value={text.email} onChange={onChange} />
    <input id="password" value={text.password} onChange={onChange} />
  </>
);
```

기본적인 입력 폼에 데이터를 넣는 함수를 만들었습니다.<br>
또한 많은 곳에서 위와 같은 로직을 쓸 것으로 예상 할 수 있습니다. 그렇다면 입력 폼을 쓸때마다, 위 로직을 모든 컴포넌트에 넣을 수 밖에 없겠죠? <br>
중복은 너무 싫으니 대응 방안으로 커스텀 훅을 만들고, 그 훅을 반영해보겠습니다.

## 커스텀 훅

- 중복이 되는 로직을 넣습니다.
- 파일이름은 `use...`로 만드는 것이 컨벤션입니다.

```jsx
// useInput
import { useState, useCallback } from "react";

export default (initalValue = null) => {
  // state 정의
  const [data, setData] = useState(initalValue);

  // 함수 정의
  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );
  return [data, handler];
};
```

- 입력 폼 예시에서 나온 예제를 그대로 넣었습니다.

## 훅을 반영한 로직

```jsx
// Login.jsx
import React from "react";
import useInput from "useInput";

// state
const [text, setText] = useInput({
  email: "",
  password: ""
});

return (
  <>
    <input id="email" value={text.email} onChange={setText} />
    <input id="password" value={text.password} onChange={setText} />
  </>
);
```

- `useInput`훅 안에 useState, useCallback에 있는 함수를 미리 정의 했기 때문에, 컴포넌트에서는 훅을 사용하기만 하면 됩니다.

- 보시다시피, useState, onChange 함수가 없어져서 코드양도 적어지고, 저 커스텀 훅을 다른 컴포넌트에서도 재활용 가능하기 때문에 동일한 로직을 수행하는 컴포넌트가 많을 경우 `커스텀 훅`을 더욱 유용히 사용할 수 있습니다!

<TagLinks />

<Comment />
