---
title: linear-gradient 특정영역에만 설정
meta:
  - name: description
    content: linear-gradient 특정영역에만 설정, css, javascript, html, z-index, pointer-event
  - property: og:title
    content: linear-gradient 특정영역에만 설정, css, javascript, html, z-index, pointer-event
  - property: og:description
    content: linear-gradient 특정영역에만 설정, css, javascript, html, z-index, pointer-event
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/CSS/linear-gradient/
tags: ["css"]
---

# linear-gradient 특정영역에만 설정

전체 height가 300px이고 우리는 상단 100px만 linear-gradient를 가진 컬러를 그리고 나머지 200px은 특정 컬러로 스타일링 하고 싶을 수 있습니다. 그때는 아래와 같습니다.

## linear-gradient

linear-gradient는 아래와 같은 속성값을 가집니다.

- linear-gradient(방향-또는-각도, 색상과 해당 색상의 끝점, ...색상과 해당 색상의 끝점 n번째);

### 방향,각도

- to bottom, to right, to top, to left가 있으며 to bottom은 밑으로 색 방향을 정하겠다 입니다.

### 예시

- 상단 100px만 red에서 blue로 그라데이션을 그리고 나머지는 yellow로 색상을 준다.

```css
.container {
  background: linear-gradient(to bottom, red 0%, blue 100px, yellow);
}
```

<TagLinks />

<Comment />
