---
title: vue3 global 변수 다루기
meta:
  - name: description
    content: vue3 global 변수 다루기, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:title
    content: vue3 global 변수 다루기, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:description
    content: vue3 global 변수 다루기, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/global-state/
tags: ["vue"]
---

# vue3 global 변수 다루기

이번 포스팅에서는 vue3에서 전역 변수를 어떻게 다루는지 알아보겠습니다!

## 목표

1. vue2 global 변수 다루는 법과 vue3 global 변수 다루는 방법의 차이를 알아봅니다.

2. 간단한 변수부터 store에 접근하는 것까지 알아봅니다

3. composition api를 사용할 때, 옵션 api를 사용할 때로 분리해서 알아봅니다

## vue2에서 global 변수 다루기

vue2에서는 아래 코드와 같이 전역 변수를 핸들링하여 컴포넌트에서 api, store, util에 접근하였습니다.

```js {11-16}
// main.js
import Vue from "vue";
import _ from "lodash";
import store from "@store";
import axios from "@api/axios";
import api from "@api";
import utils from "@utils";
import filters from "@filters";
import router from "@router";

Vue.prototype._ = _;
Vue.prototype.moment = moment;
Vue.prototype.$api = api;
// this.$api... 형태로 모든 컴포넌트에서 사용 가능
Vue.prototype.$utils = { ...utils };
Vue.prototype.$filters = filters;
Vue.options.filters = filters;
Vue.router = router;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

## vue3에서 global 변수 다루기

vue3에서는 Vue에 변수를 다 모아 넣는 것을 금지 시켰기 때문에 따로 변수를 만들어 글로벌 변수를 선언합니다

`app.config.globalProperties`를 이용하여 전역 변수를 선언합니다.

```js {11,12}
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);

app.use(store);
app.mount("#app");

// store, foo를 글로벌 변수에 넣는 모습
app.config.globalProperties.$store = store;
app.config.globalProperties.foo = "bar";
```

## option api로 글로벌 변수 사용하기

vue2에서 컴포넌트 내에 글로벌 변수 사용하는 방법과 동일합니다

```vue {10}
<template>
  <div class="home"></div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  mounted() {
    console.log(this.foo); // bar
  }
});
</script>
```

## composition api로 글로벌 변수 사용하기

이 방법은 composition api 및 setup에서만 사용 가능합니다

`getCurrentInstance` 프로퍼티를 사용하여 접근합니다

`proxy` 변수는 글로벌 state를 가지고 있습니다

```vue {14}
<template>
  <div class="home">
    <button @click="testFunc">inc</button>
    {{ getterExample }}
  </div>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance, computed } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const { proxy } = getCurrentInstance();
    const testFunc = () => proxy.$store.commit("ModuleA/setCounter", 222);
    onMounted(() => {
      console.log(proxy.foo); // 'bar'
    });

    const getterExample = computed(
      () => proxy.$store.getters["ModuleA/getterExample"]
    );

    return { testFunc, getterExample };
  }
});
</script>
```

<TagLinks />

<Comment />
