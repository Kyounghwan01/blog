---
title: next.js getInitialProps 사용법
meta:
  - name: description
    content: next.js getInitialProps 사용법, react
  - property: og:title
    content: next.js getInitialProps 사용법
  - property: og:description
    content: next.js getInitialProps 사용법, react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/getInitialProps/
tags: ["react", "next"]
---

# next.js getInitialProps 사용법

서버사이드 렌더링을 하는 nextJs에서 컴포넌트는 각 페이지마다 사전에 불러와야할 데이터가 있습니다.(이하 data fetching) react, vue같은 Client Side Rendering (CSR)의 경우는 `useEffect`, `created` 함수를 이용하여 data fetching을 합니다. 서버사이드에서 실행하는 next에서는 `getInitialProps`를 이용하여 data fetching 작업을 합니다.

next v9 이상에서는 `getInitialProps` 대신 `getStaticProps`, `getStaticPaths`, `getServerSideProps`을 사용하도록 가이드 합니다. 컨셉 자체는 서버에서 연산하여 클라이언트로 넘겨주는 것으로 동일하기에 이번에는 `getInitialProps`로 포스팅을 하고 추후에 3가지 메소드에 대해 포스팅 하겠습니다.

## getInitialProps 이점

1. 속도가 빨라집니다. 서버는 data fetching만, 브라우저는 렌더링만 함으로 연산을 브라우저와 서버가 각각 나누어 분담하게되어 그만큼 속도가 빨라집니다.
2. 함수형 컴포넌트로 next를 코딩할 경우, 렌더링 하는 함수와 data fetching을 하는 함수가 분리됨으로 개발자의 입장에서 로직 파악이 쉽습니다. (예시 코드를 보면서 자세히 설명하겠습니다.)

## 사용법

일단 data fetching을 하지 않음으로 오류를 나는 코드를 작성하겠습니다.

data fetching 할 mok 데이터 (src/posts.json)를 먼저 정의합니다.

```json
{
  "test": {
    "title": "test post",
    "content": "test content"
  },
  "second": {
    "title": "second post",
    "content": "second content"
  }
}
```

데이터를 보여줄 컴포넌트입니다.

혹시 동적 url(아래의 `[id].tsx`)에 대해 잘 모르신다면 [동적url](https://kyounghwan01.github.io/blog/React/next/basic/#%EB%8F%99%EC%A0%81-url) 이곳을 잠시 보고 와주세요 짧습니다!

```tsx
// src/pages/[id].tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import posts from "../posts.json";

const Posts = () => {
  const router = useRouter();
  const post = posts[router.query.id];

  return (
    <>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
    </>
  );
};

export default Posts;
```

위처럼 코드를 작성하고 `yarn run dev` 후에 `localhost:3000/test`로 접속합니다.

`[id].tsx`가 렌더링 될 때, `post` 값이 없기 때문에 title이 없다는 에러가 납니다.

CSR에서는 이럴때 `if (!post) return <p></p>;` 이러한 코드를 추가하여 data fetching이 되기를 기다립니다.

```tsx {9}
// src/pages/[id].tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import posts from "../posts.json";

const Posts = () => {
  const router = useRouter();
  const post = posts[router.query.id];
  if (!post) return <p></p>;

  return (
    <>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
    </>
  );
};

export default Posts;
```

하이라이트한 부분을 추가하면 에러가 나지 않습니다.

ssr에서는 getInitalProps를 이용하여 데이터를 미리 받아오고, 렌더링 할 당시에는 이미 값이 있기 때문에 렌더링이 되는 방식으로 사용합니다.

```tsx {16-22}
import { useEffect } from "react";
import { useRouter } from "next/router";
import posts from "../posts.json";

const Posts = (props: { post: { title: string; content: string } }) => {
  const router = useRouter();

  return (
    <>
      <h1>{props.post.title}</h1>
      <h1>{props.post.content}</h1>
    </>
  );
};

Posts.getInitialProps = context => {
  // context.query.id = 'test'
  return {
    post: posts[context.query.id]
  };
};

export default Posts;
```

위처럼 컴포넌트의 외부에 `getInitialProps` 함수를 선언만합니다. 실행은 렌더링 될때 알아서 실행됩니다.

`getInitialProps` 내부에는 context, component등 여러 객체가 있으며 그 중 query.id에 접근하여 우리의 url인 'test'를 받아오고, mok data에서 test 객체를 꺼내와 post에 담습니다.

post는 컴포넌트의 props에 담겨서 컴포넌트가 렌더링 될때 바로 사용 가능합니다.

## 주의사항

### 하나의 페이지에서는 하나의 getInitialProps만 실행됨

**이 이슈는 대단히 중요합니다.**
페이지가 렌더링 될때 next 내부에서 거치는 순서는 `_app` -> `page component`입니다. 즉, 예시 코드로 말씀드리면 `_app.tsx`가 실행되고 `[id].tsx`가 실행됩니다.

만약 `_app`에 `getInitialProps`를 정의했다면, 하위 컴포넌트에서는 `getInitialProps는`가 실행되지 않습니다.

하위 컴포넌트에서도 `getInitialProps` 값을 반영하려면 아래와 같이 `_app.tsx`에 코드를 추가합니다.

```tsx {8-19}
// src/_app.tsx
import "./globals.css";

function MyApp({ Component, pageProps }) {
  return <Component ponent {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps, posttt: { title: 11111, content: 3333 } };

  return { pageProps };
};

export default MyApp;
```

위 예시 코드처럼 모든 컴포넌트에서 추가할 값을 `_app.tsx`에서 추가하고, 각 개별 컴포넌트에서 사용할 값은 개별 컴포넌트에서 추가하면 됩니다.

### getInitialProps는 서버에서 실행됨

즉, 브라우저 api (setTimeout, window.xxx, document.xxx)는 이곳에서 실행하면 안됩니다.

## Context Object

- pathname - 현재 pathname (`/user?type=normal`-> `/user`)
- queyr - 현재 query를 객체로 (`http://localhost:3000/blog/test` -> `{id: 'test'}`, `/post?type=secret` -> `{type: 'secret'}`)
- asPath - 전체 path (`http://localhost:3000/blog/test` -> `/blog/[id]`, `/blog/test`)
- req - HTTP request object (server only)
- res - HTTP response object (server only)
- err - Error object if any error is encountered during the rendering

<TagLinks />

<Disqus />
