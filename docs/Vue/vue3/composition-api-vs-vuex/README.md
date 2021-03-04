---
title: composition api는 vuex를 대체할 수 있는가
meta:
  - name: description
    content: vue3 composition api vs vuex, vue, computed, reactive, ref, watch, watchEffect, props, vuex
  - property: og:title
    content: vue3 composition api vs vuex, vue, computed, reactive, ref, watch, watchEffect, props, vuex
  - property: og:description
    content: vue3 composition api vs vuex, vue, computed, reactive, ref, watch, watchEffect, props, vuex
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vs-vuex/
tags: ["vue", "vuex"]
---

# composition api는 vuex를 대체할 수 있는가

vuex의 탄생 이유는 전역으로 상태를 관리하고, prop drilling 하는 것을 방지하여 데이터의 흐름을 명확히 하기 위함이였습니다.

그러나 우리는 composition api를 사용함으로 인해 global 함수 및 변수를 사용 가능하게 되었습니다. 그래서 vuex를 대체 가능한 것이 아닌가? 라는 의문을 가지게 됩니다.

아래 예시로 composition api 기능이 어떻게 vuex의 전역 기능을 대체 가능한 것인지 알아보겠습니다.

먼저 글로벌 변수를 만듭니다.

### src/global.js

```js
import { reactive, readonly } from "vue";

const state = reactive({
  count: 0
});

const increment = () => state.count++;

export default { state: readonly(state), increment };
```

### src/main.js (global 변수 provider inject 주입)

```js
import { createApp } from "vue";
import global from "@/global";

const app = createApp({
  provide: {
    global
  }
});
```

위처럼 글로벌로 injection 해주면 모든 컴포넌트에서 inject 명령어로 global에 접근 가능합니다.

### inject 하여 컴포넌트에서 global 접근 예시

`src/components/Test.vue`

```vue
<template>
  <div>
    {{ global.state.count }}
    <button @click="global.increment">증가</button>
  </div>
</template>
<script>
export default {
  inject: ["global"]
};
</script>
```

위 코드로 보기에는 composition api가 vux를 대체하는 것으로 보입니다

### 그럼에도 vuex를 사용해야하는 이유

#### 디버깅

vuex를 이용하여 데이터를 변경하면 vue Devtools에 의하여 데이터가 어떤 함수와 컴포넌트에 의해 변경되는지 추적이 가능합니다. 디버깅을 용이하게 한다는 것만으로도 충분히 사용할 가치가 있습니다 (만약 composition api가 devtools에서 디버깅 지원한다면 말이 달라지겠죠)

#### 플러그인

vuex의 또다른 장점은 많은 플러그인이 지원된다는 것입니다. ([vuex 플러그인 리스트](https://vuejsdevelopers.com/2017/09/11/vue-js-vuex-plugins/))

가장 대표적인 것이 `vuex-persisted`(이 플러그인에 대해 알고 싶으면 [vuex 새로고침시 상태 초기화 방지](https://kyounghwan01.github.io/blog/Vue/vuex/vuex-persistedstate/) 이 포스팅을 참조 해주세요)

### 결론

소규모 프로젝트에서는 composition api를 사용하여 전역으로 상태관리를 하여도 상관이 없지만 프로젝트가 커짐에 따라 디버깅 및 다른 플러그인 추가가 필수불가결인 상황에 닥치게 됩니다.

그렇기에 composition api가 위 2가지 이유를 개선하지 않는 이상은 계속 vuex를 사용하게 될 것같습니다.

<TagLinks />

<Comment />
