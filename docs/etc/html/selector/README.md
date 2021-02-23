---
title: html - selector (선택자) 정리
meta:
  - name: description
    content: html - selector (선택자) 정리
  - property: og:title
    content: html - selector (선택자) 정리
  - property: og:description
    content: html - selector (선택자) 정리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/selector/
tags: ["html", "css"]
---

# selector (선택자) 정리

## 유형 선택자

html에 div 또는 span으로 정의한 경우 해당 선택자를 css에 사용합니다.

```css
div {
  width: 300px;
}
```

html로 코딩된 모든 div를 선택하기 때문에 header, nav, section, article로 나눈다

## 전체 선택자

`* {}`로 접근하여 전역으로 영향을 미칩니다.

## id 선택자

```html
<div id="name">id selector</div>
<style>
  #id {
    width: 100px;
  }
</style>
```

## class 선택자

```html
<div class="name name2">id selector</div>
<style>
  .name {
    width: 100px;
  }
  .name2 {
    height: 200px;
  }
</style>
```

## 자식 선택자

바로 아래 있는 요소만 선택됩니다.

즉 하나 아래 자식만 선택되고 한번더 nesting된 자식은 선택되지 않습니다.

```html
<div class="div_box">
  <div>
    children
    <div>not selected</div>
  </div>
</div>
<style>
  div.div_box > div {
    background: orange;
  }
</style>
```

## 자손 선택자

하위 자손 모두 선택합니다.

1, 2, 2-1 모두 선택됩니다.

```html
<section>
  <div>1</div>
  <div>
    2
    <div>2-1</div>
  </div>
</section>
<style>
  /* section안의 div를 모두 가져온다 */
  section div {
    background: orange;
  }
</style>
```

## 인접(형제) 선택자

`+` 기호를 사용합니다.

앞의 요소 바로 다음 요소만 사용 가능합니다.

```html
<div>
  <input type="checkbox" id="checkform" />
  <label for="checkform">
    <em></em>
  </label>
</div>

<style>
  input[id="checkform"] {
    display: none;
  }
  input[id="checkform"] + label em {
    padding: 10px;
  }
</style>
```

## 속성 선택자

### element[attr="value"]

attr는 기본요소에 추가적으로 들어오는 값

```html
<!-- name이 attr -->
<input type="text" name="user-id" />

<style>
  input[name="user-id"] {
    background: red;
  }
</style>
```

### element[attr^="value"]

해당 속성을 가진 선택자를 모두 사용합니다.

```html
<div>
  <a href="http://naver.com">네이버</a>
  <a href="http://google.com">구글</a>
  <!-- 요건 http가 없어서 css 안먹음 -->
  <a href="youtube.com">유튜브</a>
</div>

<style>
  a[href^="http"] {
    background: red;
  }
</style>
```

### element[attr$="value"]

value로 끝나는 속성을 가져옵니다

```html
<div>
  <a href="/file/selector.pdf">네이버</a>
</div>

<style>
  a[href$=".pdf"] {
    background: red;
  }
</style>
```

### element[attr*="value"]

value를 포함한 요소를 가져옵니다

```html
<div>
  <a href="http://naver.com">네이버</a>
  <a href="http://naverblog.com">블로그</a>
  <a href="http://news-naver.com">블로그</a>
</div>

<style>
  a[href*="naver"] {
    background: red;
  }
</style>
```

## 구조적 가상요소 선택자

### :first-child

첫번째 요소 가져옴

### :last-child

마지막 요소 가져옴

### :nth-child(n)

n번째 요소 가져옴
