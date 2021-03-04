---
title: react context api 개념 & 예시
meta:
  - name: description
    content: react context api 개념 & 예시, react, react16, provider, store
  - property: og:title
    content: react context api 개념 & 예시
  - property: og:description
    content: react context api 개념 & 예시, react, react16, provider, store
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-context-api/
tags: ["react"]
---

# react context api 개념 & 예시

> vue로 프로젝트를 진행 중, 새로운 프로젝트가 추가되어 이번에는 react로 진행하기로 하였습니다
> state management을 예전처럼 redux로 하려했으나 같이 일하는 프론트 개발자분이 react를 전혀 모르셔서 redux까지 업무에 포함시키는 것이 무거울 것이라 생각하여 다른 상태관리방법이 없는지 찾던 중,
> context api가 눈에 띄여 공부해보았고, 그 개념과 예시를 남깁니다

## context api란?

> react는 16.3 버전부터 정식적으로 [context api](https://reactjs.org/docs/context.html)를 지원하고 있습니다. 일반적으로 부모와 자식간 props를 날려 state를 변화시키는 것과는 달리 context api는 컴포넌트간 간격이 없습니다.
> 즉, 컴포넌트를 건너띄고 다른 컴포넌트에서 state, function을 사용할 수 있습니다.
> 또한 redux의 많은 어려운 개념보다 context api는 딱 3가지의 개념만 알면 바로 적용가능합니다.
> `Provider`, `Consumer`, `createContext`이 3가지만 알면 되죠

## 언제 쓰는가

context는 컴포넌트안에서 전역적으로 데이터를 공유하도록 나온 게념입니다. 그런 데이터는 로그인 데이터, 웹 내 사용자가 쓰는 설정파일, 테마, 언어 등등 다양하게 컴포넌트간 공유되어야할 데이터로 사용하면 좋습니다.

## API

### React.createContext

```
const MyStore = React.createContext(defaultValue);

```

- context 객체를 만듭니다. 컴포넌트가 이 context를 가지려면 해당 컴포넌트 상위에 `provider`로 부터 context를 정의한 변수 `myStore`를 감싸면 됩니다
- `defaultValue` param은 트리 안에 적절한 provider를 찾지 못했을 때 쓰이는 값입니다. (해당 store가 어떠한 provider에 할당되지 않은 경우)완전 독립적인 context를 유지할때 쓰입니다, provider를 통해 undefined를 보낸다 해도 해당 context를 가진 컴포넌트는 provider를 읽지 못합니다.

### Context.Provider

```js
<MyStore.Provider value={this.state}>
  <subComponent1 />
  <subComponent2 />
</MyStore.Provider>
```

- `provider`는 정의한 context를 하위 컴포넌트에게 전달하는 역할을 합니다.
- provider를 전달하는 변수는 꼭 `value`를 사용해야 합니다
- 전달 받는 컴포넌트의 제한 수는 없습니다
- provider에 하위 provider배치 가능하며, 그럴경우 하위 provider값이 우선시 됩니다
- provider하위에 context를 가진 component는 provider의 value로 가진 state가 변화할 때마다, 전부 re render됩니다.

### Context.Consumer

```js
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

- context 변화를 구독하는 컴포넌트입니다
- class 컴포넌트의 구독법은 아래 예시에 있습니다.
- context의 자식은 함수(컴포넌트)이어야 합니다.
- 이 함수(컴포넌트)가 가지는 context 값은 가장 가까운 provider의 값입니다
- 상위 provider가 없다면 `createContext()`에서 정의한 `defaultValue`를 가집니다

### Class component에서 contextType

```js
import React, { Component } from "react";
import Store from "store";

export default class ClassComponentTest extends Component {
  // static contextType = 'store값' (static contextType까지 고정)
  static contextType = Store;

  componentDidMount() {
    console.log(this.context); // Store가 가진 context값 전부 불러오기
  }
}
```

#### 주의! - 위 방법으로는 하나의 context만 구독 가능합니다.

- 여러 컴포넌트를 구독하려면 Consumer내부에 또다른 Consumer를 정의하는 방법으로 context를 내려줘야합니다.
- react에서는 둘 이상의 context가 중첩되는 경우 한번에 prop을 내리는 방법을 고안하라 추천합니다.

```js
<ThemeContext.Consumer>
  {theme => (
    <UserContext.Consumer>
      {user => <ProfilePage user={user} theme={theme} />}
    </UserContext.Consumer>
  )}
</ThemeContext.Consumer>
```

## 예시

### createContext 사용 예제

```js
// src/store.js
import React from "react";

const Store = React.createContext(null);
export default Store;
```

```js
// src/rootStore.js
import React from "react";

const rootStore = React.createContext({ zxc: "testsetst" });
export default rootStore;
```

### provider 사용 예제

```js
// src/App.jsx

import React, { Component } from "react";
import Test from "components/Test";
import Test3 from "components/Test3";
import Test2 from "components/Test2";
import Store from "store";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.changeMessage = () => {
      const { message } = this.state;
      if (message === "hello") {
        this.setState({
          message: "by"
        });
      } else {
        this.setState({
          message: "hello"
        });
      }
    };
    this.state = {
      test: "testContext",
      message: "hello",
      changeContext: this.changeMessage
    };
  }

  render() {
    const { test } = this.state;
    return (
      <Store.Provider value={this.state}>
        <Test test={test} />
        <Test2 />
        <Test3 />
      </Store.Provider>
    );
  }
}
```

### 일반적인 consumer 사용 예제

```js
// src/components/Test.jsx

import React, { Component } from "react";
import PropTypes from "prop-types";
import Store from "store";

export default class Test extends Component {
  render() {
    const { test } = this.props;
    return (
      <div>
        <Store.Consumer>{store => store.message}</Store.Consumer>
        <Store.Consumer>
          {store => (
            <button type="button" onClick={store.changeContext}>
              changeContext
            </button>
          )}
        </Store.Consumer>
        {test}
      </div>
    );
  }
}

Test.propTypes = {
  test: PropTypes.string
};

Test.defaultProps = {
  test: ""
};
```

### 2개의 store를 사용해야 할 때

```js
// src/components/Test2.jsx
import React, { Component } from "react";
import rootStore from "rootStore";
import Store from "store";

export default class Test2 extends Component {
  static contextType = rootStore;

  componentDidMount() {
    // rootStore context 구독
    console.log(this.context);
  }

  render() {
    return (
      <>
        {/* store context 구독 */}
        <Store.Consumer>{store => store.message}</Store.Consumer>
        <div>test2 </div>
      </>
    );
  }
}
```

### provider가 네스팅되어 상위 provider 값도 받아야 할때

````js
// src/components/Test3.jsx
import React, { Component } from 'react';
import Store from 'store';
import rootStore from 'rootStore';
// import PropTypes from 'prop-types';

class TT extends Component {
  static contextType = rootStore;

  componentDidMount() {
    const { value } = this.props;
    console.log('ttt', value);
    console.log('root', this.context);
  }

  render() {
    const { value } = this.props;
    return <div>test3{value.message}</div>;
  }
}

const Test3 = () => <Store.Consumer>{store => <TT value={store} />}</Store.Consumer>;

export default Test3;

TT.propTypes = {
  value: {},
};

TT.defaultProps = {
  value: {},
};

```
````

<TagLinks />

<Comment />
