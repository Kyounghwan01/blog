---
title: 글로벌 전역 변수 설정
meta:
  - name: description
    content: 글로벌 전역 변수 설정
  - property: og:title
    content: 글로벌 전역 변수 설정
  - property: og:description
    content: 글로벌 전역 변수 설정
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/global-type/
tags: ["TS"]
---

# 글로벌 전역 변수 설정

> vue + ts 프로젝트 환경설정에서 삽질한 제 1번, **글로벌 변수 설정**입니다.<br>
> js에서는 Vue.config.js 내부에 aliases를 설정하면 바로 vue.prototype을 통해 전역으로 aliases가 설정되었는데요.<br>
> 무슨 말인지 모르시면 [여기](https://kyounghwan01.github.io/blog/Vue/vue/dir/) 참조하세요<br>
> ts도 동일하게 될 줄 알았는데... 되지 않더군요. ㅜㅜ...<br>
> 그래서 삽질한 결과를 정리하려고 합니다.

**1. tconfig.json**

> `tconfig.json`에 내가 이 파일을 사용한다라고 명시해 줍니다.

- 글로벌로 담길 변수이니 `types/vue-global.d.ts`라고 하겠습니다. 아래처럼 추가해주세요

```json
"include": [
    ...
    "types/vue-global.d.ts",
  ],
```

**2. types/vue-global.d.ts**

> 저는 가장 많이 쓰이는 **api**를 아무곳에서나 전역으로 호출하는 작업을 하였습니다. 동일한 방식으로 **store**, **utills**도 작업하시면 되겠네요

```ts
import Vue from "vue";

//api파일들에 대해 interface를 정의하는 부분입니다.
interface test {
  promiseTest: Function;
}
interface apis {
  test: test;
}

//이곳이 가장 중요한 곳입니다.
declare module "vue/types/vue" {
  interface Vue {
    $api: apis;
  }
}
```

**3. main.ts**

> interface를 만들었으니 이제 `main.ts`에 등록해줍니다.

```ts
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import api from "../src/api";

//등록한 api 인터페이스 전역으로 등록
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  created() {
    console.log(this.$api);
  }
  render: h => h(App)
}).$mount("#app");

```

**4. 결론**

- 위 작업까지 완료하고 컴파일 하시면 콘솔에 api에 대한 정보가 나오게 됩니다.
- 동일하게 store, utils 등등 전역으로 많이 불릴 것들을 등록하시면 개발에 좀 더 속도가 붙을 것 같습니다.
- 안되시는 부분이 있으면 [vue ts 공식문서](https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins)를 참조해보세요.

<TagLinks />

<Comment />
