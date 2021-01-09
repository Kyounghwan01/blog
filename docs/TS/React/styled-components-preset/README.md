---
title: styled-components typscript로 세팅하기
meta:
  - name: description
    content: styled-components typscript로 세팅하기
  - property: og:title
    content: styled-components typscript로 세팅하기
  - property: og:description
    content: styled-components typscript로 세팅하기, global css, reset css, theme setting
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/React/styled-components-preset/
tags: ["react", "TS", "styled-components"]
---

# styled-components typscript로 세팅하기

## package.json 설치

```
yarn add styled-components @types/styled-components styled-normalize
```

`styled-normalize`는 브라우저마다 다르게 보이는 css를 초기화 시키기 위해 다운 받습니다.

## global style type 작성

- global에 원하는 css를 작성하기 전에, type을 선언합니다.

```ts
// src/assets/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      main: string;
      sub: string;
    };
  }
}
```

```
Parsing error: Only declares and type imports are allowed inside declare module

```

위와 같은 에러가 뜬다면 루트 디렉토리에 `.eslintignore`에 `/src/assets/styles/styled.d.ts`를 추가합니다.

## global style 작성

- global에 원하는 css를 작성합니다.

```ts
// src/assets/styles/global-styles.ts
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
```

## 많이 사용하는 css를 변수로 등록하는 theme을 작성합니다.

```ts
// src/assets/styles/theme.ts
import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  basicWidth: "320px",

  color: {
    main: "#1c1f25",
    sub: "#fff"
  }
};

const nextTheme: DefaultTheme = {
  basicWidth: "320px",

  color: {
    main: "#1c1f25",
    sub: "#fff"
  }
};

export { theme, nextTheme };
```

## 만든 스타입을 적용

```tsx
// src/index.js

import GlobalStyle from "assets/styles/global-styles";
import { theme } from "assets/styles/theme";

ReactDom.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
```

## 컴포넌트에 스타일 적용

- `ThemeProvider` 내부에 있는 컴포넌트는 `theme.ts`의 영향을 받아 props에서 css를 가져올 수 있습니다.
- `App.tsx`에서 예시로 살펴보겠습니다.

```tsx
// App.tsx
type activeType = {
  active: boolean;
};

const App = () => {
  return (
    <CustomContainer active>
      <span>styled-components css test</span>
    </CustomContainer>
  );

  const CustomContainer = styled.div<activeType>`
    background: ${props => {
      return props.theme.color.main;
    }};

    color: ${props => {
      if (props.active) {
        return "white";
      }
      return "#eee";
    }};
  `;
};
```
