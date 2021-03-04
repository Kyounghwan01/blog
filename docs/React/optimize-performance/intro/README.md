---
title: react - lighthouse를 이용해 성능 최적화 하기
meta:
  - name: description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance
  - property: og:title
    content: react - lighthouse를 이용해 성능 최적화 하기
  - property: og:description
    content: react - lighthouse를 이용해 성능 최적화 하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/optimize-performance/intro/
tags: ["react", "optimize-performance"]
---

# lighthouse를 이용해 성능 최적화 하기 (intro)

## lighthouse란?

크롬에서 제공하는 웹사이트의 성능을 측정하는 도구입니다.
모바일, 데스크탑 모두 지원하며, 카테고리에는 Perfomance, Progressive web app, seo 등 다양한 지표가 있습니다.
그중에서 Perfomance만 중점으로 다룹니다.

## 측정하기

분석하고자 하는 사이트를 띄우고 크롬 개발자 도구를 띄워주세요. 그 다음 Lighthouse를 클릭하시고 카테고리의 Perfomance를 클릭 후, Generate report를 클릭하면 사이트를 분석해줍니다.

### 측정결과 참고사항

컴퓨터마다 같은 사이트도 점수가 다릅니다.
크롬에 달려있는 Lighthouse 는 결국 로컬 PC에서 검사를 진행하기 때문에 PC 환경에 영향을 받을 수 밖에 없기 때문입니다.

- CPU의 작업량에 여유가 있는 상태 vs CPU가 바쁘게 돌고 있는 상태(여러 프로그램을 띄워둔 상태)
- 미국에 있는 서버 홈페이지를 한국의 사용자가 검사할 때 vs 미국의 사용자가 검사할 때
- 웹서버에 트래픽이 많은 상황에서 검사를 했을 때 vs 트래픽이 없는 상황에서 검사를 했을 때

그래서 검사 결과를 절대적인 지표로 삼기 보다는 하나의 가이드로 생각하시는게 좋습니다.또한, 필요에 따라 한 번이 아닌 여러번 검사를 돌려보는 것도 좋은 방법입니다.

## 사이트의 문제점 및 해결책 제안

빨, 노 -> 최적화 하라
회색 → 문제는 아니지만 살펴봐라
초, Passed audits → 잘 되고 있는 항목

### Opportunities

리소스의 관점에서 가이드 → 로딩 성능

- Properly size images → 적절한 사이즈의 이미지를 써라
- Serve images in next-gen formats → 이미지 포맷 맞춰라
- Efficiently encode images → 효과적인 이미지 포맷을 써라
- Minify JavaScript → js 사이즈 줄여라
- Preconnect to required origins → preconnect를 사용하라
- Enable text compression → 서버에서 텍스트 압축을 받아서 api 통신을 하라
  - network 탭의 api의 Headers의 Content-Encoding 값이 gzip이면 압축한 값으로 요청한다는 의미
  - axios을 쓴다면, header에 `{Content-Encoding : gzip}`을 넣어서 압축된 값을 달라고 요청해야합니다.
  - 압축은 서버에서 해서 주는 것이기 때문에 요청해도 gzip으로 안온다면 서버 문제
  - 모든 파일을 인코딩하면 성능이 오히려 떨어진다고 합니다. (2kB이상이면 인코딩을 하는것이 유리, 그 이하면 그냥 보내는게 성능상 좋습니다. - 왜냐하면 서버에서 인코딩하면 프론트에서 디코딩해야하는 시간을 고려 했을때 용량이 극히 작다면 압축하고, 압축 푸는 시간이 더 오래 걸리기 때문 )

### Diagnostics

페이지의 실행 관점 → 렌더링 성능

- Minimize main-thread work → 메인 쓰레드 일을 최소화 하라
- Serve static assets with an efficient cache policy → 캐시 써라
- reduce JS execution time → 실행시간 감소하라

다음 포스팅 부터 각 문제별 해결방법을 포스팅하겠습니다.

<TagLinks />

<Comment />
