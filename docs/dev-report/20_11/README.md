# 2020.11월

## 11월 이슈 요약

- mobx 공부 [정리](https://kyounghwan01.github.io/blog/React/mobx/basic/)
- typescript 개념 정리 포스팅 [정리](https://kyounghwan01.github.io/blog/TS/Fundamentals/basic/)

## 에러 해결 모음

### TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type undefined

#### fix

1. package.json의 "react-scripts" 버전 확인 "^3.4.0" 이상으로 수정
2. rm -rf node_moduled
3. yarn install
4. yarn start

<Disqus />
