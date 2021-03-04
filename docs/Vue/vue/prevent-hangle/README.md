---
title: Vue - 가장 쉽고 빠르게 Input 한글 입력 막기
meta:
  - name: description
    content: Vue - 가장 쉽고 빠르게 Input 한글 입력 막기
  - property: og:title
    content: Vue - 가장 쉽고 빠르게 Input 한글 입력 막기
  - property: og:description
    content: Vue - 가장 쉽고 빠르게 Input 한글 입력 막기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/prevent-hangle/
tags: ["vue"]
---

# Input 한글 입력 막기

- input 태그의 :value를 핸들링하여 쉽게 한글 입력을 막아봅시다
- 대부분의 경우 Input의 경우 공통 컴포넌트로 받아 여러곳에서 사용하니 이번 예제도 단순히 input 만으로 끝나는게 아닌 부모, 자식 관계로 보여 드리겠습니다.

```vue
<!-- 부모 -->
<template>
  <Input
    validType="password"
    ref="current_password"
    label="사용중인 비밀번호"
    type="password"
    placeholder="사용중인 비밀번호를 입력해주세요"
    v-model="current_password"
  />
</template>

<script>
export default {
  data() {
    return {
      current_password: ""
    };
  }
};
</script>
```

```vue
<!-- Input.vue -->
<template>
  <input
    :id="id"
    :ref="id"
    :type="type"
    :placeholder="placeholder"
    :value="formatInput(value)"
  />
</template>

<script>
export default {
  props: ["id", "label", "type", "placeholder", "value", "validType"],
  methods: {
    formatInput(text) {
      // text에 부모 input에 넣는 값이 들어옵니다.
      if (this.validType === "password") {
        // 한글 테스트 정규식
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (!notPhoneticSymbolExp.test(text)) {
          return text;
        } else {
          // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
          text = text.slice(0, -1);
          let condition = notPhoneticSymbolExp.test(text);
          while (condition) {
            text = text.slice(0, -1);
            condition = notPhoneticSymbolExp.test(text);
          }
          return text;
        }
      } else return text;
    }
  }
};
</script>
```

<TagLinks />

<Comment />
