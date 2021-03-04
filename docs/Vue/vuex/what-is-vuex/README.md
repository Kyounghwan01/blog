---
title: vuex 란?
meta:
  - name: description
    content: vuex 란?
  - property: og:title
    content: vuex 란?
  - property: og:description
    content: vuex 란?
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vux/what-is-vuex/
tags: ["vue", "vuex"]
---

# vuex 란?

vuex는 vue.js 내에 **상태 관리** 라이브러리 입니다.<br>

## vuex가 생기게 된 이유

부모와 자식 컴포넌트간 props로 data를 이동하는 데에는 한계가 있었습니다. 부모의 부모의 부모까지 값을 내려주거나, 함수를 내리는 경우가 다분했기 때문이죠. <br><br>이벤트 버스로 값을 내리고 올리는 것에 한계를 느껴, 앱 내에 하나의 저장소를 놓고 모든 컴포넌트가 그 값에 접근하도록 하자라는 생각에 나온 것이 vuex입니다.<br><br>
vuex내 store가 앱 내 모든 컴포넌트에 대하여 전역적으로 관리되는 state 저장 역할을 합니다. 그리하여 어느 컴포넌트든 store내 값에 접근하고, 값을 바꿀 수 있게 되는 것이죠.

## vuex 패턴

기본적으로 flux 패턴을 따릅니다. flux 패턴은 데이터의 단방향 흐름을 말합니다.<br>
`view`에 보이는 `state`는 `actions`에 의해 값이 결정되고 그 `action`은 `view`에서 사용 가능 하다는 뜻이죠.
즉, `view` -> `action` -> `state` -> `view` 이렇게 단방향으로 데이터가 흐릅니다.

여기서 vuex는 `mutation`하나가 추가됩니다.<br>
vuex의 데이터 흐름은 동일하게 단방향으로 `view`에서 `Dispatch`라는 함수를 동해 `action`이 발동되고 `action`안에 정의된 `commit`함수에 의해 `mutations`이 실행되고 `mutations`에 정의된 로직에 따라 `state`가 변화하고 그 `state`를 쓰는 `view`가 변하는 흐름을 따릅니다.

## 언제 사용하나요?

vuex는 여러 컴포넌트에서 공유하는 상태 관리에는 유용하지만 한개의 컴포넌트에서만 사용한다면 vuex보단 간단한 [이벤트버스만](https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/)으로 데이터 처리하는 것을 추천합니다.<br><br>
회사에서 다루는 중대형 어플리케이션의 경우 컴포넌트내 공유하는 state가 많아짐으로 자연스럽게 vuex를 사용하게 될 것입니다. 즉, 필요함을 느끼지 못한다면 굳이 쓰는 것을 추천하지 않습니다.

<TagLinks />

<Comment />
