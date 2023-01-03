---
title: JavaScript - 이미지 width, height 값 가져오기
meta:
  - name: description
    content: JavaScript - 이미지 width, height 값 가져오기, get image origin size
  - property: og:title
    content: JavaScript - 이미지 width, height 값 가져오기, get image origin size
  - property: og:description
    content: JavaScript - 이미지 width, height 값 가져오기, get image origin size
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/get-image-origin-size/
tags: ["JS"]
---

# 이미지 width, height 값 가져오기

> 이미지 본래의 사이즈를 가져와야 할 때 어떻게 하면 되는지 알아보겠습니다.

- `onLoad` 메소드는 이미지가 로드 되면 실행되는 함수로 이미지에 대한 정보를 넘겨줍니다.
- 우리는 image 엘리먼트를 잡아서 `naturalHeight`, `naturalWidth`로 이미지 본래의 크기를 알아냅니다.

```js
const checkImageWithHeight = ({ target: img }) => {
    // target은 콘솔로 찍어보면 <img alt="preview" onLoad={checkImageWithHeight} src={...}  /> 아렇게 이미지 엘리먼트가 들어갑니다.
    console.log(img.naturalHeight, img.naturalWidth);
};

<img alt="preview" onLoad={checkImageWithHeight} src={...}  />
```

<TagLinks />

<Comment />
