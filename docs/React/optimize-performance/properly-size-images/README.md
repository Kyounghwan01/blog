---
title: react - lighthouse를 이용해 성능 최적화 하기 (Properly size images, Serve images in next-gen formats, Efficiently encode images)
meta:
  - name: description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, Properly size images, Serve images in next-gen formats, Efficiently encode images
  - property: og:title
    content: react - lighthouse를 이용해 성능 최적화 하기 - 이미지 성능 최적화
  - property: og:description
    content: react - lighthouse를 이용해 성능 최적화 하기, performance, Properly size images, Serve images in next-gen formats, Efficiently encode images
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/optimize-performance/properly-size-images/
tags: ["react", "optimize-performance"]
---

# lighthouse를 이용해 성능 최적화 하기 (Properly size images, Serve images in next-gen formats, Efficiently encode images)

이번 포스팅에서는 `Opportunities` 부분의 `Properly size images`,`Serve images in next-gen formats` `Efficiently encode images` 항목을 최적화하는 방법에 대해서 알아보겠습니다.

## 원인

세 문제는 모두 동일하게 이미지 사이즈를 최적화하라는 의미입니다. 가져오는 이미지의 용량이 현재 보여지는 화면의 용량보다 크기 때문에 과도하게 많은 용량을 가져온다는 의미로 이미지의 사이즈를 줄이라는 뜻으로 받아들이면 됩니다.

## 해결

화면에 표시되는 사이즈 (예: 120x120)과 실제 이미지의 용량을 일치시켜라!

### 이미지 용량 확인하는 방법

사이트의 요소검사로 이미지 클릭시 현재 이미지 사이즈와 이미지 용량 확인 가능합니다. (120 × 120 pixels (intrinsic: 1200 × 1200 pixels) → 실제 이미지보다 10배 큰 사이즈로 가져오는 상황, 레티나 디스플레이를 위해 2배(240x240)까지는 넣어줘야한다.)

### 용량을 어떻게 줄일까 → 이미지는 어디서 오는지 먼저 파악해야함

대부분 api의 response 통해 image url을 가져옵니다.
api를 통해 받아오면 어떻게 이미지 줄이나? -> imgix 같은 이미지 cdn을 사용합니다.

### image cdn 이란?

서버로 부터 이미지를 불러오면 image를 크게하거나, 줄이거나, 직사각형을 둥글게 만들어주는 회사에 이미지를 의뢰해서 원하는 형태로 이미지를 바꾸는 방법 [imgix](https://www.imgix.com/)

### 어떻게 이미지 줄이나 → image cdn 사용

이미지를 사용자에게 보내기 전에 jpg의 포맷을 바꾸거나, 용량을 줄여서 사용자에게 전송 (1200짜리를 120으로 줄여서 사용자에게 전달)
ex → http://cdn.image.com?src=img.src&width=200&height=100

이미지를 가져오는 매체 (unsplash, aws s3)에서 image cdn을 자체 제공해주면 굳이 사제 이미지 cdn을 사용 안해도 됩니다.

### image cdn 사용 안하면 → 이미지 불러오는 웹 코드를 최적화

image를 불러오는 컴포넌트에서 최적화를 합니다.

```tsx
// unsplash에서 제공하는 image cdn 사용
function getParametersForUnsplash({ width, height, quality, format }) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
}

<img
  src={
    props.image +
    getParametersForUnsplash({
      width: 1200,
      height: 1200,
      quality: 80,
      format: "jpg"
    })
  }
  alt="thumbnail"
/>;
```

또는

```
// aws s3에서 제공하는 image cdn 사용
https://img.kr/image_${width}x${height}.png
```

위처럼 이미지 사이즈를 최적화 하면 `Properly size images` 는 사라집니다!

<TagLinks />

<Comment />
