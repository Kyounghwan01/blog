---
title: electron BrowserWindow
meta:
  - name: description
    content: electron BrowserWindow, electron, react, javascript, error, desktopCapturer
  - property: og:title
    content: electron BrowserWindow, electron, react, javascript, error, desktopCapturer
  - property: og:description
    content: electron BrowserWindow, electron, react, javascript, error, desktopCapturer
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/electron/browser-window/
tags: ["etc", "electron"]
---

# electron BrowserWindow

## BrowserWindow

브라우저 윈도우를 생성하고 제어합니다.

## 사용법

```js
const { app, BrowserWindow } = require("electron"););

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    height: 100,
    height: 100,
    // frame: false, // 상단 바
    // transparent: true, // 요소 빼고 배경 투명하게
    // kiosk: true, // 터치가능하게
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // TypeError: window.require is not a function 일때 추가
      contextIsolation: false
    }
  });

  win.loadURL("http://localhost:3000?main");
}

app.on("ready", createWindow);
```

## new BrowserWindow({options})

- `width`: 생성될 electron 창의 width이며 default는 `800`입니다.
- `height`: 생성될 electron 창의 height이며 default는 `600`입니다.
- `x` : electron이 띄워지는 화면을 기준으로 창의 좌측부터 위치값. 기본값은 화면중앙입니다.(x가 쓰이면 y는 필수 값)
- `y` : electron이 띄워지는 화면을 기준으로 창의 상반부터 위치값. 기본값은 화면중앙입니다. (y가 쓰이면 x는 필수 값)
- `frame`: `frame`이 false이면 프레임이 없는 electron 앱이 띄워집니다. 기본값 true
- `transparent`: 이 값이 true이면 윈도우를 투명하게 바꿉니다 (배경색이 없으면 바탕화면이 보임) 기본값 false
- `webPreferences`: 웹 페이지 기능 설정 (object 값)

## webPreferences

- `nodeIntegration`: nodejs 통합 여부 (nodejs의 file system을 사용할 경우 true)
- `enableRemoteModule`: electron 모듈을 불러올 때 사용합니다
- `contextIsolation` : `TypeError: window.require is not a function` 일때 false로 추가합니다

### 참고

- 그외 제가 사용하지 않은 많은 api가 있습니다 더 알아보고 싶은 분들은 아래 공식사이트를 참조해주세요!
- [electron 공식 사이트](https://www.electronjs.org/docs/api/browser-window)

<TagLinks />

<Comment />
