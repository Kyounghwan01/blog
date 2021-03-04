---
title: JavaScript - 이벤트 핸들러 동작 과정
meta:
  - name: description
    content: JavaScript - 이벤트 핸들러 동작 과정
  - property: og:title
    content: JavaScript - 이벤트 핸들러 동작 과정
  - property: og:description
    content: JavaScript - 이벤트 핸들러 동작 과정
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/eventhandler/
tags: ["JS"]
---

# 이벤트 핸들러

주요 이벤트 동작

- 이벤트 핸들러 등록
- 이벤트 객체 획득
- 이 객체에서 정보 추출
- 이벤트가 처리됐다는 신호 전달

## 이벤트 핸들러 등록

- 브라우저마다 이벤트 동작여부가 알 수 없으니 런칭 할 경우 핸들러 사용 유의해야 한다.

```js
function register(node, event, handler) {
  if (typeof node.addEventListener == "function") {
    node.addEventListener(event, handler, false);
  } else {
    node.attachEvent("on" + event, handler);
  }
}
register(button, "click", function() {
  print("클릭(2)");
});
```

## 이벤트 객체

```js
register(document.body, "click", function(event) {
  event = event || window.event;
  console.log(event.clientX + "," + event.clientY);
});
```

## 마우스 관련 이벤트 타입

- 마우스 버튼 누름 : mousedown
- 마우스 버튼 놓음 : mouseup
- 클릭됨을 알림 : click
- 더블 클릭 : dblclick
- 마우스가 어느 노드에서 왔다 : mouseover : 자식노드로 들어가면 실행
- 마우스가 어느 노드로 갔다 : mouseout

```js
reg(myParagraph, "mouseover", function(event) {
  event = event || window.event;
  if (event.target === myParagraph) {
    console.log("단락에 들어감");
  }
});
```

## 키보드 관련 이벤트 타입

- 키보드 눌림 : keydown
- 키보드 놓음 : keyup
- 입력된 문자 : keypress

```js
reg(document.body, "keypress", function(event) {
  event = event || window.event;
  var charCode = event.charCode || event.keyCode;
  if (charCode) {
    console.log(String.formCharCode(charCode));
  }
});
```

## 이벤트 중지

처리 중인 이벤트를 '중지'시키고 이후의 처리 과정이 진행되지 못하게 함.

1. 이벤트가 부모노드와 부모 노드에 정의된 핸들러로 진행되지 못하게 한다.
   1. 이벤트 버블링 : stopPropagation 메소드로 중지
2. 브라우저가 이벤트와 관련된 표준 동작을 수행하지 못하게 한다.
   1. 기본 동작 저지 : preventDefault

<TagLinks />

<Comment />
