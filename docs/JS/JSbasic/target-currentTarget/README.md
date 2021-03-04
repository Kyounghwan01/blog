---
title: JavaScript - 이벤트에서 target과 currentTarget의 차이
meta:
  - name: description
    content: JavaScript - 이벤트에서 target과 currentTarget의 차이
  - property: og:title
    content: JavaScript - 이벤트에서 target과 currentTarget의 차이
  - property: og:description
    content: JavaScript - 이벤트에서 target과 currentTarget의 차이
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/target-currentTarget/
tags: ["JS"]
---

# 이벤트에서 target과 currentTarget의 차이

event 객체에 속해있는 target과 currentTarget의 차이점을 알아보겠습니다

표준은 target과 currentTarget이지만 IE에서는 target은 srcElement로 사용되며 currentTarget은 지원하지 않습니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <tbody>
      <div class="green" style="width: 300px; height: 300px; background-color: green;">
          <div class="yellow" style="width: 200px; height: 200px; background-color: yellow;"></div>
      </div>
      </tr>
    </tbody>
    <script>
        const green = document.querySelector('.green');
        green.addEventListener('click',function(e){
            console.log("currentTarget : ",e.currentTarget);
            console.log("Target : ",e.target);
        })
    </script>
  </body>
</html>

```

위의 코드를 실행하면
녹색 박스안에 노란색 박스가 들어있습니다.
그리고 `addEventListener` 를 녹색 박스에 이벤트를 걸었고 클릭을 하면 그 이벤트의 target 요소와 currentTarget 요소가 콘솔에 출력되게 코드를 작성하였습니다.

먼저 녹색 div를 클릭하시면 두 요소 모두 녹색 div를 가리킵니다.
그리고 노란색 div를 클릭하시면 currentTarget은 녹색 div를 target은 노란색 div를 가리킵니다.

위로 보았을때 둘의 차이점을 간단히 설명하면

- currentTarget : 이벤트 리스너가 달린 요소
- target : 실제 이벤트가 발생하는 요소

사실 target 요소는 이벤트 버블링에 의해 노란색 div는 녹색 div의 이벤트를 위임받기에 이벤트를 사용할수 있는 것이고, 그에 따라 노란색 div 정보를 녹색 박스에 걸린 `addEventListener`에 전달 하게 된 것입니다. 이해가 안가시면 [이벤트 버블링](https://kyounghwan01.github.io/blog/JS/JSbasic/event-catch/)을 알아보시면 되겠습니다.

<TagLinks />

<Comment />
