---
title: next.js meta tag 동적 content 할당하기
meta:
  - name: description
    content: next.js meta tag 동적 content 할당하기, react, next, seo, ssr, dynamic meta content, getInitialProps
  - property: og:title
    content: next.js meta tag 동적 content 할당하기
  - property: og:description
    content: next.js meta tag 동적 content 할당하기, react, seo, ssr
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/dynamic-meta/
tags: ["react", "next"]
---

# next.js meta tag 동적 content 할당하기

nextjs에서는 `Head`를 이용하여 seo에 필요한 `meta` 태그에 접근할 수 있습니다.

그런데 이 `meta` 태그에 들어가는 content는 꼭 static한 상태여야만 html의 head에 들어갑니다

이 말은 동적인 상태에서는 html head에 들어가지 않는 다는 소리입니다.

그래서 이번 포스팅은 동적으로 값을 api이든 prop이든 받아서 dynamic하게 meta에 content에 할당하는 방법에 대해 알아보겠습니다.

## getInitalProps를 이용하여 값 받아오기

간단하게 getInitalProps를 이용하여 돔이 구성되기 전에 값을 가져오면 됩니다.

언제나처럼 바로 예시로 알아보겠습니다~

```jsx {7-9,15-17}
import React from "react";
import Head from "next/head";

export default function Test({ title }) {
  return (
    <>
      <Head>
        <meta property="og:title" content={title ? title : "default title"} />
      </Head>
      <div>dynamic meta test</div>
    </>
  );
}

Test.getInitialProps = () => {
  return { title: "seo title" };
};
```

## 주의사항

개발환경에서 위 작업이 가능한 이유는 로컬에서 next가 서버 역할을 해주기 때문에 가능합니다

만약 이 작업이 운영(production)에 올라가려면 `next build`를 거쳐야하는데 운영에 next가 걸쳐있는 서버가 있지 않다면 `build` 실패가 뜰 것입니다. 그렇기 때문에 **웹용 next 서버를 먼저 띄우시는 것이 선행작업**이라고 말씀드릴 수 있습니다.

서버가 없다면 `getInitialProps`를 사용 못하게 되고 위 예시의 `title`이라는 값이 html이 만들어질 때 어디에도 존재하지 않기 때문에 content에는 `defailt title`이 들어갑니다.

<TagLinks />

<Comment />
