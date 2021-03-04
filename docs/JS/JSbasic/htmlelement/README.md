---
title: JavaScript - Element 노드다루기
meta:
  - name: description
    content: Html Element 노드다루기
  - property: og:title
    content: Html Element 노드다루기
  - property: og:description
    content: Html Element 노드다루기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/htmlelement/
tags: ["JS"]
---

# Html Element 노드다루기

## getElementsByTagName

**getElementsByTagName()**는 문서 전체 또는 특정 노드에서 ()안의 매개변수 값 엘리먼트를 찾을 수 있습니다.

#### 문법 & 예제

```js
//문법
document.getElementsByTagName("tagname");

//예제
//p태그를 가진 두번째 요소를 선택
var example1 = document.getElementsByTagName("p")[1];
//p태그를 가진 두번째 요소안의 strong 태그를 가진 요소를 선택
var example2 = example1.getElementsByTagName("strong");
```

## getElementsByClassName

getElementsByClassName은 클래스의 이름을 알고 있거나 이 클래스가 적용된 엘리먼트를 문서 전체에서 찾고 싶을때 사용합니다.

```html
<div class="section1">div</div>
```

```js
var section1s = document.getElementsByClassName("section1");

for (var i = 0; i < section1s.length; i++) {
  var section1 = section1s.item(i);
  section1.style.border = "1px solid #0000ff";
}
```

## getElementsByClassName

getElementsByClassName은 클래스의 이름을 알고 있거나 이 클래스가 적용된 엘리먼트를 문서 전체에서 찾고 싶을때 사용합니다.

```html
<div class="section1">div</div>
```

```js
var section1s = document.getElementsByClassName("section1");

for (var i = 0; i < section1s.length; i++) {
  var section1 = section1s.item(i);
  section1.style.border = "1px solid #0000ff";
}
```

## getElementById

getElementById 는 문서 전체에서 id 값으로 특정 엘리먼트를 찾습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>The first p element in the document.</p>
    <p>Another p element.</p>

    <p>
      Click the button to get the HTML content of the first p element (index 0)
      in this document.
    </p>

    <button onclick="myFunction()">Try it</button>

    <p id="demo"></p>

    <script>
      function myFunction() {
        var nodelist = document.getElementsByTagName("P").item(0).innerHTML;
        document.getElementById("demo").innerHTML = nodelist;
      }
    </script>
  </body>
</html>
```

## childNodes

- 자식 노드를 모두 구하고 싶을 때

  - 특정 엘리먼트의 하위 노드인 자식 노드에 접근 하고 싶을 때 childNodes를 사용 합니다.

- 자식 노드의 N번째 노드에 접근 하고 싶을 때

  ```js
  var node = page.childNodes[N];
  //또는
  var node = page.childNodes.item(N);
  ```

```html
<!--바디태그의 첫번째 자식 노드인 p 태그가 Changed! 바뀐다.-->
<!DOCTYPE html>
<html>
  <body>
    <p>This is the first p element in body.</p>

    <p>
      Click the button to change the HTML content of the body element's first
      child node (index 0).
    </p>

    <button onclick="myFunction()">Try it</button>

    <script>
      function myFunction() {
        document.body.childNodes.item(0).innerHTML = "Changed!";
      }
    </script>
  </body>
</html>
```

- 첫번째 자식 노드 접근

  - firstChlid를 사용하여 첫번째 자식 노드에 접근합니다.

  ```css
  요소:first-child {
    속성: 속성값;
  }

  .header: first-child {
    background-color: #8e44ad;
  }
  ```

- 마지막 자식 노드 접근

  - lastChild를 사용하여 마지막 자식 노드에 접근합니다.

## parentNode

- 특정 엘리먼트의 부모노드에 접근할 때 parentNode를 사용합니다.

  ```javascript
  var header = document.getElementById("header");

  header.parentNode.style.border = "4px solid #ff0000";
  ```

## previousSibling & nextSibling

- 형제노드를 찾을 때 사용하는 방법으로 previousSibling : 앞 형제 노드, nextSibling : 뒤 형제노드에 접근 합니다

```js
var content = document.getElementById("content");

content.previousSibling.previousSibling.style.border = "4px solid #ff0000";

content.nextSibling.nextSibling.style.border = "4px solid #ff0000";
```

[참조](https://begindeveloper.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8DOM-%EB%85%B8%EB%93%9C-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

<TagLinks />

<Comment />
