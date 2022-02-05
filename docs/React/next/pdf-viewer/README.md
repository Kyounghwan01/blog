---
title: next.js에서 pdf viewer 사용하기
meta:
  - name: description
    content: next.js에서 pdf viewer 사용하기, react, next, pdf-viewer, onContextMenu, preventDefault, pdf 복사 막기, prevent copy pdf
  - property: og:title
    content: next.js에서 pdf viewer 사용하기
  - property: og:description
    content: next.js에서 pdf viewer 사용하기, react, next, pdf-viewer, onContextMenu, preventDefault, pdf 복사 막기, prevent copy pdf
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/pdf-viewer/
tags: ["react", "next", "TS"]
---

# next.js에서 pdf viewer 사용하기

웹 또는 웹앱에서 로컬 또는 서버에서 가져온 Pdf를 보여주는 예제입니다. 이 글에서는 이런 것들을 다룹니다.

1. pdf viewer 예제
2. 화면의 width에 pdf가 꽉차게 보이기
3. 스크롤 내림에 따라 다음 pdf 보이기
4. pdf 복사 방지

## 프로젝트 세팅

- 먼저 예시에 필요한 디펜던시를 설치합니다.

```bash
yarn add react-pdf
// typescript 쓴다면
yarn add -D @types/react-pdf
```

## pdf viewer 예제

```tsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Index = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <Document
        file="/static/doc/test.pdf" // 여기는 가지고 계신 pdf 주소
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* height, width는 number 타입으로 vh, %는 먹지 않습니다. */}
        <Page height={600} pageNumber={pageNumber} />
      </Document>
      Page {pageNumber} of {numPages}
      {pageNumber > 1 && (
        <button onClick={() => setPageNumber(prev => prev + -1)}>
          이전페이지
        </button>
      )}
      {pageNumber < numPages && <button onClick={() => setPageNumber(prev => prev + +1)}>다음페이지</button>}
    </>
  );
};

export default Index;
```

## 스크롤 내림에 따라 다음 pdf 보이기

- 위에서 말씀드린대로 width, height는 number값으로 %가 들어가지 않아 width를 화면에 꽉차게 할라면 현재 보는 화면의 width값을 px로 알아야 합니다. window innerWidth를 가져오는 간단한 훅을 만듭니다.

```tsx
// ./useWindowSize.tsx
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export default useWindowSize;
```

만든 훅을 가져와 width를 넣어줍니다.

```tsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useWindowSize from "./useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Index = () => {
  const windowSize = useWindowSize();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <Document
        file="/static/doc/test.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* width, height값을 훅에서 가져온 값으로 넣어줍니다 */}
        <Page
          width={windowSize.width}
          height={windowSize.height}
          pageNumber={pageNumber}
        />
      </Document>
      Page {pageNumber} of {numPages}
      {pageNumber > 1 && (
        <button onClick={() => setPageNumber(prev => prev + -1)}>
          이전페이지
        </button>
      )}
      {pageNumber < numPages && <button onClick={() => setPageNumber(prev => prev + +1)}>다음페이지</button>}
    </>
  );
};

export default Index;
```

## 스크롤 내림에 따라 다음 pdf 보이기

- 지금은 하단의 다음 버튼을 클릭해야 다음장이 보이고 있습니다.
- 이번에는 스크롤 내림으로 다음 pdf가 보이도록 합니다.
- 간단하게 전체 pdf를 가져와서 밑으로 보여줍니다.

```tsx
<Document file="/static/doc/test.pdf" onLoadSuccess={onDocumentLoadSuccess}>
  {Array.from(new Array(numPages), (_, index) => (
    <Page
      width={windowSize.width}
      height={windowSize.height}
      key={index}
      pageNumber={index + 1}
      renderAnnotationLayer={false}
    />
  ))}
</Document>
```

## pdf 복사 방지

- 지금과 같은 경우 pdf 위에서 마우스 우클릭을 하면 '다른 이름으로 저장'을 통해 pdf를 image로 저장할 수 있습니다. 외부 유출이 되면 안되는 pdf의 경우 우클릭을 막아야 할 상황이 있을 수 있습니다. (디바이스 자체 캡쳐기능을 사용하면 막을 방법이 없습니다..)
- html에서는 마우스 오른쪽을 눌렀을 때 나오는 메뉴를 `contextmenu`라고 합니다. 그래서 우리는 html의 `onContextMenu`를 이용하여 우클릭 함수가 실행되지 않도록 합니다.
- [Event.preventDefault()](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault) 메소드를 이용합니다. 이 메소드는 해당 이벤트 (이 예시에서는 onContextMenu)의 기본 동작이 실행되지 않도록 하는 기능입니다.

```tsx
<div onContextMenu={e => e.preventDefault()}>
  <Document file="/static/doc/test.pdf" onLoadSuccess={onDocumentLoadSuccess}>
    {Array.from(new Array(numPages), (_, index) => (
      <Page
        width={windowSize.width}
        height={windowSize.height}
        key={index}
        pageNumber={index + 1}
        renderAnnotationLayer={false}
      />
    ))}
  </Document>
</div>
```

위처럼 간단하게 pdf를 보여주는 기능을 만들 수 있습니다. pdf를 보여주는 것은 [react-pdf](https://github.com/wojtekmaj/react-pdf#readme)를 사용하면 되고 보여지는 화면을 pdf로 변환 하고 싶을 때는 [React-pdf](https://react-pdf.org/)를 사용하면 간편하게 개발 할 수 있습니다!!

<TagLinks />

<Comment />
