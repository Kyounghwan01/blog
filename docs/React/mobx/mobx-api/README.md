---
title: mobx api 예제로 알아보기
meta:
  - name: description
    content: mobx api 예제로 알아보기, mobx, react, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx api 예제로 알아보기
  - property: og:description
    content: mobx api 예제로 알아보기, mobx, react, observable, computed, action, autorun, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/mobx-api/
tags: ["react", "mobx"]
---

# mobx api 예제로 알아보기

## observable

`observable` 데코레이터를 이용해 넘겨받은 객체 또는 값은 반응형 정보로 분류되어 observable 값이 바뀔 시 화면이 리렌더링 됩니다.

```tsx
import { observable, autorun } from "mobx";

class Person {
  @observable age = 28;
  name = "nkh";
}

const person = new Person();

autorun(() => {
  document.getElementById("age").innerText = person.age.toString();
});

autorun(() => {
  document.getElementById("name").innerText = person.name;
});

setInterval(() => {
  person.age++;
}, 1000);
```

사용하고자 하는 데이터에 `@observable` 를 선언함으로 Observable한 값으로 만들어줍니다.

`observable`을 사용하면 하단의 함수에 의해 값이 바뀌면 해당 값을 사용하는 모든 view에서 리렌더링 됩니다.

## toJS

mobx의 observable 값중에 객체나 배열의 경우 콘솔로 찍으면 `{$mobx: ObservableObjectAdministration}` 이런 값으로 보이면서 직관적으로 보기 힘든 경우가 있습니다. 저렇게 나오는 이유는 시스템 성능을 위해 그렇다고 mobx가 설명합니다.

우리는 당장 개발을 해야하니 저 이상한 값을 우리가 아는 `{}`나 `[]`로 바꿔야 합니다.

그때 사용하는 api가 `toJS`입니다. 사용법은 아래와 같습니다.

```js
class TestStore {
  @observable test = { a: 1, b: 2 };

  @action
  setToJS = () => {
    Object.keys(this.test).map(el => (this.test[el] = 3333));
    console.log(this.test); // {$mobx: ObservableObjectAdministration}
    console.log(toJS(this.test)); // {a: 333, b: 333}
  };
}
```

## set

이 api는 store값을 store에서 바꾸지 않고, component에서 바꾸고 싶을때 사용합니다.

첫번째 파라미터로 바꿀 스토어, 두번째는 스토어 내부의 observer 대상, 세번째는 바꿀 값입니다. 사용법은 아래와 같습니다.

```js
const testStore = new TestStore();

useEffect(() => {
  console.log(testStore);
  testStore.setToJS();
  // 바뀔 스토어 대상, 바뀔 observer 대상, 바뀌는 값
  set(testStore, "test", { a: 3, b: 55 });
}, []);
```

## computed

`computed` 는 `observable` 값을 기반으로 계산한 값을 리턴합니다. `vue`의 `computed`와 동일한 역할을 합니다. `observable`된 값이 바뀌면 `computed` 값도 연산되어 그 값을 바라보고 있는 view도 리렌더링 됩니다.

`computed`는 동일한 값이 들어올 경우 값이 캐쉬되기 때문에 전역으로 만든 함수보다 더 효율성이 좋습니다.

`computed`는 기본적으로 JavaScript의 Getter에만 사용할 수 있으며, 따라서 추가 인자를 받을 수가 없습니다. (setter는 action에서 수행)

```tsx
import { observable, autorun, computed } from "mobx";

class Rectangle {
  @observable width = 10;
  @observable height = 10;

  @computed // 값 캐쉬됨
  get area() {
    return this.width * this.height;
  }

  getArea() {
    // 값 캐쉬 안됨
    return this.width * this.height;
  }
}

const rect = new Rectangle();

autorun(() => {
  document.getElementById("computed").innerText = rect.area.toString();
});

autorun(() => {
  document.getElementById("notComputed").innerText = rect.getArea().toString();
});

setInterval(() => {
  rect.width++;
}, 1000);
```

## autorun

`autorun` 은 내부 코드에 의해 자동으로 값이 업데이트됩니다. 이것을 `mobx`에서는 `Reaction`이라고 부릅니다. `observable` 값을 기반으로 연산이 이루어지는 면에서는 `computed`와 동일하지만, 용도가 다릅니다. 바뀌는 값을 기반으로 다른 값을 바꿔 view를 업데이트 하거나 console.log를 찍는 등, 사이드 이펙트를 내포하는 동작을 `mobx`에서는 `Reaction`이라고 부릅니다. `autorun`은 `Reaction`을 하는 방법중 하나입니다.

