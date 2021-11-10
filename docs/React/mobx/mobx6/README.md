---
title: mobx v6 알아보기
meta:
  - name: description
    content: mobx v6 알아보기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx v6 알아보기
  - property: og:description
    content: mobx v6 알아보기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/mobx6/
tags: ["react", "mobx"]
---

# mobx v6 알아보기

mobx 6버전으로 개발하는 방법에 대해 알아보겠습니다! mobx의 기본적인 이해는 [mobx 알아보기
](https://kyounghwan01.github.io/blog/React/mobx/basic/)이 포스팅을 참조해주세요.

## mobx 6버전와 이전 버전과의 차이

1. 가장 큰 바뀐 점은 더이상 데코레이터(@)를 사용하지 않습니다. 자바스크립트에서도 @를 사용하는데 이 기능이 정식 버전으로 채택되는 기간이 너무 오래 걸려서 mobx에서도 @를 포기한 것 같습니다. 그리고 자바스크립트의 @와 mobx의 @가 동일한 의미를 가지지 않는데 이 또한 mobx가 @를 버린 이유라고 생각하고 있습니다.

2. mobx는 @를 버리고 `makeObservable`라는 기능을 추가 하였습니다 constructor에 각 변수에 대해 `observable`인지 `action`인지 먼저 정의하는 기능입니다. 아래 예시에서 살펴보도록 하겠습니다.

3. inject를 사용하지 않습니다. inject를 사용하지 않고 MobXProviderContext를 사용하여 좀 더 react hooks에 친화적으로 mobx가 수정되었습니다.

4. 6버전 이상에서 `observable` 값은 무조건 `action` 내에서만 수정 가능합니다.

## react-native에서 mobx6버전 사용하기

- 간단하게 counter하는 store를 예제로 구현하는 방법에 대해 알아보겠습니다.

### 기본 모듈 설치합니다

```bash
yarn add mobx
yarn add mobx-react
```

### store/counterStore.js

- 위에서 설명한대로 이제 @를 사용 하지 않습니다. `makeObservable`를 사용하여 observable인지 action인지 먼저 정의하게 됩니다.

```js
import { action, makeObservable, observable } from "mobx";

class CountStore {
  number = 0;

  constructor() {
    makeObservable(this, {
      number: observable, // 4버전의 @observable와 동일합니다.
      increase: action, // 4버전의 @action과 동일합니다.
      decrease: action,
      double: computed
    });
  }
  get double() {
    return this.number * 2;
  }
  increase = () => {
    this.number = this.number + 2;
  };
  decrease = () => {
    this.number--;
  };
}

export default CountStore;
```

- 아래와 같이 `makeAutoObservable`를 사용할 수 있지만 `makeAutoObservable`는 `sub class`(상속 하는 경우)와 `super()`(상속 받는 경우)를 사용하지 못하기 때문에 `makeObservable`를 사용합니다. [참고 - makeAutoObservable](https://ko.mobx.js.org/observable-state.html#makeautoobservable)
- 아래는 `makeAutoObservable` 예시 입니다.

```js
import { makeAutoObservable } from "mobx";

class Doubler {
  value = 0;
  constructor(value) {
    makeAutoObservable(this);
  }

  increment() {
    this.value++;
    this.value++;
  }
}
```

### hooks/useStores.js

- 해당 컴포넌트에 주입된 store는 Inject를 사용 하지 않아도 useStores 내부에서 알아서 바인딩 됩니다.

```js
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
function useStores() {
  return useContext(MobXProviderContext);
}
export default useStores;
```

### components

- 컴포넌트에서 store 값을 사용하는 방법은 이전 버전과 거의 동일합니다. 차이점은 더이상 Inject를 통해 store 이름을 넣어주지 않고 useStores를 이용한다는 점입니다.

#### provider 주입 컴포넌트

```js
// Provider를 넣어줄 컴포넌트
import React from "react";
import { View, Text } from "react-native";
import { Provider } from "mobx-react";
import CountStore from "@/store/countStore";
import ChildComponent from "@/components/ChildComponent";

const countStore = new CountStore();

const ProviderComponent = () => {
  return (
    <Provider countStore={countStore}>
      <View>
        <Text>Provider를 주입할 컴포넌트 입니다.</Text>
      </View>
      <ChildComponent>
    </Provider>
  );
};

export default ProviderComponent;
```

### provider 하위 컴포넌트

- provider를 통해 store 값을 주입 받은 컴포넌트는 `observer`와 `useStores`를 이용하여 손쉽게 store에 접근합니다.

```js
import React from "react";
import { View, Text, Button } from "react-native";
import { observer, Provider } from "mobx-react";
import useStores from '@/hooks/useStores';

const ChildComponent = () => {
  const { countStore } = useStores();

  return (
    <Provider countStore={countStore}>
      <View>
        <Text>{countStore.number}</Text>
        <Button title="increase" onPress={countStore.increase} />
      </View>
      <ChildComponent>
    </Provider>
  );
};

export default observer(ChildComponent);
```

- 위처럼 사용하는 방법은 이전 버전과 동일합니다. 일일히 inject를 할 필요가 없어서 여러 개의 store에 접근할때 용의할 것으로 보입니다.
- 또한 변수정의를 constructor에 몰아 넣다보니 좀 더 store의 로직을 파악하기 쉬워진 것 같습니다.

<TagLinks />

<Comment />
