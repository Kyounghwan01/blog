---
title: React.js - 절대경로 설정
meta:
  - name: description
    content: React.js - 절대경로 설정 리엑트 절대 경로 설정하기, react, redux, Absolute Imports, env
  - property: og:title
    content: React.js - 절대경로 설정
  - property: og:description
    content: React.js - 절대경로 설정 리엑트 절대 경로 설정하기, react, redux, Absolute Imports, env
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/absoulte-import/
tags: ["react"]
---

# React 절대경로 설정

## “Absolute Imports”가 무엇인가?

`./Foo, ../foo, ../../../foo-bar` 같이 상대 경로로 작성할 경우, 이 파일을 다른 경로로 옮길 경우 상대경로이기 때문에 path가 달라져서 import 오류가 필연적으로 납니다.<br>
최신 cra에 있는 `Absolute Imports`는 webpack이 import문을 읽는 방법을 바꿈으로 위와 같은 문제점을 해결했습니다.<br>
`import { Header } from 'components/Header'` `import { HeaderContainer } from 'containers/HeaderContainer'` 이런 구조로 사용합니다.

## 사용방법

### .env

- package.json과 같은 level

```
NODE_PATH=src
```

- `.env` 사용하면 아래와 같은 경고를 주니 다른 방법으로 합니다.
  > Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.

### tsconfig.json or jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

<TagLinks />
<Comment />