React와 같이 쓰는 경우에는 다른 API로 Reaction을 할 수 있으므로 `autorun`을 사용할 일이 별로 없지만, React 없이 MobX만 사용하는 경우에는, `autorun`이 필수적입니다. 위에서 사용한 `autorun`예제로 사용할수 있습니다.

`autorun`에 넘긴 익명 함수는 참조하고 있는 `Observable` 값이 변할때마다 반복해서 실행됩니다.

## action

`action`은 observable 값을 변경(setter)에 사용하는 api입니다. observable 값을 변경하는 메소드에는 `action`을 달아줄 것을 권장하지만 쓰지 않아도 정상적으로 동작합니다. 위의 예제들에서도 `action` 없이 값을 계속해서 업데이트해도 동작에는 문제가 없기 때문입니다.

그렇다면 자연스럽게 `action`을 왜 사용 하는지 의문이 듭니다. `computed`와 마찬가지로, `action`을 사용하는 이유도 성능 이슈로 사용합니다.

결과만 말씀드리면, `action`으로 감싸지 **않고** 호출한 경우 `actio`n으로 감싼 함수보다 함수 실행 횟수가 해당 함수의 `observable` 값 갯수배 (함수 내 observable값이 2개라면 2배, 3개라면 3배) 가량 차이가 납니다.

`action` **없이** `observable`값을 업데이트 하면 각 `observable`가 **업데이트 되는 시점**마다 함수가 호출되기 때문이고 `action`이 **있다면** `observable`값이 **모두** 업데이트 된 뒤에 함수를 호출하기 때문입니다.

이렇게 `observable`값을 업데이트 하는 동작을 묶어 일괄 처리하고 업데이트 묶음을 일괄 처리가 끝나면 뷰를 바꾸는 것을 mobx에서는 **트랜지션(Transaction)**이라고 부릅니다. 트랜지션을 이용하는 것과 하지 않는 것이 성능에 매우 많은 차이를 보이기에 `observable` 값을 바꾸는 setter 함수는 무조건 `action`을 감싸서 사용해야합니다.

`action`을 강제하기 위해 `useStrict` 모드를 `true`로 만들면 강제 시킬 수 있습니다.

```tsx
class TodoStore {
  constructor() {
    reaction(
      () => this.todos,
      _ => console.log(this.todos.length)
    );
  }

  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false }
  ];

  // observable todos값을 변경하는 action 함수
  @action addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() });
  };
}
```

## Inject

컴포넌트에서 store 값에 접근하거나, store 값을 바꾸려고 하면 Inject를 이용해 컴포넌트에게 store를 주입해야합니다.

store를 컴포넌트에 주입하지 않고, store 값을 `new`키워드로 생성하려고 하면 아래와 같은 에러를 보게됩니다.

```
Error: MobX injector: Store 'store' is not available! Make sure it is provided by some Provider
```

그래서 아래의 코드를 따라 컴포넌트에 store를 넣어주는 방법을 알아봅시다

### 컴포넌트를 부르는 곳에서 provider로 감싸고 사용할 store를 주입한다.

- 부모컴포넌트가 있고 그 하위에 자식 컴포넌트(TTT), 자식 컴포넌트 밑에 또 자식컴포넌트(TTT2)가 있다고 가정합니다.

부모 컴포넌트는 자식 컴포넌트에 provider를 이용하여 자식이 사용할 store 값을 주입합니다.

```jsx
// parent component
import { Provider, observer } from "mobx-react";
import TTT from "../components/TTT";
import TestStore from "../store/TestStore";

const testStore = new TestStore();

function Home() {
  return (
    <Provider store={testStore}>
      <TTT />
    </Provider>
  );
}

export default observer(Home);
```

자식 컴포넌트에서는 부모로부터 받은 store 이름을 inject에 정의하고 observer로 다시 감싸줍니다.

그렇게 되면 props에 받은 store값이 들어갑니다.

```jsx {18}
// children component
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import TTT2 from "./TTT2";

const TTT = props => {
  useEffect(() => {
    console.log(props); // store 값 받음
  });
  return (
    <div>
      test
      <TTT2 />
    </div>
  );
};

export default inject("store")(observer(TTT));
```

그 밑에 또 자식 컴포넌트가 있습니다.

자손 컴포넌트는 자동으로 부모로부터 받은 store를 사용할 수 있습니다. <br />즉, TTT2를 부르는 TTT 컴포넌트에서 Provider로 다시 감쌀 이유가 없다는 뜻입니다.

```jsx
// children children component
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

const TTT2 = props => {
  useEffect(() => {
    console.log(props); // store 값 받음
  });
  return <div>test2</div>;
};

export default inject("store")(observer(TTT2));
```

<TagLinks />

<Comment />
