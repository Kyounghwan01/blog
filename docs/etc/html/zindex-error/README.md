---
title: html - z-index 작동 안함
meta:
  - name: description
    content: html - z-index 작동 안함
  - property: og:title
    content: html - z-index 작동 안함
  - property: og:description
    content: html - z-index 작동 안함, z-index not work
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/zindex-error/
tags: ["html", "css"]
---

# z-index 작동 안함

z-index가 작동하지 않는 이유는 여러 이유가 있습니다. 그런데 해결책만 알면 굳이 알 필요는 없다고 생각하기에 왜 안되는지는 기술하지 않겠습니다.

z-index로 요소의 순서가 의도대로 되지 않을 때는 css로 z-index를 주는 요소에 `position: relative`를 넣어주면 됩니다.

우리는 one이 two 위로 올리고 싶습니다. 그런데 어떠한 이유로 인하여 의도대로 되지 않을 수 있습니다.

그럴때는 아래와 같이 넣어주면 작동합니다.

```html
<div>
  <div class="one">one</div>
  <div class="two">two</div>
</div>
<style>
  .one {
    position: relative;
  }

  .two {
    position: relative;
    top: 0;
    z-index: 1;
  }
</style>
```
