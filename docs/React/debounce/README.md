---
title: React.js - lodash debounce react에서 사용하기 (useCallback)
meta:
  - name: description
    content: React.js - lodash debounce react에서 사용하기 (useCallback), react, next, lodash, useCallback, frontend, 프론트엔드
  - property: og:title
    content: eact.js - lodash debounce react에서 사용하기 (useCallback), react, next, lodash, useCallback, frontend, 프론트엔드
  - property: og:description
    content: eact.js - lodash debounce react에서 사용하기 (useCallback), react, next, lodash, useCallback, frontend, 프론트엔드
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/debounce/
tags: ["react"]
---

# debounce 사용하기

> react에서 debounce 사용 하는 방법에 대해 알아보겠습니다.

## debounce란?

- debounce는 dom 스크롤 또는 숫자 입력에 따른 api값 호출 같이 이벤트가 과도하게 많은 호출할 하는 경우 지정한 시간 동안 호출네 제약을 걸어 api 호출 과부하를 방지하는 기술입니다.
- debounce는 호출시 지정된 시간 이후 호출된 가장 마지막 이벤트만 실행되는 기술입니다. (지정된 시간이 0.5초이고, 0.5초내에 5번이 호출 되었다면 가장 마지막에 호출된 5번째 api만 서버로 호출한다는 뜻입니다)

## react에서 사용하기

- lodash라는 라이브러리의 debounce를 사용합니다.
- react에서 lodash를 사용 할때 유의할 점이 있습니다. 리렌더링 되는 컴포넌트 내에 debounce를 정의한 함수가 있고, 해당 컴포넌트가 state에 따라 리렌더링이 된다면 debounce 함수도 재생성되면서 debounce가 초기화 된다는 점입니다.
- 이 버그를 방지하기 위해서는 useCallback을 사용합니다. useCallback을 이용하여 state가 바뀜에도 debounce함수는 재생성이 되지 않도록 하여 debounce가 초기화 되지 않도록 막습니다. 아래 예시 코드로 자세히 알아보겠습니다.

### 예시 코드

```jsx
import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
const Index = () => {
  const [price, setPrice] = useState(0);

  const changePrice = e => {
		const { value } = e.currentTarget || e.target;
    // 1. setState를 하면서 컴포넌트가 리렌더링 됩니다.
		setPrice(value);
		const params = { price: value };
		handlePrice(params);
	};

  // 2. useCallback을 쓰고 price를 구독하지 않기 때문에 price가 바뀜에 따라 리렌더링 되어도 handlePrice는 재생성되지 않습니다.
	const handlePrice = useCallback(
		debounce(async params => {
			try {
				const response = await api({ params });
				console.log(response);
			} catch (e) {
				console.log('api 호출 실패');
			}
      // 3. 0.5초안에 호출된 가장 마지막 api만 서버로 호출합니다.
		}, 500),
		[],
	);

  return (
    ...
  )
}

export default Index;
```

<TagLinks />

<Comment />
