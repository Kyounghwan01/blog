---
title: vue v-model 개념
meta:
  - name: description
    content: vue v-model 개념
  - property: og:title
    content: vue v-model 개념
  - property: og:description
    content: vue v-model 개념
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/v-model/
tags: ["vue"]
---

# v-model 개념

- v-model은 template에서 각 엘리먼트가 사용하는 data 값입니다.
- v-model은 부모 - 자식 관계가 없는 컴포넌트에서는 아래와 같이 자유롭게 사용됩니다.

```vue
<template>
  <checkbox v-model="checkBox">체크</checkbox>
</template>
<script>
export default {
  data() {
    return {
      checkBox: false
    };
  }
};
</script>
```

#### 그러나 부모 - 자식 간 관계가 있는 컴포넌트에서 자식 컴포넌트가 부모 컴포넌트의 값을 가져와 위와 같이 v-model로 사용한다면 아래와 같은 에러가 뜹니다.

`vue.runtime.esm.js:1888 Error: [vuex] do not mutate vuex store state outside mutation handlers.`

그렇기 때문에 자식컴포넌트가 부모의 값을 핸들링하려면 `v-model`이 아닌 `:value`와 `@input`을 사용해야 합니다

아래 예시를 통해 직접 구현해 봅시다

```vue
// 부모 컴포넌트
<template>
  <Textarea v-model="text" />
</template>
<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>
```

부모에서 자식으로 text라는 값을 내려줍니다. 자식은 text 값을 value라는 값으로 받고 input함수를 통해 바꿉니다.

```vue
// 자식 컴포넌트
<template>
  <textarea :value="value" @input="$emit('input', $event.target.value)" />
</template>
<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>
```

위 예시를 보면 이러한 결론이 나옵니다.

#### v-model = :value + @input

<TagLinks />

<Comment />
