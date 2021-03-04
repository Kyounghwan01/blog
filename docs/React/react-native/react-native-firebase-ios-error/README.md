---
title: react-native firebase colud messaging (fcm) ios - NotRegistered
meta:
  - name: description
    content: react-native firebase colud messaging (fcm) ios - NotRegistered, ios, android, react native, react, redux, apple, react16, google
  - property: og:title
    content: react-native firebase colud messaging (fcm) ios - NotRegistered
  - property: og:description
    content: react-native firebase colud messaging (fcm) ios - NotRegistered, ios, android, react native, react, redux, apple, react16, google
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/react-native-firebase-ios-error/
tags: ["react-native", "react"]
---

# react-native fcm ios 수신 에러

## 어디서 안되는지 확인

- token값이 유효한지 확인
- fcm을 통해 받은 token 값을 postman을 통해 fcm.google.com으로 쏜다.
- 결과 `NotRegistred` 라는 결과를 얻게됨.
- 만약 CURL문 또는 postman을 쐈는데, success라고 뜬다면 fcm을 받는 `onMessage`함수 로직이 잘못됨.

## fcm send curl문 예제

```
curl -X POST --header "Authorization: key=${fcm_server_key}" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d '{"to" : "${fcm_token}",  "priority" : "high",  "notification" : { "body" : "Background Message", "title" : "BG Title" }, "data" : { "title" : "FG Title", "message" : "Foreground Message" }}'
```

## fail이유가 NotRegistred

- ios의 경우 앱이 꺼지면 fcm과 연결이 끊기면서 이전 fcm token으로 send를 보내면 NotRegistred라는 에러를 띄운다
- 그래서 해당 ios기기는 앱 실행시 다시 fcm과 새로운 token으로 연결을 시도해야한다.
- 그러나 앱에 재접속하고 getToken 함수를 실행하면 끊긴 token 값을 리턴해준다.
- 그러므로 getToken으로 받은 값과 서버에 존재하는 token 값이 같다면, deleteToken을 실행하여, fcm에 지정된 ios 기기 토큰 값을 초기화 하고, 다시 getToken을 실행하여 새로운 토큰값을 받아야한다.

## 해결

```js
const getToken = async () => {
  const oldToken = await messaging().getToken();
  // oldToken과 서버의 token이 같다면
  await messaging().deleteToken(String(${fcm_send_id}), '*');
  const newToken = await messaging().getToken();
  if (oldToken === newToken) {
     console.log('not refresh')
  } else {
    return newToken;
  }
};
```

## fail이유가 InvalidRegistration

- header에 들어가는 Authorization : key=xxxxx 이 값이 이전 server key를 바라보고 있거나, 다른 프로젝트의 server key를 사용할 가능성이 크다.
- 위 이유가 아니라면 나의 경우, 같은 계정을 여러 디바이스에서 빠르게 실행하여 fcm에서 잠시 pause를 준것 처럼 느껴졌다. 약 10분이 지나니 정상 작동하였다.

<TagLinks />

<Comment />
