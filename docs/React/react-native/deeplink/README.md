---
title: react-native deeplink 딥링크 + fcm
meta:
  - name: description
    content: react-native deeplink 딥링크, firebase push messaging, fcm
  - property: og:title
    content: react-native deeplink 딥링크, firebase push messaging, fcm
  - property: og:description
    content: react-native deeplink 딥링크, firebase push messaging, fcm
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/deeplink/
tags: ["react-native", "react"]
---

# deeplink 만들기

react-native로 android와 ios에서 딥링크로 앱에 접속하는 방법에 대해 알아볼겠습니다.

## android

- 먼저 안드로이드 세팅입니다.

### AndroidManifestt.xml

- activity내부에 아래 코드를 추가합니다.
- scheme에 앱이름을 넣습니다.
  - 앱 이름은 myApp이고 이렇게 되면 딥링크 url은 myApp://~~~이 됩니다.

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="myApp"/>
</intent-filter>
```

## ios

### Info.plist

- CFBundleURLTypes 내부에 array를 추가합니다.

```
<dict>
  <key>CFBundleTypeRole</key>
  <string>Editor</string>
  <key>CFBundleURLName</key>
  <string>telepodsee</string>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>telepodsee</string>
  </array>
</dict>
```

## react-native

- 위처럼 세팅하면 native는 세팅이 끝나고 rn 세팅입니다.

### useDeepLink.tsx

- hook으로 만들어서 가장 root되는 App.tsx에서 사용하도록합니다.
- 아래와 같이 rn의 Linking을 사용하면 손쉽게 deeplink url을 가져옵니다.

```ts
import { useEffect } from 'react';
import { Linking } from 'react-native';

const useDeepLink = () => {
  const handleDeepLink = (event: { url: string }) => {
    const url = event.url; // "앱이름://~~딥링크주소~~"
  };


  useEffect(() => {
    // 앱이 이미 열려있는 상태에서 딥링크 들어오는 경우
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // 앱이 딥링크로 처음 실행될 경우
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => subscription.remove();
  }, []);
}
```

## 호출방법

- 안드로이드 : 터미널에서 rn앱으로 경로를 잡아놓고 `npx uri-scheme open "앱이름://~~딥링크주소~~" --android`
- ios : 기기에서 사파리 켜고 사파리 주소에서 `앱이름://~~딥링크주소~~` 호출하면 됩니다.

## firebase를 이용한 push를 받을 때 딥링크 이동

- firebase messaging을 이용해서 push 핸들링을 많이 할텐데, 이것도 추가로 알아봅시다.

```ts
import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const useDeepLink = ({ navigationRef }: { navigationRef?: any }) => {
  const { setDeepLink, deeplink } = useInitStore();

  const handlePushNavigation = (remoteMessage: any) => {
    const url = remoteMessage?.data?.url;
    console.log("url", url);
  };


  useEffect(() => {
    // 백그라운드에서 알림 클릭했을 때
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('푸시 클릭 (백그라운드)', remoteMessage);
      handlePushNavigation(remoteMessage);
    });

    // 포그라운드에서 메시지를 받을 때
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      await displayNotification(remoteMessage);
    });

    // 앱이 종료된 상태에서 알림 클릭한 경우
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('푸시 클릭 (앱 종료)', remoteMessage);
          handlePushNavigation(remoteMessage);
        }
      });

    // Clean-up
    return () => {
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnMessage();
    };
  }, []);
};
```