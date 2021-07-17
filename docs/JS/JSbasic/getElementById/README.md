---
title: JavaScript - getElementbyId 사용법
meta:
  - name: description
    content: JavaScript - getElementbyId 사용법, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web
  - property: og:title
    content: JavaScript - getElementbyId 사용법, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web
  - property: og:description
    content: JavaScript - getElementbyId 사용법, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/getElementById/
tags: ["JS"]
---

# getElementbyId 사용법

태그에 있는 id 속성을 사용하여 해당 태그에 접근하여 하고 싶은 작업을 할 때 쓰는 함수입니다!

해당 id가 없는 경우 null 에러가 발생합니다. ID가 없는 요소에 접근하려면 [document.querySelector()](https://kyounghwan01.github.io/blog/JS/JSbasic/queryselector/)를 사용하세요.

## 사용법

`document.getElementById(id);`에 해당 element의 id를 넣음으로 사용합니다

### 반환값

주어진 id와 일치하는 dom 요소를 나타내는 `Element 객체`를 반환하거나 주어진 id와 일치하는 dom 요소가 없으면 `null`을 return 합니다

### 예시

버튼을 누르면 버튼 글자가 바뀌는 스크립트입니다.

#### HTML

```html
<button id="jsmode">바뀌기 전 text</button>
```

#### JS

```js
const mode = document.getElementById("jsmode");
mode.addEventListener("click", function() {
  if (mode.innerText === "바뀌기 전 text") {
    mode.innerText = "바뀐 text!";
  } else {
    mode.innerText = "바뀌기 전 text";
  }
});
```

위와 같이 버튼은 "jsmode"라는 Id를 찾도록 `getElementById` 함수를 사용합니다.

`mode`라는 return 값을 이용하여 이후 `addEventListener` 함수를 통해 클릭시 innerText가 "바뀐 text!"로 바뀌도록 합니다.

<html>
<button onclick="(
  function(){
    var test = document.getElementById('jsmode');
    if(test.innerText === '바뀌기 전 text') {
      test.innerText = '바뀐 text!';
    } else {
      test.innerText = '바뀌기 전 text';
    }
  })()" id="jsmode">바뀌기 전 text</button>
</html>

[addEventListener](https://kyounghwan01.github.io/blog/JS/JSbasic/addEventListener/) 를 좀더 알고 싶으면 이 링크를 참조해주세요!!

### 두번째는 배경색 흑,백으로 theme을 적용하는 스크립트입니다

#### HTML

```html
<body id="target" class="white">
  <div id="control">
    <input type="button" value="white" id="white_btn" />
    <input type="button" value="black" id="black_btn" />
    <input type="button" value="border" id="border_btn" />
  </div>
</body>
```

#### CSS

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

## JS

```js
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

wbtn는 `getElementById` 함수를 통해 "white_btn"를 버튼에서 가져오게 되고, addEventListener를 통해 클릭시<br> "target"이라는 id를 가진 body태그에 "white" class를 추가합니다.

bbtn도 위와 동일합니다.

마지막 border는 클래스를 추가할 경우 사용하는 방법입니다.

id를 가져와서 바디에 적용하는 방식은 동일하고, 추가된 className를 바꾸지 않고 한번더 추가 할 경우<br> **classList.add("클래스 이름");** 으로 추가 할 수 있습니다.

<TagLinks />

<Comment />
