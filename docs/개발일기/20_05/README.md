# 2020.05월

## 4월 이슈 요약

- 깃 커밋 컨벤션 정의
- 웹 프로젝트 코드 컨벤션 정의
  - `.prettierrc` 도입 함으로 강제 코드 포멧팅
- FCM 알림 실시간 새로고침
- 통계 - 불필요 api 제거 및 로직 개선 - 초기로딩 3초 단축
- 자주 쓰는 api 호출 및 데이터 가공 utils 함수로 분리
- 그 외, 시설 cs 사항 유지보수 일체

## 5/4

- react native 설치

```jsx
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

## 5/7

1. 수강권 업그레이드 시 전체, 잔여 횟수 표시
2. 변경이력에 횟수정보
3. 입력/수정할 수 있는 횟수는 최대 999회인데 업그레이드로인해 999회를 초과한 횟수가 표시됨
4. 일정-> 수업 팝오버시 기간제 ㅍ수강권에 횟수정보 표시 – 표시안함으로 변경
