---
title: Cannot find module '' or its corresponding type declarations.ts(2307)
meta:
  - name: description
    content: Cannot find module '' or its corresponding type declarations.ts(2307) 해결법
  - property: og:title
    content: Cannot find module '' or its corresponding type declarations.ts(2307)
  - property: og:description
    content: Cannot find module '' or its corresponding type declarations.ts(2307)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/React/dependency-install/
tags: ["react", "TS"]
---

# Cannot find module '' or its corresponding type declarations.ts(2307)

`typescript`에서 `axios` 또는 `chart.js`와 같은 라이브러리를 사용할 때, dependencies에 설치해도 위와 같은 에러가 나오는 경우가 있습니다.

원인은 typescript가 라이브러리의 타입을 읽을 때, `index.d.ts`를 찾습니다.

이 파일은 라이브러리마다 있는 곳도 있고, 없는 곳도 있습니다.

`axios`의 경우 `node_module` 내부에 `index.d.ts`가 미리 정의되어 따로 개발자가 처리하지 않아도 자동으로 ts에서 타입추론이 됩니다.

그러나 위와 같은 에러가 뜰 경우는 개발자가 추가로 처리해줘야할 작업이 있습니다.

## @types/xxx 설치

`node_module` 내부에 `index.d.ts`를 정의하지 않은 라이브러리는 `@types/xxx`에서 따로 정의한 경우가 있습니다.

만약 `chart.js`를 install 했다고 가정합니다. 아래 처럼 import를 하면 타입을 읽을 수 없다는 에러가 뜹니다.

```ts
import * as Chart from "chart.js";

// Could not find a declaration file for module 'chart.js'. '/Users/kyounghwan/Desktop/source/learn-typescript/project/node_modules/chart.js/dist/Chart.js' implicitly has an 'any' type.
// Try `npm i --save-dev @types/chart.js` if it exists or add a new declaration (.d.ts) file containing `declare module 'chart.js';
```

에러가 하라는 대로 `npm i --save-dev @types/chart.js`를 설치해주면 완료됩니다!

## @types/xxx 가 없을때

진짜 문제는 이제 시작입니다. `npm i --save-dev @types/임의라이브러리`를 했는데 해당 라이브러리가 없을 때가 분명 있습니다.

그러면 개발자가 임의로 타입을 만들어줘야합니다.

### 외부라이브러리 type 만들기

#### 폴더 만들기

root 레벨에 `types` 폴더를 만들고 그 내부에 `임의라이브러리`이름으로 폴더를 만듭니다. 임의라이브러리 이름은 `chart.js`로 가정할께요.

그 이후 `index.d.ts`를 만듭니다. 아래와 같은 구조로 만드시면 됩니다.

| 폴더/파일명            |
| :--------------------- |
| **/types**             |
| **ㅣㅡ /chart.js**     |
| **ㅣㅡㅡ /index.d.ts** |

#### index.d.ts

```ts
declare module "chart.js" {
  // interface MyChart {}
  // 이곳에 method, property interface를 명명합니다.
}
```

#### tsconfig.json

interface를 declare했다면 이제 이 파일을 ts가 읽으라고 path를 알려줘야합니다.

그런 작업은 `tsconfig.json`에서 작업합니다. 아래와 같이 `tsconfig.json`에 작성합니다.

```ts
{
  "compilerOptions": {
    // ...

    // 우리가 작성한 types 폴더를 타입체크하라고 알려줍니다.
    "typeRoots": ["./node_modules/@types", "types"]
  },
  // ...
}
```

위처럼 작업하시면 어떤 라이브러리도 모두 import 할 수 있을 것입니다!

<TagLinks />

<Comment />
