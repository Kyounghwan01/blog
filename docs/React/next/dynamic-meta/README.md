---
title: next.js meta tag 동적 content 할당하기
meta:
  - name: description
    content: next.js meta tag 동적 content 할당하기, react, next, seo, ssr, dynamic meta content, getInitialProps, generateMetadata
  - property: og:title
    content: next.js meta tag 동적 content 할당하기
  - property: og:description
    content: next.js meta tag 동적 content 할당하기, react, seo, ssr, generateMetadata
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/dynamic-meta/
tags: ["react", "next"]
---

# next.js meta tag 동적 content 할당하기

## 확인해주세요!!!
- app-router를 사용하는 프로젝트에서는 getInitalProps를 사용할 수 없습니다. app-router를 사용하는 프로젝트는 추가사항을 확인해주세요!!!

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

## 추가사항

- nextjs 13버전 이후 수정된 사항입니다. 13버전부터는 app-router를 사용할 수 있습니다. 이럴때는 getInitialProps를 사용하지 못하게 됩니다. 이때 dynamic적으로 meta 데이터를 어떻게 fetch하는지 알아보겠습니다.

## generateMetadata

- generateMetadata라는 api를 사용하면 간단하게 meta 정보를 반영 가능합니다.

```ts
export async function generateMetadata({ params }: { params: { xxx } }): Promise<Metadata> {
  return { ... }
}
```

이런식으로 사용하게 되는데 params에 들어가는 값은 app-router를 사용할 때 사용하는 것과 동일하게 params가 들어갑니다.

예를 들면 디렉토리 구조가 `/posting/[id]/page.tsx`라고 한다면 `generateMetadata({ params }: { params: { id: string } })` 이런식으로 값이 들어가게 됩니다.

값을 받아와서 fetch도 가능합니다. 아래와 같이 사용합니다. 

`cache: 'no-store'`라는 옵션을 사용했는데, api에서 주는 값이 바뀌괴될때 저 옵션이 없으면 캐시가 먹어서 계속 예전값을 가져오게 됩니다. 만약 api로부터 오는 값이 계속 바뀔 가능성이 있다면 저 값을 쓰는것이 맞고, 그게 아니라 무조건 static하거나 지금 당장 변경되지 않아도 된다면 옵션을 쓰지 않으셔도됩니다.

```ts
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.page;

  const product = await fetch(`https://xxx.com?id=${id}`, {
    cache: 'no-store',
  });
  const resMetadata = await product.json();

  return { title: 123, description: 'xxx' }
}
```

위처럼 meta-seo값에 맞게 형식을 맞추셔서 return만 해주면 자동으로 html header에 정보가 등록됩니다!

<TagLinks />

<Comment />
