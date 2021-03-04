---
title: React.js - 이미지 업로드 & 압축
meta:
  - name: description
    content: React.js - 이미지 업로드, 압축 하는 법, image upload, compression, blob, FileReader, Uint8Array, FormData
  - property: og:title
    content: React.js - 이미지 업로드, 압축 하는 법
  - property: og:description
    content: React.js - 이미지 업로드, 압축 하는 법, image upload, compression, blob, FileReader, Uint8Array, FormData
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/image-upload/
tags: ["react"]
---

# 이미지 업로드 & 압축

어느 웹에서나 모두 쓰이는 이미지 업로드에 대해 알아보겠습니다!<br>

## 목표

첫번째, 이미지 보낼 때는 데이터 손상을 박기 위해 바이너리파일을 formData에 넣어서 보냅니다 <br>
두번째, 저희 서버에서는 이미지의 용량을 최대 2014kb로 제한 하기 때문에, 프론트에서 2MB로 이미지 압축하는 작업을 하였습니다.

## 이미지 가져오기

- 저는 `antd-mobile`의 `ImagePicker`를 사용하였습니다.
- 각 사용하시는 라이브러리에서 이미지를 가져오시면 아래와 같은 데이터 포맷을 가질 것입니다.

```
{
  lastModified: 1594690440635
  lastModifiedDate: Tue Jul 14 2020 10:34:00 GMT+0900 (대한민국 표준시) {}
  name: "sheep-4772994_1920.jpg"
  size: 378188
  type: "image/jpeg"
  webkitRelativePath: ""
}
```

- 위에 보시면 size가 3MB가 넘죠? 일단 이것을 먼저 2MB 이하로 압축합니다.

## 이미지 압축

- 저는 `browser-image-compression`라는 라이브러리를 사용하였습니다.

```
yarn add browser-image-compression
```

- 아래 코드처럼 이미지를 가져온 후 압축합니다.

```jsx
import React, { useState } from 'react';
import ImagePicker from 'antd-mobile/lib/image-picker';
import imageCompression from "browser-image-compression";

const ChangeNameAvatar = () => {
  const [data, setData] = useState({
    avatar: [],
  });

  const onClickImageUpload = (files, type, index) => {
    setData({
      ...data,
      avatar: files,
    });
  };

  const onSubmit = async () => {
    actionImgCompress(data.avatar[0].file);
  };

  const actionImgCompress = async (fileSrc) => {
    console.log("압축 시작");

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);

      // const reader = new FileReader();
      // reader.readAsDataURL(compressedFile);
      // reader.onloadend = () => {
      //   const base64data = reader.result;
      //   imageHandling(base64data);
      // };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImagePicker
      files={data.avatar}
      onChange={onClickImageUpload}
      onImageClick={(index, fs) => console.log(index, fs)}
      accept="image/gif,image/jpeg,image/jpg,image/png"
    />
    <PlainButton type="ghost" onClick={onSubmit}>
      저장하기
    </PlainButton>
  );
}
```

- 라이브러리가 잘 되어있어서 압축하는 과정은 매우 쉽습니다.
- 옵션 값을 정해주고 이미지를 넣고 실행한 해주면 됩니다.
- 결과값은 아래와 같습니다.

```
Blob {
  lastModified: 1594690440635
  name: "sheep-4772994_1920.jpg"
  size: 158816
  type: "image/jpeg"
}
```

- Blob(블랍)을 기억하세요!
- size가 2MB이하로 줄어든 것을 확인할 수 있습니다.

## Base64 변환

- 이미지 압축을 하였으니, 바이너리 파일를 text로 변환해봅시다.
- 위에 있는 코드의 `actionImgCompress` 함수에서 실행합니다.

### Base64로 변환 하는 이유

- ASCII는 데이터를 전달하기에 안전하지가 않습니다. 특수문자를 제외한 64개의 안전한 출력 문자로 서버로 전송 및 디비 저장을 위해 base64로 변환합니다.

  - 즉, 이미지 깨짐, 동영상 짤림 방지하기 위해 안전한 문자로 바꿔서 서버로 보내기 위해 변환 합니다.

- 변환 과정도 매우 쉽습니다.
- `FileReader`라는 객체를 가져와서 위에서 만든 `Blob` 객체를 이용해 파일의 내용을 읽고 FileReader내부의 `readAsDataUrl`를 이용해 base64로 변환합니다.
- [FileReader](https://developer.mozilla.org/ko/docs/Web/API/FileReader), [readAsDataUrl](https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL) 여기 링크에 자세한 내용이 있습니다. 참고해주세요.

```js
const actionImgCompress = async fileSrc => {
  console.log("압축 시작");

  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  try {
    const compressedFile = await imageCompression(fileSrc, options);

    // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      // 변환 완료!
      const base64data = reader.result;

      // formData 만드는 함수
      handlingDataForm(base64data);
    };
  } catch (error) {
    console.log(error);
  }
};
```

## formData 핸들링

- 변환을 완료했으면, 이제 서버 전송전에 formData를 만들어 이미지 및 다른 정보를 보낼 준비를 합니다.
- 여기서 Blob를 핸들링 해야합니다.

### Blob

- JavaScript에서 Blob(Binary Large Object, 블랍)은 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용할 수 있습니다.
- 대개 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용합니다.
- [Blob 사용하기](https://developer.mozilla.org/ko/docs/Web/API/Blob) 추가로 더 공부하고 싶은 분들은 여기를 참고해주세요.

### 다시 formData를 만들어봅시다

```js
const handlingDataForm = async dataURI => {
  // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
  const byteString = atob(dataURI.split(",")[1]);

  // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: "image/jpeg"
  });
  const file = new File([blob], "image.jpg");

  // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
  // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
  const formData = new FormData();
  formData.append("representative_avatar", file);

  // 필요시 더 추가합니다.
  formData.append("name", "nkh");
  formData.append("email", "noh5524@gmail.com");

  try {
    const changeAvatar = await apis.auth.changeUserAccount(formData);
    alert(changeAvatar.status);
  } catch (error) {
    alert(error.response.data.errors);
  }
};
```

## axios 전송 전 request 설정

- 데이터를 보낼 준비를 마쳤다면, axios의 header부분에 내가 보내는 타입이 이미지도 있고, 텍스트도 있는 여러 데이터 폼을 보낸다고 알려야해요.

```js
// 회원 정보 변경
import axios from "../axios";
export default {
  changeUserAccount: datas => {
    // request의 header부분에 아래와 같이 타입을 설정해줍니다.
    const headers = {
      "Content-Type": "multipart/form-data"
    };

    return axios.post(`/me`, datas, { headers });
  }
};
```

### 끝!

<TagLinks />

<Comment />
