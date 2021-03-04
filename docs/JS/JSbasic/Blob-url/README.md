---
title: image Blob 객체를 url로 바꾸어 img 띄우기
meta:
  - name: description
    content: image Blob 객체를 url로 바꾸어 img 띄우기, javascript, JavaScript, blob, createObjectUrl, revokeObjectUrl, react, vue, window, document
  - property: og:title
    content: image Blob 객체를 url로 바꾸어 img 띄우기, javascript, JavaScript, blob, createObjectUrl, revokeObjectUrl, react, vue, window, document
  - property: og:description
    content: image Blob 객체를 url로 바꾸어 img 띄우기, javascript, JavaScript, blob, createObjectUrl, revokeObjectUrl, react, vue, window, document
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/Blob-url/
tags: ["JS"]
---

# image Blob 객체를 url로 바꾸어 img 띄우기

Blob은 javascript에서 이미지, 사운드, 비디오 같은 멀티 데이터를 다룰 때 사용합니다. 사용처는 Blob으로 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터 송수신을 원활하게 히기 위해 작은 Blob 객체로 나누는 등에 사용합니다.

그중에서 오늘은 서버로 받은 Blob 객체를 local window에서만 사용하는 url로 바꾸어 html의 img 태그의 src 속성에 사용해보는 시간을 가져보겠습니다!

## createObjectURL

Blob 객체를 url로 만들때는 [URL.createObjectURL()](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL) 이 메소드를 사용합니다.

`URL.createObjectURL()` 메소드는 주어진 객체를 가리키는 URL을 DOMString으로 변환하는 기능을 합니다. 해당 url은 window 창이 사라지면 함께 사라집니다. 그에 따라 다른 window에서 재 사용이 불가능 하고 이 URL은 수명이 한정되있습니다.

아래 예시처럼 사용할 수 있습니다.

```js
let blob = new Blob([new ArrayBuffer(data)], { type: "image/png" });

const url = window.URL.createObjectURL(blob); // blob:http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30

document.getElementById("image").src = url;
```

## revokeObjectURL

`createObjectURL`를 통해 만들어진 url는 해당 브라우저가 존재한 상태에서 `revokeObjectURL` 메소드로 url을 무효화 시키지 않으면 js 엔진에서 garbage collect를 시키지 않고 계속 변수가 남아 메모리 누수가 됩니다.

그렇기 때문에 url 사용을 종료하면 `revokeObjectURL` 메소드를 사용하여 브라우저가 더이상 이 객체를 메모리에 들고 있지 않아도 된다고 알려야합니다.

```js
// blob 생성
let blob = new Blob([new ArrayBuffer(data)], { type: "image/png" });

// url 생성
const url = window.URL.createObjectURL(blob); // blob:http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30

// url 사용 후에 메모리에서 제거하기
window.URL.revokeObjectURL(url);
```

## 브라우저 지원 확인

blob 객체가 현재 브라우저에서 사용 가능한지 확인합니다

```js
const blobSupported = new Blob(["ä"]).size === 2; // Boolean
```

<TagLinks />

<Comment />
