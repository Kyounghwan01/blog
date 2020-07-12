---
meta:
  - name: description
    content: react-native 웹뷰 세팅, rn내 npm 설치 법
  - property: og:title
    content: react-native 웹뷰 세팅, rn내 npm 설치 법
  - property: og:description
    content: react-native 웹뷰 세팅, rn내 npm 설치 법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native-webview/
---

# react-native 웹뷰

```sh
//프로젝트 생성
npx react-native init project-name

//실행
npx react-native run-ios

//npm 다운로드시 해야하는 설정
npm install react-native-webview
//already link 확인
react-native link react-native-webview

//RNCWebview not found 같이 node_module을 못읽는 에러 발생시
//ios/andriod에 연결을 안했기 때문이다
cd ios
pod install

//위 명령어 실행 후 재시작하면 에러가 안뜬다
npx react-native run-ios
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

<TagLinks />

<Disqus />
