---
title: svelte에서 절대경로 사용법
meta:
  - name: description
    content: svelte에서 절대경로 사용법, svelte, alias
  - property: og:title
    content: svelte에서 절대경로 사용법, svelte, alias
  - property: og:description
    content: svelte에서 절대경로 사용법, svelte, alias
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Svelte/alias/
tags: ["svelte"]
---

# 절대경로 사용법

이번 포스팅에서는 svelte에서 절대경로를 사용하는 방법에 대해 알아보겠습니다

`../../`와 같은 상대 경로를 사용하지 않고 절대 경로를 사용하는 이유는 파일의 위치가 이동될 경우 상대 경로의 경우 다시 경로를 바꿔줘야한다는 단점이 있기에 저는 모든 파일을 절대 경로로 사용하고 있습니다

svelte에서 절대경로를 사용하기 위해서는 `rollup.config.js`에서 몇가지 작업을 해야합니다

그전에 package를 설치합니다

## @rollup/plugin-alias 설치

svelte는 devDependencies에 패키지를 설치한다는 점을 유의하시기 바랍니다

```
yarn add -D @rollup/plugin-alias
```

## rollup.config.js 수정

위와 같이 설치했다면 `plugins` 배열에 설치한 alias를 실행해줍니다

아래 코드와 같이 작성해주세요

```js
...
import path from "path";
import alias from "@rollup/plugin-alias";

export default {
  ...
  plugins: [
    ...
    // 절대경로 alias 추가하기
    // 아래와 같이 설정시 ~/components는 /src/components 경로로 실행됩니다
    alias({
      entries: [
        {
          find: "~",
          replacement: path.resolve(__dirname, "src/")
        }
      ]
    }),
  ]
}
```

위와 같이 작성하고 dev서버를 껏다가 켜줍니다

## components 예제

절대 경로 설정시 아래와 같이 alias를 사용할 수 있습니다

```html
<script>
  import Header from "~/components/Header.svelte";
</script>
```

<TagLinks />

<Comment />
