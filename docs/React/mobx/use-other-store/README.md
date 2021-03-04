---
title: mobx 다른 store 값 사용하기 (typescript)
meta:
  - name: description
    content: mobx 다른 store 값 사용하기, react, typescript, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx 다른 store 값 사용하기
  - property: og:description
    content: mobx 다른 store 값 사용하기, react, store, typescript, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/use-other-store/
tags: ["react", "mobx"]
---

# mobx 다른 store 값 사용하기

오늘은 mobx에서 다른 store의 값을 가져와서 사용하는 방법을 알아보겠습니다!

다른 스토어의 값을 간섭하도록 설계하는 것 자체가 설계 미스라고 말씀하실 수 있지만, <br />
공통 store에 정의한 값(loading, modal 등)만 타 store에서 가져와 사용한다고 생각하시면 납득이 될 것입니다.

## store 예제

### 흐름

- commonStore와 common store 값을 가져올 testStore를 구현합니다.
- 위 2개 store를 묶을 RootStore를 만듭니다.
- RootStore를 App.js에 Privider에 넣습니다.

### CommonStore

```tsx
// store/CommonStore.tsx
import { action, observable, runInAction } from 'mobx';
-
export interface CommonProps {
  loading: boolean;
}

export default class CommonStore implements CommonProps {
  @observable loading = false;
}
```

### TestStore

```tsx
// store/TestStore.tsx
import { action, observable, runInAction } from "mobx";
import api from "api/modules/apis";
import RootStore from "./RootStore";
import CommonStore from "./CommonStore";

export interface TestStoreProps {
  count: number;
  getAllChamps: () => void;
}

export default class TestStore implements TestStoreProps {
  // rootStore에서 넣어준 this에 의해 constructor에서 commonStore에 접근 가능하다!
  commonStore: CommonStore;
  constructor(rootStore: RootStore) {
    this.commonStore = rootStore.commonStore;
  }

  @observable count = 0;

  @action getAllChamps = async () => {
    try {
      this.commonStore.loading = true;
      const res = await api.test();
      runInAction(() => {
        this.count += 1;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.commonStore.loading = false;
    }
  };
}
```

### RootStore

- **주의** `this`를 넣어줘야 store를 받을 수 있습니다

```tsx
import CommonStore from "./CommonStore";
import TestStore from "./TestStore";

export default class RootStore {
  commonStore: CommonStore;
  testStore: TestStore;

  constructor() {
    this.commonStore = new CommonStore();
    this.testStore = new TestStore(this);
  }
}
```

### App

- 만든 rootStore를 provider에 넣어줍니다.

```tsx {6,11}
// App.tsx
import React, { Component } from "react";
import { Provider } from "mobx-react";
import RootStore from "store/RootStore";

const rootStore = new RootStore();

export default class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Components />
      </Provider>
    );
  }
}
```

<TagLinks />

<Comment />
