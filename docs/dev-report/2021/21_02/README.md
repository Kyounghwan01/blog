# 2021.2월

## 2월 이슈 요약

- 캐롯 랜딩 어드민 프로젝트 종료

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

<Disqus />
