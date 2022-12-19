---
title: JavaScript - try catch 내에서 error 핸들링
meta:
  - name: description
    content: JavaScript - try catch 내에서 error 핸들링, js, ts, promise, throw, error
  - property: og:title
    content: JavaScript - try catch 내에서 error 핸들링, js, ts, promise, throw, error
  - property: og:description
    content: JavaScript - try catch 내에서 error 핸들링, js, ts, promise, throw, error
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/thorw-locally/
tags: ["JS"]
---

# try catch 내에서 error 핸들링

- try catch 코드 내에서 에러핸들링을 할때 아래와 같이 할 수 있습니다.
```js
try {
  throw new Error({ message: '에러메세지' }); // 여기서 에러를 발생시키고
  } catch (e) {
    console.log(e.message); // 그 에러를 여기서 받는다.
  }
```

위와 같이 에러를 발생시키면 아래와 같은 warning을 보게 됩니다. 

`'throw' of exception caught locally`

위와 같은 에러가 뜨는 이유는 try catch를 쓰는 이유를 안다면 바로 알 수 있습니다. try catch에서 catch는 예외상황으로 **우리가 왜 에러가 발생하는지 모르는 경우에 호출됩니다.**

그러나 위 코드의 경우 try내부에 강제로 exception을 발생시켜 예외가 아닌 상황에 catch에 잡히도록 컨트롤 하고 있으니 저런 경고를 뜨게 되는 것 입니다.

해결 방법은 try 문에서는 catch에 강제로 집어넣지 않도록 하는 것이 맞는 방법입니다. 그러나 컨벤션에 의해 이미 많이 사용되어버린 코드에서는 아래와 같이 바꾸면 사용 가능 합니다. 

```js
try {
  return Promise.reject({ message: '에러메세지' });
  } catch (e) {
    console.log(e.message);
  }
```

위 경고는 IDE가 주는 권장사항으로 굳이 따르지 않아도 됩니다. 만약 컨벤션이 throw를 쓰고 있다면 그것을 따르고 굳이 바꾸지 말라는 것을 권장하고 있습니다.


<TagLinks />

<Comment />
