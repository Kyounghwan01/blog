---
title: vue3에서 vuex 사용법
meta:
  - name: description
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module, composition-api
  - property: og:title
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module, composition-api
  - property: og:description
    content: vue3에서 vuex 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable, module, composition-api
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/
tags: ["vue", "vuex"]
---

# vue3에서 vuex 사용법

composition api와 함께 vuex 사용하는 방법에 대해 알아보겠습니다~

composition api를 사용하면 글로벌 변수 사용가능한데 왜 vuex를 사용하나요? 라는 분은 [composition api는 vuex를 대체할 수 있는가](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vs-vuex/) 이 포스팅을 보고 오시면 좋을 것 같습니다

vuex 세팅하는 법과 vuex를 module화 하는 방법까지 알아보도록 하겠습니다

## vuex 세팅 및 store module 1개로 실행

### package 설치

vuex 설치

```
yarn install vuex
```

### main.js에 store 세팅

```js
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

## store 여러 module로 분리

위 예시는 하나의 store에 모든 state를 몰아 넣을 때 사용법이고, 이번에는 store에 module을 분리하여 사용하는 방법에 대해 알아보겠습니다.

이번 예시에서는 Counter 모듈과 moduleA 2가지 모듈을 만들어보겠습니다.

### store/modules/Counter.js

```js
// store/modules/Counter.js
export const Counter = {
  state: () => ({ counter: 10 }),
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    }
  },
  actions: {
    test() {
      console.log(4);
    }
  },
  getters: {
    time2(state) {
      return state.counter * 2;
    }
  }
};
```

### store/modules/moduleA.js

```js
export const moduleA = {
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
      return state.count * 2;
    }
  },
  actions: {
    incrementIfOddOnRootSum(state, commit, rootState) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit("increment");
      }
    }
  }
};
```

### store/index.js

이곳에서 분리한 store 모듈을 합쳐줍니다

```js
import { createStore } from "vuex";
import { Counter } from "@/store/modules/Counter";
import { moduleA } from "@/store/modules/moduleA";

export default createStore({
  modules: { Counter, moduleA }
});
```

### component

컴포넌트에서 사용할때의 예시입니다.

state는 `state.moduleName.stateName`으로 부릅니다

getter와 mutation, action은 moduleName으로 쪼개서 들어가지 않고 전역 값으로 들어갑니다.

그래서 위에 코딩한대로 컴포넌트에서 getter와 action 값을 실행하려면 아래와 같이 값을 부릅니다.

```js {7-8,10-13}
import { computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // state는 moduleName으로 쪼개서 들어간다.
    const counter = computed(() => store.state.Counter.counter);

    // getters와 mutation은 전역으로 들어가서 store.getters.Counter.time2가 아니라 store.getters.time2이다
    const test = computed(() => store.getters.time2);
    const doubleGetters = computed(() => store.getters.doubleCount);
    const inc = () => store.commit("setCounter", counter.value + 1);

    return { inc, test };
  }
};
```

getters와 mutation, action이 전역으로 핸들링되면 중복되는 값(다른 store, 같은 mutation 이름)을 사용시 우리가 원하는대로 함수를 실행할 수 없습니다.

또한 위처럼 전역으로 함수 이름이 설정되면 이 함수가 어떤 store에서 오는 것인지 헷갈리게 됩니다.

그래서 저는 store를 모듈화 할 때, `namespaced`를 꼭 사용합니다.

## namespace로 store 관리

module의 이름을 getters, mutation, action 앞에 넣어주는 기능입니다. 이렇게 함으로 다른 store, 같은 함수 이름을 사용해도 vuex가 헷갈리지 않게 제 기능을 사용합니다. 코드를 읽는 개발자도 해당 함수가 어떤 store에서 오는 것인지 직관적으로 알 수 있습니다.

사용방법은 매우 간단합니다. `namespaced: true` 만 넣어주면 됩니다.

### store/modules/moduleA.js

```js {2}
export const moduleA = {
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
      return state.count * 2;
    }
  },
  actions: {
    incrementIfOddOnRootSum(state, commit, rootState) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit("increment");
      }
    }
  }
};
```

위처럼 namespaced를 넣어주면 사용하는 컴포넌트에서는 getters, mutation, action을 부르는 방법이 조금 달라집니다. 하지만 훨씬 알아보기 쉽습니다.

**state**는 기존대로 `state.moduleName.stateName`으로 부릅니다.

**getters**는 `computed(() => store.getters["moduleName/getterName"])`으로 부릅니다.

**mutation**은 `store.commit("moduleName/mutationName", params)`으로 부릅니다.

**action**은 `store.dispatch("moduleName/actionName", params)`으로 부릅니다.
`

### component

```js
import { computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // state는 namespaced 유무와 상관 없이 moduleName으로 쪼개서 들어간다.
    const counter = computed(() => store.state.moduleA.counter);

    // namespaced 사용함으로 아래와 같이 [storeName/함수 이름]으로 부릅니다.
    const doubleCount = computed(() => store.getters["moduleA/doubleCount"]);
    const inc = () => store.commit("setCounter", counter.value + 1);

    return { inc, test };
  }
};
```

## 전역 action, mutation 실행

다른 module의 action, mutation을 실행하고 싶을 때가 있습니다.

컴포넌트에서 dispatch를 할때 `root: true`를 넣으면 전역으로 검색하여 같은 이름의 action, mutation을 찾습니다.

### 전역 사용 action 정의

`globalAction` action 이름를 찾아서 실행한다

```js {4-6}
export const moduleA = {
  namespaced: true,
  actions: {
    other({ dispatch }) {
      dispatch("globalAction", null, { root: true });
    }
  }
};
```

### 타겟 store

```js {9-13}
export const Counter = {
  state: () => ({ counter: 10 }),
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    }
  },
  actions: {
    globalAction: {
      handler({ commit }) {
        commit("setCounter", 199);
      }
    }
  }
};
```

### component

```js {8-9}
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const counter = computed(() => store.state.Counter.counter);
    // other action은 root: true에 의해 globalAction를 root부터 찾고 타겟 store의 globalAction action을 찾아 실행한다.
    const globalFunc = () => store.dispatch("moduleA/other");

    return { globalFunc, counter };
  }
};
```

<TagLinks />

<Comment />
