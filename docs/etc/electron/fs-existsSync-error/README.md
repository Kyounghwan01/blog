---
title: fs.existsSync is not a function
meta:
  - name: description
    content: fs.existsSync is not a function, electron, react, javascript, error, desktopCapturer
  - property: og:title
    content: fs.existsSync is not a function, electron, react, javascript, error, desktopCapturer
  - property: og:description
    content: fs.existsSync is not a function, electron, react, javascript, error, desktopCapturer
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/electron/fs-existsSync-error/
tags: ["etc", "electron"]
---

# TypeError: fs.existsSync is not a function

`const desktopCapturer = require("electron").desktopCapturer;` 이렇게 react 코드 내에서 electron의 메소드를 불러오면 `TypeError: fs.existsSync is not a function` 이런 에러가 뜨게 됩니다

## 원인

주요 원인은 일렉트론 빌드와 react의 cra 빌드가 충돌나서 생기는 에러입니다

해결법은 아래와 같습니다

## 해결

### src/App.js

```js
const desktopCapturer = require("electron").desktopCapturer;

import electron, { ipcRenderer } from "electron";
```

위 코드 대신 아래 코드로 바꾸면 정상 실행됩니다.

```js
const { desktopCapturer } = window.require("electron");

const electron = window.require("electron");
```

## 다른 해결법

서칭을 해보니 ``window.require(xxx)`로 해결하는 방법이 좋지 않은 방법이라고 하네요.

그 레퍼런스에서는 yarn eject를 해서 webpack 설정을 바꾸는 방법으로 해결하고 있습니다.

저는 eject해서 얻는 장점보다 더 단점이 많다고 생각하는 사람이라 따라하지는 않았습니다 링크 걸어드리니 참조 하시면 좋을 것 같습니다~

- [electron/electron#7300 (comment)](https://github.com/electron/electron/issues/7300#issuecomment-496006781)

## 참고

- [Requiring electron outside of main.js causes a TypeError #7300](https://github.com/electron/electron/issues/7300)

<TagLinks />

<Comment />
