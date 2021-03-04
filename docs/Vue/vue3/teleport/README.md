---
title: vue3 teleport 사용법
meta:
  - name: description
    content: vue3 teleport 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:title
    content: vue3 teleport 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:description
    content: vue3 teleport 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/teleport/
tags: ["vue", "vuex"]
---

# vue3 teleport 사용법

이번에는 react의 portal과 동일한 기능인 vue3에서 새로 추가된 teleport에 대해 알아보겠습니다

먼저 이 기능을 왜 사용하는지 말씀드리고 teleport를 통해 모달을 띄우는 예제까지 알아보겠습니다!

## 사용하는 이유

처음 vue를 세팅하면 아래와 같이 index.html의 `div id = app`에 **모든** 화면을 집어넣습니다

그 이후 생성되는 모든 로직은 다 `<div id="app" />`에 투입됩니다

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
  <body>
    <div id="app">
      <!-- 이곳에 vue로 만드는 모든 화면이 들어갑니다. -->
    </div>
  </body>
</html>
```

만약 로그인창, 결제창, 모달 같은 ui를 구현한다면 현재 화면을 뚫고 최상위로 올라와야 하는 작업을 해야합니다

프로젝트의 구조가 복잡할수록 모달을 띄울 경우 구조는 더욱 복잡하게 변합니다

렌더링된 컴포넌트에 따라 모달을 띄우는 script도 다 달라지고, css도 다 다르게 작업해야하니 재사용성도 최악이 됩니다

그래서 teleport라는 대안이 나왔습니다

## teleport란?

텔레포트는 index.html에 `div id=app`과 같은 레벨에 별도의 div를 만듭니다

그렇게 되면 vue가 구성되는 복잡한 구조와 별도로 새로운 구조를 만들게 되어 쉽게 모달을 띄울 수 있습니다

```html {6}
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="">
  <body>
    <div id="app"></div>
    <!-- 새로운 영역을 만듭니다 -->
    <div id="teleport-area"></div>
  </body>
</html>
```

컨셉은 숙지하였으니 바로 모달 예시 코드로 사용법에 대해 알아보겠습니다!!

## 사용법 및 모달 예시

### 프로젝트 구조

텔레포트 대상이 될 `index.html`과 컴포넌트에 `텔레포트, 모달` 그리고 텔레포트를 부를 `App.vue`로 구성되어있습니다

| 프로젝트 구조                   |
| :------------------------------ |
| **/public**                     |
| **ㅣㅡ index.html**             |
| **/src**                        |
| **ㅣㅡ components**             |
| **ㅣㅡ /teleport**              |
| **ㅣㅡㅡ /TeleportExample.vue** |
| **ㅣㅡㅡ /VModal.vue**          |
| **ㅣㅡ App.vue**                |

## index.html에 teleport div 추가

먼저 index.html에 teleport 할 영역을 추가합니다.

```html {6}
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="">
  <body>
    <div id="app"></div>
    <div id="destination"></div>
  </body>
</html>
```

## components/teleport/VModal.vue

모달 컴포넌트를 작성합니다. (아직 텔레포트와 관련 없습니다)

간단하게 `isOpen`이라는 변수 값에 의해 모달이 보여지고 사라지는 컴포넌트입니다.

```vue {2}
<template>
  <div class="modal" v-show="isOpen">
    <span class="close" @click="hide">&times;</span>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isOpen = ref(false);
    const hide = () => {
      isOpen.value = false;
    };
    const show = () => {
      isOpen.value = true;
    };
    return { isOpen, hide, show };
  }
};
</script>

<style>
.modal {
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px;
  width: 500px;
  border: 1px solid #888;
}
.close {
  padding: 10px;
  cursor: pointer;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
</style>
```

## App.vue

텔레포트 모달을 띄울 컴포넌트인 App.vue입니다

텔레포트 컴포넌트를 import하고 넣어줍니다

```vue {4}
<template>
  여기는 텔레포트 구역이 아닙니다. (div id=app에 들어가는 구역)

  <TeleportExample />
</template>
<script>
import TeleportExample from "@/components/teleport/TeleportExample";

export default {
  components: {
    TeleportExample
  }
};
</script>
```

## components/teleport/TeleportExample.vue

여기부터 텔레포트 사용법을 알아보겠습니다.

`teleport`라는 태그를 열고 `to="html에 추가된 id이름"`을 적어주시면 `index.html`에 추가된 div로 해당 컴포넌트가 삽입됩니다.

모달의 재사용성을 위해 `VMmodal` 자식 컴포넌트의 state를 ref로 받아 모달 on/off를 컨트롤 합니다.

### teleport disabled

teleport는 disabled가 가능합니다.

teleport를 `disabled=true`를 하면 텔레포트틑 하고 있는 div id=destination 에서 텔레포트가 사라지고, 텔레포트 모달을 띄우고 있는 컴포넌트에 텔레포트 컴포넌트가 삽입됩니다.

**즉, 텔레포트를 disabled 시키면 dev id=app에 삽입되어 `<teleport>`를 지정한 위치에 렌더링됩니다**

### 중요

그래서 텔레포트를 사용하면서 모달 기능을 구현할 때는 텔레포트 자체를 disabled 시키는 것이 아니라, 텔레포트는 유지하고 그 안에 있는 modal을 보여주거나 사라지게 해야합니다. <br />
그래서 저는 `VMmodal`에 `v-show`를 통하여 modal on/off를 구현하였습니다.

### 코드

```vue {5,13-18}
<template>
  <div style="border: 1px solid">
    <h1>Teleport Example</h1>
    <!-- disabled false이면 텔레포트, div로 true면 import된 컴포넌트로 들어감 -->
    <teleport to="#destination" :disabled="disableTeleport">
      <p>
        텔레포트가 disabled되면 텔레포트를 정의한 컴포넌트에 텔레포트 컴포넌트가
        삽입됩니다
      </p>
    </teleport>
    <button @click="disableTeleport = !disableTeleport">Toggle Teleport</button>

    <teleport to="#destination">
      <!-- 자식 엘리먼트 접근 -->
      <VModal ref="modal">
        modal content
      </VModal>
    </teleport>
    <button @click="showModal">Show Modal</button>
  </div>
</template>

<script>
import VModal from "./VModal";
import { ref } from "vue";
export default {
  components: {
    VModal
  },
  setup() {
    const disableTeleport = ref(false);
    const modal = ref(null);
    function showModal() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal.value.show();
    }
    return {
      disableTeleport,
      modal,
      showModal
    };
  }
};
</script>
```

그 이외 텔레포트 api는 [공식 vue3 teleport api](https://v3.vuejs.org/api/built-in-components.html#teleport)를 참조하시면 됩니다.

## 참조

- [vue3 공식 문서](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components)

<TagLinks />

<Comment />
