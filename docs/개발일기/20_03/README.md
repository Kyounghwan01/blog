# 2020.03월

## 3월 이슈 요약

- 락커 릴리즈
- SMS 2차 개발 시작
- SMS 회원 목록 (페이지네이션, 이전 페이지 선택 저장)
- github 내에서 컨플릭 해결할시 base 브랜치 내용이 compare 브랜치내로 들어감
- AWS lambda, api gateway로 토이프로젝트 백엔드 구축
- scss mixin사용법
- validate 사용법 (this.$v)

## 3.2
**SM**
- 기존 sms 회원 목록 불러오는 방법 : 전체 다 불러오기
- 개선 : 페이지네이션으로 100명씩 불러오기
- 과제
  1. 이전 페이지에서 클릭한 사람 다음 페이지로 넘어가도 유지되어야 함
  2. 선택 완료 후, 다시 목록에 들어가도 이전 클릭한 사람은 목록에 체크 되어야 함. => 체크 한 사람은 store 배열 내 저장 후 목록을 불러올 때, 그 사람의 id와 store에 저장된 배열 내 id가 같은 정보가 있으면 checked 한다.
  3. 전체 선택시 현재 가진정보는 100명인데, 나는 전체 인원의 데이터를 가지고 목록을 채워야함 => 전체 선택 버튼 클릭 후, 선택 완료 버튼 클릭시 전체 회원 부르는 api 호출

**TOY**
- vue + typeScript 환경 구축 중...

## 3.3
**SM**
- SMS 개선 작업 완료

**TOY**
- 이전 js에서 쓰던 aliase를 반영하지 못함. `vue.config.js`가 타입스크립트에서는 반영이 안된다.
- `tsconfig.js`에서 모두 해결해야함. path를 이용하여 aliase 사용 할 수 있다.

## 3.4
**SM**
- 락카 할당(assign) 작업 시작
- vue에서 이벤트 버블링 막는 방법 [관련 자료](https://kr.vuejs.org/v2/guide/events.html)


## 3.5
**SM**
- 락카 할당 , 삭제, 정지 (CRUD) 구현
**TOY**
- vue + typeScript 환경 구축 중...
- firebase 백엔드 버리고 aws lambda, api gateway 공부

## 3.8
**TOY**
- aws lambda, api gateway로 백엔드 구축 완료
- front : user 생성 및 조회 기능 완료
- cors 해결 : 서버에서 클라이언트로 응답보낼때 header에 `Access-Control-Allow-Origin: *` 담아 보냄
- 타입스크립트 프로젝트 내에서 자바스크립트 읽기 포스팅

## 3.9
**SM**
- [validate](https://vuelidate.js.org/#sub-without-v-model): form에 들어가는 필수 항목 체크 라이브러리
- 락커 기능 완성
- 락커 리스크 화면 구성 변경
- mixin에 ellopse, flex 많이 쓰는 방법 미리 구현하면 빠른 개발 가능

**TOY**
- user 생성 layout css 완성

## 3.10
**SM**
- github 내에서 컨플릭 해결할시 base 브랜치 내용이 compare 브랜치로 들어감
:::danger github내에서 conflict 해결시
base 브랜치 내용이 compare 브랜치에 들어간다.<br>
즉, 이번이 base 브랜치에 넣고 다시는 그 브랜치 작업 안한다면 github내에서 해결하고 다시 작업 할 일이 있다면, 해당 브랜치에서 재작업 후, push 할 것!!
:::
- 서비스워커 개념 숙지, 회사코드에 반영 중

**TOY**
- getter, setter 사용 예제 포스팅