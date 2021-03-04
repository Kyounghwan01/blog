---
title: styled-components 개념 및 예시
meta:
  - name: description
    content: styled-components 개념 및 예시, react, redux, 환경설정, global theme, 글로벌 스타일, props, mixins
  - property: og:title
    content: styled-components 개념 및 예시, react, redux
  - property: og:description
    content: styled-components 개념 및 예시, react, redux, 환경설정, global theme, 글로벌 스타일, props, mixins
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/styled-components/
tags: ["react", "styled-components"]
---

# styled-components

## styled-components란

- 기존 돔을 만드는 방식인 css, scss 파일을 밖에 두고, 태그나 id, class이름으로 가져와 쓰지 않고, 동일한 컴포넌트에서 컴포넌트 이름을 쓰듯 스타일을 지정하는 것을 styled-components라고 부릅니다. <br>css 파일을 밖에 두지 않고, 컴포넌트 내부에 넣기 때문에, css가 전역으로 중첩되지 않도록 만들어주는 장점이 있습니다.

## 환경설정

```bash
npm install styled-components
```

## 예시

```jsx
import React, { useState } from "react";
import styled from "styled-components";

function Example() {
  const [email, setEmail] = useState("");

  return (
    <ExampleWrap active={email.length}>
      <Button>Hello</Button>
      <NewButton color="blue">Im new Button</NewButton>
    </ExampleWrap>
  );
}

const ExampleWrap = styled.div`
  background: ${({ active }) => {
    if (active) {
      return "white";
    }
    return "#eee";
  }};
  color: black;
`;

const Button = styled.button`
  width: 200px;
  padding: 30px;
`;

// Button 컴포넌트 상속
const NewButton = styled.Button`
  // NewButton 컴포넌트에 color가는 props가 있으면 그 값 사용, 없으면 'red' 사용
  color: ${props => props.color || "red"};
`;

export default Example;
```

## styled components 만들기

- `const 컴포넌트명 = styled.태그명`스타일 넣기`...`문법으로 만들어집니다.
- 만들고자하는 컴포넌트의 render 함수 밖에서 만듭니다.

## 스타일에 props 적용하기

- styled-component를 사용하는 장점 중 하나가 변수에 의해 스타일을 바꿀 수 있다는 점입니다.
- 위 예시를 보면 `email`이라는 state값에 따라 `ExampleWrap`에 prop으로 내려준 active라는 값이 true or false로 바뀌게 됩니다.
- styled-component는 내부적으로 props을 받을 수 있고, 그 props에 따라 스타일을 변경할 수 있습니다.

## 스타일 상속

- `const 컴포넌트명 = styled.스타일컴포넌트명`스타일 넣기`...`문법으로 만들어집니다.
- 기존에 있는 스타일컴포넌트를 상속받아 재사용합니다.

## Mixin css props

- css props는 자주 쓰는 css 속성을 담는 변수입니다.
- `css 변수명 = css`스타일`...` 로 사용합니다.

```js
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBox = div`
  ${flexCenter}
`;
```

## 다른 파일에서 컴포넌트 import

- 해당 파일에서 정의한 css를 export하여 다른 파일에서 import 할 수 있습니다.

```jsx
// Login.jsx
export const LoginContainer = styled.div`
  background: red;
`;

// Other.jsx
import { LoginContainer } from ".Login";

const Other = () => {
  return <LoginContainer>...</LoginContainer>;
};
```

## 반응형디자인

- 위 예시를 응용하면 반응형을 쉽게 만들 수 있습니다.
- [styled-components-media](https://styled-components.com/docs/advanced#media-templates) 이 링크를 공부하시면 좋을 것 같습니다.

### 예시

```jsx
import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  desktop: 1024,
  tablet: 768
};

// sizes 객체에 따라 자동으로 media 쿼리 함수를 만들어줍니다.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${props => props.color || "blue"};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 768px;`};
`;
```

## global css

- 프로젝트 전역으로 발동하는 css를 만들 수 있습니다.

```jsx
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{padding:0; margin:0}
`;
```

## attribute 추가

```jsx
const Input = styled.input.attrs({
  required: true
})`
  border-radius: 5px;
`;
```

## css 모듈 분리

```jsx
const addCssType = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Input = styled.input.attrs({
  required: true
})`
  border-radius: 5px;
  ${addCssType}
`;
```

## global Theme

- 전역으로 css를 정의할 수 있습니다. (색, css 등)

1. root 레벨에 공동으로 사용할 theme.js를 만든다

```js
// theme.js
const theme = {
  successColor: blue;
  dangerColor: red;
}
export default theme
```

2. ThemePrivider를 프로젝트의 root dir에 import하고 아래와 같이 정의한다

```jsx
import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>...</Container>
      </ThemeProvider>
    );
  }
}
```

3. 전역에서 호출하여 사용한다.

```jsx
// Container.jsx
import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";

const Container = () => {
  return <Button>test</Button>;
};

// 아래와 같이 props.theme로 불러서 전역으로 사용한다.
const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  background-color: ${props => props.theme.successColor};
`;

export default Container;
```

### 글로벌 css에 minxin 기능을 넣고 어느 컴포넌트에서나 사용하게 할 수 있습니다.

#### global-styled.ts에 mixin을 정의합니다.

```ts
// global-styled.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @mixin flex($direction: 'row', $align: 'center', $justify: 'center') {
    display: flex;
    flex-direction: $direction;
    align-items: $align;
    justify-content: $justify;
  }
`;
export default GlobalStyle;
```

#### global-styled를 웹의 가장 상단 index.js에 import 합니다

```js
// src/index.js
import GlobalStyle from "assets/styles/global-styles.ts";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);
```

#### 이후 아무 컴포넌트에서나 글로벌에서 정의한 mixin기능을 사용할 수 있습니다.

```tsx
function Test() {
  return (
    <CenterContainer>
      <p>가운데 정렬 엘리먼트</p>
    </CenterContainer>
  );
}
const CenterContainer = styled.div`
  @include flex(row, center, center);
`;
```

## styled-components 만 사용하는 변수

[Transient props](https://styled-components.com/docs/api#transient-props)를 사용합니다.

위 api는 v5.1 이상에서 사용 가능합니다.

스타일만을 위한 변수가 기본 React 노드로 전달되거나 DOM 요소로 렌더링되는 것을 방지하려면 변수 이름 앞에 `$` 기호를 붙일 수 있습니다

```jsx
import React from "react";

export default function Trans() {
  const Comp = styled.div`
    color: ${props => props.$draggable || "black"};
  `;

  return <Comp $draggable="red">Drag me!</Comp>;
}
```

<TagLinks />

<Comment />
