---
title: Element.getBoundingClientRect() - react에서 사용하기
meta:
  - name: description
    content: Element.getBoundingClientRect(), 뷰포트 기준으로 엘리먼트 위치 알아내기, viewport, javascript, js, getElementById, react 예시
  - property: og:title
    content: Element.getBoundingClientRect(), 뷰포트 기준으로 엘리먼트 위치 알아내기, viewport, javascript, js, getElementById, react 예시
  - property: og:description
    content: Element.getBoundingClientRect(), 뷰포트 기준으로 엘리먼트 위치 알아내기, viewport, javascript, js, getElementById, react 예시
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/getBoundingClientRect/
tags: ["JS", "react"]
---

# Element.getBoundingClientRect()

`getBoundingClientRect()` 메서드는 DOMRect요소의 크기와 브라우저 뷰포트에 상대적인 위치에 대한 정보를 제공 하는 객체를 반환합니다.

`getBoundingClientRect`는 화면에서 잡은 dom을 어디에 위치한 지 알기 위해 사용합니다.

## 구문

`getBoundingClientRect`의 구문은 다음과 같습니다.

```js
domRect = element.getBoundingClientRect();
```

## 설명

getBoundingClientRect의 return 값은 해당 dom의 `width`, `height`, `left`, `top`, `right`, `bottom`, `x`, `y`를 알려주며 `width`와 `height`는 뷰포트의 왼쪽 상단을 기준으로 합니다.

## 예시

유저가 스크롤을 했을 때, element의 위치에 따라 element를 보여주거나 안보여주는 예시입니다. 이 예시는 react에 기반합니다.

useRef를 이용하여 dom을 잡고 해당 dom에 getBoundingClientRect 메소드를 실행하여 top 위치를 감지합니다. <br />
top 위치에 따라서 `hideElement`를 true 또는 false로 변경합니다.

```js
import { useState, useEffect, useRef } from "react";

function GetBoundingClientReactExample() {
  const [hideElement, setHideElement] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, [scrollRef.current]);

  const yScrollEvent = () => {
    const scroll = scrollRef.current.getBoundingClientRect();
    console.log(scroll);
    setHideElement(scroll.top <= -100);
  };

  return (
    <div style={{ height: "300vh", background: "#eee" }} ref={scrollRef}>
      {!hideElement && (
        <div style={{ position: "fixed", background: "#fff" }}>
          <span>스크롤을 일정 수치만큼 내리면 이 영역은 사라집니다!</span>
        </div>
      )}
    </div>
  );
}
```

위 예시는 top만 사용하였으나 아래 `scroll` 변수에 console을 출력해보면 다른 값들도 활용 가능합니다.

```js
console.log(scroll);

DOMRect {
  bottom: 1931
  height: 1920
  left: 0
  right: 360
  top: 11
  width: 360
  x: 0
  y: 11
}
```

<TagLinks />

<Comment />
