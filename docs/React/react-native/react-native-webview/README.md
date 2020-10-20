---
meta:
  - name: description
    content: react-native webview 세팅, rn내 npm 설치 법
  - property: og:title
    content: react-native webview 세팅, rn내 npm 설치 법
  - property: og:description
    content: react-native webview 세팅, rn내 npm 설치 법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/react-native-webview/
tags: ["react-native", "react"]
---

# react-native webview

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

```js
//App.js
import { WebView } from "react-native-webview";

const App = () => (
  <>
    <WebView source={{ uri: "https://sales-statistics.netlify.app/" }} />
  </>
);
```

## FCM

```jsx
// index.js 가장 먼저 들어오는 곳에 정의 해야함
const NotificationHandler = async message => {
  console.warn("RNFirebaseBackgroundMessage: ", message);
  return Promise.resolve();
};

const AppService = () => {
  const noticeInitFunc = () => {
    messaging().setBackgroundMessageHandler(remoteMessage => {
      // 앱 켜져있고 다른 앱 보는 중
      console.log("Message handled in the background!", remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        // 앱 켜져있고 다른 앱 보는 중
        // 앱 킨 이후 알림 누르면 나오는 콘솔
        // 앱 꺼져있고 콘솔
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(1);
        if (remoteMessage) {
          console.log("close", remoteMessage.notification);
        }
      });
  };

  useEffect(() => {
    noticeInitFunc();
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => NotificationHandler
);
AppRegistry.registerComponent(appName, () => AppService);
```

## ios webview console 띄우기

사파리 → 환경설정 → 고급 → 메뉴 막대에서 개발자용 메뉴보기

앱실행하고 시뮬레이트 띄운 다음 → 탑 메뉴에서 → 개발자용 → 시뮬레이터에서 현재 띄운 앱 이름 클릭 → 웹과 동일하게 디버깅 가능

<TagLinks />

<Disqus />
