---
title: next.js 같은 page에서 window.history 쌓기
meta:
  - name: description
    content: next.js 같은 page에서 window.history 쌓기, next-router, react, seo, ssr, getStaticProps, getStaticPaths,
  - property: og:title
    content: next.js 같은 page에서 window.history 쌓기
  - property: og:description
    content: next.js 같은 page에서 window.history 쌓기, next-router, react, seo, ssr, getStaticProps, getStaticPaths, getServerSideProps
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/same-page-stack-history/
tags: ["react", "next"]
---

# next.js 같은 page에서 window.history 쌓기

## 개요

같은 page에서 다른 컴포넌트로 router 이동 시 history가 쌓이지 않기 때문에 뒤로가기 버튼을 누르면 이전 화면이 뜨지 않고 이전전 page 화면이 뜨게 됩니다.

( A (page) -> B (page) -> C (component)에서 뒤로가기 클릭시 B에서 C로 이동할때는 브라우저 history를 쌓지 않았기 때문에 A로 이동됨 )

위와 같은 상황에서 원하는 방법으로 뒤로가기 router를 만들려면 다른 page 컴포넌트를 만들어서 브라우저 history를 쌓아야만 하는데, 이럴 경우 너무 많은 page 컴포넌트를 생성해야한다는 단점이 있습니다.

( A (page) -> B (page) -> C (page) 이동시 history가 쌓이지만 B와 C는 연관되어 있는 흐름이라면 또 다른 page를 생성하는 것은 옳지 않은 방법이라고 생각함 )

그래서 이번 포스팅에서는 같은 page에서 컴포넌트 이동으로 브라우저 history를 쌓아, 사용자가 뒤로가기 버튼을 누르면 바로 이전전 페이지로 가지 않고, 이전 페이지로 가는 방법에 대해 알아보겠습니다!

( A (page) -> B (page) -> C (component) B에서 C로 이동할때도 history를 쌓도록 하는 방법! )

## 설계

먼저 알아야할 지식으로 `쿼리 스트링`입니다. 대부분 아실것이라 생각하고 넘어가겠습니다.

두번째는 **`쿼리 스트링`으로 컴포넌트를 이동하면 브라우저 history가 축적된다는 점입니다.** 이 특징을 이용하여 컴포넌트간 이동에서도 history를 쌓아보겠습니다!

바로 예시 코드로 살펴보겠습니다~!!

## 예시 코드

### page 컴포넌트

해당 페이지에 들어오면 먼저 router에 쿼리스트링으로 page가 있는지 찾습니다.

page가 없다면 바로 인트로 컴포넌트를 랜더링 합니다.

page가 있다면 해당하는 컴포넌트로 연결해줍니다.

```jsx {16,22}
// pages/history/index.jsx
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";

const components = [
  { page: "Intro", component: "IntroComponent" },
  { page: "One", component: "StepOneComponent" },
  { page: "Two", component: "StepTwoComponent" },
  { page: "Three", component: "StepThreeComponent" }
];

const Index = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. 쿼리스트링 값이 바뀌면 router 변경을 감지하여 아래 함수가 실행되고,
  const page = useMemo(() => {
    return router.query.page !== undefined ? router.query.page : "Intro";
  }, [router.query]);

  // 2. page가 바뀌면 아래 함수가 실행되어 새로운 state를 생성하여 컴포넌트가 리렌더링 됩니다.
  useEffect(() => {
    const routingIndex = components.findIndex(
      component => component.page === page
    );
    setCurrentIndex(routingIndex);
  }, [page]);

  return (
    <div>
      {currentIndex === 0 && <IntroComponent />}
      {currentIndex === 1 && <StepOneComponent />}
      {currentIndex === 2 && <StepTwoComponent />}
      {currentIndex === 3 && <StepThreeComponent />}
    </div>
  );
};
```

### 일반 컴포넌트

- router 이동으로 history를 쌓았기 때문에 다른 컴포넌트로 이동 후, 뒤로가기 클릭시 Intro 컴포넌트로 redirect됩니다.

```jsx {8-10}
// components/IntroComponent.jsx
import React from "react";
import { useRouter } from "next/router";

const IntroComponent = () => {
  const router = useRouter();

  // 쿼리 스트링을 이용하여 router 이동을 함으로 브라우저 history를 쌓습니다
  const goToRouter = name => router.push(`/history/?page=${name}`);

  return (
    <div>
      여기는 intro 페이지 입니다.
      <button onClick={() => goToRouter("One")}>StepOneComponent</button>
      <button onClick={() => goToRouter("Two")}>StepTwoComponent</button>
      <button onClick={() => goToRouter("Three")}>StepThreeComponent</button>
    </div>
  );
};
```

<TagLinks />

<Comment />
```
