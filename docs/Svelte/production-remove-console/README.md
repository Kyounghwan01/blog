---
title: svelte에서 production에서 console 제거하기
meta:
  - name: description
    content: svelte에서 production에서 console 제거하기, svelte, alias, remove console in production env
  - property: og:title
    content: svelte에서 production에서 console 제거하기, svelte, alias, remove console in production env
  - property: og:description
    content: svelte에서 production에서 console 제거하기, svelte, alias, remove console in production env
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Svelte/production-remove-console/
tags: ["svelte"]
---

# production 환경에서 console 제거하기

이번 포스팅에서는 svelte의 production 환경에서 console 제거하는 방법에 대해 알아보겠습니다

운영환경에서는 불필요한 콘솔은 무조건 제거를 해야겠죠 그렇다고 배포전에 프로젝트의 모든 콘솔을 다 제거하는 것도 무리입니다. 다음 개발에서 해당 콘솔이 또 쓰일 수 있기 때문이죠.

그래서 env를 통해 현재 환경에 dev인지 production인지 파악하고 production이면 콘솔 및 warn을 제거하는 방법에 대해 알아보겠습니다

그전에 package를 설치합니다

## @rollup/plugin-alias 설치

svelte는 devDependencies에 패키지를 설치한다는 점을 유의하시기 바랍니다

```
yarn add -D @rollup/plugin-strip
```

## rollup.config.js 수정

위와 같이 설치했다면 `plugins` 배열에 설치한 plugin-strip를 실행해줍니다

아래 코드와 같이 작성해주세요

```js
...
import strip from "@rollup/plugin-strip";

// production 환경이면 true, dev 환경이면 false
const production = !process.env.ROLLUP_WATCH;

export default {
  ...
  plugins: [
    ...
    // production 일때 svelte 또는 js 파일내에 쓰이는 console, assert는 모두 제거한다
    production &&
      strip({
        include: "**/*.(svelte|js)",
        function: ["console.*", "assert.*"]
      }),
  ]
}
```

<TagLinks />

<Comment />
