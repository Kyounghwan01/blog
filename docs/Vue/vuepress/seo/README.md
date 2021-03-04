---
title: vuePress seo 최적화 (sitemap, robots)
meta:
  - name: description
    content: vuePress seo 최적화 (sitemap, robots, google, blog)
  - property: og:title
    content: vuePress seo 최적화 (sitemap, robots)
  - property: og:description
    content: vuePress seo 최적화 (sitemap, robots)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/seo/
tags: ["vuepress"]
---

# vuePress seo 최적화 (sitemap, robots)

## 시작하기

vuepress 1.xx 버전 이상을 대상으로 합니다!

구글 seo를 최적화 하기 위해 해당 블로그에 sitemap, robots를 만드는 방법에 대해 알아보겠습니다~

## sitemap

이 기능은 구글 서치콘솔에서 seo 작업을 할때, sitemap이 필요한 경우 html을 xml로 바꿔주는 기능입니다.

1. 설치

- yarn add -D vuepress-plugin-sitemap

2. 사용

```js {3}
// .vuepress/config.js
module.export = {
  plugins: [["sitemap", { hostname: "https://kyounghwan01.github.io/blog/" }]]
};
```

- hostname에 블로그 사이트 url을 넣어주시면 됩니다.
- 배포 이후, 구글 서치 콘솔 가셔서 sitemap 제출란에 `https://yout_blog_url/sitemap.xml`로 등록하시면 됩니다.

## robots.txt

웹사이트에 웹 크롤러같은 로봇들의 접근을 제어하기 위한 규약이라고 생각하면 됩니다.

즉 구글, 네이버 같은 웹 사이트가 내 블로그의 어떠한 글은 긁어오고, 어떤 글은 보여주지 말라 라는 내용이 담겼다고 이해하시면 됩니다.

`robots.txt`는 파일 위치가 매우 중요합니다. 제가 말하는 곳 이외에 넣으면 `vuepress build` 명령어로 호스팅 전 빌드할 때, txt 파일이 없어지기 때문입니다.

**위치는 `.vuepress/public/robots.txt` 에 꼭 위치하도록 합니다.**

내용은 아래와 같습니다

sitemap에는 위에 등록한 sitemap 주소를 넣어주시면 됩니다.

저의 경우는 모든 글을 긁어올 수 있도록 하였고, 만약 허용하지 않는 글이 있다면 `Disallow: /`를 입력하고 `/`부분에는 해당 파일의 path를 위치하면 됩니다.

```
User-agent: *
Allow: /
Sitemap: https://kyounghwan01.github.io/blog/sitemap.xml
```

<TagLinks />

<Comment />
