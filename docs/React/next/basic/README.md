---
title: next.js 기본 개념 알아보기
meta:
  - name: description
    content: next.js 기본 개념 알아보기, react, next, seo, ssr
  - property: og:title
    content: next.js 기본 개념 알아보기
  - property: og:description
    content: next.js 기본 개념 알아보기, react, seo, ssr
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/basic/
tags: ["react", "next"]
---

# next.js 기본 개념 알아보기

nextjs는 React로 만드는 서버사이드 렌더링 프레인 워크입니다.
서버사이드 렌더링을 함으로 얻는 이득은 다음과 같습니다.

1. 클라이언트 렌더링의 경우 모든 js 파일을 로드하고 사용자는 웹을 보게됩니다. 이때까지 사용자는 많은 시간을 대기해야 합니다.
2. seo 문제 - 클라이언트 사이드의 경우 자바스크립트가 로드 되지 않은 경우 아무런 정보를 보이지 않습니다. 구글의 검색엔진의 경우 자바스크립트가 로드되지 않은 페이지를 검색엔진으로 스캔함으로 결론적으로 검색에 아무 페이지도 걸리지 않게 됩니다.

이 두가지를 해결하는 것이 서버렌더링입니다.

첫번째 문제는 서버에서 자바스크립트를 로딩함으로 클라이언트 측에서는 자바스크립트를 로딩하는 시간이 줄어들게 되고,

두번째 문제는 검색엔진이 자바스크립트를 읽는 것이 아닌 서버 측에서 자바스크립트, html, css를 만들어 컨텐츠를 직접 업로드 함으로 검색엔진에 게시글이 걸리게 됩니다.

또한 meta 태그를 자유롭게 추가함으로 seo를 용이하게 할수 있습니다.

## next.js가 제공하는 주요 기능

### hot reloading

개발 중 저장되는 코드는 자동으로 새로고침됩니다.

### automatic routing

pages 폴더에 있는 파일은 해당 파일 이름으로 라우팅됩니다. (pages/page1.tsx -> localhost:3000/page1)

public 폴더도 pages의 폴더와 동일하게 라우팅 할수있습니다. 그러나 모든 사람이 페이지에 접근할 수 있으므로 지양하도록합니다.

### single file components

`style jsx`를 사용함으로 컴포넌트 내부에 해당 컴포넌트만 스코프를 가지는 css를 만들수 있습니다.

- `<style jsx global>`를 사용하면 글로벌로 스타일 정의 가능합니다.

```tsx
// styled-jsx

function Heading(props) {
  const variable = "red";
  return (
    <div className="title">
      <h1>{props.heading}</h1>
      <style jsx>
        {`
          h1 {
            color: ${variable};
          }
        `}
      </style>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      // red
      <Heading heading="heading" />
      // block
      <h1>ttt</h1>
    </div>
  );
}
```

### 글로벌 스타일 정의 가능합니다.

`_app.tsx`에만 정의 가능합니다. 다른 컴포넌트에 정의한 경우 다른 클래스와 겹쳐 오류를 발생할 수 있음으로 `_app`에서만 허용합니다. 다른 컴포넌트에 정의시 아래와 같은 오류를 냅니다

```
Global CSS cannot be imported from files other than your Custom <App>. Please move all global CSS imports to pages/_app.tsx. Or convert the import to Component-Level CSS (CSS Modules).
```

```tsx
// _app.tsx
import "./globals.css";

function MyApp({ Component, pageProps }) {
  return <Component ponent {...pageProps} />;
}

export default MyApp;
```

### server landing

서버렌더링을 합니다. 클라이언트 렌더링과 다르게 서버렌더링을 한 페이지의 페이지 소스보기를 클릭하면 내부에 소스가 있습니다.

### code splitting

dynamic import를 이용하면 손쉽게 코드 스플리팅이 가능합니다.

코드 스플리팅은 내가 원하는 페이지에서 원하는 자바스크립트와 라이브러리를 렌더링 하는 것입니다. 모든 번들(chunk.js)이 하나로 묶이지 않고, 각각 나뉘어 좀 더 효율적으로 자바스크립트 로딩 시간을 개선할 수 있습니다.

### typescript

타입스크립트 활용을 위해 웹팩을 만지거나 바벨을 만질 필요 없습니다. 타입스크립트를 설치하고 (`yarn add typescript @types/node @types/react`) 명령어 (`yarn run dev`)만 하면 자동으로 tsconfig, next-end.d.ts가 생성되어 타입스크립트로 코딩이 가능해집니다.

## \_document.tsx

