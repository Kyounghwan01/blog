---
title: react-native webview 사용법, webview, rn 데이터 통신
meta:
  - name: description
    content: react-native webview 사용법, webview, rn 데이터 통신, react, redux, ios, android, safari, chrome, google, apple
  - property: og:title
    content: react-native webview 사용법
  - property: og:description
    content: eact-native webview 사용법, webview, rn 데이터 통신, react, redux, ios, android, safari, chrome, google, apple
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/react-native-webview/
tags: ["react-native", "react"]
---

# react-native webview

## rn 프로젝트 및 웹 뷰 라이브러리 설치

```sh
// 프로젝트 생성
npx react-native init project-name

// 실행
npx react-native run-ios

// npm 다운로드시 해야하는 설정
npm install react-native-webview

// already link 확인
react-native link react-native-webview

// RNCWebview not found 같이 node_module을 못읽는 에러 발생시 ios node_module 설치 안했기 때문
cd ios
pod install

//위 명령어 실행 후 재시작하면 에러가 안뜬다
npx react-native run-ios

// pod not found 에러시
sudo gem cocopod

pod install
```

## rn에 webview 추가하기

이후 포스팅에서 firebase cloud message를 추가할 것입니다.
fcm은 프로젝트의 가장 최상단 (App.js)에 위치해야만 한다고 docs에 있습니다.
그러므로 webview는 app.js의 하위 컴포넌트에서 구성하겠습니다.

```js
//App.js
const App = () => {
  // 웹뷰와 rn과의 소통은 아래의 ref 값을 이용하여 이루어집니다.
  let webviewRef = useRef();

  /** 웹뷰 ref */
  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  /** webview 로딩 완료시 */
  const handleEndLoading = e => {
    console.log("handleEndLoading");
    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    webviewRef.postMessage("로딩 완료시 webview로 정보를 보내는 곳");
  };

  return (
    <WebviewContainer
      webviewRef={webviewRef}
      handleSetRef={handleSetRef}
      handleEndLoading={handleEndLoading}
    />
  );
};
```

```js
import { WebView } from "react-native-webview";

const WebviewContainer = ({ handleSetRef, handleEndLoading }) => {
  const url = "localhost:3000";

  /** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
  const handleOnMessage = ({ nativeEvent: { data } }) => {
    // data에 웹뷰에서 보낸 값이 들어옵니다.
    console.log(data);
  };

  return (
    <WebView
      onLoadEnd={handleEndLoading}
      onMessage={handleOnMessage}
      ref={handleSetRef}
      source={{ uri }}
    />
  );
};
```

## 웹뷰에서 rn으로 데이터 송신

웹뷰 -> rn으로 데이터를 보내는 예시입니다.
노트북, 컴퓨터로 접속하는 웹에는 없지만 모바일로 웹에 접속하면 해당 웹에는 `ReactNativeWebView` 객체가 생성됩니다.
이 객체를 이용하면 rn에게 데이터를 전달할 수 있습니다.

### 예시

```js
const requestPermission = () => {
  if (window.ReactNativeWebView) {
    // 모바일이라면 모바일의 카메라 권한을 물어보는 액션을 전달합니다.
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "REQ_CAMERA_PERMISSION" })
    );
  } else {
    // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    alert({ message: ERROR_TYPES.notMobile });
  }
};
```

위처럼 webview에 함수를 만들고 `requestPermission`함수를 실행하면, 우리가 rn에서 정의한 `onMessage` 메소드에 넣어준 함수가 실행됩니다.

```js
/** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
const handleOnMessage = ({ nativeEvent: { data } }) => {
  console.log(data); // { type: "REQ_CAMERA_PERMISSION" }
};
```

## rn에서 webview로 데이터 송신

다음은 rn -> webview로 데이터를 보내는 예시입니다.
rn에서는 `webviewRef.postMessage({type: TOKEN, data: xxxxx});`를 이용하여 webview로 데이터를 전송합니다.

위 함수를 이용해 전송하면 웹뷰에서는 웹뷰 프로젝트의 최상단에 rn 정보를 listen한다는 함수를 실행합니다.
react-router를 사용한 예시는 아래와 같습니다.

```js
// routes.js
export default function Routes() {
  return (
    <Router>
      <RNListener>
      <Switch>
        ...
      </Switch>
    </Router>
  )
}
```

위처럼 어느 라우트에서든 `RNListener`가 실행되도록 만들어줍니다,
다음으로 `RNListener`입니다.
rn에서 `webviewRef.postMessage({type: TOKEN, data: xxxxx});`으로 전송을 보냈다고 가정한다면

```jsx
const RNListener = () => {
  /** react native 환경에서만 가능 */
  const listener = event => {
    const { data, type } = JSON.parse(event.data);
    if (type === "TOKEN") {
      // type이 TOKEN이기 때문에 이곳에 콘솔이 찍히게 됩니다.
      console.log(data) // xxxxx
      ...
    } else if (type === "NOTIFICATION") {
      ...
    }
  };

  if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener("message", listener);
    /** ios */
    window.addEventListener("message", listener);
  } else {
    // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    alert({ message: ERROR_TYPES.notMobile });
  }
};
```

**주의 사항**은 rn을 듣는 listener 함수가 android와 ios가 다름을 인지하고 확실히 분기처리 해야합니다.

## ios webview console 띄우기

시뮬레이터를 이용하여 rn을 띄울경우 시뮬레이터에서 콘솔 및 네트워크를 보는 방법입니다.

사파리 → 환경설정 → 고급 → 메뉴 막대에서 개발자용 메뉴보기

앱 실행하고 시뮬레이트 띄운 다음 → 탑 메뉴에서 → 개발자용 → 시뮬레이터에서 현재 띄운 앱 이름 클릭 → 웹과 동일하게 디버깅 가능

<TagLinks />

<Comment />
