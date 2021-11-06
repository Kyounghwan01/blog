---
title: react-native 이미지 사이즈에 맞게 넣기
meta:
  - name: description
    content: react-native 이미지 사이즈에 맞게 넣기 react, redux, ios, android, safari, chrome, google, apple, image, react-native-auto-height-image, image fit
  - property: og:title
    content: react-native 이미지 사이즈에 맞게 넣기
  - property: og:description
    content: react-native 이미지 사이즈에 맞게 넣기 react, redux, ios, android, safari, chrome, google, apple, image, react-native-auto-height-image, image fit
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/auto-height-image/
tags: ["react-native", "react"]
---

# 이미지 사이즈에 맞게 넣기

react-native에서 이미지 사이즈에 맞게 넣는 방법에 대해 알아보겠습니다.

이미지를 쉽게 적용하기 위해 `react-native-auto-height-image`라는 라이브러리를 사용해보겠습니다.

만약 위 라이브러리를 사용하지 않으면 어떻게 이미지를 넣어야 가로 세로 비율을 유지한채 이미지를 넣을 수 있을까요?

- width, height를 이미지의 원본 그대로 유지한채 이미지를 넣는다.
- 다양한 모바일 기기의 width를 고려하여 `useWindowDimensions`를 이용하여 기기의 width을 알아 낸후, 이미지의 width를 정한 후, 이미지의 width와 height의 ratio를 고정시키기 위해 image height을 원본이미지 width/height로 나눈 값을 원본 이미지 height에 곱하여 이미지 height를 조정한다.

이런 방식으로 구현할 수 있을 것입니다. 1번안은 static한 사이즈의 이미지만 다룬다면 이상 없이 사용 가능하지만, 대부분 dynamic하게 이미지의 size가 바뀌기 때문에 2번 방법을 사용 해야 하는데 그냥 글로만 봐도 너무 복잡합니다. 그래서 2번과 같이 원하는 width를 넣어주면 Height를 이미지 ratio를 유지한채 넣어주는 라이브러리인 `react-native-auto-height-image`를 사용합니다.

## 설치

```bash
yarn add react-native-auto-height-image


cd ios/

pod install
```

## 사용 방법

- 사용 방법은 매우 간단합니다. 그래서 저는 많이 사용하고 있습니다.
- 아래와 같이 `AutoHeightImage` 컴포넌트를 불러오고 그 안에 width와 source를 넣어주면 자동으로 같은 비율의 height로 이미지가 산정되어 렌더링됩니다!

```js
import React from "react";
import { View, useWindowDimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

const CarrotRecommand = () => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <AutoHeightImage
        width={width}
        source={{require('~~')}}
      />
    </View>
  );
};

export default App;
```

<TagLinks />

<Comment />
