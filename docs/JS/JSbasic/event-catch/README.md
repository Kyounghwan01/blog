---
title: JavaScript - 이벤트 버블링/캡쳐/위임
meta:
  - name: description
    content: JavaScript - 이벤트 버블링, 이벤트 캡쳐링, 이벤트 위임, Delegation
  - property: og:title
    content: JavaScript - 이벤트 버블링/캡쳐/위임
  - property: og:description
    content: JavaScript - 이벤트 버블링/캡쳐/위임
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/event-catch/
tags: ["JS"]
---

# 이벤트 버블링/캡쳐/위임

## 이벤트 버블링

> 하위에서 상위 요소로의 이벤트 전파방식을 이벤트 버블링이라 한다.

이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성

div -> 상위 div -> body

```html
<body>
  <div class="one">
    <div class="two">
      <div class="three"></div>
    </div>
  </div>
</body>
```

```js
var divs = document.querySelectorAll("div");
divs.forEach(function(div) {
  div.addEventListener("click", logEvent);
});

function logEvent(event) {
  console.log(event.currentTarget.className);
}
```

- Three div 를 클릭하면 => three, two, one

  - 한개를 클릭했는데 3개의 이벤트 발생
    - 브라우저가 이벤트를 감지하는 방식 때문
  - 브라우저는 특정 화면 요소에 이벤트가 발생했을 때 그 이벤트를 최상위에 있는 화면 요소까지 이벤트를 전파, 따라서 3-2-1 순서로 태그에 등록된 이벤트 들이 실행됨
  - 주의 : 각 태그마다 이벤트가 등록되어 있기에 상위 요소로 이벤트가 전달되는 것 확인
  - if. 이벤트가 특정 div 만 달려있으면 안됨

## 이벤트 캡쳐

> 이벤트 캡쳐는 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식

```js
var divs = document.querySelectorAll("div");
divs.forEach(function(div) {
  div.addEventListener("click", logEvent, {
    capture: true // default 값은 false입니다.
  });
});

function logEvent(event) {
  console.log(event.currentTarget.className);
}
```

- `capture:true` 이벤트 감지를위해 이벤트 버블링과 반대 방향으로 탐색
  - one - two - three

## event.stopPropagation()

> 복잡한 이벤트 전달 방식을 알고 싶지 않고, 그냥 원하는 화면 요소의 이벤트만 신경쓰고 싶다
>
> ```js
> function logEvent(event) {
>   event.stopPropagation();
> }
> ```
>
> 위 처럼 stopPropagation api 사용

위 api는 이벤트가 전파되는 것을 막는다. 따라서 버블링은 해당 이벤트만 발생, 상위요소 전파 방해

```js
divs.forEach(function(div) {
  div.addEventListener("click", logEvent, {
    capture: true // default 값은 false입니다.
  });
});

function logEvent(event) {
  event.stopPropagation();
  console.log(event.currentTarget.className); // one
}
```

## 이벤트 위임 - event Delegation

> 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식

```js
<h1>오늘의 할 일</h1>
<ul class="itemList">
	<li>
		<input type="checkbox" id="item1">
		<label for="item1">이벤트 버블링 학습</label>
	</li>
	<li>
		<input type="checkbox" id="item2">
		<label for="item2">이벤트 캡쳐 학습</label>
	</li>
</ul>
```

```js
/*
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('clicked');
	});
});
*/

// 상위 ul tag에 이벤트 부여 , 이벤트 버블링 효과에 따라 아래 li에 요소가 추가되도 이벤트 실행 가능
var itemList = document.querySelector(".itemList");
itemList.addEventListener("click", function(event) {
  alert("clicked");
});

// 새 리스트 아이템을 추가하는 코드
var itemList = document.querySelector(".itemList");

var li = document.createElement("li");
var input = document.createElement("input");
var label = document.createElement("label");
var labelText = document.createTextNode("이벤트 위임 학습");

input.setAttribute("type", "checkbox");
input.setAttribute("id", "item3");
label.setAttribute("for", "item3");
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

<TagLinks />

<Comment />
