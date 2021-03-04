---
title: next.js styled-componsnts 스타일 적용 전에 렌더되는 에러 해결법
meta:
  - name: description
    content: next.js styled-componsnts 스타일 적용 전에 렌더되는 에러 해결법, react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:title
    content: next.js styled-componsnts 스타일 적용 전에 렌더되는 에러 해결법
  - property: og:description
    content: next.js styled-componsnts 스타일 적용 전에 렌더되는 에러 해결법, react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/styled-components-render-error/
tags: ["react", "next", "styled-components"]
---

# next.js styled-componsnts 스타일 적용 전에 렌더되는 에러 해결법

스타일드 컴포넌트를 사용하는데, css가 먹기전에 렌더링될때가 있습니다. 그 에러를 해결하는 포스팅입니다.

next, styled-components가 이미 세팅되었다고 가정합니다.

### babel-plugin-styled-components

babel-plugin-styled-components를 설치합니다.

```
yarn add -D babel-plugin-styled-components
```

### .babelrc 만들기

root 위치에 `.babelrc`를 만듭니다.

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```

### `_document.jsx` 만들기

pages 아래에 `_document.jsx`를 만들어줍니다.

```jsx
// pages/_document.jsx
import Document, { HTML, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <HTML>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </HTML>
    );
  }
}
```

<TagLinks />

<Comment />
