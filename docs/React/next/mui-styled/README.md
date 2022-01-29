---
title: next.js에서 material-ui와 styled-components 사용하기
meta:
  - name: description
    content: next.js에서 material-ui 사용하기, react, next, seo, ssr, dynamic meta content, getInitialProps, mui, styled-components
  - property: og:title
    content: next.js에서 material-ui와 styled-components 사용하기
  - property: og:description
    content: next.js에서 material-ui와 styled-components 사용하기, react, seo, ssr, mui
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/mui-styled/
tags: ["react", "next", "TS"]
---

# next.js에서 material-ui와 styled-components 사용하기

이번에는 이전 [next.js에서 material-ui 사용하기](https://kyounghwan01.github.io/blog/React/next/mui/) 글에 이어서 mui와 styled-components를 같이 사용하는 방법에 대해 알아보겠습니다.

혹시 이 글을 처음 보시는 분이라면 [next.js에서 material-ui 사용하기](https://kyounghwan01.github.io/blog/React/next/mui/) 이 글을 참조하셔서 nextJS 부터 mui 세팅까지 하고 오시기를 권고드립니다!

mui v5 버전 기준으로 작성하였습니다. 이전 버전은 작동하지 않을 수 있습니다.

## 프로젝트 세팅

- 먼저 예시에 필요한 디펜던시를 설치합니다.

```bash
yarn add -D babel-plugin-styled-components
```

## .babelrc

- 먼저 바벨 파일을 수정합니다.
- 아래 파일은 next.js의 ssr과 연관이 있는데, ssr에 의해 styled-components 스타일이 적용 전에 화면 렌더링이 되는 문제를 방지하기 위함입니다.

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "fileName": true, "displayName": true, "pure": true, "ssr": true }
    ]
  ]
}
```

## `_document.tsx`

- babel 설정 파일을 설정했다면 이제 `_document` 파일을 설정합니다. (아직 styled-components가 서버렌더링에 세팅되지 않음)
- mui가 nextjs에서 작동하도록 설정하였는데 그 위에 styled-components도 사용 하도록 설정합니다.

```tsx {3,21,29,38,43}
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheet = new ServerStyleSheet();
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props =>
          sheet.collectStyles(materialSheets.collect(<App {...props} />))
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      )
    };
  } finally {
    sheet.seal();
  }
};
```

### 설명

- `ServerStyleSheet`를 이용하여 `materialSheets`라는 인스턴스를 생성합니다.
- `materialSheets`를 이용하여 지정한 컴포넌트(ex: `<App />`)의 스타일 요소를 검색하고 그 스타일을 `<style>`태그로 추출합니다.
- 추출한 결과물을 `Document`에 전달합니다.
- 이렇게 되면 서버에서 렌더링되고 소스 페이지에서도 스타일이 표시됩니다.

## `_app.tsx`

- ThemeProvider를 주입하고 theme를 사용하도록 세팅합니다.

```tsx
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from 'styled-components'
const theme = {
  primary: 'green',
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
```

## 글로벌 스타일 사용하기

- `styled-components`에서 글로벌 스타일을 사용하는 예시입니다

### styles/global-styles.ts

- 먼저 글로벌 스타일을 정의합니다.

```ts
// styles/global-styles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    letter-spacing: -1px;
    font-size: 15px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  .txt-c {
    text-align: center;
  }
  .txt-r {
    text-align: right;
  }
  .txt-l {
    text-align: left;
  }
  p {
    margin: 0;
  }
`;
```

### `_app.tsx`

- `_app.tsx`에 사용한 글로벌 스타일을 넣어줍니다.

```tsx {4,15}
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from "styles/global-styles";

const theme = {
  primary: 'green',
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
```

<TagLinks />

<Comment />
