---
title: vue 이벤트 수식어
meta:
  - name: description
    content: vue 이벤트 수식어, computed, watch
  - property: og:title
    content: vue 이벤트 수식어, computed, watch
  - property: og:description
    content: vue 이벤트 수식어, computed, watch
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/event-handler/
tags: ["vue"]
---

# 이벤트 수식어

아래와 같은 코드에서 `div`를 클릭 할 경우 이벤트 버블링에 의해 div3을 누르면 div3 -> div2 -> div1 순으로 호출되며, 함수 역시 func3 -> func2 -> func1 순으로 호출된다.

많은 경우에 div3을 누르면 func3만 실행되게 하고 싶은 상황이 있다.

아래 코드로 vue에서 제공하는 이벤트 수식어를 알아 보자.

```vue
<template>
  <div class="div1" @click="func1" style="background-color: red">
    div1
    <div class="div2" @click="func2" style="background-color: blue">
      div2
      <div class="div3" @click="func3" style="background-colir: green">
        div3
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    func1() {
      alert("div1");
    },
    func2() {
      alert("div2");
    },
    func3() {
      alert("div3");
    }
  }
};
</script>
```

## .stop

```vue
<template>
  <div class="div1" @click="func1" style="background-color: red">
    div1
    <div class="div2" @click.stop="func2" style="background-color: blue">
      div2
      <div class="div3" @click="func3" style="background-colir: green">
        div3
      </div>
    </div>
  </div>
</template>
```

**stop**은 **클릭 이벤트 전파가 중단**됩니다.<br><br>
위의 예제로 보면 div3를 클릭한 경우 func3가 작동하고, 이벤트 버블링에 따라 func2가 작동합니다.<br>
이후 stop의 영향을 받아 func1는 작동하지 않습니다.<br>
div2를 누르면 func2가 작동되고 이후 stop에 의해 func1는 작동되지 않습니다.

## .prevent

```html
<form @submit.prevent="onSubmit"></form>
```

**prevent**는 해당 태그의 기능을 막습니다.
form은 메세지를 전달 후, 새로고침을 합니다. 그러나 `prevent`가 있으면 메세지를 전달 하고, 새로고침은 막습니다. 다른 페이지로 이동하는 a의 경우 `prevent`가 걸려있다면 페이지 이동하지 않습니다.

## .capture

```html
<div
  class="div1"
  @click.capture="func1"
  style="background: red; padding: 10px;"
>
  div1
  <div class="div2" @click="func2" style="background: green; padding: 10px;">
    div2
    <div class="div3" @click="func3" style="background: blue; padding: 10px;">
      div3
    </div>
  </div>
</div>
```

**capture**는 우선순위 무시하고 가장 먼저 발동합니다.
div3를 클릭할 경우 원래대로라면 func3가 먼저 발동되어야 하지만, `capture`가 있는 경우 func1이 가장 먼저 발동 됩니다.
만약 복수개의 `capture`가 있다면, 원래 이벤트 우선순위에 따라 함수가 발동됩니다.
즉, func1, func2에 `capture`가 있고, div3를 클릭한다면 **func2 -> func1 -> func3** 순으로 함수가 발동됩니다.

## .self

```html
<div class="div1" @click="func1" style="background: red; padding: 10px;">
  div1
  <div
    class="div2"
    @click.self="func2"
    style="background: green; padding: 10px;"
  >
    div2
    <div class="div3" @click="func3" style="background: blue; padding: 10px;">
      div3
    </div>
  </div>
</div>
```

## 체이닝

- 위 알아본 이벤트들은 모두 체이닝이 가능합니다.<br>
  `v-on:click.prevent.self` : 모든 클릭 막기
  `v-on:click.self.prevent` : 해당 엘리먼트 클릭 방지
  `v-on:click.stop.prevent` : 해당 엘리먼트 클릭 막고 이후 전파 방지

**self**는 무조건 자기 자신을 클릭해야만 click 함수가 발동됩니다.
위의 예제로 볼때, div3을 클릭하면 func3가 발동되고, 원래대로면 func2가 발동되야하지만, `self` 처리되어 발동되지 않고 func1가 발동됩니다.<br>
만약 div2를 클릭하면 `self`에 의해 func2가 발동되고 버블링에 의해 func1가 발동됩니다.

<TagLinks />

<Comment />
