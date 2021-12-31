---
title: Portal 사용법 (nextjs, cra)
meta:
  - name: description
    content: Portal 사용법 (next와 cra), react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:title
    content: Portal 사용법 (next와 cra)
  - property: og:description
    content: Portal 사용법 (next와 cra), react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/use-portal/
tags: ["react", "next"]
---

# Portal 사용법 (nextjs, cra)

nextjs와 react (cra)에서 portal을 어떻게 사용 하는지 알아보겠습니다.

## cra에서 portal 사용하기

- 먼저 react에서 portal을 어떻게 사용하는지 알아보겠습니다.

### 프로젝트 생성

- 아래 커멘드로 프로젝트를 생성합니다.

```
npx create-react-app react-portal
```

### portal 주입

- `src/index.jsx`에 portal을 넣습니다. (`public/index.html`에 넣으셔도 됩니다.)

#### src/index.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div id="portal" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <--- 여기가 포탈 --->
    <div id="myportal"></div>
  </body>
</html>
```

### createPortal로 포탈 열기

- `Portal.tsx`

```js
import ReactDOM from "react-dom";

const Portal = ({ children, selector }) => {
  const element =
    typeof window !== "undefined" && document.querySelector(selector);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
```

### portal 사용하기

```jsx
<Portal selector="#portal">
  <Component {...props} />
</Portal>
```

## next에서 portal 사용하기

### 프로젝트 생성

```
npx create-next-app react-portal
```

### portal 주입

- next는 html 파일이 없으므로 react 처럼 index.html에 div를 주입할 수 없습니다.
- next에서는 `_document.js`파일에 div를 주입합니다.

```js
import React from "react";
import Document, { Html, Head, Main } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <div id="portal" />
          <Main />
        </body>
      </Html>
    );
  }
}
```

### portal 사용하기

- 이후 createPortal이나 portal을 사용하는 방법은 react와 동일합니다

## 마무리

- 포탈을 사용하면 앱 내부에 자식으로 dom을 추가하는게 아닌 아예 다른 지역에 dom을 추가하기 때문에 디버깅도 편하고 무엇보다 모달같이 현재 창과 관련이 없는 새로운 창을 띄우는데 최적 기능이니 꼭 사용하시기를 추천드립니다.

<TagLinks />

<Comment />
