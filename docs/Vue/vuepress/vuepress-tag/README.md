---
title: vuePress - tag 만들기
meta:
  - name: description
    content: vuePress tag 만들기
  - property: og:title
    content: vuePress tag 만들기
  - property: og:description
    content: vuePress tag 만들기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-tag/
tags: ["vuepress"]
---

# vuePress tag 만들기

인스타의 태그와 같은 기능을 블로그에 추가하려고합니다. <br>
많은 분들이 해놓은 코드에서 조금 개선하였습니다.

### 참조

[Adding Tags to Vuepress](https://code.roygreenfeld.com/cookbook/adding-tags-to-vuepress.html) 내용을 참고하였습니다.

## 목표

- 해시태그를 게시글에 넣는 기능
- 게시물에 달린 해시태그 클릭시 같은 해시태그가 달린 글 목록 불러오기

## 태그 만들기

- [Frontmatter](https://v1.vuepress.vuejs.org/guide/frontmatter.html)

  - Frontmatter는 vuepress에서 만든 게시글의 요약 정보를 담고 있는 데이터입니다. 저희는 이 중에 [tags](https://v1.vuepress.vuejs.org/guide/frontmatter.html#tags)를 이용하여 태그 시스템을 구축하겠습니다.

- 예시에는 아래와 같이 tags를 만들어 사용합니다.

```yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
tags: ["VuePress", "Tags", "vue"]

# 글 작성란..
---

```

## 태그 보여줄 컴포넌트 만들기

- 위에서 게시글 마다 태그를 달았습니다. 그러면 `Frontmatter`의 `tags`에 해당 배열 (`["VuePress", "Tags", "vue"]`)이 들어갔습니다.
- 이후 `Frontmatter`를 받아 렌덜하는 컴포넌트를 생성하고, 게시글의 맨 마지막에 해당 컴포넌트를 호출하여, 게시글 마다 내가 쓴 태그가 어떤것인지 보여주도록 하겠습니다.

```html
<!-- .vuepress/components/TagLinks -->
<template lang="html">
  <div class="tags">
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tag/#${tag}` }"
    >
      #{{ tag }}
    </router-link>
  </div>
</template>

<style scoped>
  .tags {
    margin: 30px 0;
  }
  a {
    margin-right: 10px;
  }
</style>
```

- `$page.frontmatter.tags`를 이용하면 우리가 만든 태그 (`tags: ["VuePress", "Tags", "vue"]`)를 읽어 올 수 있습니다.

### tagLinks 사용

```md
# 글입니다

태그 만들기

## 글이에요

태그 링크도 만들기

### 아래처럼 만든 태그 링크 컴포넌트를 마지막에 불러와요

<TagLinks />
```

## 태그 리스트 만들기

- 태그를 달았으니 만든 태그들이 모여있는 리스트 컴포넌트를 만들겠습니다.

```html
<!-- .vuepress/components/TagList -->
<template lang="html">
  <div>
    <span v-for="tag in Object.keys(tags)">
      <h2 :id="tag">
        <router-link
          :to="{ path: `/tag/#${tag}` }"
          class="header-anchor"
          aria-hidden="true"
          >#</router-link
        >
        {{ tag }}
      </h2>
      <ul>
        <li v-for="page in tags[tag]">
          <router-link :to="{ path: page.path }">{{ page.title }}</router-link>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      tags() {
        let tags = {};
        // 전체 게시글에서 태그들을 가져옵니다.
        for (let page of this.$site.pages) {
          for (let index in page.frontmatter.tags) {
            const tag = page.frontmatter.tags[index];
            if (tag in tags) {
              tags[tag].push(page);
            } else {
              tags[tag] = [page];
            }
          }
        }
        return tags;
      }
    }
  };
</script>
```

- 원하시는 태그리스트를 넣을 곳에 `<TagList />`로 컴포넌트를 불러오시면 됩니다.
- 태그 리스트를 만들었다면, 태그 링크스를 클릭시 해당 태그가 모여있는 곳으로 router이동 합니다.

<TagLinks />

<Comment />
