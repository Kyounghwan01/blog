---
title: 환경변수 설정
meta:
  - name: description
    content: react 환경변수 설정, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, env, react env undefined, react env not working, next
  - property: og:title
    content: react 환경변수 설정
  - property: og:description
    content: react 환경변수 설정, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, env, react env undefined, react env not working, next
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-env/
tags: ["react"]
---

# 환경변수 설정

보안에 치명적일 수 있는 데이터는 git에 올리지 않고 env라는 파일로 환경변수를 만들어 배포한 사이트에 변수를 설정하도록 합니다.

이 글에서는 local에서 작업할 때 react 내에서 env로 어떻게 환경변수로 접근하는지 알아보겠습니다!

아마 이 글을 보러 오신분들 대부분 `REACT_APP_XXX is undefined`이런 에러를 보았기 때문에 오셨을텐데요,

다른 포스팅에서는 `import dotenv from "dotenv` 이것을 하면 잘된다고 하는데 저의 경우 `Can't resolve 'fs' when bundle with webpack` 이런 에러가 뜨면서 더 진행이 안되었습니다. 그래서 아래와 같은 방법으로 해결하였습니다.

## 해결

간단하게 `dotenv-webpack`을 설치하고, `webpack.config.ts` 또는 `webpack.config.js`에 작은 설정만 추가하면 됩니다.

### dotenv-webpack 설치

```
yarn add dotenv-webpack
```

### webpack.config.js

```js
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new Dotenv()]
};
```

## 주의사항

- 기본적으로 react에서 `.env`를 사용할때 무조건 변수 앞에 `REACT_APP_`를 붙여야 합니다. 즉, 우리가 `APIKEY`이런 변수를 만들고 싶을때는 `REACT_APP_APIKEY` 이렇게 변수 설정을 해야한다는 뜻입니다.
- `.env` 변경시 프론트 서버를 껏다 켜야 적용됩니다.

## next에서 dotenv 사용하기

- next에서는 react와 다르게 설정을 해야합니다.`webpack.config.ts`가 아닌 `next.config.js`에 아래와 같이 추가합니다.
- typescript를 사용하더라도 `next.config.**js**`로 파일을 만드셔야 에러가 뜨지 않습니다.

```js
const Dotenv = require("dotenv-webpack");

module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  }
});
```

## nextjs에서 dotenv 사용시 주의사항

- nextjs는 env 사용시 `NEXT_PUBLIC_`를 붙여야 합니다. (react는 `REACT_APP_`)

<TagLinks />

<Comment />
