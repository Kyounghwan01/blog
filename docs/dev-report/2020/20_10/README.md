# 2020.10월

## 10월 이슈 요약

- 함수형 프로그래밍 [정리](https://kyounghwan01.github.io/blog/JS/functional-programming/map-filter-reduce/)
- react 최적화 공부 [정리](https://kyounghwan01.github.io/blog/React/optimize-performance/intro/)
- aws: route 배포 및 ci/cd 성공 (qa, staging, production) [정리](https://kyounghwan01.github.io/blog/etc/aws-web-hosting/)
- aws: cloudfront 이용하여 http redirect https [정리](https://kyounghwan01.github.io/blog/etc/http-redirect-https/)
- docker 설치 - 백엔드 코드 로컬 실행
- react-native-fcm
- typescript 강의 수강

## 에러 해결 모음

## styled-components createGlobalStyle 버그

dev에서는

```tsx
onst GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap');
  ${normalize}
`;

export default GlobalStyle;
```

위와 같이 커스텀 css를 import 할 수 있으나, styled-components v5 버전 이후 createGlobalStyle의 @import 문제로 위와 같은 코드가 production에 배포시 하위 css가 반영되지 않음

### fix

index.html에 style 태그로 직접 import 시킨다

```html
<style type="text/css">
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap");
</style>
```

## useSelector - Property '' does not exist on type 'DefaultRootState'

타입스크립트에서 useSelector을 쓸때는 state type을 정의해야한다. store에 RootState를 정의했을 것이니 그것을 가져오면 된다.

```tsx
const isDialogOpen = useSelector(
  (state: RootState) => state.tsReducer.isDialogOpen
);
```

## webview내에서 링크 클릭하면 디바이스 새 인터넷 창 띄우기

```tsx
let webviewRef = useRef();
const handleSetRef = _ref => {
  webviewRef = _ref;
};

const onNavigationStateChange = navState => {
  webviewRef.canGoBack = navState.canGoBack;
  // url값을 webview url를 넣으면됨
  if (!navState.url.includes("yourdomain.com")) {
    Linking.openURL(navState.url);
    return false;
  }
};

const onShouldStartLoadWithRequest = event => {
  if (!event.url.includes("yourdomain.com")) {
    Linking.openURL(event.url);
    return false;
  }
  return true;
};

<WebView
  ref={handleSetRef}
  source={{ uri }}
  onNavigationStateChange={onNavigationStateChange}
  onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
/>;
```

relesas-note → 이름 들어감

```tsx
build_app(
      workspace: "studiomate_user_app.xcworkspace",
      scheme: "studiomate_user_app",
      export_method: "development",
    )
이거 빼면 빌드안하고 고고
```

처음 추가

```tsx
fastline 추가
sudo gem install fastlane -NV -- 처음 비번 1안유성, 로그인은 회사 구글 계정으로 로그인
fastlane match development --readonly

yarn global add firebase-tools
firebase login:ci 로그인은 회사 구글 계정으로 로그인
which firebase로 나온 값 Fastfile의 firebase_app_distribution.firebase_cli_path에 복붙
yarn beta:ios

```

배포후 바로 들어가면 성공, 그러나 다른 디바이스에서 접속하면 안됨

dev, pro키를 분리해야할듯

```tsx
const sendTest = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "key=AAAAhDmS-bY:APA91bFjF4dIAkSA-GWSFBgxRmQVwFudM1MII40rlqKSGG9eMWtH7lhQDVCrdv7-Ji7rID6eqOxhPFeHFo5Mb8wBr7SzPv_yUqntcNwATg6MP-vXkZovj7MyB4WPBXhNfW0JzFSU7oBq"
  };
  console.log(1, token);
  try {
    const res = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      { to: token, notification: { title: 123, body: 456 } },
      { headers: headers }
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
```

## 프로젝트 너무 많이 열리면 나오는 에러

```tsx
Error: EMFILE: too many open files, watch
    at FSEvent.FSWatcher._handle.onchange (internal/fs/watchers.js:123:28)
```

Watchman은 문제없이 임의의 많은 파일을 볼 수 있도록 특별히 설계되었으며, 사람들은 일반적으로 Jest가 iirc 어딘가의 문서에서 권장하기 때문에 응용 프로그램이 그렇게 커질 때마다 설치합니다.

```tsx
brew update
brew install watchman
```

## react-native-fcm ios 수신 에러

- [정리](https://kyounghwan01.github.io/blog/React/react-native-firebase-ios-error/)

## 배운점

## 1. docker 및 백엔드 로컬 실행

1. 백엔드 프로젝트 clone
2. docker파일 정의 된것 확인하고

```
git pull
docker-compose up -d // 백엔드 코드 docker 실행 명령어
docker-compose run --rm composer install

// env 없으면 복사
```

## 2. aws에 사이트 배포 및 ci/cd

위 목적을 위해 사용할 기능
`cloudfront, routes 53, s3, iam, codeBuild, code pipeline`

1. s3 버켓을 만든다. (코드 푸시되면 들어갈 공간)

```tsx
// 버킷 정책
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity 임의값"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::user.staging.studiomate.kr/*"
        }
    ]
}
```

- 퍼블릭 권한 풀기

2. iam에 해당 버켓 s3 사용하는 권한 준다
3. cloudfront - 설정 - oaog에 origin access identity 해쉬값을 s3 정책에 넣어줌
4. route 53 dns 추가 - 지정한 사이트가 제대로 동작은 안하지만, 열리는지 확인
5. codeBuild - orign path 나왔는지 확인하고, 깃헙 연결 및 깃헙 프로젝트 등록하고 어떤 브랜치 사용할지 정함
6. code pipeline - cd 설정
   위 aws 웹서비스에 대한 [정리](https://kyounghwan01.github.io/blog/etc/aws-web-hosting/)

## 3. typescript

- 기본 타입 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/basic/)
- 인터페이트 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/interface/)
- 타입 별칭 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/type-aliases/)
- 제네릭 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/generic/)
- 타입 호환 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/type-compatiability/)
- 타입 추론/단언/가드 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/assertion-guard-interface/)

<Comment />
