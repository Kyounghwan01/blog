---
title: vue 파일 전역으로 관리하기
meta:
  - name: description
    content: vue 파일 전역으로 관리하기, computed, watch
  - property: og:title
    content: vue 파일 전역으로 관리하기, computed, watch
  - property: og:description
    content: vue 파일 전역으로 관리하기, computed, watch
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/dir/
tags: ["vue"]
---

# 파일 전역으로 관리하기

대부분 모듈을 만들게 되면

```js
import ... from '../../...';
```

이런식으로 모듈을 읽어야 하죠. 그런데 이런 모듈의 depth가 깊고 많아지면 기억하기고, 손으로 일일히 적기도 매우 귀찮습니다.

그래서 오늘은 자주 쓰이는 모듈 (api, utils, shared component, style 등등) 을 전역으로 관리해서 바로 쓸 수 있도록 만들어 보겠습니다.

## 1. vue-cli를 통해 프로젝트를 만들어 줍니다.

```js
$ npm i -g @vue/cli
$ vue create <project-name>
//저는 기본 default 를 선택했습니다
cd <project-name>
yarn serve
//정상적으로 프로젝트 실행됨
```

## 2. src 밖에서 webpack 설정 파일을 작성합니다.

- Vue-cli 2에서는 `webpack.config.js` 라는 파일이 루트에 있었으나 3부터는 해당 파일이 없기 때문에 루트 디렉토리에 `vue.config.js` 라는 파일을 만들고 아래 코드를 넣어줍니다.
- src `밖` 에서 만들어야합니다.

```js
//vue.config.js
module.exports = {
  configureWebpack: {
    // Set up all the aliases.
    resolve: {
      alias: require("./aliases.config").webpack
    }
  }
};
//참고 : https://webpack.js.org/configuration/resolve/
```

## 3. src 밖에서 aliases에 대한 설정 파일을 작성합니다.

- 간단히 utils에 대한 단축키만 작성하겠습니다. (확장 가능하게 만들었습니다)

```js
const path = require("path");

const aliases = {
  "@": "src",
  "@utils": "src/utils"
  //'@api': 'src/api',
  //'@store': 'src/store', 확장 가능
};

module.exports = {
  webpack: {}
};

for (const alias in aliases) {
  //위 aliases 변수를 루프 돌면서 모두 적용
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
}

function resolveSrc(_path) {
  //path.resolve로 플랫폼 별 구분 기호를 구분 기호로 사용하여 지정된 모든 경로를 결합한 다음 결과 경로를 정규화합니다.
  return path.resolve(__dirname, _path);
}
```

- 이렇게 되면 src 내부에서 아래와 같이 alias에서 만든 단축어가 발동됩니다.

```js
import utils from "@utils";
```

이제 정말 하려 했던 전역에 utils가 호출되게 해봅시다.

## 4. src/main.js 에 다음과 같이 붙여 넣어 줍니다.

```js
//src/main.js
import Vue from "vue";
import App from "./App.vue";
import utils from "@utils";
//원하시는대로 확장하세요
//import api from "@api";
//import store from "@store";

//아래의 코드로 Vue전역에 this.$utils로 호출이 가능하게 됩니다.
Vue.prototype.$utils = utils;
//원하시는대로 확장하세요
//Vue.prototype.$api = api;
//Vue.prototype.$store = store;

new Vue({
  render: h => h(App)
}).$mount("#app");
```

## 5. srs/utils/index.js ( utils 디렉토리를 만들어 줍니다. )

- 아래 코드는 utils에서 만들어지는 모든 코드를 불러오는 역할을 합니다.
- 호출방법은 아래 기술합니다.

```js
//src/utils/index.js
const functions = {};

const requireFunction = require.context(
  ".", // 현재 폴더 검색
  false, // 하위 폴더 확인 안함
  /^((?!index).)*\.js$/ // index.js를 제외한 모든 js 파일
);

requireFunction.keys().forEach(filename => {
  const functionDefinition = requireFunction(filename);
  const functionPath = filename
    .replace(/^\.\//, "") // 시작부분 "./" 제거
    .replace(/\.\w+$/, ""); // 확장자 제거

  if (typeof functionDefinition.default === "function") {
    functions[functionPath] = functionDefinition.default;
  } else if (typeof functionDefinition.default === "object") {
    functions[functionPath] = { ...functionDefinition.default };
  }
});

export default { ...functions };
```

## 6. utils의 test 함수를 만듭니다.

```js
//src/utils/contextTest.js
export default () => {
  return "전역 함수 리턴 됬습니다";
};
```

## 7. 모든 세팅을 마쳤습니다. 이제 호출을 해봅시다

- 위의 contextTest의 값을 원래대로 가져오려면 `import contextTest from '../utils/contextTest.js'`로 호출해야 하지만 alias와 vue.prototype에 작업을 했기 때문에 전역에서 바로 호출이 가능하게 됩니다.

```vue
<template>
  <div class="hello">
    <!--'전역 함수 리턴 됬습니다'--!>
    <span>{{contextText}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed :{
    contextText : function(){
      //전역으로 호출되는 모습
      return this.$utils.contextTest()
    }
  },
}
</script>
```

## 8. 마무리

- 위 코드들을 따라 하시면 api, store 등등 여러 곳에서 자주 쓰이는 모듈들을 손쉽게 불러올 수 있습니다.
- 웹팩에 대해 좀 더 알아보는 시간이 되었던것 같습니다.

<TagLinks />

<Comment />
