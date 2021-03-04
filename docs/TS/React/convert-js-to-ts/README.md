---
title: How to Migrate a React App to TypeScript
meta:
  - name: description
    content: How to Migrate a React App to TypeScript
  - property: og:title
    content: How to Migrate a React App to TypeScript
  - property: og:description
    content: How to Migrate a React App to TypeScript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/React/convert-js-to-ts/
tags: ["react", "TS"]
---

# How to Migrate a React App to TypeScript

자바스크립트를 이용하여 만든 React 프로젝트를 타입스크립트로 변환하기 위한 과정입니다.

## TypeScript 추가

기존 프로젝트에 TypeScript를 추가합니다.

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest

```

또는

```
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

`package.json`에 위 패키지들이 설치되었다면 다음 과정으로 이어갑니다.

## tsconfig.json 추가

`tsconfig.json`은 타입스크립트로 만들어진 프로젝트에 대한 환경 설정입니다.
아래 커멘드로 기본적인 `tsconfig.json`를 만듭니다.

```
npx tsc --init
```

성공적으로 `tsconfig.json`이 루트 디렉토리에 만들어졌다면 다음 과정을 이어갑니다.

## package.json에 @types/xxx 추가

만약 프로젝트에 `react-router-dom`이 있다면 타입스크립트에서 이 패키지를 실행하기 위해서는 `@types/react-router-dom`를 설치하여야합니다. 동일하게 만약 `moment`를 사용하고 있었다면 `@types/moment`를 설치하여야합니다. 이렇게 자신의 프로젝트에 있는 모든 패키지에 `@types/xxx`을 설치합니다.

`@types/xxx`이 없는 패키지가 있을 수 있습니다. 그럴때는 [링크](https://kyounghwan01.github.io/blog/TS/Vue/node_module/)를 참조하시면 해결할 수 있습니다.

## jsx to tsx

이제 파일 하나씩 jsx 또는 js를 tsx로 바꾸는 작업을 합니다.

`npx tsc --init`에 의해 프로젝트에 자바스크립트와 타입스크립트가 공존할 수 있도록 미리 세팅을 하여 (`"allowJs": true`), 하나씩 바꾸면서 기존 프로젝트를 유지할 수 있습니다.

jsx에서 tsx로 바꿨는데 아무 에러가 뜨지 않는 경우 코드 에디터를 종료하고 다시 실행하면 에러가 뜨는 것을 볼 수 있습니다.

이후로는 타입스크립트를 쓰지 않으신분들은 (저를 포함..) 삽질의 연속이 기다리고 있습니다.
제가 변환과정에서 겪는 에러와 해결과정을 모두 작성할 예정입니다. 방문해주셔서 다른 방법이 있다면 코멘트 남겨주시면 감사하겠습니다.

<TagLinks />

<Comment />
