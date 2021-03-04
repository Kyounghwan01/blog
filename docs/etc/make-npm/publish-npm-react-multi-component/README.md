---
title: npm - 여러 컴포넌트 npm에 배포하기
meta:
  - name: description
    content: npm - 여러 react 컴포넌트 npm에 배포하기
  - property: og:title
    content: npm - 여러 react 컴포넌트 npm에 배포하기
  - property: og:description
    content: npm - 여러 react 컴포넌트 npm에 배포하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm-react-multi-component/
tags: ["npm", "react"]
---

# 여러 컴포넌트 npm에 배포하기

이전 글에 이어서 이번에는 여러 컴포넌트를 배포하는 글입니다.
이전 글 [react 컴포넌트 배포하기](https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm-react-component/)을 먼저 보고 와주시기 바랍니다.

- 이전 포스팅에서 사용한 프로젝트를 이어서 사용하겠습니다.

## 컴포넌트 생성

- 배포용 컴포넌트를 2개 생성합니다.

```js
// src/lib/TestComponent
import React from "react";

const TestComponent = () => {
  return <span>배포용 컴포넌트</span>;
};

export default TestComponent;
```

```js
// src/lib/Test2Component
import React from "react";

const Test2Component = () => {
  return <span>배포용 두번째 컴포넌트</span>;
};

export default Test2Component;
```

- 이후 `index.js`에 두개의 컴포넌트를 불러옵니다. 컴포넌트가 여러개라면 여러개 모두 불러옵니다.

```js
// src/lib/index.js
export { default as TestComponent } from "./TestComponent";
export { default as Test2Component } from "./Test2Component";
```

## package.json 파일 수정

```json
{
  "name": "@kyounghwan/test-component",
  // 이전 포스팅과 이곳이 다릅니다
  "version": "0.0.2",
  // 이전 포스팅과 이곳이 다릅니다
  "module": "dist/index.js",
  "main": "dist/index.js",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "publish:npm": "rm -rf dist && mkdir dist && babel src/lib -d dist --copy-files"
  },
  "babel": {
    "presets": ["@babel/preset-react"]
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/cli": "^7.10.5",
    "@babel/preset-react": "^7.10.4"
  }
}
```

## 배포할 컴포넌트 빌드

```
yarn publish:npm
```

- `package.json`에 이미 빌드 명령어를 만들었습니다.
- 프로젝트 루트 위치에서 `publish:npm` 명령어를 쓰고, `dist`파일이 만들어 졌는지 확인합니다.

## 프로젝트 배포

```
npm publish
```

- 에러가 나면 [이전 포스팅](https://kyounghwan01.github.io/blog/기타/make-npm/publish-npm/)을 꼭 보고 다시 시도해주세요

## 프로젝트 배포 확인

### npm 다운

이전 포스팅에서 생성한 `consumer` 프로젝트로 들어간 후, 새로 배포한 버전을 다운 받습니다.

```
yarn add @kyounghwan/test-component
```

### 2. 받은 npm import

```js
// src/App.js
import React from "react";
import { TestComponent, Test2Component } from "@kyounghwan/test-component";

const App = () => {
  return (
    <>
      <TestComponent />
      <Test2Component />
    </>
  );
};

export default App;
```

- 위 방법으로 우리가 배포한 리엑트 컴포넌트를 어느 프로젝트에서나 쓰실 수 있습니다.

## 배포한 npm 삭제

### 현재 배포한 버전만 삭제

```sh
npm unpublish 패키지이름@버전이름
```

### 패키지 전체 삭제

```sh
npm unpublish 패키지이름 -f
```

- 만약 올리신 npm 모듈을 누군가가 import 하여 사용중 일때는 삭제 불가합니다.
- npmjs.com에서 본인의 패키지에 `Dependents`가 0일 경우만 삭제가능.

## 주의사항

1. 파일을 수정하고 재 배포하실때는 **무조건** `package.json`의 `version`값을 수정하셔야합니다. 수정하지 않으시면 다른 파일이라 인식하지 못하고 배포하지 않습니다.
2. `package.json`에 `main`, `module` 값은 **꼭** build 후 root 컴포넌트 파일위치로 작성해주셔야합니다. 다르게 작성하시면 배포후 다른 프로젝트에서 설치시 import가 정상적으로 되지 않습니다.

<TagLinks />

<Comment />
