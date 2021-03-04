---
title: JavaScript - querySelector, querySelectorAll 사용법
meta:
  - name: description
    content: JavaScript - querySelector, querySelectorAll 사용법
  - property: og:title
    content: JavaScript - querySelector, querySelectorAll 사용법
  - property: og:description
    content: JavaScript - querySelector, querySelectorAll 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/queryselector/
tags: ["JS"]
---

# querySelector, querySelectorAll 사용법

### querySelector

**querySelector()**는 특정 name,id,class를 제한하지 않고 css선택자를 사용하여 요소를 찾습니다.

같은 id 또는 class 일 경우 스크립트의 **최상단 요소**만 로직에 포함합니다.

```
querySelector(#id) => id 값 id를 가진 요소를 찾습니다.
querySelector(.class) => class 값 class를 가진 요소를 찾습니다.
```

### querySelectorAll

querySelector와 사용 방법은 동일하며 선택자를 선택하여 배열과 비슷한 객체인 **nodeList**를 반환합니다. 반환객체가 nodeList이기에 **for문** 또는 **forEach문**을 사용합니다.

아래 코드와 같이 ","를 사용하면 여러 요소를 한번에 가져올 수 있습니다.

```
querySelectorAll("#id,.class")
```

### 예시

버튼을 누르면 버튼 글자가 바뀌는 스크립트입니다.

#### html

```html
<div id="sections">
  <ol class="section">
    1
    <li>1-1</li>
    <li>1-2</li>
    <li>1-3</li>
  </ol>

  <ol class="section">
    2
    <li>2-1</li>
    <li>2-2</li>
    <li>2-3</li>
  </ol>
</div>
```

#### js(querySelector)

```js
var section = document.querySelector("#sections .section");

section.style.border = "1px solid #ff0000";
```

실행해보시면 가장 윗단에 있는 section클래스만 border가 실행됨을 볼수 있습니다.

### js(querySelectorAll)

```js
var sections = document.querySelectorAll("#sections , #sections .section");
console.log(sections.constructor.name);
for (var i = 0; i < sections.length; i++) {
  var item = sections.item(i);
  item.style.border = "1px solid #ff0000";
}
```

for문을 통해 section클래스와 id를 가진 모든 요소에 border가 쳐졌습니다.

Item 메소드를 씀으로 sections의 값들에 접근하고 그중에서 style 속성에 들어가 border를 만드는 과정입니다. Item에 관한 내용은 이후에 포스팅 하겠습니다.

[참조](https://www.w3schools.com/jsref/met_nodelist_item.asp)

<TagLinks />

<Comment />
