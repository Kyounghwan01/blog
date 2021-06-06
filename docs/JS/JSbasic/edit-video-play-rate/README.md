---
title: 인터넷 강의, 동영상 배속 빠르게 하는 방법
meta:
  - name: description
    content: 인터넷 강의, 동영상 배속 빠르게 하는 방법, html, video, javascript, getElementsByTagName
  - property: og:title
    content: 인터넷 강의, 동영상 배속 빠르게 하는 방법, html, video, javascript, getElementsByTagName
  - property: og:description
    content: 인터넷 강의, 동영상 배속 빠르게 하는 방법, html, video, javascript, getElementsByTagName
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/edit-video-play-rate/
tags: ["JS"]
---

# 인터넷 강의, 동영상 배속 빠르게 하는 방법

우리가 흔히 보는 넷플렉스는 배속이 있는데, 왓챠의 경우는 배속이 없어 1배속으로만 감상해야합니다. 또한 대학 인터넷 강의도 교수님의 천천히 느린 강의를 그대로 듣고 있어야하죠

하지만 이번 포스팅을 따라오시면 간단하게 동영상을 원하는 배속으로 바꿀 수 있습니다

원리는 html의 video tag와 개발자 도구의 console 기능을 이용하여 바꾸는 것입니다

## 사용법

결론만 말씀드리면 우리가 콘솔에 작성해야하는 코드는 단 한줄입니다

```js
document.getElementsByTagName("video")[0].playbackRate = 2;
```

원리를 설명해드리면 대부분의 스트리밍 사이트 (youtube, netflix, watcha 등등)은 html의 video 태그를 이용하여 동영상을 재생시키고 있습니다

이 video에는 `playbackRate`라는 property를 가지고 있습니다 이 property는 배속을 담당하는 속성이구요

그래서 우리는 이 속성을 조작하여 배속 기능을 실행할 수 있는 것입니다

### 사용방법은 간단합니다

1. 먼저 재생하는 동영상을 실행합니다
2. `F12` 또는 `option + command + i`를 눌러서 개발자 도구를 띄웁니다
3. 상단에 `Console`을 누르시고 나오는 커서에 `document.getElementsByTagName("video")[0].playbackRate = 2;`를 입력하고 enter를 누릅니다
4. 위 과정을 정상적으로 따라오시면 영상이 2배속으로 재생됩니다

### 만약

만약 영상이 제대로 배속되지 않는다면 video 태그가 문제가 있을 수 있습니다 아래와 같은 방법으로 재시도 해보세요

1. `document.getElementsByTagName("video")`를 콘솔에 입력하여 `HTMLCollection [video.video-stream.html5-main-video]`이 값에 `[]`내부 값이 몇개인지 확인해봅니다
2. 만약 위 값이 없을 경우 해당 사이트는 video 태그를 사용하지 않기 때문에 이번 포스팅에서 말씀드린 방법으로 배속을 진행 할 수 없습니다.
3. 1개 이상인 경우 html을 할 줄 아신다면 현재 재생되는 동영상의 video 태그를 찾아서 `playbackRate` 값을 수정해주세요
4. 만약 html을 모르신다면 `document.getElementsByTagName("video")[0].playbackRate = 2;`, `document.getElementsByTagName("video")[1].playbackRate = 2;`, `document.getElementsByTagName("video")[2].playbackRate = 2;` 등 video 뒤의 `[0]`숫자를 하나씩 증가시켜서 차례로 실행시키시면 video 배속이 될것입니다!

<TagLinks />

<Comment />
