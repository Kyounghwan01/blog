---
title: Vue - 메모리 낭비 최소화하기
meta:
  - name: description
    content: Vue - 메모리 낭비 최소화하기
  - property: og:title
    content: Vue - 메모리 낭비 최소화하기
  - property: og:description
    content: Vue - 메모리 낭비 최소화하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/prevent-memory-lack/
tags: ["vue"]
---

# 메모리 낭비 최소화하기

## Virtual scroll 기법

스크롤된 위치를 계산하여 그 위치에 해당하는 DOM만 그려주는 원리입니다.
또 다른 방식으로는 인피니티 스크롤을 구현하는 방법도 있지만, 밑으로 내려가면 상위 데이터는 계속 남아있는 것이니 결론적으로는 스크롤 위치에 해당하는 dom만 그리는 것이 더 좋은 방법입니다.

## v-once

`v-once`는 첫 렌더링 이후 이 값이 변하지 않아도 된다고 확인할 때, 사용합니다.
요소와 구성 요소를 한 번만 렌더링합니다.
이후에 다시 렌더링 할 때 요소 / 구성 요소 및 모든 하위 요소는 정적 콘텐츠로 처리되고 건너 뜁니다. 업데이트 성능을 최적화하는 데 사용할 수 있습니다.

```html
<span v-once>This will never change: {{msg}}</span>
```

## v-if와 v-show 구분하여 사용하기

돔이 랜더링 될때 v-if가 false일때는 v-if에 해당하는 엘리먼트는 렌더링 되지 않습니다. 그러나 v-if가 true로 변하면 렌더링되고, false가 되면 제거되고 다시 true가 되면 다시 렌더링 됩니다.

그에 반해 v-show는 초기에 무조건 렌더링 됩니다. 그러나 true/false가 계속 바뀌어도 v-if처럼 재 렌더링 되지 않습니다.

자주 클릭되는 경우 v-show, 한번만 클릭될 경우 v-if가 적절하겠습니다.

## computed 활용

computed의 값은 캐싱되기 때문에, 리렌더링 됬을 때, 같은 값이 들어왔다면 연산하지 않습니다.

## 데이터에 대한 이해

만약 보여줄 데이터가 바뀔 가능성이 없고, 단지 사용자는 관찰만 할 경우 굳이 반응형을 넣을 필요가 없을 것입니다.

vue에서 data, state, computed, getters로 데이터 모델이 선언되면, `defineReactive`를 통해 해당 객체는 vue의 관리 대상이 됩고, 각 객체마다 `Observe`가 생성되어 내부적으로 getter와 setter가 생성됩니다. 데이터를 열어보면 `Ob`이 붙은 것을 확인할 수 있습니다.

그래서 관리 안되게 할 데이터에 를 vue의 감지 대상에서 제거합니다. (Observe 생성 안되게 막는다)

이때 해당 state에 대해 `Object.freeze()`를 사용합니다.
`Object.freeze()`를 사용할 경우 해당 객체는 readOnly 판정을 받게 되어, 객체에 대해 수정, 삭제, 추가가 불가능 합니다. 그에 따라 vue에서도 감지대상에서 제외됩니다.

`Object.freeze()`를 사용해야하는 시점은 api를 통해 데이터를 받고, state에 할당하는 당시입니다.

vuex를 예시로 보겠습니다.

```js
export const state = {
  bookList: []
};

// mutations
export const mutations = {
  setBookList(state, payload) {
    state.bookList = Object.freeze(payload);
  }
};

// actions
export const actions = {
  async getBookList({ commit }, params) {
    const res = await api.booking.getbooking(params);
    commit("setBookList", res.data.data);
  }
};
```

위 처럼 mutation을 통해 state를 할당할 그때, freeze를 시켜 vue의 감시대상에서 벗어나면, getter와 setter가 생성되지 않아 메모리를 아낄 수 있습니다.

<TagLinks />

<Comment />
