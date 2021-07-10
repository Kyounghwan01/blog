---
title: window.require is not a function
meta:
  - name: description
    content: window.require is not a functionjavascript, error, desktopCapturer
  - property: og:title
    content: window.require is not a functionjavascript, error, desktopCapturer
  - property: og:description
    content: window.require is not a functionjavascript, error, desktopCapturer
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/electron/window-require-error/
tags: ["etc", "electron"]
---

# TypeError: window.require is not a function

`window.require is not a function` 이런 에러가 나올때 해결법입니다

electron의 main.js 파일에 `contextIsolation: false`를 추가합니다

```js {12,13}
const { app, BrowserWindow } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // TypeError: window.require is not a function 일때 추가
      contextIsolation: false
    }
  });

  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);
```

<TagLinks />

<Comment />
