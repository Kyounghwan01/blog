---
title: vue filter 사용법
meta:
  - name: description
    content: vue filter 사용법
  - property: og:title
    content: vue filter 사용법
  - property: og:description
    content: vue filter 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/filter/
tags: ["vue"]
---

# vue filter 사용법

안녕하세요! 텍스트를 바로 형식화하여 적용하는 필터에 대해서 알아보겠습니다.

- 표현법<br>
  표현법으로는 중괄호 보간법, v-bind표현법이 있는데 저희 회사는 중괄호 보간법을 사용합니다.

```vue
<template>
  <!--중괄호 보간법-->
  {{ price | comma }}

  <!--v-bind-->
  <div v-bind:id="price | comma"></div>
</template>
```

- 필터 등록<br>
  간단한 프로젝트에서 사용할 때는 해당 vue 파일에 정의해도 상관 없습니다.
  그러나 회사에서 사용하는 프로젝트의 경우 하나의 `filter.js` 파일을 만들고 전역 필터로 정의하여 어느 vue 파일에서나 불러오도록 사용합니다. 방법은 아래와 같습니다.

```js
//main.js
import filters from "../filters";
Vue.prototype.$filters = filters; // to use in script tag
Vue.options.filters = filters; // import filters

new Vue({
  // ...
});
```

위와 같이 `main.js`의 Vue prototype에 전역으로 filter를 넣고 모든 컴포넌트 내에서 사용합니다.

- 필터 체이닝

```vue
<template>
  {{ price | comma | dollar }}
</template>
```

위 경우 `price`인자를 `comma` 받아 실행하고 나온 값을 `dollar`가 받아 실행 후 리턴합니다.

- 필터 인자<br>
  필터는 기본적으로 js 함수이기에 두개이상의 인자를 받을 수 있습니다.

```vue
<template>
  {{ price | comma(arg1, arg2) }}
</template>
```

위 같은 경우 `comma` 함수는 첫번째 인자로 `price`를 두번째는 `arg1`, 세번째 인자는 `arg2`를 받습니다.

필터는 현업에서 많이 쓰이는 스킬이니 꼭 인지하시기 바랍니다!

<TagLinks />

<Comment />
