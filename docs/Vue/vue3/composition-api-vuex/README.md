---
title: vue3에서 vuex 사용법
meta:
  - name: description
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module
  - property: og:title
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module
  - property: og:description
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/
tags: ["vue", "vuex"]
---

# vuex (작성중)

### package 설치

```
yarn install vuex
```

### main.js에 store 세팅

```js {3,6}
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

createApp(App)
  .use(store)
  .mount("#app");
```

### store 정의

```js
// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    counter: 10
  },
  getters: {
    time2(state) {
      return state.counter * 2;
    }
  },
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    }
  }
});
```

### 컴포넌트에서 store 값 사용

useStore 훅을 사용하여 store에 접근합니다.

```vue
<template>
  <div>
    <h1>This is an about page</h1>
    {{ counter }}
    {{ times2 }}
    <button @click="inc">inc</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const counter = computed(() => store.state.counter);
    const test = computed(() => store.getters);
    const inc = () => store.commit("setCounter", counter.value + 1);

    return { counter, inc, test };
  }
};
</script>
```

## store module로 분리

## namespace로 store 관리

## 전역 namespace 등록
