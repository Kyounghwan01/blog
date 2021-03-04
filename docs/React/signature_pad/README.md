---
title: 웹에서 signature_pad를 이용해 서명(싸인) 받기
meta:
  - name: description
    content: 웹에서 signature_pad를 이용해 서명(싸인) 받기, react, redux, javascript, html
  - property: og:title
    content: 웹에서 signature_pad를 이용해 서명(싸인) 받기, react, redux, javascript, html
  - property: og:description
    content: 웹에서 signature_pad를 이용해 서명(싸인) 받기, react, redux, javascript, html
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/signature_pad/
tags: ["react"]
---

# 웹에서 signature_pad를 이용해 서명(싸인) 받기

웹에서 계약서의 서명을 받는 작업을 하게 되었습니다. 그때 알게 된 라이브러리가 있어 소개해드립니다.

[signature_pad](https://www.npmjs.com/package/signature_pad)를 사용하였습니다.

대략적인 예시 코드는 아래에 남기지만 꼭 위 링크에 들어가셔서 자세히 알아보시면 좋을 것 같습니다.

## react 예시 코드

[signature_pad](https://www.npmjs.com/package/signature_pad) 이곳의 예시에 나온 것 처럼 `canvas`를 만들고 돔을 잡아 그곳을 signpad로 만듭니다

```jsx
import { useEffect, useState } from "react";
import SignaturePad from "signature_pad";

let sigPad = null;

const Signature = () => {
  const [sigPadData, setSigPadData] = useState(null);

  useEffect(() => {
    sigPad = new SignaturePad(document.querySelector("canvas"), {
      onBegin: () => {
        setSigPadData(sigPad.toDataURL()); // data:image/png;base64,iVBORw0K...
        /**
         * signaturePad.toDataURL(); // save image as PNG
         * signaturePad.toDataURL("image/jpeg"); // save image as JPEG
         * signaturePad.toDataURL("image/svg+xml"); // save image as SVG
         * */
      }
    });
  }, []);

  const handleRestSignature = () => {
    sigPad.clear();
    setSigPadData();
  };

  return (
    <div className="Signature">
      <canvas
        width={300}
        height={325}
        style={{ border: "1px solid #cdcdcd" }}
      />
      <button onClick={handleRestSignature}>리셋</button>
    </div>
  );
};

export default Signature;
```

위 코드를 통해 캔버스에 사인을 하면 `setSigPadData`가 작동하고 state에는 data url이 찍히게 됩니다.

그 이후에는 데이터를 서버에 저장하기 좋은 방식으로 변환하여 db에 저장하면 되겠습니다.

그 이외 많은 property가 있으니 궁금하신분들은 [signature_pad](https://www.npmjs.com/package/signature_pad) 이곳으로 들어가시면 되겠습니다.

<TagLinks />

<Comment />
