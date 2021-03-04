---
title: react - lighthouse를 이용해 성능 최적화 하기 (code-splitting, lazy-loading)
meta:
  - name: description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, code-splitting, lazy-loading
  - property: og:title
    content: react - lighthouse를 이용해 성능 최적화 하기 - 초기 렌더링 시간 감소하기
  - property: og:description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, code-splitting, lazy-loading
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/optimize-performance/properly-size-images/
tags: ["react", "optimize-performance"]
---

# lighthouse를 이용해 성능 최적화 하기 (code-splitting, lazy-loading)

## 서론

이번 포스팅에서는 처음 페이지에서 사용하지 않는 불필요한 리소스를 줄임으로 초기 렌더링 시간을 감소시키는 `code-splitting`, `lazy-loading`에 대해서 알아보겠습니다. `Opportunities` 부분의 `un-use-javaScript`이 부분을 해결하는 과정이기도 합니다!

## 사전 알아야할 지식

먼저 `webpack-bundle-analyer`를 이용하여 현재 리소스를 초기 로딩할 때, 어떤 패키지가 로딩 시간을 많이 잡아먹는지 우선 파악하여야 합니다.

[cra-bundle-analyzer로 초기 chunk.js 구성 알아보기](https://kyounghwan01.github.io/blog/React/optimize-performance/bundle-analyzer/) 이 포스팅을 먼저 보고 와주세요!

## 왜 code-splitting을 하는가?

만약 아래와 같은 코드가 있다고 가정해봅시다

```jsx
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ListPage from "./pages/ListPage/index";
import ViewPage from "./pages/ViewPage/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ListPage} exact />
        <Route path="/view/:id" component={ViewPage} exact />
      </Switch>
    </div>
  );
}

export default App;
```

위의 코드는 맨처음 페이지에 진입하면 웹팩에서 압축한 번들파일을 다운 받게 됩니다. spa의 특징이기도 하게 맨처음 로딩할 때, 페이지의 전체 리소스를 다운 받게 되죠. 이때, 우리는 당장 보지 않아도 될 페이지의 리소스까지 기다리게되고, 리소스를 다 다운 받게 되면, 처음 페이지가 렌더링되고 우리 눈에 페이지가 보이게됩니다.

`code-splitting`, `lazy-loading`을 하는 이유는 이 떄문입니다. 초기에 굳이 로딩할 필요 없는 리소스 까지 다운을 받아 지루하게 기다린다는 점이죠. 그점이 `lighthouse`의 `unuse javascript`입니다.

그래서 우리는 `code-splitting` 기법을 이용하여 위 코드를 예제 맨 처음 리소스를 받을 때 `ListPage` 리소스만 받고, `/view/:id` 페이지에 진입하면 `ViewPage` 리소스를 다운받도록 `lazy-loading(지연 로딩)` 시킬 것입니다!

## code-splitting이란?

**불필요한 코드, 중복되는 코드 없이 적절한 사이즈의 코드가 적절한 타이밍에 적절한 로딩시간으로 로드되도록 하는 것**

코드를 분할 하는 것 덩치가 큰 번들파일을 분할하여, 작은 사이즈의 파일로 분할 하는 것을 말합니다. 위의 예를 들면 맨 처음 ListPage와 ViewPage 두개를 받아야 Bundle.js가 완성 되고 렌더링이 시작됩니다. 2개를 다 받아야하니 시간이 오래 걸려서 코드를 분할하여 Bundle.js가 ViewPage만 리소스를 받아도 로딩이 완료되도록 하는 것입니다.

## code-splitting 방법

코드스플리팅은 2가지 개념으로 번들을 자릅니다.

1. 페이지 별로 (현재 우리가 하는 방법입니다. list와 view 이렇게 라우트 단위로 자릅니다)
2. 모듈별로 (추후 이 개념으로 자르는 코드스플리팅을 포스팅 합니다)
3. 1,2번 방식 혼용

## code-splitting 방법

[Route-based code splitting code-splitting react 공식 문서](https://ko.reactjs.org/docs/code-splitting.html#route-based-code-splitting)이 문서를 참조하였습니다.

```jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// lazy 동적으로 필요할 때 import를 하여 실제로 로드되는 것
const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

### lazy

lazy는 동적으로 필요할 때 import를 하여 실제로 로드되는 것으로 정해진 주소로 접속하면 로딩됩니다.

### Dynamic import

Dynamic Import 는 일반적인 정적인 Module Import 를 필요한 시점 에 로드 할 수 있도록 도와줍니다. 이를 이용하면 거대한 하나의 js를 여러개로 쪼갤 수 있고, 화면이 위치할때마다 import 하는 기법입니다.

`import(...)`표현식은 모듈을 읽고 내보내는 모든 것을 포함하는 객체를 담는 Promise를 반환합니다. 호출은 어디에서든 가능합니다.

#### 예시

```js
import(modulePath)
  .then(obj => <모듈 객체>)
  .catch(err => <로딩 에러, e.g. 해당하는 모듈이 없는 경우>)
```

```js
// say.js
export function hi() {
  console.log("hi");
}

export function bye() {
  console.log("bye");
}

const { hi, bye } = await import("./say.js");

hi(); // hi
bye(); // bye
```

### Suspense

컴포넌트가 동적으로 로드되면 어느 순간 아무것도 로드되지 않는 순간이 생김니다. 이때 에러를 도출하지 않고 Suspense에 들어오는 컴포넌트를 렌더링 합니다.

### 사용 원리

코드 스플리팅을 하는 주체는 react가 아닌 webpack입니다. 그렇기에 webpack.config.js에서 코드 스플리팅에 대한 설정을 해야합니다. [webpack code splitting 문서](https://webpack.js.org/guides/code-splitting/#entry-points)

그러나 cra를 쓰면, 웹팩 작업을 cra가 해주기 때문에 필요없습니다.

### 사용법

동적 import로 나누고 싶은 컴포넌트를 넣어주면 되고, 꼭 Suspense를 반영해야합니다. 없으면 suspense를 만들라는 에러가 나옵니다.

```jsx
import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
const ListPage = lazy(() => import("./pages/ListPage/index"));
const ViewPage = lazy(() => import("./pages/ViewPage/index"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩중...</div>} />
      <Switch>
        <Route path="/" component={ListPage} exact />
        <Route path="/view/:id" component={ViewPage} exact />
      </Switch>
    </div>
  );
}

export default App;
```

## 결론

위처럼 나누면 "/" 라우트에 접속할 때, 한번 번들을 받고 "/view/:id"에 접속하면 한번 번들을 받는 것을 볼 수 있습니다. 즉, 초기에 한번 받는 리소스가 줄어듬을 확인 할 수 있고, 이는 초기 렌더링 속도가 개선되었다고 할 수 있습니다. `webpack-bundle-analyer`를 이용하면 더 확실하게 바뀐 점을 알 수 있습니다!

<TagLinks />
<Comment />