meta 태그를 정의하거나, 전체 페이지에 관려하는 컴포넌트입니다.

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          // 모든페이지에 아래 메타테크가 head에 들어감 // 루트파일이기에 가능한
          적은 코드만 넣어야함 전역 파일을 엉망으로 만들면 안된다 // 웹 타이틀,
          ga 같은것 넣음
          <meta property="custom" content="123123" />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}
```

- 이곳에서 console은 서버에서만 보이고 클라이언트에서는 안보입니다.
- render 요소는 반영하지만 페이지 구성 요소만 반영되고 js는 반영 하지 않기 때문에 console은 보이지 않습니다. 즉, componentDidMount 같은 훅도 실행 되지 않습니다. 정말 static한 상황에만 사용합니다.

## \_app.tsx

```tsx
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

- 이곳에서 렌더링 하는 값은 모든 페이지에 영향을 줍니다.
- 최초로 실행되는 것은 `_app.tsx`
- `_app.tsx`은 클라이언트에서 띄우길 바라는 전체 컴포넌트 → 공통 레이아웃임으로 최초 실행되며 내부에 컴포넌트들을 실행함
- 내부에 컴포넌트가 있다면 전부 실행하고 html의 body로 구성
- Component, pageProps를 받습니다.
  - 여기서 props로 받은 Component는 요청한 페이지입니다. GET `/` 요청을 보냈다면, Component 에는 `/pages/index.js` 파일이 props로 내려오게 됩니다.
  - pageProps는 페이지 getInitialProps를 통해 내려 받은 props들을 말합니다.
- 그 다음 `_document.tsx`가 실행됨
- 페이지를 업데이트 하기 전에 원하는 방식으로 페이지를 업데이트 하는 통로
- `_app.tsx`에서 console.log 실행시 client, server 둘다 콘솔 찍힙니다. (localhost:3000 웹과 터미널에서 둘다 콘솔 보임)

## import style component

```tsx
import styles from "./test.module.css";

function Heading(props) {
  // const variable = "red";
  return (
    <div className="title">
      <h1 className={styles.red}>{props.heading}</h1>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Heading heading="heading" />
      <h1>스타일</h1>
    </div>
  );
}
```

```css
// test.module.css

h1.red {
  color: blue;
}
```

## sass 사용하기

따로 config 파일을 정의 하지 않고이 css 파일을 scss로 바꾸고 `yarn add sass --dev` 를 해주면 next에서 알아서 설정을 해줍니다.

## Link 사용하기

보통 페이지간 이동은 a 태그를 사용하나 next에서는 사용하지 않습니다.

a 태그를 사용하면 처음 페이지에 진입시 번들 파일을 받고, a 태그에 의해 라우팅 되면 다시 번들 파일을 받기 때문입니다. 또한 redux을 쓰시는 경우 store의 state 값이 증발되는 현상도 일어납니다. 그렇기 때문에 a 태그는 전혀 다른 사이트로 페이지를 이동시켜 다시 돌아오지 않는 경우만 사용하고, 그 이외에는 모두 `Link` 태그를 사용합니다.

```tsx
import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
    // 동적 link시 [] 사용
    <Link href="/blog/[address]">
      <a>Blog</a>
    </Link>
  </div>
);
```

## 동적 url (dynamic route)

가변적으로 변하는 url에 대해 동적 url을 지원합니다.
`[]` 문법으로 동적 페이지를 생성하는 동적 url을 만들 수 있습니다.

```tsx
// pages/[id].tsx

import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  return (
    <>
      <h1>post</h1>
      <p>postid: {router.query.id}</p>
    </>
  );
};
```

위처럼 작성하면 `localhost:3000/123` 으로 접속시 postid 가 123으로 나옵니다.

`pages/[값].tsx` 왼쪽 페이지 구조의 값은 `router.query.값`과 동일합니다.

### Optional catch all routes

- dynamic route를 사용하고 싶지 않을 때가 있습니다. 이럴때는 dynamic page를 optional하게 주는 문법을 사용하면 가능합니다
- `[[...page]].tsx`와 같은 형식으로 파일을 만들면 됩니다. `[page].tsx`와 다른 점은 `router.query.page`의 값이 배열로 담기는 것입니다.
- 예를들어 `page/test/[[...page]].tsx` 가 경로일때, url을 `/test/1/2/3`으로 들어왔다면 `roueter.query.page`의 값은 `['1','2','3']`이렇게 들어오게 됩니다.
- `roueter.query.page`의 타입은 undefined, string, string[]으로 페이지 변경에 따라 보여줄 컴포넌트가 다르다면 이 세타입에 대한 조건을 모두 걸어줘야합니다.

## prefetching

