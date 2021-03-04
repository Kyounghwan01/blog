---
title: vuex 동작원리
meta:
  - name: description
    content: vuex 동작원리
  - property: og:title
    content: vuex 동작원리
  - property: og:description
    content: vuex 동작원리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vux/start-vuex/
tags: ["vue", "vuex"]
---

# vuex 동작원리

앞에서 언급했듯, vuex는 모든 컴포넌트에서 접근 가능 한 **store**가 있습니다. **store**는 앱내 state를 보유한 컨테이너입니다. 이 **store**는 두가지 특이한 법칙이 있습니다.

- store는 **반응형**입니다. vuex 컴포넌트는 어느곳에서든 store에 있는 state를 찾을 수 있고 state가 변경되면 신속하게 view도 변경됩니다.
- store안에 있는 state는 view에서 임의 변경 할 수 없습니다. vuex에서 허락한 방식은 `commit`을 이용한 `mutations`방법 또는 `dispatch`를 이용한 방법만 가능합니다.
  ::: danger
  위에서 명시한 방법 그 이외에 강제로 store내의 state에 값을 주입하면 `vuex warning`을 띄웁니다.
  :::

state의 변화는 앞 포스팅에서 말했듯 단방향으로 `view`에서 `Dispatch`라는 함수를 동해 `action`이 발동되고 `action`안에 정의된 `commit`함수에 의해 `mutations`이 실행되고 `mutations`에 정의된 로직에 따라 `state`가 변화하고 그 `state`를 쓰는 `view`가 변하는 흐름을 따릅니다.

가장 쉬운 예제로 vuex가 어떻게 작동하는지 보겠습니다.<br>
먼저 vuex를 설치 후, store를 정의하겠습니다.

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
```

이후 count를 사용하는 vue파일에서 `store.state`로 접근하여 `store.commit` 메소드로 상태 변경합니다.

```js
store.commit("increment");
```

위의 결과로 `store.state.count`가 1로 증가합니다.

앞으로 하나의 요소씩 기능 및 사용법에 대해 알아보겠습니다.

<TagLinks />

<Comment />
