---
title: vue props 전달 및 event 상속 (1)
meta:
  - name: description
    content: vue props 전달 및 event 상속 (1)
  - property: og:title
    content: vue props 전달 및 event 상속 (1)
  - property: og:description
    content: vue props 전달 및 event 상속 (1)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/
tags: ["vue"]
---

# props 전달 및 event 상속 <Badge text="KH" />

## 서론

vuex를 사용하는 경우는 대부분 여러 컴포넌트에서 사용할 때 vuex를 세팅하고 정보를 store에 저장하죠.

그렇지만 1, 2개 컴포넌트에서만 사용하는 정보는 굳이 store에 넣을 필요는 없고 해당 컴포넌트의 data에 정의하고 부모 자식간 props로 전달하는게 더 효율적일 것입니다.

그래서 오늘은 간단하게 **부모가 자식에게 props를 내릴때**, 그리고 **자식이 부모로 부터 받은 함수를 이용해 부모 컴포넌트의 데이터에 영향을 주는 방법**에 대해 알아보겠습니다.

## 부모 -> 자식 props 전달

예를 들어 하나의 view 화면이 있고, 그 view안에는 모달창이 자식 컴포넌트로 있다고 가정하고,
모달창에는 부모가 가진 `point` 라는 정보와 모달은 켜고 끈다는 함수를 넘겨주겠습니다.

**부모 컴포넌트**

```vue
<template>
  <Button @click="showModal = true"> 모달열기 </Button>
  <!-- 아래와 같이 부모는 자식 컴포넌트에 v-bind 또는 : 를 통해 props를 넘길 수 있습니다. -->
  <!-- 함수의 경우 @넘길함수이름="정의한 함수 이름" 을 통해 자식에게 부모 함수를 넘깁니다. -->
  <Modal
    :show="showModal"
    :point="this.point"
    @close="handlePointStorageClose"
  />
</template>

<script>
import Modal from '...';
data(){
  return {
    showModal: false,
    point: 1000
  }
},
methods: {
  handlePointStorageClose(close){
    this.showShortageModal = close;
  }
}
</script>
```

## 자식 -> 부모 이벤트 발생

다음으로 **자식컴포넌트에서 부모 컴포넌트에서 받은 함수를 기반으로 부모 데이터를 바꾸겠습니다**

**자식 컴포넌트**

```vue
<template>
  <div>
    <!--2. prop으로 받은 point는 아래와 같이 templete에서는 point로 script에서는 this.point로 사용합니다.-->
    <p>포인트 : {{ point }}P</p>
    <!--3. 부모로 받은 함수는 templete에서는 $emit()으로 script에서는 this.$emit()으로 사용합니다. 첫번째 인자로는 부모로 받은 인자(@close)인 close를 사용하고 두번째 인자는 부모 컴포넌트의 함수의 첫번째 인자로 들어갑니다. (close) -->
    <Button @click="$emit('close', false)">
      닫기
    </Button>
  </div>
</template>

<script>
export default {
  //1. 먼저 아래와 같이 props로 받은 정보가 어떤 자료형인지 정의합니다. 정의한 경우 정의된 자료형과 다른 자료형의 데이터가 들어오면 warning을 console에 띄웁니다.
  props: {
    show: Boolean,
    point: Number,
    close: Function
  }
};
</script>
```

<TagLinks />

<Comment />
