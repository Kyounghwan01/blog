---
title: vuePress public 폴더 관리
meta:
  - name: description
    content: vuePress public 폴더 관리
  - property: og:title
    content: vuePress public 폴더 관리
  - property: og:description
    content: vuePress public 폴더 관리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-public/
tags: ["vuepress"]
---

# vuePress public 폴더 관리

vuepress에서 img, icon, 임의의 html을 넣는 경우가 있습니다.<br>
저의 경우 seo를 위해서 google search에서 주는 html을 넣어야하는 경우였습니다.<br>

vuepress내부에 아무리 html또는 img를 첨부해도 vuepress build 명령어를 실행하는 순간 내부 로직에 의해 모두 사라지게 됩니다.<br>

## 해결

예를 들어 우리가 `/logo.png`에 접근한다고 합시다.<br>
이미지가 build에도 남아있으려면 `.vuepress/public`폴더에 이미지를 위치시켜야 합니다.

```
mkdir .vuepress/public
// 이미지를 이동합니다
```

- 이후 `vuepress build`를 시키면 `.vuepress/public`에 올린 이미지 `/logo.png`가 위치한 것을 보실 수 있습니다.

<TagLinks />

<Comment />
