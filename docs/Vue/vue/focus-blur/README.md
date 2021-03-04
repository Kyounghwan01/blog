---
title: vue @focus, @blur 예제
meta:
  - name: description
    content: vue @focus, @blur 예제
  - property: og:title
    content: vue @focus, @blur 예제
  - property: og:description
    content: vue @focus, @blur 예제
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/focus-blur/
tags: ["vue"]
---

# @focus, @blur 예제

## @focus

- 사용자가 해당 태그에 포커싱(클릭) 했을 때 실행
- `@focus= **`로 실행

## @blur

- 사용자가 해당 태그에 포커싱(클릭) 잃었을 때 실행
- `@blur= **`로 실행

## 종합 예제

- 아래 예제는 PhoneNumberInput이라는 곳에 사용자가 `focus`하면 focusOnMobile값이 true로 바뀌면서 툴팁 content가 보이고, `blur`할 경우 focusOnMobile값이 false로 바뀌면서 툴팁 content가 안보이는 예제입니다

```vue
<template>
  <el-tooltip
    v-model="focusOnMobile"
    manual
    effect="light"
    content="회원 앱과 연결되는 중요한 정보입니다. 신중히 입력해주세요."
    placement="top"
  />

  <PhoneNumberInput
    v-model="data.mobile"
    placeholder="휴대폰 번호"
    :type="showMobileInput ? 'text' : 'password'"
    :readonly="!showMobileInput"
    @focus="focusOnMobile = true"
    @blur="focusOnMobile = false"
  />
</template>
<script>
date() {
	return {
		focusOnMobile: false
		//focus되면 툴팁이 보이고, blur되면 툴팁이 안보인다
	}
}
</script>
```

<TagLinks />

<Comment />
