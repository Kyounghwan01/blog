---
title: JavaScript - 동작원리 및 이벤트 루프 상세히 알아보기
meta:
  - name: description
    content: JavaScript - 동작원리 및 이벤트 루프 상세히 알아보기
  - property: og:title
    content: JavaScript - 동작원리 및 이벤트 루프 상세히 알아보기
  - property: og:description
    content: JavaScript - 동작원리 및 이벤트 루프 상세히 알아보기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/eventLoop/
tags: ["JS"]
---

# 자바스크립트와 이벤트 루프

js의 특징은 `single thread` 라는 점 이다<br>
`thread` 가 하나라는 말은 곧 동시에 하나의 작업만을 처리 할 수 있다는 것<br>
but 많은 스크립트 환경에서 많은 작업이 동시에 처리되고 있는 것을 본다<br>
예를 들면, 웹브라우저에서 애니메이션 효과를 보여주면서도 마우스 입력받아 처리하고 웹서버에서는 클라이언트의 http요청을 처리한다. <br>
하나의 스레드인데 어떻게 이러한 동시성을 지원하는 것인가?

이때 등장하는 개념이 `이벤트 루프`이다 node.js를 소개할 때 `이벤트 루프 기반의 비동기 방식으로 non-blocking io 를 지원하고…` 라는 문구를 본 적이 있을 것이다.
즉, js는 이벤트 루프를 사용해 비동기 방식으로 동시성을 지원한다.

## ECMAScript에는 이벤트 루프가 없다

좀더 구체적으로 말하면 ECMAScript에는 동시성이나 비동기와 관련된 언급이 없다.<br>
실제 js엔진은 단일 호출 스택을 이용하여, 요청이 들어올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리할 뿐이다. <br>
그렇다면 비동기 요청은 어떻게 이루어지며, 동시성에 대한 처리는 누가 하는 걸까?<br>
바로 이 js엔진을 구동하는 환경 즉, 브라우저나 node.js가 담당한다. <br>

브라우저 환경에서는<br>
비동기 호출을 위해 사용하는 `setTimeout`, `XMLHttpRequest`와 같은 함수들은 js엔진이 아닌 Web API영역에 따로 정의되어 있다. <br>

js 엔진은 비동기 작업을 위해 node.js의 api를 호출하며, 이때 넘겨진 콜백은 libuv의 이벤트 루프를 통해 스케쥴되고 실행된다.

## 단일 호출 스택과 Run-to-Completion

js의 함수가 실행되는 방식을 보통 `Run-to-Completion`이라고 말한다. <br>
이는 하나의 함수가 실행되면 이 함수의 실행이 끌날때 까지 다른 어떤 작업도 중간에 끼어들지 못한다는 의미이다.<br>
js엔진은 하나의 호출 스택을 사용하며, 현재 스택에 쌓여있는 모든 함수들이 실행을 마치고 스택에서 제거되기 전까지 다른 어떠한 함수도 실행되지 않는다. <br>

```js
function delay() {
  for (var i = 0; i < 100000; i++);
}
function foo() {
  delay();
  bar();
  console.log("foo!"); // (3)
}
function bar() {
  delay();
  console.log("bar!"); // (2)
}
function baz() {
  console.log("baz!"); // (4)
}

setTimeout(baz, 10); // (1)
foo();
```

위 코드는 bar! -> foo! -> baz!의 순서로 찍힌다.

setTimeout 함수는 브라우저에게 타이머 이벤트를 요청한 후 바로 스택에서 제거된다.<br>
이후 foo 함수가 스택에 추가되고, foo함수가 내부적으로 실행하는 함수들이 차례로 스택에 추가되었다가 제거된다.<br> 마지막으로 foo함수가 실행을 마치면서 호출스택이 비워지게 되고, 그 이후에 baz함수가 스택에 추가되어 콘솔에 baz!가 찍힌다.<br>

## 테스크 큐와 이벤트 루프

setTimeout함수를 통해 넘긴 baz함수는 어떻게 foo 함수가 끝나자마자 실행될 수 있을까?<br>
이 역할을 하는 것이 태스크 큐와 이벤트 루프이다. <br>

테스크 큐는 말그대로 콜백 함수들이 대기하는 큐(fifo)형태의 배열이라 할수있고,<br>
이벤트 루프는 호출 스택이 비워질때마다 큐에서 콜백 함수를 꺼내와서 실행하는 역할을 한다. <br>

위의 예제로 볼때<br>
코드가 처음 실행되면 이 코드는 `현재 실행중인 태스크`가 된다.<br> 코드를 실행하는 도중 10ms가 지나면 브라우저의 타이머가 baz를 바로 실행하지 않고 태스크 큐에 추가한다.<br> 이벤트 루프는 `현재 실행 중인 태스크`가 종료되자 마자 태스크 큐에 대기중인 첫번째 태스크를 실행한다.<br>
foo 함수 실행을 마치고 호출 스택이 비워지면 현재 실행중인 태스크는 종료되며,<br> 그때 이벤트 루프가 태스크 큐에 대기중인 첫번째 체스크인 baz를 실행해서 호출스택에 추가한다. <br>

이벤트 루프는 `현재 실행중인 태스크가 없는지?`와 `태스크 큐에 다음 실행 할 태스크가 있는지`를 반복적으로 확인하는 것 정리하면 다음과 같다

- 모든 비동기 api들은 작업이 완료되면 콜백 함수를 태스크 큐에 추가한다.
- 이벤트 루프는 `현재 실행중인 태스큭 없을 때 (주로 호출 스택이 비워졌을때)` 태스크 큐의 첫번째 태스크를 꺼내와 실행한다.

