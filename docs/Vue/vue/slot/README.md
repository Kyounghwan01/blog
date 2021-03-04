---
title: vue slot 사용법
meta:
  - name: description
    content: vue slot 사용법
  - property: og:title
    content: vue slot 사용법
  - property: og:description
    content: vue slot 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/slot/
tags: ["vue"]
---

# vue slot 사용법

slot은 부모 컴포넌트에서 자식 컴포넌트의 엘리먼트를 지정할때 사용합니다.<br>
부모에 따라서 자식의 컴포넌트에 영향을 받을 테니, 컴포넌트 재사용성면에서 좋은 장점을 가집니다.<br>
또한 범위 있는 slot을 통해 컴포넌트 내에서도 잘게 쪼개서 재사용이 가능합니다.<br>
예제를 통해서 어떻게 사용되는지 살펴보고 각자의 상황에 맞게 가져가시길 바랍니다.

## 기본

```vue
<template>
  <!--부모 컴포넌트-->
  <ChildComponent>
    <button>버튼</button>
  </ChildComponent>
</template>
```

- 자식: ChildComponent

```vue
<template>
  <div>
    <!--부모에서 정의한 '버튼'이 위치합니다 -->
    <slot></slot>
  </div>
</template>
```

## 이름 있는 슬롯

```vue
<template>
  <!--부모 컴포넌트-->
  <ChildComponent>
    <button slot="left">왼쪽 버튼</button>
    <button slot="right">오른쪽 버튼</button>
  </ChildComponent>
</template>
```

- 자식: ChildComponent

```vue
<template>
  <div>
    <!--부모에서 정의한 '왼쪽 버튼'이 위치합니다 -->
    <slot name="left"></slot>

    <!--부모에서 정의한 '오른쪽 버튼'이 위치합니다 -->
    <slot name="right"></slot>
  </div>
</template>
```

## 자식 데이터 부모에서 사용하는 slot-scope (함수, 변수 모두 사용)

- 자식

```vue
<template>
  <div>
    <header>
      <slot name="child" :childData="childData" :close="close">
        <button>버튼</button>
      </slot>
    </header>
    <div>
      <slot name="body">
        <p>기본 바디</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  data() {
    return {
      childData: "child",
      active: false
    };
  },
  methods: {
    close() {
      this.active = false;
    }
  }
};
</script>
```

- 부모

```vue
<template>
  <div>
    <BaseModal>
      <!--자식에서 사용하던 name="child"로 감싸진 태그의 함수, 변수 모두 가져옵니다.-->
      <template slot="child" slot-scope="slotProps">
        <button @click="slotProps.close">닫기</button>
        <!-- { childData: 'child' } -->
        {{ slotProps }}
      </template>
      <p slot="body">바디입니다.</p>
    </BaseModal>
  </div>
</template>
```

## v-slot

- 간단하게 named-slot + slot-scope입니다
- 다른점은 slot을 v-slot을 사용할 때, 무조건 template 태그로 감싸고 그 컴포넌트 안에서 v-slot를 사용해야 합니다.

위 예제에서 v-slot으로 변형하면 아래와 같습니다.

```vue
<template>
  <div>
    <BaseModal>
      <template v-slot:child="slotProps">
        <button @click="slotProps.close">닫기</button>
        <!-- { hello: 'hello' } -->
        {{ slotProps }}
      </template>
      <template v-slot:body>
        <p>바디입니다.</p>
      </template>
    </BaseModal>
  </div>
</template>
```

:::warning 주의!
`slot`, `slot-scope`는 이후 업데이트 될 Vue 3에서는 공식적으로 삭제된다고 하니 Vue에서 공식적으로 지원 할 `v-slot`만 사용하도록 합니다.
:::

<TagLinks />

<Comment />
