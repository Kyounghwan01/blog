---
title: react - lighthouse를 이용해 성능 최적화 하기 (bottlenect 코드 찾고 성능 최적화)
meta:
  - name: description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, bottlenect 코드 찾고 성능 최적화
  - property: og:title
    content: react - lighthouse를 이용해 성능 최적화 하기 - 초기 렌더링 시간 감소하기
  - property: og:description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, bottlenect 코드 찾고 성능 최적화
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/optimize-performance/bottlenect 코드 찾고 성능 최적화/
tags: ["react", "optimize-performance"]
---

# lighthouse를 이용해 성능 최적화 하기 (bottlenect 코드 찾고 성능 최적화)

[lighthouse를 통해 perfomance를 측정하였습니다](https://kyounghwan01.github.io/blog/React/optimize-performance/intro/) 그중 오늘은 `Minify JavaScript`, `reduce JS execution time` 부분을 해결하겠습니다.

`Minify JavaScript`는 js의 코드의 중복, 공백등을 줄임으로 js파일을 줄이는 것을 말하며 cra의 경우 빌드를 하면서 자동으로 처리해주기 때문에 우리가 코드상 바꿔야 할 부분은 없습니다.

`reduce JS execution time`는 진짜 우리의 코드의 실행시간을 줄이라는 뜻입니다. js의 코드가 오래 걸렸다는 뜻입니다. 하지만 중요한 문제는 어떤 코드가 오래 걸렸는지 알 수 없습니다.

그래서 크롬 개발자 도구의 `Perfomance` 탭을 유의하게 보아야합니다.

Perfomance는 페이지가 로드 되면서 실행되는 작업들을 타임라인, 차트형으로 보여줍니다.

새로 고침 버튼을 누르면 초기 렌더링을 하면서 어떠한 번들이 시간이 많이 걸리는지 차트로 보여줍니다.

xxx.chunk.js가 우리의 자바스크립트 코드입니다.

아래의 차트 중 Main을 눌러서 어느 컴포넌트의 어떤 함수가 오래 실행하는지 살펴보고, 그 함수를 리펙토링 하면됩니다.

또는 network 통신을 할때 이상한 점을 느낄 수 있습니다.
api를 통신을 하는 과정에서 걸리는 시간이 (Summary - `Duration764.95 ms (16.83 ms network transfer + 748.12 ms resource loading`)) 이렇게 통계가 나왔다면 누가 봐도 `resource loading` 코드 부분이 이상한 것이겠죠.
해당 api를 부르고 응답을 받은 후, 데이터를 가공하는 과정에서 굉장히 오랜 시간이 걸린 것이니 응답 받은 후 로직을 리펙토링 하면 됩니다.

react의 경우 `Timings` 탭을 클릭하면 어떤 컴포넌트의 렌더링이 오래 걸리는지 이름으로 표시 해줍니다.

**경험상 컴포넌트의 로딩 중 걸리는 시간의 대부분을 특정 함수 이름이 차지하고 있다면 그 함수가 범인일 가능성이 매우 높습니다.**

특정 함수가 매우 여러번 실행되었다면 그 사이사이 간격에 garbage collecter (GC )가 포함되어있는지 확인합니다. GC가 사이에 있다면 그 함수는 여러번 호출된게 아니라 한번 실행되는 중입니다. (메모리의 한계를 느끼고 GC가 메모리를 초기화 하기에 끊기는 것 처럼 보임)

오래 걸리는 특정 함수를 발견했다면 리펙토링 후, 처음으로 돌아가 다시 Performance의 새로고침 버튼을 클릭하고 해당 함수를 다시 찾아가 로딩 시간이 개선 되었는지 재확인합니다.

dev와 produce환경과 웹팩, minify를 하기에 성능에 차이가 있습니다.
production 빌드는 `npm run build`를 통해 나온 파일을 실행하여, 성능 측정합니다.

<TagLinks />
<Comment />
