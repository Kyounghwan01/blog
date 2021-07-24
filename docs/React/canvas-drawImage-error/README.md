---
title: react에서 canvas에 image 넣을 때 에러 해결법
meta:
  - name: description
    content: react에서 canvas에 image 넣을 때 에러 해결법, Failed to execute drawImage on CanvasRenderingContext2D The provided value is not of type (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas or VideoFrame), js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, react
  - property: og:title
    content: react에서 canvas에 image 넣을 때 에러 해결법, Failed to execute drawImage on CanvasRenderingContext2D The provided value is not of type (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas or VideoFrame), js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, react
  - property: og:description
    content: react에서 canvas에 image 넣을 때 에러 해결법, Failed to execute drawImage on CanvasRenderingContext2D The provided value is not of type (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas or VideoFrame), js, html, css, 웹개발, 개발자, 프론트엔드, 백엔드, web, react
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/addEventListener/
tags: ["JS"]
---

# react에서 canvas에 image 넣을 때 에러 해결법

```
TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas or VideoFrame)'
```

위 에러는 canvas에 image를 background로 넣을 때, 아직 load되지 않은 image를 canvas에 넣으려고 할 때 생기는 에러입니다

그래서 이미지가 로드 되고 canvas에 image를 넣어주면 됩니다

## 에러 코드

```js
const Brush = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = "http://www.samskirrow.com/background.png";

    ctx.drawImage(image, 0, 0); // image가 성공적으로 load 되지 않은 상태로 drawImage를 실행하면 에러가 발생합니다
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Brush;
```

## 해결 코드

위에서 말한 것 처럼 이미지가 로드 된 시점에 drawImage를 실행합니다

```js
const Brush = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = "http://www.samskirrow.com/background.png";

    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Brush;
```

<TagLinks />

<Comment />
