# 2021.2월

## 2월 이슈 요약

- 캐롯 랜딩 어드민 프로젝트 종료
- 블로그 방문자 월 5500명 (GA 기준)
- vue3 공부
- nest 공부

## 에러 해결 모음

### express cors 허용했는데 cors 에러 뜨는 경우

- front에서 쿠키를 주는 경우 서버에서 cors를 허용해줘도 아래와 같은 에러가 뜬다

```
xxx has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```

아래와 같이 `credentials: true`를 추가하여 해결한다

```js
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: ["http://localhost:5000"],
  credentials: true
};

app.use(cors(corsOptions));
```

## 배운점

## vue3

- [vue3 composition api 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api/)

- [composition api vs vuex](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vs-vuex/)

- [vue3에서 vuex 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex)

- [vue3 global 변수 다루기](https://kyounghwan01.github.io/blog/Vue/vue3/global-state/)

- [vue3 teleport 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/teleport/)

- [vuex typescript 사용법](https://kyounghwan01.github.io/blog/Vue/vue3/vuex-ts/)

## nest

- [nest 개념 및 세팅 #1](https://kyounghwan01.github.io/blog/etc/nest/intro/)
- [nest 컨트롤러, 서비스, 엔티티 만들기 #2](https://kyounghwan01.github.io/blog/etc/nest/controller-service/)
- [nest validation과 dto #3](https://kyounghwan01.github.io/blog/etc/nest/validation-dto/)

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBbpcePYPq4NbodO2TsQtb8cjVctb9pYz4",
    authDomain: "joshua-test-deb36.firebaseapp.com",
    projectId: "joshua-test-deb36",
    storageBucket: "joshua-test-deb36.appspot.com",
    messagingSenderId: "135986493087",
    appId: "1:135986493087:web:659749c64679b83bedd4aa",
    measurementId: "G-TF8L8M9EJB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
```
