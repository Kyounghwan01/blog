---
title: react-native dynamic image import
meta:
  - name: description
    content: react-native dynamic image import react, redux, ios, android, safari, chrome, google, apple, image
  - property: og:title
    content: react-native dynamic image import, react-native-tab-view
  - property: og:description
    content: react-native dynamic image import react, redux, ios, android, safari, chrome, google, apple, image
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/image-dynamic-import/
tags: ["react-native", "react"]
---

# dynamic image import

react-native에서 이미지를 동적으로 import 하는 방법에 대해 알아보겠습니다.

- react나 다른 웹에서는 아래와 같이 image를 동적으로 가져올 수 있습니다.

```js
<img src={src} />

<img src={loading ? './loading.png' : './not-loading.png'} />

<img src={`./${imgPath}.png`} />
```

- 그런데 react-native에서는 image를 동적으로 가져오는 것을 지원하지 않습니다. 심지어 삼항연산자 또는 template leterial(`)을 사용하여 변수를 가져오는 방법도 불가능합니다. 그렇기 때문에 아래와 같이 static하게 이미지를 가져와야 하죠

```js
<Image source={require(".imImg.png")} />
```

## 동적 import 하는 방법

### 컴포넌트 분기로 import 하는 방법

- rn에서 동적으로 image를 가져올 상황이라면 아래와 같이 컴포넌트를 분기 처리해야합니다.

```js
const icon = this.props.active
  ? require("image!my-icon-active")
  : require("image!my-icon-inactive");
<Image source={icon} />;
```

### path를 등록하여 동적 import 하는 방법

- 또 다른 방법으로 image파일 밑으로 전체 파일에 대한 path를 미리 만들어 놓는 방법이 있습니다.

```js
// imgPath.js
export const imagePath = {
  BAD: require("./bad.png"),
  NORMAL: require("./normal.png"),
  GOOD: require("./good.png")
};
```

위 처럼 imagePath 파일을 만들고 컴포넌트에서 아래와 같이 사용합니다.

```js
import { imagePath } from "@/assets/images/imagePath";
const icon = "GOOD";

<Image source={imagePath.icon} />;
```

Path를 등록하는게 귀찮지만 한번 등록하면 일반 웹에서와 같은 방식으로 동적 import를 할 수 있기 때문에 저는 이 방법을 사용하고 있습니다.

여러분들의 상황에 맞게 좋은 방법으로 구현하시면 좋을 것 같습니다!

<TagLinks />

<Comment />
