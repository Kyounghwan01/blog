---
title: html - img - 이미지 로딩 후 렌더링
meta:
  - name: description
    content: html - img - 이미지 로딩 후 렌더링
  - property: og:title
    content: html - img - 이미지 로딩 후 렌더링
  - property: og:description
    content: html - img - 이미지 로딩 후 렌더링
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/img-onload/
tags: ["html"]
---

# 이미지 로딩 후 렌더링

화면을 그릴 때, 이미지가 완전히 DOM에 셋팅된 후 렌더를 완료하고 싶을 때가 있습니다.
이럴때 쓰는 `img`의 함수가 `onLoad`함수 입니다.

## onLoad

- 이 함수는 해당 img 태그의 src가 채워지면 작동합니다.

```jsx
<img
  src={"2048x2048.png"}
  alt="유저이미지"
  onLoad={() => console.log("img 위치 완료")}
/>
```

- 위처럼 코드를 작성하면 src의 값을 불러오고 난후, dom에 세팅이 완료된 후에 onLoad 함수가 실행되어 콘솔 123이 뜨게 됩니다.
- 위 방법을 응용하면, `onLoad`가 발동시 Loading을 멈추면 이미지가 보여질때까지 loading화면을 띄울 수 있게 됩니다.

## onError

- 이 함수는 img의 src 값이 유효하지 않은 경우 실행됩니다.

```jsx
<img
  src={"2048x2048.png"}
  alt="유저이미지"
  onLoad={() => console.log("img 위치 완료"))}
  onError={() => console.log("에러가 발생했어요!")}
/>
```

## 예시 코드

```jsx
const Example = () => {
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(
    "https://img.studiomate.kr/avatars/4N0XfNT3na2FbjSKzZQ20WzxWVxlV0Ft5CbI6nmx_2048x2048.png"
  );

  useEffect(() => (loading ? Toast.loading("Loading", 50000) : Toast.hide()), [
    loading
  ]);

  const getError = () => {
    setAvatar("default_img.png");
    setLoading(false);
  };

  return (
    <img
      src={avatar}
      alt="유저이미지"
      onLoad={() => setLoading(false)}
      onError={getError}
    />
  );
};
```
