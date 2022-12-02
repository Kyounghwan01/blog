---
title: JavaScript - 배열 같은 값 추가
meta:
  - name: description
    content: JavaScript - 배열 같은 값 추가, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, array, fill, 배열을 선언하는 방법
  - property: og:title
    content: JavaScript - 배열 같은 값 추가, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, array, fill, 배열을 선언하는 방법
  - property: og:description
    content: JavaScript - 배열 같은 값 추가, js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, array, fill, 배열을 선언하는 방법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/array-same-value/
tags: ["JS"]
---

# 배열 같은 값 추가

> 배열을 선언할때 같은 값을 여러개 만들고 싶을 때가 있습니다. 배열내에 값이 3개만 있으면 된다면 `const array = [1,1,1]` 이렇게 넣으면 되겠지만 배열내 같은 값을 100개 넣는 경우라면 말이 달라집니다. 어떻게 깔끔하게 한줄로 선언하는지 알아보도록 하겠습니다.

먼저 배열을 선언하는 방법이 두가지가 있습니다 첫번째는 모두가 아는 `[]`를 이용하여 선언하는 방법입니다.

```js
const array = [];
```

두번째는 `new Array()`를 이용하는 방법입니다. 괄호안에는 number 값이 들어가며 number에 해당하는 length의 배열을 생성합니다. 만약 값을 넣게 되면 그 값을 배열에 추가합니다.

```js
const array = new Array(3); // [비어있음 x 3] undefined 3개인 배열

const array = new Array('n', 'k', 'h'); // ['n', 'k', 'h']
```

우리는 이 두번째 배열 선언 방법으로 같은 값을 원하는 length만큼 만들어 보겠습니다. 배열 메소드에는 `fill` 메소드가 있습니다. fill 메소드는 배열에 값을 채워 넣는 방법으로 이 메소드를 사용하면 우리가 하려던 작업을 할 수 있습니다.

만약 test라는 string값을 10개 만든다면 아래와 같습니다.

```js
const array = new Array(10).fill('test');
```

배열을 선언하는 방법 및 배열에 같은 값을 넣는 방법에 대해 알아보았습니다. 첫번째 방법을 대부분 사용하겠지만 특수한 경우도 있기 때문에 두번째 배열을 선언하는 방법도 알아두면 좋을 것 같습니다.


<TagLinks />

<Comment />
