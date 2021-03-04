---
title: vue class 동적할당
meta:
  - name: description
    content: vue class 동적할당, computed, watch
  - property: og:title
    content: vue class 동적할당, computed, watch
  - property: og:description
    content: vue class 동적할당, computed, watch
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/dynamicAllocation/
tags: ["vue"]
---

# class 동적할당

안녕하세요! 오늘은 템플릿 내에 class를 값에 따라 동적으로 할당하여 다양한 css를 보여주는 방법에 대해서 알아보겠습니다.

form내 메세지를 전송할 때, 값이 없으면 보내는 것을 취소하고, 값이 없는 form border를 붉은 색으로 변하게 하는 작업을 하였습니다.<br>
이때 같은 element가 상황에 따라 css가 바뀌어야 하기에 동적으로 class가 할당되는 작업을 하였습니다.

다음 아래와 같은 간단한 코드가 있습니다. 이게 이 `border-black`이라는 클래스를 동적으로 할당 하여 붉은 색으로 변하게 하겠습니다.<br>

```vue
<template>
  <div class="border-black">
    테두리가 검정입니다.
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBorderChange: false
    };
  }
};
</script>
<style>
.border-black {
  border: 1px solid black;
}
</style>
```

이전에 한 가지 아실것이 css는 **마지막에 할당된 값**을 따릅니다.<br>
예를 들면 2개의 클래스를 동시에 가지고 2개의 클래스 모두 같은 css를 가리킨다면 **뒤에 있는 class의 css 값**을 따릅니다.

본론으로 들어가면,<br>
아래와 같이 vue는 class를 **배열**로 할당할 수 있습니다.

```vue
<template>
  <div :class="['border-black', isBorderChange ? 'border-red' : '']">
    테두리가 검정입니다.
  </div>
  <BaseButton type="info" size="large" @click="isBorderChange = true">
    붉게바뀌는버튼
  </BaseButton>
</template>
<script>
export default {
  data() {
    return {
      isBorderChange: false
    };
  }
};
</script>
<style>
.border-black {
  border: 1px solid black;
}
.border-red {
  border: 1px solid red;
}
</style>
```

위 처럼 배열로 class 할당이 가능하고 버튼을 클릭하면 `isBorderChange`가 `true`로 바뀌면서 아래와 같이 html이 바뀌면서 `border`색이 붉은 색으로 변합니다.

```html
<div class="border-black border-red">
  테두리가 검정입니다.
</div>
```

이렇게 `isBorderChange` 라는 값에 따라 class를 동적으로 바꿀 수 있게 되고 그에 따라 css로 핸들링이 가능하게 됩니다.

위의 간단한 예제로 vue에서 class를 동적으로 할당하는 방법을 알아봤습니다.
응용하면 여러가지 class를 배열로 추가하여 더 다양한 css를 만들 수 있을 것입니다.

<TagLinks />

<Comment />
