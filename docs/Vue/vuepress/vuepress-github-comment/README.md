---
title: vuepress + utterances (블로그에 github 댓글 추가하기)
meta:
  - name: description
    content: vuepress + utterances (블로그에 github 댓글 추가하기), Disque, Utterances, 블로그 댓글, vuepress, vue
  - property: og:title
    content: vuepress + utterances (블로그에 github 댓글 추가하기), Disque, Utterances, 블로그 댓글, vuepress, vue
  - property: og:description
    content: vuepress + utterances (블로그에 github 댓글 추가하기), Disque, Utterances, 블로그 댓글, vuepress, vue
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-comment/
tags: ["vuepress"]
---

# vuepress + utterances (블로그에 github 댓글 추가하기)

이 글을 오신 분들은 대부분 블로그를 가지고 계시고 댓글을 어떤 앱으로 구현할지 고민하시는 분일 것입니다

저는 2가지 방법 (utterances, disqus)로 구현을 했었는데요 그중 이번 글에서는 utterances로 댓글 시스템을 구현하는 방법에 대해 알아보겠습니다

disqus로 댓글 구현이 궁금하시면 [vuePress 댓글 기능 Disqus로 추가하기](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-content)이 포스팅을 방문해주시면 좋을 것 같습니다 난이도는 utterances, disqus 둘다 쉬우니 취향에 따라서 구현하시면 될꺼 같습니다

utterances의 장점은 github과 연동이 되어 있기 때문에 여러분의 폰에 깃헙 어플을 까시고 issue 알림을 on 하셨다면, 댓글이 달릴 때 마다 알림을 받을 수 있다는 점과 여러분들의 블로그가 개발 블로그라면 방문자들도 개발자일 확률이 매우 높고, 대부분 깃헙 아이디가 있을 테니 댓글이 달릴 가능성이 높다는 점으로 볼 수 있을 것 같습니다

## utterances 링크 걸 깃헙 리포 생성

먼저 우리의 블로그의 댓글 모음이 될 깃헙 리포를 생성해줍니다 저는 간단히 `blog-comment`로 새로운 리포를 만들었습니다 (무슨 말인지 모르겠다면 [여기](https://github.com/Kyounghwan01/blog-comment)를 참조해주세요)

그 다음 Utterances 설치를 위해 [여기](https://github.com/apps/utterances)에 들어가셔서 여러분 깃헙 계정으로 로그인 하시고 `install` 버튼을 눌러주세요

## 댓글 컴포넌트 추가

이제 여러분의 vuepress 소스로 이동합니다

### .vuepress/components/Comment.vue

`.vuepress/components/Comment.vue` 이 경로로 `Comment.vue` 파일을 만들어주시고 아래 코드를 복사 붙여넣기 해주세요

이때 주의할 점은 **`repo` 어트리뷰트에 여러분의 깃헙 이름, 댓글 깃헙 주소가 들어가야 합니다**

```vue
<template>
  <div ref="comment"></div>
</template>
<script>
export default {
  mounted() {
    // script tag 생성
    const utterances = document.createElement("script");
    utterances.type = "text/javascript";
    utterances.async = true;
    utterances.crossorigin = "anonymous";
    utterances.src = "https://utteranc.es/client.js";

    utterances.setAttribute("issue-term", "pathname"); // pathname|url|title|og:title 중 택 1
    utterances.setAttribute("theme", "github-light"); // theme 설정 (github-light, github-dark, preferred-color-scheme, github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light) 중 하나 선택
    utterances.setAttribute("repo", `Kyounghwan01/blog-comment`); // 주의!! 사용할 repository

    this.$refs.comment.appendChild(utterances);
  }
};
</script>
```

## vuepress에 댓글 넣기

### theme이 없는 경우

vuepress에 아무런 theme 작업을 한 적이 없다면 여러분의 `README.md`에 `<Comment />`를 원하는 위치에 끼워 넣습니다

아래는 사용 예시입니다

```md
# react로 다크모드 만들기

### 블라블라

#### 블라블라블라

<Comment />
```

이 말은 즉, 모든 포스팅에 `<Comment />` 이것을 넣어줘야한다는 뜻입니다

하지만 원하지 않는 곳에는 댓글을 뺄 수 있다는 장점이 있습니다

### 모든 곳에 댓글을 넣고 싶을 때

'아 나는 그냥 매번 `<Comment />` 넣기 귀찮으니까 한번에 다 넣어줘' 라고 생각하시면 아래와 같이 따라하시면 됩니다

#### .vuepress/theme/Layout.vue

```vue
<template>
  <ParentLayout>
    <Comment />
  </ParentLayout>
</template>

<script>
import ParentLayout from "@parent-theme/layouts/Layout.vue";
import Comment from "../components/Comment";
export default {
  components: {
    ParentLayout,
    Comment
  }
};
</script>
```

## 마무리

utterances 셋팅은 정말 간단합니다. 이제 사용자는 깃헙 로그인을 통해 댓글을 남길 수 있고, 댓글을 남기면 우리가 만든 `blog-comment` 리포의 `issue` 탭에 사용자가 남긴 댓글을 한번에 볼 수 도 있습니다. 또한 필요하다면 특정 포스팅의 댓글 알림도 같이 받을 수 있습니다.

댓글 기능이 정말 잘 진행되는지 확인해보고 싶다면 깃헙 로그인을 통해 아래에 테스트 댓글을 하나 남기고 [blog-comment issue](https://github.com/Kyounghwan01/blog-comment/issues) 이곳에 방문하셔서 여러분이 남기신 댓글을 확인해보시면 좋을 것 같습니다!!

<TagLinks />

<Comment />
