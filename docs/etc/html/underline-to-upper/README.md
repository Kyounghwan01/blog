---
title: 밑줄 위로 올리기
meta:
  - name: description
    content: 밑줄 위로 올리기, under line to upper, border-bottom to up, text-decoration, react, vue, html, css, javascript, typescript
  - property: og:title
    content: 밑줄 위로 올리기, under line to upper, border-bottom to up, text-decoration, react, vue, html, css, javascript, typescript
  - property: og:description
    content: 밑줄 위로 올리기, under line to upper, border-bottom to up, text-decoration, react, vue, html, css, javascript, typescript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/underline-to-upper/
tags: ["html", "css"]
---

# 밑줄위로 올리기

아래 코드 샌드박스와 같이 특정 글자를 관통하는 밑줄을 넣어야하는 때가 있습니다. 그럴땐 아래와 같이 2가지 방법으로 진행하시면 됩니다.

## text-decoration

첫번째 방법은 text decoration를 이용하는 방법입니다. 먼저 underline으로 해당 div의 아래에 줄을 긋고, 그 줄을 위로 끌어올리는 형식으로 이용합니다. 줄의 두께, 색 모두 커스텀 가능합니다. text-underline-offset의 음수값이 잘 작동하지 않는 브라우저도 있으니 꼭 확인하시기 바랍니다.

```css
text-decoration: underline;
text-decoration-color: #f0cdb9
text-decoration-thickness: 10px;
text-underline-offset: -30px;
```

## after 속성 이용

두번째 방법은 css의 after를 이용하는 방법입니다. 아래와 같은 방법으로 after 속성을 이용해 밑줄을 그립니다.

```css
.underline::after {
  content: "";
  background-color: yellow;
  height: 12px;
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -8%;
  z-index: -1;
}
.underline {
  position: relative;
}
```

아래 codesendbox에 코드 전체 개시하였으니 참고하시면 되겠습니다!

<iframe src="https://codesandbox.io/embed/beautiful-shape-qyi6y7?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="beautiful-shape-qyi6y7"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<TagLinks />

<Comment />
