---
title: Vue 에러 모음
meta:
  - name: description
    content: Vue 에러 모음
  - property: og:title
    content: Vue 에러 모음
  - property: og:description
    content: Vue 에러 모음
  - property: og:url
    content: https://kyounghwan01.github.io/blog/dev-report/error-report/Vue/
tags: ["vue"]
---

# 에러 해결 모음

## Property or method "" not defined

```
[Vue warn]: Property or method "" is not defined on the instance but referenced during render.
Make sure that this property is reactive, either in the data option,
or for class-based components, by initializing the property.
See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
```

- property, method를 정의하지 않고 사용하는 경우
- [정리](https://kyounghwan01.github.io/blog/Vue/vue/property-not-defined/)

## el-table에서 checkbox를 reactive하게 쓰기

- el-table에서 checkbox를 쓸때 checked, indeterminate를 실시간으로 변동하고 싶다면
  el-table 프로퍼티에 :key="`${isSelectedAll}${isIndeterminate}`" 를 꼭 넣어야한다.

## Object is possibly 'undefined'.Vetur(2532)

```tsx
//Object is possibly 'undefined'.Vetur(2532) 에러뜨는
this.$v.data[key.value].required

//this.$v에 빈것이 올경우 예외처리를 안해서 뜨는 현상
--- 해결

if (!this.$v || !this.$v.data) return;

//이후 required 가 없다고 에러가 뜬다
//Property 'required' does not exist on type 'boolean'.

//아래와 같이 아무 값이나 오게 허용하여 required 사용하도록 함
const dataCheck = this.$v.data[key.value] as any;
```

## module not found

- 해당 모듈을 읽지 못하는 경우 typescript가 모듈을 가져오지 못하는 것이므로
- tsconfig에서 include된 파일 중 `d.ts` 파일 내에 아래와 같이 선언한다.

  ```tsx
  //types/vue-global.d.ts
  declare module "lodash" {}
  ```

## 위와 같이 모듈을 가져와서 lodash내 omit, cloneDeep 같이 모듈내 함수를 사용할 때,

```tsx
//Property 'cloneDeep' does not exist on type 'lodash'.Vetur(2339)
//위 같은 에러는 interface에 해당 함수를 정의하지 않아 발생함

//types/vue-global.d.ts
declare module "lodash" {
  interface ILodash {
    cloneDeep(data?: object): object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: ILodash;

  // 3. 내보내기(CommonJS)
  export = _;
}

//위와 같이 모듈내 사용하는 함수 or 객체를 정의한다.
```

### 다른 예제

```tsx
import { Fragment } from "vue-fragment";
//위와 같이 정의하고 template에서 사용하려면 Fragement가 정의되지 않아 에러를 뿜는다.

//아래과 같이 vue-fragment를 정의해주면 된다.
//types/vue-global.d.ts
declare module "vue-fragment" {
  interface Fragment {
    Fragment: object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: Fragment;

  // 3. 내보내기(CommonJS)
  export = _;
}
```

## Type boolean trivially inferred from a boolean literal, remove type annotation.

- 원인 : 처음에 정의되는 값에 의해 어짜피 타입이 뭔지 아니까 굳이 타입을 정의하지 말라는 뜻

```ts
public loading: boolean = false;
// 어짜피 boolean인거 아니까 쓰지말라는 의미입니다.

// fix
public loading = false;
```
