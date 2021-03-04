---
title: vuePress 댓글 기능 Disqus로 추가하기
meta:
  - name: description
    content: vuePress 댓글 기능 Disqus로 추가하기
  - property: og:title
    content: vuePress 댓글 기능 Disqus로 추가하기, Disqus
  - property: og:description
    content: vuePress 댓글 기능 Disqus로 추가하기, Disqus
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-content/
tags: ["vuepress"]
---

# vuePress 댓글 기능 Disqus로 추가하기

댓글을 가장 추가하기 쉬운 `Disqus`를 사용합니다.<br>
`Disqus` 홈페이지에 접속하여, 현재 가지고 계신 블로그를 등록하면, `https://~~~~~/embed.js`라는 url를 `Disqus`에서 제공할 것입니다. 그 값을 꼭 복사하신 후 아래로 진행하시면 되겠습니다.<br>
자세한 회원가입 과정은 생략하겠습니다.

## 댓글 컴포넌트

- 댓글을 가져오는 컴포넌트를 먼저 만들겠습니다.

```html
<!-- .vuepress/components/Disqus.vue -->

<template>
  <div id="disqus_thread"></div>
</template>

<script>
  export default {
    mounted() {
      console.log("Hello!");
      try {
        let disqus_config = function() {
          this.page.url = location.origin;
          this.page.identifier = location.pathname;
        };
        (function() {
          let d = document,
            s = d.createElement("script");
          s.src = "disqus에서 가져온 embed.js url를 넣어줍니다";
          s.setAttribute("data-timestamp", +new Date());
          (d.head || d.body).appendChild(s);
        })();
      } catch (e) {
        // some error
      }
    }
  };
</script>
```

## 사용

- 포스팅 작성하시는 README.md 내부에 원하시는 위치에 `<Disqus />`를 넣어주시면됩니다.

## 개선

- 위처럼 사용하면 모든 README.md에 `<Disqus />`를 넣어주셔야하는 단점이 있습니다.
- 중복으로 컴포넌트를 부르는 것을 개선해 봅시다.

1. @vuepress/theme-default 설치

- yarn add -D @vuepress/theme-default

2. theme 컴포넌트 만들기

```js
// .vuepress/theme/index.ks
module.exports = {
  extend: "@vuepress/theme-default"
};
```

```html
<!-- .vuepress/theme/Layout.vue -->
<template>
  <ParentLayout>
    <Disqus slot="page-bottom" class="content" />
  </ParentLayout>
</template>

<style scoped>
  .content {
    width: 750px;
    margin: 0 auto;
  }
</style>

<script>
  import ParentLayout from "@parent-theme/layouts/Layout.vue";
  import Disqus from "../components/Disqus";
  export default {
    components: {
      ParentLayout,
      Disqus
    }
  };
</script>
```

- 위와 같이 추가하면 `<Disqus />` 가 없는 README.md에도 자동으로 댓글기능이 활성화됩니다.
- 단, READMD.md에 `<Disqus />`가 있으면, README에 있는 `<Disqus />` 컴포넌트가 우선 활성화 됩니다.

<TagLinks />

<Comment />
