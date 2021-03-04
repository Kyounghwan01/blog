---
title: Ajax 실행 단계
meta:
  - name: description
    content: Ajax 실행 단계, callback, promise, XMLHttpRequest, async await
  - property: og:title
    content: Ajax 실행 단계, callback, promise, XMLHttpRequest, async await
  - property: og:description
    content: Ajax 실행 단계, callback, promise, XMLHttpRequest, async await
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/Ajax/AjaxStep/
tags: ["JS"]
---

# Ajax 실행 단계

아래 순서대로 설명하겠습니다

> 1. XMLHttpRequest (요청) 객체 생성
> 2. 처리 결과를 받을 이벤트 리스너 등록
> 3. 서버로 보낼 데이터 생성
> 4. 클라이언트와 서버 간의 연결 요청 준비 (`open()` 메서드 사용)
>    1. 서버로 보낼 데이터 전송방식 설정 (GET, POST)
>    2. 서버 응답 방식 설정 (동기, 비동기)
> 5. 실제 데이터 전송
> 6. 응답 처리
> 7. 데이터 처리

## 1. XMLHttpRequest란?

> XMLHttpRequest 객체는 서버와 클라이언트 간 통신을 담당하는 객체입니다.
> Ajax를 통해 서버통신을 할 때 가장 먼저 생성해야 할 객체입니다.

아래는 XMLHttpRequest 객체를 생성하는 코드입니다.

```js
window.onload = function() {
  var xmlHttp = createXMLHTTPObject();
};

// 1. 브라우저에 따른 XMLHttpRequest 생성
function createXMLHTTPObject() {
  var xhr = null;

  if (window.XMLHttpRequest) {
    // IE7+, 크롬, 사파리, 파폭, 오페라는 XMLHttpRequest 객체를 제공합니다.
    xhr = new XMLHttpRequest();
  } else {
    // IE5,6 버전
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return xhr;
}
```

위 코드는 mdn에도 나와 있는 초기 객체 생성의 공식같은 내용입니다.

### 1.1 XMLHttpRequest의 주요 메서드

1. `open(method , url , async)`: return 없음
   두번째 매개변수 url이 요청 대상 url 입니다.
   첫번째 매개변수는 get,post로 나뉘며 get의 경우 두번째 url으로 부터 정보를 받습니다. post는 두번째 매개변수 url로 정보를 보냅니다.
   세번째 매개변수는 요청에 대한 응답을 기다리는 방식으로 true : 비동기 (기본값), false 동기 입니다.
2. `send(data)`: return 없음
   http 요청을 실제로 실행하는 메소드 (data : POST방식으로 보낼 데이터)
   이 메소드가 실행돼야 요청이 서버로 전달됩니다.

### 1.2 XMLHttpRequest의 주요 프로퍼티

1. `readyState`:
   요청 상태를 나타내며, 이 프로퍼티를 이용하면 클라이언트와 서버간 데이터 통신이 현재 어디까지 진행됬는지 확인 가능합니다.
   0 : 초기화 되지 않은 상태
   1 : 로드되지 않은 상태 (즉, send() 메소드가 호출되지 않은 상태)
   2 : 로드된 상태, 헤더와 상태는 받았으나 아직 응답을 받지 못한 상태
   3 : 상호 작용 상태. 데이터의 일부분만 받은 상태
   4 : 완료 상태
2. `onreadystatechange` :
   요청 상태가 변경될 때 발생하는 이벤트 입니다.
3. `responseText` :
   서버 응답에 반환된 본문 콘텐츠 입니다
4. `responseXML` :
   서버 응답이 xml이면 xml 본문 콘텐츠로 채워집니다.
5. `state`:
   서버 응답상태
   200 = 성공
   404 = 페이지를 찾을 수 없음
6. `statusText` :
   응답으로 반환된 상태 메세지 입니다.

## 2. 처리 결과를 받을 이벤트 리스너 등록

위에 쓰인 `onreadystatechange` 이벤트는 클라이언트와 서버 간의 데이터 전송 상태가 바뀔 때마다 발생하는 이벤트 입니다.
즉, **서버가 클라이언트에서 요청한 응답으로 보내는 데이터를 얻으려면 이 이벤트**를 사용해야한다는 것입니다. 이를 위해서는 먼저 실제 데이터 전송이 이뤄지기 전 이벤트 리스너를 등록해야 합니다.

```js
xmlHttp.onreadystatechange = on_ReadyStateChange;
```

이후 `open()` 메소드 ( 연결 요청 준비 단계 )와 `send()` 메소드 ( 실제 데이터 전송 )가 이루어지면 앞의 코드와 이벤트 리스너로 등록한 `on_ReadyStateChange()`리스너 함수가 실행되고 데이터를 주고 받는 과정에서 통신이 정상적으로 이루어 졌다면 그 통신의 시점만 알아내면 됩니다.

통신 시점의 상태 알아내는 코드

```js
// 응답 처리
function on_ReadyStateChange() {
  /**
   * 0 = 초기화 전
   * 1 = 로딩 중
   * 2 = 로딩 됨
   * 3 = 대화 상태
   * 4 = 데이터 전송완료
   */
  // 4 = 데이터 전송완료
  if (xmlHttp.readyState == 4) {
    // 200 = 통신 성공, 404 = 페이지가 존재하지 않음
    if (xmlHttp.status == 200) {
      /**
       * ----------------------------------
       * 이 영역에서 서버에서 보낸 데이터를
       * 타입(XML, JSON, CSV) 에 따라 처리
       * ----------------------------------
       */
    } else {
      alert("error!.");
    }
  }
}
```

정상적으로 통신이 이루어졌다면 이때 서버에서 보내온 데이터가 담긴 responseText와 responseXML프로퍼티를 이용하면 됩니다.

<TagLinks />

<Comment />
