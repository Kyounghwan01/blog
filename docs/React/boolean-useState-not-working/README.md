---
title: useState boolean 값 안바뀌는 경우 해결
meta:
  - name: description
    content: useState boolean 값 안바뀌는 경우 해결, react, react16, useEffect, useState, setState
  - property: og:title
    content: useState boolean 값 안바뀌는 경우 해결
  - property: og:description
    content: useState boolean 값 안바뀌는 경우 해결, react, react16, useEffect, useState, setState
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/boolean-useState-not-working/
tags: ["react"]
---

# useState boolean 값 안바뀌는 경우 해결

react의 useState 훅을 이용해 boolean 값을 바꾸는 경우가 있습니다

개발자는 분명히 true를 false로 바꾸는 로직을 만들었는데 정작 값이 안바뀌는 경우가 있습니다

그럴경우 useState의 함수형 업데이트를 이용하면 손쉽게 바꿀 수 있습니다.

```jsx
import { useState } from "react";

const App = () => {
  const [isCheck, setIsCheck] = useState(true);

  const changeCheck = () => {
    setIsCheck((check: boolean) => !check);
  };

  return (
    <div className="container">
        {isCheck && <h1>hihi</h1>}
        <button onClick={changeCheck}>Change!</button>
      </div>
    </div>
  );
};

export default Test;
```

<TagLinks />

<Comment />
