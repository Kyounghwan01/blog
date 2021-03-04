---
title: vuex typescript 사용법
meta:
  - name: description
    content: vuex typescript 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, typescript
  - property: og:title
    content: vuex typescript 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, typescript
  - property: og:description
    content: vuex typescript 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, typescript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/vuex-ts/
tags: ["vue", "vuex", "TS"]
---

# vuex typescript 사용법

vue3에 호환되는 vuex 4버전에서 typescript를 어떻게 사용하는지 알아보겠습니다

대부분 store를 모듈화 하여 여러 스토어로 나누어 프로젝트를 진행하니, 단독 store는 제외하고 모듈화된 store로 만들고 App.vue에서 store 값을 사용하는 방법까지 알아보겠습니다!

이 포스팅에서는 ts화 시키는 방법에 대해 중점으로 다룹니다 vuex에 대해 사용 숙지가 안되신 분들은 [vue3에서 vuex 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/) 이 포스팅을 보고 오시면 됩니다

## 프로젝트 구조

| 프로젝트 구조           |
| :---------------------- |
| **/src**                |
| **ㅣㅡ store**          |
| **ㅣㅡ /modules**       |
| **ㅣㅡㅡ /ModuleA.vue** |
| **ㅣㅡㅡ /ModuleB.vue** |
| **ㅣㅡ /index.ts**      |
| **ㅣㅡ App.vue**        |
| **ㅣㅡ main.ts**        |

## main.ts

main.ts에 메인으로 사용할 App.vue로 createApp을 실행하고, store 사용함을 정의합니다

```ts
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

createApp(App)
  .use(store)
  .mount("#app");
```

## store/index.ts

분리된 module들을 한곳에 수렴시켜주는 store입니다

RootState를 만들어 스토어의 모듈간 state를 공유하도록 합니다

createStore 실행함으로 스토어를 만듭니다

```ts {5-8,10}
import { createStore } from "vuex";
import { moduleA, CounterState } from "@/store/modules/ModuleA";
import { moduleB, ModuleAState } from "@/store/modules/ModuleB";

export interface RootState {
  ModuleA: ModuleAState;
  ModuleB: ModuleBState;
}

export default createStore({
  modules: { moduleA, moduleB }
});
```

## store/moduleA.ts

store 로직이 들어갑니다 예시로 간단한 counter를 만듭니다

RootState를 import 하여 Module 제네릭에 넣어줍니다

ActionContext를 사용하여 action에 정의해도되지만 module화된 경우는 자동으로 타입 추론이 됩니다

아래 처럼 Module를 정의하면 state 타입추론이 잘됩니다

또한 RootState도 받아 다른 store의 state도 타입추론이 됩니다

namespaced가 정의되었기 때문에 다른 store에서 mutation, action에 접근한다면 `dispatch("ModuleA/incrementIfOddOnRootSum", null, { root: true });` 이렇게 다른 store에서 정의하면 됩니다

```ts {8}
import { Module, ActionContext } from "vuex";
import { RootState } from "../index";

export interface ModuleAState {
  count: number;
}

export const moduleA: Module<ModuleAState, RootState> = {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  getters: {
    doubleCount(state, getters, rootState) {
      // 다른 store state 추론 가능
      console.log(rootState.ModuleB.counter);
      return state.count * 2;
    }
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.Counter.counter) % 2 === 1) {
        commit("increment");
      }
    }
  }
};
```

## store/ModuleB.ts

ModuleA와 같은 방법으로 Module 제네릭을 정의합니다

## App.vue

정의한 store를 사용해봅시다

아래 코드가 이해가 안되시면 [vue3에서 vuex 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/) 이 포스팅을 보고 오시면 됩니다

```vue
<template>
  <div>
    <p>{{ moduleACount }}</p>
    <p>{{ doubleCount }}</p>
    <button @click="moduleAInc">module inc</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const moduleACount = computed(() => store.state.moduleA.count);
    const doubleCount = computed(() => store.getters["moduleA/doubleCount"]);

    const moduleAInc = () => store.commit("moduleA/increment");

    const moduleAction = () => store.dispatch("moduleA/incrementIfOddOnRootSum");

    return {
      moduleACount
      moduleAInc,
      doubleCount
    };
  }
};
</script>
```

<TagLinks />

<Comment />
