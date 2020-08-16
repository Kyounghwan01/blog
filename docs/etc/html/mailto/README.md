---
title: html - a tag mailto 사용법
meta:
  - name: description
    content: html - a tag mailto 사용법
  - property: og:title
    content: html - a tag mailto 사용법
  - property: og:description
    content: html - a tag mailto 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/mailto/
tags: ["html"]
---

# a tag mailto 사용법

웹에서 `이메일 문의하기`를 누르면 메일함이 열리면서, 이메일을 특정인에게 특정 문구, 특정 참조를 가져와서 보내고 싶을 경우가 있습니다.<br>
이때 사용하는 것이 `a` 태그의 `mailto`기능을 사용합니다.

## 사용법

- 사용법은 `href`에 mailto라고 넣어주면 자동으로 열립니다 아래 예제로 알아봅시다.

### Subject

- 이메일 제목

### body

- 이메일 본문

### cc, bcc

- 참조이메일 주소, 숨은 이메일 참조 주소

### %0D%0A

- 이 문구는 아래로 내려쓰는 기능입니다 (new line)

### 정리

```html
<a
  href="mailto:이메일 주소?Subject=이메일 제목&body=이메일 %0D%0A내용&cc=참조이메일주소&bcc=숨은이메일참조주소"
  >이메일링크텍스트</a
>
```

- 무조건 새로운 창을 띄우기 때문에 redux store가 증발할 일이 없어 router의 link를 이용하지 않고 바로 a 태그를 사용해도 상관 없습니다.
