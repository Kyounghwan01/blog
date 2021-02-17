# 2021.1월

## 1월 이슈 요약

- 블로그 방문자 월 4500명 달성 (GA 기준)
- 토이 프로젝트 완성 (https://khgg.netlify.app/)

## 에러 해결 모음

### `fs.readfilesync()` (서버에 있는 파일 찾는 로직)

- 절대 경로만 사용가능, 상대 경로로 넣으면 파일 못찾음

### Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

- 서버에서 클라이언트로 `res.send`가 2번 들어가는 상황

### Error: .post() requires callback functions but got a [object Undefined] not working

- 없는 컨트롤러 함수 가져올 때 생기는 에러 (require 제대로 됬는지 확인!)

## 배운점

## next

- 동적 meta 태그 [정리](https://kyounghwan01.github.io/blog/React/next/dynamic-meta/)

## JS

- 객제 정렬 [정리](https://kyounghwan01.github.io/blog/JS/JSbasic/object-sort/)
- image Blob 객체 url로 바꾸어 img 띄우기 [정리](https://kyounghwan01.github.io/blog/JS/JSbasic/Blob-url/)

## vuepress

- vuepress seo 최적화 [정리](https://kyounghwan01.github.io/blog/Vue/vuepress/seo/)

## git

- commit, branch ^, ~ 사용하여 옮기기 [정리](https://kyounghwan01.github.io/blog/etc/git/git-branch-change/)

## ts

- Object is possibly 'null'.ts(2531) [정리](https://kyounghwan01.github.io/blog/TS/object-null/)

## mysql

- Sequelize 1:N delete cascade [정리](https://kyounghwan01.github.io/blog/etc/mysql/sequelize-cascade)
- sequelize join [정리](https://kyounghwan01.github.io/blog/etc/mysql/sequelize-join/)
- sequelize multer 이용하여 이미지 업로드 [정리](https://kyounghwan01.github.io/blog/etc/mysql/sequelize-multer/)
- sequelize 페이지네이션 [정리](https://kyounghwan01.github.io/blog/etc/mysql/sequelize-pagenation/)
- express sequelize 예시 [정리](https://kyounghwan01.github.io/blog/etc/mysql/sequlize-basic-example/)
