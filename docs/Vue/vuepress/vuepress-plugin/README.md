---
title: vuePress plugin 사용법
meta:
  - name: description
    content: vuePress plugin 사용법
  - property: og:title
    content: vuePress plugin 사용법
  - property: og:description
    content: vuePress plugin 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-plugin/
tags: ["vuepress"]
---

# vuePress plugin 사용법

## 시작하기

vuepress 0.x버전과 1.x 버전의 가장 큰 차이는 **플러그인을 지원하는가**입니다.<br>
플러그인을 지원하게 됨으로, seo라든지 sitemap, 댓글기능 등등 많은 npm라이브러리를 사용할 수 있게 되어 우리의 블로그에 더 많은 기능을 추가 할 수 있게 되었습니다.<br>
그래서 오늘은 제가 사용하고 있는 vuepress 플러그인 및 플러그인 사용법에 대해서 살펴보겠습니다.

## 플러그인 추가 전 필요

플러그인 추가 전에 본인의 vuepress 파일의 package.json에서 하나 확인하실 것이 있습니다.<br>
devDependencies에 vuepress가 설치되어 있는 지 꼭 확인합니다.<br>
저의 경우 vuepress가 설치 안되어 있었는데, 플러그인을 설치하니까 빌드 중에, 플러그인 인식 에러가 뜨더라구요. 꼭 설치 하시고 시작 하여야합니다. 버전은 상관 없습니다.

```json
"devDependencies": {
  "vuepress": "^1.5.2",
}
```

## plugin-back-to-top

첫번째 플러그인은 vuepress에서 공식 추천한 플러그인 입니다.<br>
블로그 글을 읽고 스크롤이 바닥에 위치하면 맨위로 올려주는 버튼이 만들어지는 플러그인입니다.

1. 설치

- yarn add -D @vuepress/plugin-back-to-top

2. 사용

```js
// .vuepress/config.js
module.export = {
  plugins: ["@vuepress/back-to-top"]
};
```

끝입니다. 정말 쉽게 플러그인을 사용하도록 만들었습니다.

## 구글 애널리틱스

두번째 플러그인은 구글 애널리틱스입니다. 블로그에 어떤 글이 인기가 많은지, 어느날, 특정 시간때에 유입량이 많은지 데이터로 보여주는 기능입니다.

1. 설치

- yarn add -D @vuepress/plugin-google-analytics

2. 사용

```js
// .vuepress/config.js
module.export = {
plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: // UA-00000000-0
      }
    ],
    ["@vuepress/back-to-top"],
  ]
}
```

3. ga 등록

- [구글 애널리틱스](https://analytics.google.com/analytics) 여기 들어가셔서 블로그 사이트 등록하시면 위와 같이 `UA-00000000-0` 같은 키가 나옵니다. 그 값을 `["@vuepress/google-analytics", {ga: xxxx}]`여기에 넣어주시면 됩니다.

## sitemap

이 기능은 구글 서치콘솔에서 seo 작업을 할때, sitemap이 필요한 경우 html을 xml로 바꿔주는 기능입니다.

1. 설치

- yarn add -D vuepress-plugin-sitemap

2. 사용

```js
// .vuepress/config.js
module.export = {
plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: // UA-00000000-0
      }
    ],
    ["@vuepress/back-to-top"],
    ["sitemap", { hostname: "https://kyounghwan01.github.io/blog/" }]
  ]
}
```

- hostname에 블로그 사이트 url을 넣어주시면 됩니다.
- 배포 이후, 구글 서치 콘솔 가셔서 sitemap을 `https://kyounghwan01.github.io/blog/sitemap.xml`로 등록하시면 됩니다.

## last-updated

추가시 게시글의 맨 밑에 게시글의 마지막 수정일이 기재됩니다.

1. 설치

- yarn add -D @vuepress/plugin-last-updated

2. 사용

```js
// .vuepress/config.js
module.export = {
plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: // UA-00000000-0
      }
    ],
    ["@vuepress/back-to-top"],
    ["sitemap", { hostname: "https://kyounghwan01.github.io/blog/" }],
    ["@vuepress/last-updated"],
  ]
}
```

<TagLinks />

<Comment />
