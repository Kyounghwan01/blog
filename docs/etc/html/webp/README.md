---
title: webp를 이용하여 모바일 웹앱 이미지 로딩 최적화
meta:
  - name: description
    content: webp를 이용하여 모바일 웹앱 이미지 로딩 최적화
  - property: og:title
    content: webp를 이용하여 모바일 웹앱 이미지 로딩 최적화
  - property: og:description
    content: webp를 이용하여 모바일 웹앱 이미지 로딩 최적화
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/webp/
tags: ["html"]
---

# webp를 이용하여 모바일 웹앱 이미지 로딩 최적화

## webp란?

webp는 구글이 웹의 트래픽 감소, 로딩 시간 단축을 위하여 만든 이미지 포맷입니다

기존 png,jpg보다 훠얼씬 빠른 속도로 이미지를 로딩하기 위해 만든 포맷입니다 (기존 파일보다 크기가 30%이상 작아짐)

웹 사이트에 빠른 속도로 많은 사람이 진입해야 그만큼 구글 광고 시청률이 올라가고 그것이 매출로 직결되기에 개발했다고합니다

## webp 파일 만드는법

먼저 png파일을 준비하고 구글에 `png to webp`를 검색하여 변환 사이트에 이미지를 넣어주면 webp로 변환하여 다운 받을 수 있습니다

## webp 파일 적용 방법

html에서는 picture 태그와 같이 사용합니다

아래와 같이 사용하며, png와 webp중 더 빠르게 로딩된 이미지를 브라우저가 보여주게 됩니다

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.png" />
</picture>
```

## 주의사항

크롬, 엣지, 파이어폭스, 오페라, 사파리는 지원하나 `IE`는 지원하지 않습니다
