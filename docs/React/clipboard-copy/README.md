---
title: 클립보드 텍스트 복사하기
meta:
  - name: description
    content: 클립보드 텍스트 복사하기, react, queryCommandSupported, javascript, react16, react hook, 리엑트, 프론트엔드, 웹, web, javascript copy to clipboard, navigator, clipboard
  - property: og:title
    content: 클립보드 텍스트 복사하기
  - property: og:description
    content: 클립보드 텍스트 복사하기, react, queryCommandSupported, javascript, react16, react hook, 리엑트, 프론트엔드, 웹, web, javascript copy to clipboard, navigator, clipboard
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/clipboard-copy/
tags: ["react", "JS"]
---

# 클립보드 텍스트 복사하기

## 서론

오늘은 웹에서 공유하기 또는 url 복사하기 같은 기능을 편하게 유저에게 제공할 때 두루 쓰이는 기능인 유저가 버튼 클릭시 컴퓨터에 텍스트가 복사되는 (cmd + c) 기능에 대해서 포스팅 하겠습니다!

클립보드를 복사하는 방법은 2가지 방법이 있습니다. 첫번째는 [clipboard-api](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard)를 사용하는 방법과 [queryCommandSupported](https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported)를 사용하는 방법이 있습니다.

`queryCommandSupported`를 이용하여 클립보드에 데이터를 복사하는 방법은 [exeCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)를 사용하거나 [clipboard api](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)를 사용하는 방법이 있습니다.

:::warning 중요
`queryCommandSupported`는 곧 사용을 중지한다고 하니 `clipboard-api`를 사용하시기를 권유드립니다.
:::

## 흐름

1. 브라우저가 `navigator.clipboard`를 지원하는지 확인 (지원하면 clipboard api 사용, 지원안하면 2번으로 이동)
2. 현재 브라우저가 `copy` 기능을 지원하는지 확인
3. 지원한다면 `textarea`를 만들어서 내부에 원하는 text를 복사
4. 복사한 텍스트를 `document.body`에 `appendChild`
5. `exeCommand`를 이용하여 복사
6. 복사 완료했다면 `body`에 추가한 `textarea`를 삭제

## 예시 코드

- 아래 코드의 경우 모든 브라우저에서 사용 가능하도록 만들었으니 바로 사용 가능합니다!

```jsx
import React from "react";

export default function ClipboardCopy() {
  const doCopy = text => {
    // 흐음 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  };

  return (
    <button onClick={() => doCopy("복사할텍스트입니다!")}>복사하기</button>
  );
}
```

<TagLinks />

<Comment />
