---
title: npm - react 컴포넌트 npm에 배포하기
meta:
  - name: description
    content: npm - react 컴포넌트 npm에 배포하기
  - property: og:title
    content: npm - react 컴포넌트 npm에 배포하기
  - property: og:description
    content: npm - react 컴포넌트 npm에 배포하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm-react-component/
tags: ["npm", "react"]
---

# react 컴포넌트 npm에 배포하기

이번 글은 만든 react component를 다른 프로젝트에서 재활용하도록 npm에 등록하고 새로운 프로젝트에서 npm으로 다운 받고, 불러오는 과정입니다.

npm에 코드를 등록하는 방법은 [npm에 코드 배포하기](https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm/) 이곳에 있으니, 이 글을 먼저 보고 본 글을 읽기 바랍니다.

## 컴포넌트를 만들 프로젝트 생성

- npm에 배포할 프로젝트를 만들어줍니다.

```sh
create-react-app test-component
```

## 의존 모듈 설치

- 생성한 프로젝트에서 의존모듈을 설치해줍니다.

```sh
yarn add -D @babel/cli @babel/preset-react
```

## 배포할 컴포넌트 생성

- 배포용으로 간단한 text를 가진 컴포넌트를 생성합니다.

```js
// src/lib/TestComponent
import React from "react";

const TestComponent = () => {
  return <span>배포용 컴포넌트</span>;
};

export default TestComponent;
```

- 이후 `index.js`에 TestComponent를 불러옵니다.

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import TestComponent from "./lib/TestComponent";

ReactDOM.render(<TestComponent />, document.getElementById("root"));
```

## 배포 제외할 파일 수정

- `.gitignore`에서 배포 제외할 파일을 작성합니다.
- 기존 있는 파일에서 아래 내용만 추가 해주세요

```
...
src
demo
.babelrc
webpack.config.js
public
```

## package.json 파일 수정

- 배포 npm package 이름 확인
- 배포 후 install시 시작 root 파일 설정
- 배포 명령어 수정

```json
{
  "name": "@kyounghwan/test-component",
  "version": "0.0.1",
  // 배포시 시작 root 파일 꼭 형식을 맞춰주세요
  "module": "dist/TestComponent.js",
  "main": "dist/TestComponent.js",
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

### 1. 새로운 프로젝트 생성 및 npm 다운

```
create-react-app consumer
cd consumer
yarn add @kyounghwan/test-component
```

### 2. 받은 npm import

```js
// src/App.js
import React from "react";
import Test from "@kyounghwan/test-component";

const App = () => {
  return <Test />;
};

export default App;
```

- 위 방법으로 우리가 배포한 리엑트 컴포넌트를 어느 프로젝트에서나 쓰실 수 있습니다.

## 주의사항

1. 파일을 수정하고 재 배포하실때는 **무조건** `package.json`의 `version`값을 수정하셔야합니다. 수정하지 않으시면 다른 파일이라 인식하지 못하고 배포하지 않습니다.
2. `package.json`에 `main`, `module` 값은 **꼭** build 후 root 컴포넌트 파일위치로 작성해주셔야합니다. 다르게 작성하시면 배포후 다른 프로젝트에서 설치시 import가 정상적으로 되지 않습니다.

## 다음 글

현재는 1개의 컴포넌트만 만들고 있습니다. 하지만 대부분 1개의 패키지를 받으면 여러개의 컴포넌트가 있고 그것을 moment.js만 보더라도 `import {Test, Test2} from 'TestComponent` 이렇게 사용하죠. 그래서 다음 글에서는 여러 컴포넌트를 만들고 배포하는 방법에 대해 알아보겠습니다.

<TagLinks />

<Comment />
