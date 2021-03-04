---
title: html - 웹 또는 웹앱에서 모바일 전화걸기
meta:
  - name: description
    content: html - 웹 또는 웹앱에서 모바일 전화걸기
  - property: og:title
    content: html - 웹 또는 웹앱에서 모바일 전화걸기
  - property: og:description
    content: html - 웹 또는 웹앱에서 모바일 전화걸기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/mobile-call/
tags: ["html"]
---

# 웹 또는 웹앱에서 모바일 전화걸기

웹뷰를 이용하여 웹앱을 만드실 때, 버튼을 누르면 특정 번호로 전화를 걸어야하는 경우가 있습니다

아래 코드를 활용하시면 구현 가능합니다

## 사용법

`location.href`를 이용합니다

`href`에는 location 객체에 속해있는 프로퍼티로 접속중인 페이지 정보를 갖고 있습니다. 또한 값을 변경할 수 있는 프로퍼티이기 때문에 다른 페이지로 이동하는데도 사용합니다

그래서 우리는 `location.href`를 자바스크립트를 이용하여 전화를 걸도록 할 것입니다

아주 간단하게 아래 코드만 추가하면 됩니다.

```js
function phoneCall(phoneNumber) {
  location.href = "tel:" + num;
}

phoneCall("01022349891");
```

<TagLinks />

<Comment />
