---
title: next.js getInitialProps 사용법
meta:
  - name: description
    content: next.js getInitialProps 사용법, react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
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

next v9 이상에서는 `getInitialProps` 대신 `getStaticProps`, `getStaticPaths`, `getServerSideProps`을 사용하도록 가이드 합니다.

### getStaticProps

```
Fetch data at build time, pre-render for Static Generation
getStaticPaths only runs at build time on server-side.
```

빌스시 고정되는 값, 빌드 이후 값 변경 불가

```jsx
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    }
  };
}

export default Blog;
```

docs 예제에서는 fetch를 통해 게시물을 가져오고 그 게시물의 title을 보여줍니다.

### getStaticPatch

- 빌드 타임 때, 정적으로 렌더링할 경로 설정
- 이곳에 정의하지 않은 하위 경로는 접근해도 페이지가 안뜸
  - 동적라우팅 : 라우팅 되는 경우의 수 따져서 하위로 넣음

`/pages/dyna/[dynamic].js`: /dyna/동적인값

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  return {
    //빌드 타임 때 아래 정의한  /dyna/1,  /dyna/2, ... /dyna/동적인값 경로만 pre렌더링.
    paths: [
      { params: { dynamic: 1 } },
      { params: { dynmic: 2 } }
      ......
      { params: { dynmic: 동적인값 } }
    ],
    // 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄 지 여부.
    fallback: true,
  }
}
```

### getServerSideProps

```
Fetch data on each request. pre-render for Server-side Rendering
```

```jsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async context => {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Page;
```

각 요청에 따라 서버로부터 데이터를 가져옵니다.

### 언제 쓰는가?

getServerSideProps는 데이터 요청시 인출해야 페이지를 미리 렌더링해야하는 경우에만. TTFB (Time to First byte)는 getStaticProps서버가 모든 요청에 ​​대해 결과를 계산해야하고 추가 구성 없이는 결과를 CDN에 의해 ​​캐시 할 수 없기 때문에 더 느립니다.

데이터를 미리 렌더링 할 필요가없는 경우 클라이언트 측에서 데이터를 가져 오는 것을 고려해야합니다.

### 클라이언트 측에서 데이터 가져오기

페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 미리 렌더링 할 필요가없는 경우 클라이언트 측에서 데이터를 가져올 수 있습니다. 이에 대한 예는 사용자 별 데이터입니다. 작동 방식은 다음과 같습니다.

- 먼저 데이터가 없는 페이지를 즉시 표시합니다. 페이지의 일부는 정적 생성을 사용하여 미리 렌더링 할 수 있습니다. 누락 된 데이터에 대한로드 상태를 표시 할 수 있습니다.
- 그런 다음 클라이언트 측에서 데이터를 가져와 준비가 되면 표시합니다.

예를 들어 이 접근 방식은 사용자 대시 보드 페이지에 적합합니다. 대시 보드는 비공개 사용자 별 페이지이기 때문에 SEO는 관련이 없으며 페이지를 미리 렌더링 할 필요가 없습니다. 데이터는 자주 업데이트되므로 요청 시간 데이터 가져 오기가 필요합니다.

### SWR

next에서 만든 SWR을 사용하여 client side에서 데이터 패치를 합니다.

```js
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

seo 필요한 페이지면 `getServerSideProps`를 쓰고 비공개 페이지일 경우는 클라이언트 측에서 가져온다 (getServerSideProps를 남발하면 서버가 모든 요청을 계산하고, 값 캐쉬가 힘들기에 비효율적입니다)

현재 구현한 코드가 `getInitialProps`임으로 `getInitialProps`로 포스팅을 이어 가겠습니다.

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

## shallow route와 getInitialProps과 관계

아래 글들은 `getServerSideProps`, `getStaticProps`, `getInitialProps` 모두 동일하게 적용됩니다.

shallow routing은 `getInitialProps`를 이용하여 데이터를 가지오지 않고도 url을 변경 할 수 있습니다.

즉, 불필요한 서버 연산을 최소화 할 수 있고, 필요한 상태 값은 아래 예시코드 처럼 router 객체에 넣어서 전달합니다.

```js
router.push(
  {
    pathname: "/cars?model=bmw",
    query: { ...values, page: 1 }
  },
  undefined,
  { shallow: true }
);
```

위의 예제로 보면 원래는 `/cars` 페이지에 있다가 어떤 이벤트를 통해 `"/cars?model=bmw"`로 바뀌었습니다.

페이지는 교체되지 않고, url만 바뀌는 경우 입니다. url이 변경되는 것은 `componentDidUpdate`, `useEffect`를 통해 감지 할수 있습니다.

```js
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // verify props have changed to avoid an infinite loop
  if (query.counter !== prevProps.router.query.counter) {
    // fetch data based on the new query
  }
}
```

### 주의사항

shallow routing은 동일 **페이지**의 url의 변경에서만 작동합니다. 즉, 다른 페이지로 이동시 새 페이지가 로드하고, `getInitialProps`는 실행됩니다. 예시로 보자면 현재 url은 `/cars`입니다.

```js
router.push(
  {
    pathname: "/users",
    query: { ...values, page: 1 }
  },
  undefined,
  { shallow: true }
);
```

위처럼 `/users`로 url이 바뀌면 페이지가 바뀌었기 때문에 새로운 페이지가 로드되고 `getInitialProps`가 실행됨으로 data fetching을 하게됩니다. 즉, shallow routing이 의미가 없는 것이죠.

같은 페이지에서 url이 바뀌는데 `getInitialProps`가 실행됨으로 굳이 같은 data fetching을 할 필요가 없을 때, shallow routing을 사용하면됩니다.

<TagLinks />

<Comment />
