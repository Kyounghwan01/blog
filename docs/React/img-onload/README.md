---
title: React.js - 이미지 로딩 후 렌더링
meta:
  - name: description
    content: React.js - 이미지 로딩 후 렌더링
  - property: og:title
    content: React.js - 이미지 로딩 후 렌더링
  - property: og:description
    content: React.js - 이미지 로딩 후 렌더링
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/img-onload/
tags: ["react"]
---

# 이미지 로딩 후 렌더링

화면을 그릴 때, 이미지가 완전히 DOM에 셋팅된 후 렌더를 완료하고 싶을 때가 있습니다.
이럴때 쓰는 `img`의 함수가 `onLoad`함수 입니다.

## onLoad

- 이 함수는 해당 img 태그의 src가 채워지면 작동합니다.

```jsx
<img src={'https://img.studiomate.kr/avatars/4N0XfNT3na2FbjSKzZQ20WzxWVxlV0Ft5CbI6nmx_2048x2048.png'} alt="유저이미지" onLoad={()
=> console.log(123)} />
```

- 위처럼 코드를 작성하면 src의 값을 불러오고 난후, dom에 세팅이 완료된 후에 onLoad 함수가 실행되어 콘솔 123이 뜨게 됩니다.
- 위 방법을 응용하면, `onLoad`가 발동시 Loading을 멈추면 이미지가 보여질때까지 loading화면을 띄울 수 있게 됩니다.

## 예시 코드

```jsx
const Example = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => (loading ? Toast.loading("Loading", 50000) : Toast.hide()), [
    loading,
  ]);

  return (
    <img
      src="https://img.studiomate.kr/avatars/4N0XfNT3na2FbjSKzZQ20WzxWVxlV0Ft5CbI6nmx_2048x2048.png"
      alt="유저이미지"
      onLoad={() => setLoading(false)}
    />
  );
};
```
