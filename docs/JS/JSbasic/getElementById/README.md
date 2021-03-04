---
title: JavaScript - getElementbyId 사용법
meta:
  - name: description
    content: JavaScript - getElementbyId 사용법
  - property: og:title
    content: JavaScript - getElementbyId 사용법
  - property: og:description
    content: JavaScript - getElementbyId 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/getElementById/
tags: ["JS"]
---

# getElementbyId 사용법

태그에 있는 id 속성을 사용하여 해당 태그에 접근하여 하고 싶은 작업을 할 때 쓰는 함수입니다!

해당 id가 없는 경우 null 에러가 발생합니다.

예시로 살펴보겠습니다

### 예시

버튼을 누르면 버튼 글자가 바뀌는 스크립트입니다.

html

```html
<button id="jsmode">바껴라</button>
```

js

```js
const mode = document.getElementById("jsmode");
mode.addEventListener("click", function() {
  if (mode.innerText == "바껴라") {
    mode.innerText = "??";
  } else {
    mode.innerText = "바껴라";
  }
});
```

위와 같이 버튼은 "jsmode"라는 Id를 찾도록 "getElementById"함수를 사용합니다.

이후 addEventListener함수를 통해 클릭시 innerText가 "??"로 바뀌도록 합니다.

<br>

두번째는 배경색 흑,백으로 theme을 적용하는 스크립트입니다

html

```html
<body id="target" class="white">
  <div id="control">
    <input type="button" value="white" id="white_btn" />
    <input type="button" value="black" id="black_btn" />
    <input type="button" value="border" id="border_btn" />
  </div>
</body>
```

css

```css
body.black {
  background-color: black;
  color: white;
}
body.white {
  background-color: white;
  color: black;
}
body.border {
  border: 2px solid red;
}
```

js

```javascript
wbtn = document.getElementById("white_btn");
wbtn.addEventListener("click", function() {
  document.getElementById("target").className = "white";
});

bbtn = document.getElementById("black_btn");
bbtn.addEventListener("click", function() {
  document.getElementById("target").className = "black";
});

borderbtn = document.getElementById("border_btn");
borderbtn.addEventListener("click", function() {
  document.getElementById("target").classList.add("border");
});
```

Html 바디 안에 버튼을 넣어서 클릭하면 배경이 바뀌도록 했고 3번째 border 바디에 테두리를 만드는 css 입니다.

wbtn는 getElementById함수를 통해 "white_btn"를 버튼에서 가져오게 되고, addEventListener를 통해 클릭시<br> "target"이라는 id를 가진 body태그에 "white" class를 추가합니다.

bbtn도 위와 동일합니다.

마지막 border는 클래스를 추가할 경우 사용하는 방법입니다.

id를 가져와서 바디에 적용하는 방식은 동일하고, 추가된 className를 바꾸지 않고 한번더 추가 할 경우<br> **classList.add("클래스 이름");** 으로 추가 할 수 있습니다.

<TagLinks />

<Comment />