백그라운드에서 페이지를 미리 가져옵니다. 기본값은 true. `<Link />`뷰포트에있는 모든 항목 (초기 또는 스크롤을 통해)이 미리 로드됩니다. 정적 생성을 사용하는 JSON페이지는 더 빠른 페이지 전환을 위해 데이터가 포함 된 파일을 미리 로드합니다.

이건 Link 컴포넌트를 사용해서 이뤄지는건데요. 링크 컴포넌트를 렌더링할때 `<Link prefetch href="...">` 형식으로 prefetch 값을 전달해주면 데이터를 먼저 불러온다음에 라우팅을 시작합니다.

프로덕션 레벨에서만 이루어집니다.

## next/router 사용법

`react`의 `react-router-dom`과 사용 방법은 거의 유사합니다.

link에 있는 preferch 기능도 사용 가능합니다.

```tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import posts from "../posts.json";

export default () => {
  const router = useRouter();

  const post = posts[router.query.id as string];
  if (!post) return <p>noting</p>;

  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
      <button onClick={() => router.push("test")}>go to Test</button>
    </>
  );
};
```

## getInitialProps()를 통해 컴포넌트에 데이터 보내기

- [정리](https://kyounghwan01.github.io/blog/React/next/getInitialProps/)

## server side lifeCycle

위 포스팅을 통해 `getInitialProps`를 파악 하였다면, lifeCycle이 이해할 수 있습니다.

1. nextJs 서버가 `GET` 요청을 받는다.
2. `GET` 요청에 맞는 `pages/Component`를 찾는다.
3. `_app.tsx`의 `getInitialProps`가 있다면 실행한다.
4. route에 맞는 페이지의 `Component`의 `getInitialProps`가 있다면 실행한다. `pageProps`들을 받아온다.
5. `_document.tsx`의 `getInitialProps`가 있다면 실행한다. `pageProps`들을 받아온다.
6. 모든 props들을 구성하고, `_app.tsx` -> `page Component` 순서로 렌더링
7. 모든 Content를 구성하고 `_document.tsx`를 실행하여 html 형태로 출력한다.

## custom 태그로 head 태그 옮기기

우리는 페이지의 header로 다음과 같은 정보를 추가할 수 있습니다.

1. 페이지 제목을 커스텀하고 싶을때
2. meta 태그를 변경하고 싶을때

`next/head`로 부터 Head 컴포넌트를 받아 모든 컴포넌트에서 사용할 수 있습니다.

```tsx
import Head from "next/head";

export default () => (
  <div>
    <Head>
      <title>새로 만들어진 타이틀 입니다</title>
    </Head>
    <div>...</div>
  </div>
);
```

next.js가 해당 컴포넌트가 mount 할때, Head내 태그들을 페이지의 HTML의 Head에 포함 시킵니다. 마찬가지로 unMount 할때, 해당 태그를 제거합니다.

## dynamic meta tag

- 위 예시처럼 정적으로 태그를 달때도 있지만 정적으로 들어가야할 태그가 바뀔 경우도 있습니다.
- [next.js meta tag 동적 content 할당하기](https://kyounghwan01.github.io/blog/React/next/dynamic-meta) 이 글에서 동적으로 meta 태그에 값을 할당하는 방법에 대해 알아볼 수 있습니다.

## dynamic component import

- dynamic component import는 react에서 lazy하게 component를 import 해오는 방식과 유사합니다.
- dynamic하게 처음 보여줘도 안되는 컴포넌트는 import 하지 않게 됨으로, 초기 화면 렌더링 속도를 상승시키기 위해 사용합니다.
- 주의점은 페이지에 진입할때 맨처음 보이는 컴포넌트라면 dynamic 메소드를 사용할 이유가 없습니다. (왜 그런지 모르겠다면 dynamic components를 사용하는 이유에 대해 다시 생각해보시기 바랍니다)
- 아래 예시로 next에서 사용하는 방법과 typescript에서 component에 props을 내려줄때 type 정의를 어떻게 하는지 알아봅니다.

```tsx
import React, { useState } from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic<{ nowTab: number }>(() =>
  import("./DynamicComponent")
);

const Index = () => {
  const [nowTab, setNowTab] = useState(0);

  return (
    <>
      {nowTab === 0 && <div>0 tab</div>}
      {nowTab === 1 && <DynamicComponent nowTab={nowTab} />}
    </>
  );
};
```

## production 배포

```
npm run build
npm run start
```

localhost:3000 으로 접속시 배포된 버전을 로컬로 확인 가능합니다.

## material-ui 사용하기

- [nextjs에서 material-ui 사용하기](https://kyounghwan01.github.io/blog/React/next/mui/)

<TagLinks />

<Comment />
