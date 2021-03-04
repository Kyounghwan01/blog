---
title: z-index로 인한 겹쳐진영역 이벤트 처리
meta:
  - name: description
    content: z-index로 인한 겹쳐진영역 이벤트 처리, css, javascript, html, z-index, pointer-event
  - property: og:title
    content: z-index로 인한 겹쳐진영역 이벤트 처리, css, javascript, html, z-index, pointer-event
  - property: og:description
    content: z-index로 인한 겹쳐진영역 이벤트 처리, css, javascript, html, z-index, pointer-event
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/CSS/dup-area-event/
tags: ["css"]
---

# 겹친 영역 이벤터

position과 z-index를 통해 영역이 겹쳐지면 z-index가 높은 영역의 이벤트만 발생합니다.

하지만 **뒤에 있는 영역의 이벤트를 발생** 시키고 싶을 때가 있습니다.

이럴때 사용하는 css가 있습니다.

```css
test {
  z-index: 999;
  /* z-index를 무시하고 겹쳐있는 영역을 클릭했을때 뒤에 있는 click 이벤트 반응하게 하기 */
	pointer-events: none; 
  /* HTML 요소에 정의된 이벤트( click, hover, drag, active...등 )를 비활성화한다. */
}
```

`pointer-events`라는 CSS 속성인데, 특정 엘리먼트의 트리거 역할을 설정합니다.

또한 이벤트 핸들러가 등록된 엘리먼트도 트리거를 막을 수 있습니다.

**속성**

`auto`

pointer-events 속성이 명시되지 않은 상태로 리셋해 버립니다. SVG 요소의 경우 visiblePainted 속성을 사용하면 동일한 효과를 기대할 수 있습니다.

`none`

해당 요소는 마우스 이벤트에 대해 트리거로서의 역할을 수행하지 않습니다. 그러나, 하위 요소중에 pointer-events 속성을 적용한 엘리먼트가 있다면, 하위 엘리먼트를 탐색할 가능성이 있습니다. 이러한 환경에서 이벤트 버블링/캡처링 단계를 거쳐 적절한 이벤트 핸들러를 호출하게 됩니다.

<TagLinks />

<Comment />
