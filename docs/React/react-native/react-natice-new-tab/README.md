---
title: react-native-webView 웹뷰 내 a 태그 클릭시 새로운 탭 띄우기 (new tab)
meta:
  - name: description
    content: react-native-webView 웹뷰 내 a 태그 클릭시 새로운 탭 띄우기 (new tab), react native, webview, newtab, onNavigationStateChange, Linking
  - property: og:title
    content: react-native-webView 웹뷰 내 a 태그 클릭시 새로운 탭 띄우기
  - property: og:description
    content: react-native-webView 웹뷰 내 a 태그 클릭시 새로운 탭 띄우기 (new tab), react native, webview, newtab, onNavigationStateChange, Linking
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/react-natice-new-tab/
tags: ["react-native", "react"]
---

# 웹뷰 내 a 태그 클릭시 새로운 탭 띄우기

react-native내 웹뷰로 하이브리드 웹앱을 만드는 작업중에 있습니다.
웹뷰내에 광고를 넣어서 해당 광고를 클릭시 광고 url로 이동하도록 개발을 해야합니다.
간단한 생각으로 webview내 웹에서 a 태그로 이동하면 되겠지? 라는 생각으로 코딩을 하면, 새로운 탭이 띄워지는 것이 아니라, 현재 앱에서 사용하던 웹앱이 지워지고, 클릭한 광고 url이 웹뷰를 차지하게 됩니다.

오늘은 위와 같은 상황에서 **웹뷰도 유지되면서 새로운 탭**으로 url을 띄우는 방법을 알아보겠습니다.

ref를 잡아 react-native-webview에 ref값을 주는 과정은 생략하겠습니다.

중요한 포인트는 `Linking`, `onNavigationStateChange`입니다. 이것이 새로운 탭을 열게 해줄 것입니다.

`onNavigationStateChange`를 이용해 URL 변경을 가로 채고 해당 URL이 원래 URL과 다른 경우 로드를 중지하고 페이지 변경을 방지하고 대신 OS Navigator(크롬, 사파리)에서 엽니다.

```jsx
import React, { useRef } from "react";
import { WebView, Linking } from "react-native-webview";

const WebviewContainer = () => {
  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const onNavigationStateChange = navState => {
    webviewRef.canGoBack = navState.canGoBack;
    if (!navState.url.includes("yourdomain.com")) {
      // 새 탭 열기
      Linking.openURL(navState.url);
      return false;
    }
  };

  // 이 함수를 작동시키지 않으면 stopLoading() 문제로 인해 안드로이드에서 소스페이지의 다른 링크를 탭할 수 없습니다. 그래서 stopLoading를 방지하기 위해 아래 함수를 실행합니다.
  const onShouldStartLoadWithRequest = event => {
    if (!event.url.includes("yourdomain.com")) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };
  return (
    <WebView
      ref={handleSetRef}
      source={{ uri }}
      // 웹뷰 로딩이 시작되거나 끝나면 호출하는 함수 navState로 url 감지
      onNavigationStateChange={onNavigationStateChange}
      // 처음 호출한 URL에서 다시 Redirect하는 경우에, 사용하면 navState url 감지
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
    />
  );
};
export default WebviewContainer;
```

react-native에서 작업은 여기 까지 하기면 되고, 이제 웹으로 넘어가셔서 a tag를 이용하여 원래 Html에서 하던데로 url을 옮기면 됩니다.

`<a href="https://www.w3schools.com">Visit W3Schools.com!</a>`

위처럼 웹뷰에 코딩하고 클릭하면 android, ios 둘다 정상적 새탭이 띄워지는 것을 볼 수 있습니다!

<TagLinks />

<Comment />
