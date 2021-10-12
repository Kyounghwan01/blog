---
title: mobx error - The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children
meta:
  - name: description
    content: mobx error - The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children
  - property: og:title
    content: mobx error - The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children
  - property: og:description
    content: mobx error - The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all childrencomputed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/mobx-error/
tags: ["react", "mobx"]
---

# MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children

## 원인
- 최상위 provider에서 store를 주입하고 있는데, 만약 최상위 컴포넌트가 리렌더링 될 경우 provider에 store값이 다시 할당 되어 store가 바뀌었다고 인식하기 때문

## 해결
- 최상위 컴포넌트 밖에서 store 값을 생성하고 provider에 주입함으로 provider를 실행하는 컴포넌트가 리렌더링 되어도 store 값이 바뀌지 않도록 함

## 예시

### 에러 코드

```js
import { Provider } from 'mobx-react';
import RootStore from 'store/RootStore';

function MyApp({ Component, pageProps }) {
  const rootStore = new RootStore();

	return (
			<Provider store={rootStore}>
				<ModalRoot />
				<Component {...pageProps} />
			</Provider>
	);
}

export default MyApp;
```

### 해결 코드

```js
import { Provider } from 'mobx-react';
import RootStore from 'store/RootStore';

// rootStore를 MyApp 컵포넌트 밖에 선언하고
const rootStore = new RootStore();

function MyApp({ Component, pageProps }) {
	return (
      // 비구조화할당으로 store 값을 넘긴다.
			<Provider {...rootStore}>
				<ModalRoot />
				<Component {...pageProps} />
			</Provider>
	);
}

export default MyApp;
```


<TagLinks />

<Comment />


