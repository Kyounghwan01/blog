---
title: react-native video
meta:
  - name: description
    content: react-native video, react, redux, ios, android, safari, chrome, google, apple, video, react-native-video
  - property: og:title
    content: react-native webview 사용법
  - property: og:description
    content: eact-native video, react, redux, ios, android, safari, chrome, google, apple, video, react-native-video
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/video/
tags: ["react-native", "react"]
---

# video 만들기

react-native에서 video를 재생하는 방법에 대해 알아보겠습니다.

web에서는 iframe으로 감싸서 그안에 mp4를 넣으면 간단히 되지만 rn은 그렇게 간단히 진행되지 않습니다.

우리는 `react-native-video`라는 라이브러리를 사용해보겠습니다.

## 설치

```bash
yarn add react-native-video

cd ios/

pod install
```

## 사용

- 간단히 아래 예시 코드로 바로 적용 가능합니다
- 아래 예시는 화면 전체를 체우는 video 예시입니다.
- 제가 적용하였을 때 ios는 시뮬레이터, 실제 기기 모두 재생이 잘 되었으나, 안드로이드 애뮬레이터에서는 재생이 안되었지만 실제 기기에서는 잘 잘동하였습니다.

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import Video from "react-native-video";

const VideoPlayer = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: "video url" }}
        style={styles.fullScreen}
        paused={false} // 재생/중지 여부
        resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
        onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
        repeat={true} // video가 끝나면 다시 재생할 지 여부
        onAnimatedValueUpdate={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default VideoPlayer;
```

## 참고

제가 사욯하지 않은 많은 property가 있습니다. 추가 기능을 사용하기 원하시면 [react-native-video](https://www.npmjs.com/package/react-native-video) 이곳에서 참조하시기 바랍니다!

<TagLinks />

<Comment />
