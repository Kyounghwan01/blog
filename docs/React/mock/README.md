---
title: mock 데이터 손쉽게 구현하기
meta:
  - name: description
    content: mock 데이터 손쉽게 구현하기, front-end, api, mock data
  - property: og:title
    content: mock 데이터 손쉽게 구현하기, front-end, api, mock data
  - property: og:description
    content: mock 데이터 손쉽게 구현하기, front-end, api, mock data
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mock/
tags: ["react"]
---

## mock 데이터 쉽게 만들기

Front-end 개발자가 쉽게 겪게 되는 백엔드 개발 의존성을 해결하기 위해 Mocking을 적극적으로 활용하는 방법을 제시합니다!
`MSW.js` 를 이용하여 Mocking을 하고, 백엔드가 준비되지 않은 경우에도 Front-end 개발을 진행할 수 있습니다.

### msw 설치

```bash
yarn add msw --dev
npx msw init public --save
```

### msw mock api 만들기

```js
import { rest, setupWorker } from "msw";
const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    // error handling example
    const errorCode = req.url.searchParams.get("error_code");
    if (errorCode) {
      return res(ctx.status(errorCode));
    }
    return res(
      ctx.status(200), // rest api status code
      ctx.delay(1000), // api delay time
      ctx.json({
        items: [{ name: "product-1" }, { name: "product-2" }]
      })
    );
  })
];
export default handlers;
// setting msw
export const worker = setupWorker(...handlers);
```

### msw init setting

- 프로젝트의 가장 메인(react는 index.js vue는 main.js)에 디벨롭 환경일때만 사용한다고 정의합니다.

```js
// index.js
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./lib/api/mswApi");
  worker.start();
}
```

### msw 사용하기

- 사용하고자 하는 컴포넌트에서 아래와 같이 api 호출을 하면됩니다.

```js
const getMockData = async () => {
  const res = await fetch("/api/products");
  console.log(await res.json());
};
```

<TagLinks />

<Comment />