## 비동기 API와 try-catch

setTimeout 뿐만 아니라 브라우저의 다른 비동기 함수들(addEventListener, XMLHttpRequest)이나 node.js들 모든 비동기 방식의 api들은 이벤트 루프를 통해 콜백 함수를 실행한다

```js
$(".btn").click(function() {
  // (A)
  try {
    $.getJSON("/api/members", function(res) {
      // (B)
      // 에러 발생 코드
    });
  } catch (e) {
    console.log("Error : " + e.message);
  }
});
```

버튼 클릭하면 A 실행될 때, \$.getJson 함수는 브라우저의 xml api를 통해 서버로 비동기 요청을 보낸후 바로 실행을 마치고 스택에서 제거된다.그 이후 뒤의 응답받은 res(B)를 태스크 큐에 추가하고 B는 이벤트 루프에 의해 실행되어 호출 스택에 추가된다. 하지만 이때 이미 A는 스택에서 비워진 상태이기에 B가 바로 실행된다. 그렇기에 에러를 잡는 콘솔 에러창은 절대 뜨지 않는다.
이를 해결해기 위해 콜백 B의 내부에서 try-catch를 따로 실행한다.

```js
$("btn").click(function() {
  //(A)
  $.getJSON("/api/members", function(res) {
    try {
      //에러 발생 코드
    } catch (e) {
      console.log("Error : " + e.message);
    }
  });
});
```

## setTimeout(fn,0)

```js
setTimeout(function() {
  console.log("A");
}, 0);
console.log("B"); // B -> A
```

위의 예제에도 보았지만 setTimeout 함수는 콜백 함수를 바로 실행하지 않고,`console.log('A')`를 태스크 큐에 추가하고, 콜 스택에는 `console.log('B')` 가 들어간다. 이후 콜 스택이 비워지면 이벤트 루프에 의해 `console.log('A')`가 콜 스택에 들어가 콘솔에 A가 찍히게 된다.

클릭이벤트 같은 랜더링 엔진의 태스크는 대부분 브라우저에서 js 엔진과 동일한 단일 태스크 큐를 통해 관리된다 그로 인해 가끔 문제가 발생하는 데 다음 코드를 보자

```js
$(".btn").click(function() {
  showWaitingMessage();
  longTakingProcess();
  hideWaitingMessage();
  showResult();
});
```

`longTakingProcess();`가 너무 오래걸려서 그전에 `showWaitingMessage();`를 먼저 실행하여 로딩 메세지를 보이려 한다. 그런데 실제 이 코드를 실행하면 화면에 로딩 메세지가 표시되는 일은 없을 것이다. 그 이유는 `showWaitingMessage();` 함수의 실행이 끝나고 렌더링 엔진이 렌더링 요청을 보내도 해당 요청은 태스크 큐에서 이미 실행중인 태스크가 끝나기를 기다리고 있기 때문인다.
즉, 렌더링이 진행되는 시점에는 `hideWaitingMessage();`에 의해 로딩 화면은 이미 없어진 상태일 것이다.
이를 해결하기 위해 setTimeout함수를 응용한다.

```js
$(".btn").click(function() {
  showWaitingMessage();
  setTimeout(function() {
    longTakingProcess();
    hideWaitingMessage();
    showResult();
  }, 0);
});
```

이 같은 경우라면 `longTakingProcess();`가 바로 실행되지 않고 테스크 큐에 이동하고 콜 스택에 로딩메세지를 보여주는 함수가 들어가 로딩메세지가 렌더링 될 것이다.

이러한 예제 뿐만 아니라 실행이 너무 오래 걸리는 코드를 setTimeout을 사용하여 적절하게 다른 태스크로 나누어주면 전체 어플리케이션이 멈추거나 스크립트가 너무 느리다며 경고창이 뜨는 상황을 방지할 수 도 있을 것이다.

## 프라미스와 이벤트 루프

```js
setTimeout(function() {
  // (A)
  console.log("A");
}, 0);
Promise.resolve()
  .then(function() {
    // (B)
    console.log("B");
  })
  .then(function() {
    // (C)
    console.log("C");
  });
```

콘솔에 찍히는 순서는 어떻게 될까?<br>
프라미스도 비동기로 실행된다 했으니 태스크 큐에 추가되어 순서대로 a-b-c가 될까? <br>아니면 프라미스는 setTimeout처럼 최소단위 지연이 없으니 B-C-A일까? <br>체인 형태로 연속해서 호출된 `then()`함수는 어떤 식으로 동작할까? <br>결론 부터 말하자면 정답은 B-C-A인데,<br> 이유는 바로 프라미스가 마이크로 태스크를 사용하기 때문이다.

마이크로 태스크<br>
말그대로 일반 태스크보다 더 높은 우선순위를 갖는 태스크라고 할 수 있다. 즉, 태스크 큐에 대기중인 태스크 가 있더라도 마이크로 태스크가 먼저 실행된다.<br> 위 예제를 좀더 살펴보면,<br>
`setTimeout()` 함수는 콜백 A를 태스크 큐에 추가하고 프라미스의 `.then()`메소드는 콜백 B를 마이크로 태스크 큐에 추가한다. 위 코드의 실행이 끝나 태스크 이벤트 루프는 태스크 큐보다 마이크로 태스크 큐를 확인하고 B를 콜스택으로 가져온다. 그 이후 과정을 위와 동일 하다.

<TagLinks />

<Comment />
