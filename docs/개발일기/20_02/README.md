# 2020.02월

## 2월 이슈 요약

- sms 개발
- git merge 방법
- 회계장부 개인 프로젝트 시작
- pagenation 및 next, prev 호출법

## 2.1

- Vuepress 기반 블로그 작성 시작
  - 카테고리 분류
  - 메인페이지 수정
  - Header tab 변경

## 2.2

- 회계장부 관리 프로젝트 요청
  - Stack : vue, ~~그렙큐엘 예정~~
  - ui : element-ui
  - ~~serverless로 로컬스토리지로 일단 프론트 부터 제작 예정~~
  - firebase

## 2.4

- 수업 종료 후 회원을 취소하는 경우 최소 수강인원보다 수강인원이 적어지면 자동 폐강된다는 알림 모달

## 2.5

- sms list 이전, 다음 목록
  - 이슈 : 동일한 날짜, 동일한 시간에 보낸 내역의 경우 이전, 다음 목록을 어떻게 처리할 것인가?
  - prev, next 별개로 나를 포함한 같은 시간의 데이터는 today라는 배열에 넣는다.
  - 만약 today의 length가 2이고, 0번 배열이 현재 값이면 next는 today[1], prev는 prev 값을 가진다.
  - 만약 today의 length가 2이고, 1번 배열이 현재 값이면 next는 next, prev는 toady[0] 값을 가진다.
  - 만약 today의 length가 3이고, 1번 배열이 현재 값이면 next는 today[2], prev는 today[0] 값을 가진다
  - 위와 같은 규칙으로 같은 시간대 데이터도 모두 보여준다.
- sms 기능 qa 배포 완료

## 2.6

- 엑셀다운로드 - 만료회원 포함 / 미포함, 수강권 종류 추가 hotfix
- 회원 등급에 색상 추가 - 등급 추가하는 경우만 색상 params 추가 완료
  - 요구사항
    - 등록 api
    - 디자인
  - 할 과제
    - 수정시 나오는 화면 및 로직
- 예약 내역 `취소` 도 나와야하는 상황
  - getAll api 호출시 `취소` 를 제외한 나머지 자료 들어옴
  - 취소 포함 제공 요구
- Sms payment 로직개선 - api 호출 최소화
- reduce 함수 응용
  ```js
  let largeArray = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ];
  //위 배열을 하나의 통으로 만들고 싶을때
  let concatArray = largeArray.reduce(
    (combine, nextArray) => combine.concat(nextArray),
    []
  );
  //concatArray = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8......]
  ```

## 2.13
- input내 작성된 글자 바이트 체크하여 원하는 바이트 초과시 뒤에서 부터 글자 제거 `substring(0,e.target.value.length -3);`

## 2.14

- sms 브랜치에 qa가 merge됨...
- master에서 새 sms 브랜치 만들어 qa에 있는 sms, payment관련 로직 가져옴 (대략 40개 파일)
- 머지
```shell
예시) 현재 작업 브랜치 이름 : SM-gh
작업완료
git push origin SM-gh (현재 브랜치 : SM-gh)
git checkout qa (현재 브랜치: qa)
git pull origin qa (현재 브랜치: qa)
git merge SM-gh (현재 브랜치: qa) - **컨플릭이 날 경우 브랜치 옮기지 말고 여기서 해결.
vscode내에서 컨플릭 해결 후
git add .
git commit -m "컨플릭해결문구"
git push origin qa (현재 브랜치: qa)

```

## 2.17

- 폐강 시간 이후 최저 인원 미만으로 회원 수업 취소시에도 폐강 알림 팝업 및 체크박스 체크시 폐강 안됨
- 기존 -> 무조건 취소 or 취소 됨 경고 팝업
## 2.18

- 월간 예약 제한
  - 수강권 생성/수정 예약 제한 설정
  - 수강권 layout에 월간/주간 표기 수정
  - 수강권 회원에게 발급시 `ticket`값 아닌 `usetTicket`값 추적
  - 일괄예약(프라이빗/그룹 모두)시 그 달 예약 횟수 불러와서 예약 제한 수에 따른 예약 성공 실패 도출
  - 일반 예약시 그 달 예약 횟수 불러와 예약 성공 실패 도출

## 2.19

- 락커 진입 layout
- sms qa 추가 리뷰사항 수정 시작

## 2.21

- sms 최종본 staging 추가
- `kspay` 결제 시스템 숙지
  - sms 결재번호와 user에 대한 정보를 기반으로 iframe 주소를 이용하여 `iframe`으로 출력시 `kspay` 내부 프론트로 이동되고 결제 여부 및 결제 수단, 요금 데이터를 뿌려줌. **즉, front측은 iframe으로 결제 모듈을 열어주면 종료**
  ```html
  <iframe :src="결재번호+고객번호"></iframe>
  ```
- sms 미리보기 ui 추가
  - 휴대폰 기종에 따라 `width` 값이 모두 달라 한 기종에 맞출 수 없음. 가장 많이 쓰는 핸드폰의 해상도에 맞추어 `width`값을 한정 후 그 값 이상으로 올라가면 자르고 아랫줄에서 보이게 해결. <br>띄어쓰기의 경우 바로 줄내림을 해야하는데 css `white-space: pre-line;, word-break: break-word;` 로 해결
  ```vue
  <template>
    <div class="preview-message">
      <p>{{ message }}</p>
    </div>
  </template>
  <style>
  .preview-message {
    white-space: pre-line;
    height: 500px;
    width: 370px;
    overflow-y: auto;
    p {
      word-break: break-word;
    }
  }
  </style>
  ```
- sms 필터 추가
  - sms/lms
  - 예약문자/보낸문자
  - 기간별 문자 보낸 현황 (+발송 성공 건수)
- sms 문자 송신에 따른 광고 경고 ui
- 2000바이트 초과시 문자 못보내게
  - 2000바이트 초과시 초과 경고 팝업 및 바이트 색 붉은색.
  - 2000바이트 초과 전송시 문자 전송 실패

## 2.22

- vue, firebase 조합 회계장부 웹 개발 시작
- firebase기반 auth 로그인 기획
