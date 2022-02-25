---
title: styled-components에서 css 변수 사용하기 (var)
meta:
  - name: description
    content: styled-components에서 css 변수 사용하기 (var), react, redux, 환경설정, global theme, 글로벌 스타일, props, mixins
  - property: og:title
    content: styled-components에서 css 변수 사용하기 (var), react, redux
  - property: og:description
    content: styled-components에서 css 변수 사용하기 (var), react, redux, 환경설정, global theme, 글로벌 스타일, props, mixins
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/styled-components/var/
tags: ["next", "styled-components"]
---

# styled-components에서 css 변수 사용하기 (var)

css 변수를 사용하면 자주 쓰는 컬러 팔렛트를 만들어 오타 없이 코딩을 할 수 있습니다. 이를 조금 더 확장하면 다크 모드 같이 state 하나로 앱, 웹의 전체 theme을 바꾸는 기능도 수월하게 만들 수 있습니다.

이번 글에서는 `nextJS`에서 `styled-components`와 `var` 기능을 사용하여 손 쉽게 스타일 값을 변수화 하는 방법에 대해 알아보겠습니다!

## dependence 설치

```
yarn add node-sass
yarn add styled-components
```

## 팔렛트 scss 생성

스타일을 변수화 할 scss 파일을 만들어줍니다.

```scss
// src/styles/common.scss

:root {
  --primary-color: #2294e3;
  --border-color: #9a9a9a;
}
```

## `_app.tsx`에서 scss import

```tsx
import "../styles/common.scss";
...
```

위처럼 next에서는 `_app.tsx`, react에서는 `index.tsx`에 사용하는 scss를 Import 해주면 사용 완료입니다.

## styled-components에서 사용하기

```tsx
import styled from "styled-components";

const Test = () => {
  return <TestBlock>var test 화면</TestBlock>;
};

const TestBlock = styled.article`
  background: var(--primary-color);
`;
```

<TagLinks />

<Comment />
