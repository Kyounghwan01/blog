---
title: mobx 비동기 처리 예제로 알아보기
meta:
  - name: description
    content: mobx 비동기 처리 예제로 알아보기, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx 비동기 처리 예제로 알아보기
  - property: og:description
    content: mobx 비동기 처리 예제로 알아보기, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/async/
tags: ["react", "mobx"]
---

# mobx 비동기 처리 예제로 알아보기

mobx에서 비동기를 처리하는 방법은 총 4가지로 [mobx 공식 사이트](https://mobx.js.org/actions.html#using-flow-instead-of-async--await-) 이곳에 자세히 나와있습니다.

그중 저는 async await을 이용하는 방법과 generator를 이용한 방법에 대해 예제 코드와 같이 알아보겠습니다.

## async/await + runInAction

async/await을 사용하는 방법은 이미 알고 있다는 전제 하에 진행하겠습니다. 혹시 async/await 또는 promise를 모르신다면 자바스크립트로 비동기 핸들링 하는 방법에 대해 숙지하시고 오시면 좋을 것 같습니다.

async/await을 아신다면 이번에는 runInAction에 대해 알아봅시다.
`runInAction`을 사용하는 이유를 먼저 알려드리면 `runInAction` 을 사용하지 않을 경우 해당 action의 코드는 첫번째로 불리는 await 코드 전까지만 실행이 됩니다. 그 이후 await의 return 값에 의해 observable 값을 변경 하려면 다른 action으로 감싸야 합니다. 그렇게되면 액션 함수가 너무 많이 생성되기 때문에 `runInAction`을 사용함으로 불필요한 액션 함수 생성을 줄이면서 좀 더 가독성 높은 비동기 코드를 만들 수 있습니다.

### runInAction

[mobx 공식사이트](https://mobx.js.org/actions.html#runinaction)에서는 `runInAction` 을 즉시 호출되는 임시 작업이라고 말합니다.

원래 mobx는 액션 함수 내부에서 promise 작업을 한 이후 다시 액션 함수를 만들거나, 외부의 액션 함수를 호출해야 정상적으로 `observable` 값을 바꿀 수 있으나 `runInAction` 을 사용하면 함수 내부에서 `observable` 값을 값을 바꿀 수 있습니다.

이 패턴의 장점은 불필요한 액션을 만들지 않으면서 액션의 흐름을 이어가는 장점이 있습니다.

아래는 `runInAction` + `async/await`에 대한 예시 코드입니다.

```tsx
fetchApi = (params: boolean) => {
    return new Promise((res) => {
      window.setTimeout(function () {
        console.log(222);
        if (params) {
          res("ok");
        } else {
          res("error");
        }
      }, 1000);
    });
  };

  @action toggleTodo = async (id: string) => {
    const res = await this.fetchApi(true);
    runInAction(() => {
      console.log(res);
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  };
```

## generator/yield + flow

이번에 사용할 방법은 제너레이터와 mobx의 flow 속성을 이용하는 방법입니다. 제너레이터는 자바스크립트의 최신 문법으로 알아두시면 좋지만 모르셔도 async/await만 아시면 따라오는데 무리가 없습니다.

결론부터 말씀드리면 async 대신 함수 앞에 `*`를 붙이고(제너레이터 함수), await 대신 yield를 붙이면 됩니다. 그리고 mobx의 `flow`를 import 하고 제너레이터 함수를 flow로 감싸면 됩니다.

위와 다르게 runInAction 또는 콜백함수, 새로운 액션을 만드는 부수적인 작업이 없기 때문에 코드가 깔끔한 장점이 있습니다. 또한 `flow` 는 mobx 개발 도구와 연동이 잘되있어 비동기 작업 추적이 쉬운 장점이 있습니다.

`flow`에는 `cancel` 메소드가 있습니다. 이 메소드를 실행하면, `flow`가 즉시 중단 되고 `{message: "FLOW_CANCELLED"}` 를 리턴합니다

아래는 generator/yield + flow에 대한 예시 코드입니다.

```tsx
import { ..., flow } from "mobx";

constructor() {
  this.fetchApi = this.fetchApi.bind(this);
}

@action toggleTodo = (id: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  };

	/**
   * 1. console.log 1 찍힘
   * 2. console.log res 찍힘
   * 3. res가 ok라면 toggleTodo 함수 실행됨
   */

  fetchApi = flow(function* (id: string) {
    console.log(1);
    const newapis = function (params: boolean) {
      return new Promise((res) => {
        window.setTimeout(function () {
          if (params) {
            res("ok");
          } else {
            res("error");
          }
        }, 3000);
      });
    };
    try {
      const res = yield newapis(true);
      if (res === "ok") {
        this.toggleTodo(id);
      }
    } catch (e) {
      console.log(e.message);
    }
  });

// 위 함수를 쓰는 컴포넌트에서 fetchApi(3).cancel()를 호출하면 캔슬
```

<TagLinks />

<Comment />
