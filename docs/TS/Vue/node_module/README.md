---
title: vue + typescript 외부 모듈 넣기
meta:
  - name: description
    content: vue + typescript 외부 모듈 넣기
  - property: og:title
    content: vue + typescript 외부 모듈 넣기
  - property: og:description
    content: vue + typescript 외부 모듈 넣기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Vue/node_module/
tags: ["vue", "TS"]
---

# npm 모듈 typeScript 인식하기

- vue에 타입스크립트를 쓰다보면 평소와 같이 `yarn add lodash`를 하여 설치를 해주고

```ts
import * as _ from "lodash";
```

를 하면

```
lodash module not found
```

같은 에러를 보시게 될꺼에요.

에러명 그대로 typescript가 모듈을 인식하지 못해서 나오는 에러입니다.

해결법은 생각보다 간단합니다.

### 1. tsconfig.json

```json
"include": [
  ...,
  "local.d.ts"
]
```

첫번째는 위처럼 `tsconfig.json`의 include부분에 정의해줍니다.
tsconfig가 뭐하는 파일인지 모르면 [여기](https://kyounghwan01.github.io/blog/TS/Vue/decorator/)를 읽고 와주세요

### 2. local.d.ts

```ts
declare module "lodash" {}
```

이후 위처럼 설치한 모듈 이름을 정의해주면 됩니다.

- 여기서 하나 더 문제가 있습니다. 만약 `lodash`라이브러리를 사용한다면?

```js
import * as _ from "lodash";
```

아렇게 정의하고

```ts
const omitExam = _.omit(obj, "id");
```

이런 방식으로 사용하겠죠? 하지만 우리는 `lodash`만 정의했지 그 하위 메소드는 정의하지 않았기 때문에, omit을 찾을 수 없다는 에러를 보일 것입니다.

이 예제는 lodash뿐만이 아니라 다른 모든 라이브러리 예제에서도 사용할 수 있습니다.

**해결법**은 아까 사용한 `local.d.ts`에 정의하는 것입니다.

```ts
declare module "lodash" {
  interface ILodash {
    // 1. 사용할 메소드 정의
    camelCase(str?: string): string;
    omit(data?: object, arr?: any): object;
    cloneDeep<T>(val: T, customizer?: (value: any) => any, thisArg?: any): T;
    uniq(data?: string[]): string[];
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: ILodash;

  // 3. 내보내기(CommonJS)
  export = _;
}
```

제가 `lodash`에서 자주 쓰는 메소드를 정의 하였습니다.

다른 라이브러리도 마찬가지로, input 타입과 output타입을 타입스크립트 문법에 맞게 정의해주면 모든 컴포넌트에서 이상 없이 사용 가능합니다.

<TagLinks />

<Comment />
