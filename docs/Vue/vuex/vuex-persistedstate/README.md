---
title: vuex 새로고침시 상태 초기화 방지
meta:
  - name: description
    content: vuex 새로고침시 상태 초기화 방지
  - property: og:title
    content: vuex 새로고침시 상태 초기화 방지
  - property: og:description
    content: vuex 새로고침시 상태 초기화 방지
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vux/vuex-persistedstate/
tags: ["vue", "vuex"]
---

# vuex 새로고침시 상태 초기화 방지

## 서론 & 이슈

vue를 쓰시면 vuex를 거의 대부분 쓰실 것입니다.

그런데 이 vuex가 한가지 문제가 있습니다.

어떠한 화면에서 vuex의 store값을 의존해서 사용하고 있다 가정하고, 새로고침을 하면 store값에 의존하는 데이터가 사라지게 된다는 것이죠

```vue
<template>
  <div class="hello">
    <!--'아래의 값은 store에서 불러오는 값입니다. 정상적인 방법으로 웹이 진행되면 getters에 의해 값을 가져오겠지만, 새로고침시 store가 초기화 면서 init 값이 보여지게 됩니다.'--!>
    <span>contextText</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed :{
    contextText : function(){
      return this.$store.getters['test'];
    }
  },
}
</script>
```

vuex의 값이 새로고침시 초기화 되는 이슈가 많아지면서 누군가 npm을 만들어 놓은 것이 있었고 저도 회사에서 무리 없이 사용하게 되었습니다.

## 본론 & vuex-persistedstate

`vuex-persistedstate` 라는 npm 이고 vuex에 저장되는 값들을 사용하는 웹브라우저의 localstorage에 저장하며, 새로고침시 그 값이 있다면 localstorage의 값을 가져와 사용한다는 원리입니다.

```js
//설치
npm install vuex-persistedstate
//혹시 node-pre-gyp error설치가 안되시는 분이 있다면 아래를 설치해주세요. 설치 잘되시는 분은 넘어가셔도 됩니다.
npm install --dev node-pre-gyp

```

이후 여러분이 만드신 `store`의 `index.js` 파일로 들어갑니다

```js
//src/store/index.js

import Vue from vue;
import Vuex from vuex'
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [
    createPersistedState();
  ]
})
```

위 처럼 정의한 store에 플러그인만 넣어주면 끝입니다.

여기에는 하나의 문제가 있습니다.

모든 store값들이 다 localstorage에 저장된다는 것이지요.

가벼운 웹의 경우는 속도가 상관 없겠지만, 저의 경우 실제 회사에서 사용하는 경우였고, 그에 따라 store에 저장하는 값이 상당히 많았습니다. 이는 곧 브라우저 속도에 직결되어 많은 고객들에게 컴플레인이 들어왔습니다.

## vuex-persistedstate 일부만 저장

해결법으로 위 `vuex-persistedstate` 는 원하는 store 값만 저장하도록 하는 option이 있습니다.

예를 들어 `moduelName`라는 store 가 있다고 가정합니다.

```js
//src/store/moduleName.js
const state = {
  id: 1
};

const getters = {
  get_id: state => state.id
};

const mutations = {
  UPDATE_ID(state, ids) {
    state.id = ids;
  }
};

const actions = {
  update_id({ commit, state }, data) {
    commit("UPDATE_ID", data);
  }
};

export default {
  strict: process.env.NODE_ENV !== "production",
  state: {
    ...state
  },
  getters,
  mutations,
  actions
};
```

잠깐 vuex에 대한 개념은 짚고가자면 (vuex아시면 넘어가셔도 됩니다.)

- State : 해당 파일에서 관리하는 상태값 입니다. state를 변경하기 위해서는 mutations 내부의 변수를 commit으로 실행시켜야 합니다.

- Getters : 컴포넌트에서 store의 값을 가져올 때 어떠한 계산 식 이후 가져오려할 때 사용합니다. Computed 사이클에서 사용합니다

  ```js
  computed : {
  	test() {
      return this.$store.getters['lecture'];
    }
  }
  ```

- Mutations: state를 변경하기 위해 실행되는 것으로 비동기를 해야할 경우 (async await을 사용하며, db의 접근이 필요할 경우 많이 쓰임 ) action에서 실행하며, 그렇지 않을 경우 컴포넌트 내부 method에서 `commit('변수')` 를 통해 실행 가능 합니다.

- action: state를 바꾸기 위해 사용되며 컴포넌트의 method에서 실행합니다.

  - `this.$store.dispatch('action함수명', {..data})` 방식으로 실행합니다.

state와 state 조작 함수를 정의 하였으니, store 객체에 만든 작업을 넣어줍니다

```js
//src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import moduleName from './moduleName';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: moduleName,
  plugins: [
    //주목! : 여기에 쓴 모듈만 저장됩니다.
    createPersistedState({
      paths: ['moduleName'],
    });
  ]
})

export default store;
```

이곳에서는 moduleName 같이 store에 저장할 값들을 읽어 modules라는 곳에 추가합니다.
index.js에서는 `const store`로 정의한 파일을 객체화 하여 외부로 보냅니다.

그리고 가장 중요한 일부 모듈의 state만 localstorage에 저장하는 부분입니다.
path라는 옵션을 통해 배열안에 넣는 store만 localstorage에 저장됩니다.

## 결론

여기까지가 제가 `vuex-persistedstate`를 활용 해본 방법이고,

`vuex-persistedstate` 에서는 `js-cookie, secure-ls`를 이용하여 localstorage말고, cookie에 저장하는 방식과 암호화된 방식으로 데이터를 저장하는 방법을 알려주고 있으니 관심이 있으시면 npm에 들러보시면 될 것 같습니다.

<TagLinks />

<Comment />
