# 2021.5월

## 5월 요약

- svelte 트렐로 클론 토이프로젝트 종료
  - [링크](https://svelte-trello.netlify.app/)
  - [깃헙주소](https://github.com/Kyounghwan01/svelte-trello-app)
- 블로그 방문자 월 1.1만명
  - seo가 기간이 지날수록 상위 글로 올라가기에 사람들이 많이 들어오기는 하나 신규 컨텐츠로 유입은 없음
  - 깊이 있는 지식을 전달하려고 노력해야함
- 웹뷰 안드로이드 브릿지 통신
  - 블로그 포스팅 준비중
- 네이버 지도 위치 정보
  - 개발하면서 겪은 에러 및 해결법 포스팅 준비중
- 웹에서 앱 띄우게 하는 딥링크 포스팅 준비중

## 에러 해결 모음

- next build error
  - pages에 연결된 component가 특정 store 값을 참조하고 있을 때 pages component는 provider로 store 값을 건내줘야한다 (로컬에서는 안건내줘도 실행가능하나 배포때 static build error)
- 웹뷰에서 새창 띄우기
  - window.open 쓰면 다 되는 것 같다
- useEffect 내에 setInterval로 1초 간격으로 함수 호출하기
  - setInterval이 아닌 setTimeout 타이머 걸고 상위에 counter state를 넣은 후 counter 변수가 바뀌면 timer가 실행되는 방법으로 작업해야함
  - 위처럼 하지 않으면 clearTimeout이 작동하지 않아 setTimeout 함수가 종료되지 않는다
- useState내 setState로 boolean 값이 바뀌어도 리렌더링이 되지 않거나, 값이 바뀌지 않는 경우
  - useState의 callback 변수를 사용하면 된다
  ```js
  const [test, setTest] = useState(false);
  setTest(callback => !callback);
  ```
