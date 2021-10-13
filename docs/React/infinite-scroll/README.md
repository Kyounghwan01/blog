---
title: react로 구현하는 무한 스크롤
meta:
  - name: description
    content: react로 구현하는 무한 스크롤, Intersection Observer API, react-window, infinity scroll, react, next, react-virtualized
  - property: og:title
    content: react로 구현하는 무한 스크롤, Intersection Observer API, react-window, infinity scroll, react, next, react-virtualized
  - property: og:description
    content: react로 구현하는 무한 스크롤, Intersection Observer API, react-window, infinity scroll, react, next, react-virtualized
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/infinite-scroll/
tags: ["react"]
---

# react로 구현하는 무한 스크롤

- react로 무한 스크롤 구현하는 방법에 대해 알아보겠습니다.
- 두가지 방법으로 알아보겠습니다. `Intersection Observer API`를 사용하는 방법과, `react-window`라는 라이브러리를 사용하는 방법으로 알아보겠습니다.

## Intersection Observer API를 사용한 무한 스크롤

- `Intersection Observer API`를 사용하여 구현하는 방법은 고전적으로 사용하는 scroll 이벤트를 걸어서 스크롤할때마다 함수가 실행되는 스크롤 이벤트보다 성능적으로도 우월하고 사용하기도 편합니다.
- `Intersection Observer`는 타겟(ref) 엘리먼트와 뷰포트가 교차하는 부분의 변화를 비동기적으로 관찰하는 API입니다.
- 이 예제에서는 observer가 bottom을 감지하고 bottom이 true가 되면 새로운 리스트를 불러오는 방식으로 로직을 구현하겠습니다.

```js
import { useState, useRef, useEffect } from 'react';
import ProductCard from 'components/ProductCard';

const ProductMain = ({ list, params }) => {
	const [bottom, setBottom] = useState(null);
	const bottomObserver = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					const { page, totalElement, limit } = params.pageData;
					if (totalElement < limit * (page - 1)) {
						return;
					}
					params.getProductList({ page: page + 1 });
				}
			},
			{ threshold: 0.25, rootMargin: '80px' },
		);
		bottomObserver.current = observer;
	}, []);

	useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);

	return (
		<>
			{list.map(card => (
				<ProductCard key={card.id} data={card} />
			))}
			<div ref={setBottom} />
		</>
	);
};

export default ProductMain;
```

## react-window로 구현하는 무한 스크롤

> 스크롤 이벤트 또는 observer로 무한 스크롤을 구현하면 치명적인 단점이 있습니다. 스크롤을 계속 밑으로 내려서 데이터가 100개 1000개 쌓이게 되면 브라우저 dom은 100개 또는 1000개가 추가 되어 브라우저는 버벅이게 되고 사용자의 ux가 나빠집니다.

- 이러한 단점을 막기 위해 `react-window` 또는 `react-virtualized`가 있습니다. 두 라이브러리의 공통점은 100개의 element가 있고 사용자가 3번째 element을 보고있다면 dom은 현재 보고있는 3번째 element만 보여주고 나머지는 dom에서 제거한다는 것입니다. 그렇게 되면 몇만개가 있어도 브라우저는 버벅이지 않게 되고 리렌더링될때 시간도 매우 절약됩니다.
- 둘의 차이점은 `react-virtualized`는 개발자가 사용할 만한 모든 기능을 다 넣었습니다. (그만큼 용량이 큽니다)
- `react-window`는 가장 기본적인 기능만 넣어 놓고(그만큼 용량이 작습니다), 개발자가 원하면 다른 라이브러리를 추가로 받는다는 점 입니다.
- 필요한 기능만 다운 받아쓰는 `react-window`가 좀 더 react스러워서 `react-window`를 사용하도록 하였습니다.
- 만약 아래 예시처럼 Grid를 사용 하지 않고, List를 사용하면 더 쉽게 구현 가능합니다. [공식문서](https://github.com/bvaughn/react-window)를 참조하세요.

```js
import { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
// 반응형을 위해 자동으로 width나 height을 알고 싶을때 사용
import AutoSizer from 'react-virtualized-auto-sizer';
// 무한스크롤할때 사용
import InfiniteLoader from 'react-window-infinite-loader';
import { v4 } from 'uuid';
import styled from 'styled-components';
import ProductCard from 'components/ProductCard';

const GUTTER_SIZE = 10;

const ProductMain = ({ list, params }) => {
	const Cell = ({ columnIndex, rowIndex, data, style }) => (
		<>
			{data[rowIndex * 2 + columnIndex] && (
				<div
					key={v4()}
					style={{
						...style,
						left: style.left + GUTTER_SIZE,
						top: style.top + GUTTER_SIZE,
						width: style.width - GUTTER_SIZE,
						height: style.height - GUTTER_SIZE,
						msOverflowStyle: 'none',
						scrollbarwidth: 'none',
					}}>
					<ProductCard type="main" key={v4()} data={data[rowIndex * 2 + columnIndex]} />
				</div>
			)}
		</>
	);

	const loadMore = () => {
		const { page, totalElement, limit } = params.pageData;
		if (totalElement < limit * (page - 1)) {
			return;
		}
		params.getProductList({ page: page + 1 });
	};

	return (
		<>
      <ProductMainBlock>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader isItemLoaded={index => index < list.length} itemCount={list.length + 1} loadMoreItems={loadMore}>
              {({ onItemsRendered, ref }) => {
                // onItemsRendered는 Grid가 아닌 List를 사용하면 <List onItemsRendered={onItemsRendered} />이렇게 넘겨주면 됩니다.
                // 그러나 Grid를 사용하면 리스트의 바닥에 스크롤이 도달해도 자동으로 onItemsRendered가 실행 되지 않습니다. 그래서 아래처럼 임의 함수를 만들어서 <Grid onItemsRendered={newItemsRendered} /> 형태로 넘깁니다.

                const newItemsRendered = gridData => {
                  const { visibleRowStopIndex, overscanRowStartIndex, overscanRowStopIndex, overscanColumnStopIndex } = gridData;

                  const visibleStartIndex = overscanRowStartIndex * overscanColumnStopIndex;
                  const visibleStopIndex = overscanRowStopIndex * overscanColumnStopIndex;

                  // 현재 브라우저에 보여지는 list가 맨 바닥이면 onItemsRendered를 실행한다.
                  if (visibleRowStopIndex >= list.length / 2 - 1) {
                    onItemsRendered({ visibleStartIndex, visibleStopIndex });
                  }
                };

                return (
                  <Grid
                    style={{ paddingBottom: '100px' }}
                    itemCount={list.length + 1}
                    itemData={list}
                    columnCount={2}
                    columnWidth={(width - GUTTER_SIZE) / 2}
                    height={height}
                    rowCount={Math.ceil(list.length / 2)}
                    rowHeight={width / 2 + 160}
                    onItemsRendered={newItemsRendered}
                    width={width}
                    ref={ref}>
                    {Cell}
                  </Grid>
                );
              }}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </ProductMainBlock>
		</>
	);
};

const ProductMainBlock = styled.div`
	height: 100vh;
	width: 100%;
`;

export default ProductMain;
```

<TagLinks />

<Comment />
