---
title: 구글을 검색하면 웹은 무슨일을 할까
meta:
  - name: description
    content: what happens when type google, Browser에 www.google.com을 검색하면 어떤 일이 일어날까?
  - property: og:title
    content: what happens when type google, Browser에 www.google.com을 검색하면 어떤 일이 일어날까?
  - property: og:description
    content: what happens when type google, Browser에 www.google.com을 검색하면 어떤 일이 일어날까?
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/what-happened-search-google/
---

# 구글 검색하면 일어나는 일

웹에서 검색하면 어떤 일들이 일어나는 지 알고 싶었고 [What happens when you type a URL in the browser and press enter?](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a) 이 글을 읽고 정리를 해보았다.

## 구글을 검색한다

브라우저에 www.google.com을 검색한다

## 브라우저는 캐싱된 dns 기록으로 ip 체크

DNS(Domain Name System)은 url들의 이름과 ip 주소를 저장하고 있는 데이터베이스이다. 인터넷에 있는 url은 고유의 ip 주소를 가지고 있는데, 이 주소를 확인하려면 터미널에 `nslookup www.google.com`을 검색하면 ip 주소를 알려준다.

DNS의 가장 큰 목적은 url 검색을 쉽게 하기 위함이다. 숫자로 검색할 수 있지만 숫자로 매번 검색하는 것보다 문자로 검색하는 것이 더 쉽기 때문이다. 이처럼 DNS는 사람들이 웹에 접속하기 쉽게 하는 맵핑하는 역할을 한다.

다시 원론으로 돌아와서, 웹사이트를 브라우저에 접속하면 브라우저는 DNS 기록을 4가지 캐시에서 확인한다.

1. 가장 먼저 브라우저 캐시를 확인한다. 브라우저는 당신이 접속한 후 약간의 기간 동안 DNS 기록을 캐싱하고 있다. 이전에 접속한 기록이 있는지 브라우저 DNS을 먼저 확인한다.
2. 두번째 OS에 저장된 캐시를 확인한다.
3. 세번째는 router 캐시를 확인한다. 두번째까지는 내 컴퓨터 내에 저장된 DNS 기록을 확인 하는 것이고, 세번째 부터는 router와 통신하여 DNS 기록을 서칭한다. (router - tcp/ip 통신을 할때 클라이언트에서 서버로 패킷 단위로 찢어진 데이터가 노드를 통해 이동하는데 이때 어떠한 노드로 이동해야 가장 효율적으로 이동하는지 정하는 기능을 라우팅이라고 하고 이것을 하는 장비가 router)
4. 마지막은 ISP(인터넷 서비스 제공업체 - sk, kt, lg) 캐시를 확인한다.

이렇게 단계가 나눠져 있는 이유는 트래픽을 조절하고, 데이터 전송 시간을 줄이기 위해 작동한다.

## isp dns 서버가 dns query 날림

위 4가지 방법으로 캐싱된 ip 값을 찾지 못하였다면, isp 서버가 요청한 웹의 ip을 찾기 위해 dns query를 날립니다.

dns query는 여러 dns 서버들을 탐색하여 웹의 ip 주소를 찾는 것입니다. 이것을 `recursive search`라고 부릅니다. dns 서버간 반복적으로 찾다가 못찾아서 에러를 발생할 때 까지 검색합니다.

## 브라우저가 서버와 tcp 연결 한다

위 작업으로 올바른 ip를 받았다면 브라우저는 ip 주소와 일치한 서버와 연결하여 정보 전송을 요청합니다. 가장 일방적으로 http 요청으로 tcp/ip 요청을 한다.

### tcp/ip

웹 클라이언트와 서버간 데이터 패킷이 오가려면 tcp connection이 되어야한다. 이때 tcp/ip three-way handshake라는 프로세스를 통해 클라이언트와 서버간 연결을 한다.

### tcp/ip three-way handshake

1. 클라이언트가 서버에 SYN 패킷을 전송하여 연결 가능한지 요청한다.
2. 서버에 connection할 수 있는 포트가 있다면 SYN/ACK 패킷을 클라이언트에 보낸다.
3. SYN/ACK 패킷을 받은 클라이언트는 서버로 ACK 패킷을 보낸다.

이 과정이 완료되면 tcp 연결이 되었다. ip의 패킷통신방법은 순서와 데이터가 전체 도착하였는지 보장하지 않지만 tcp는 순서와 데이터 도착여부를 보장하기에 tcp/ip가 같이 동작한다.

## 브라우저가 웹 서버로 http 통신 요청을 한다.

위 단계를 통해 tcp 연결 까지 완료되었다면 브라우저는 GET 요청을 통해

### get/post 차이

#### get

- 데이터를 조회할때 사용하는 방식
- url에 데이터를 넣어서 전송 (너무 길면 잘린다 2,083)
- url이 노출되기에 보안에 취약
- 같은 url은 캐싱된다
- body는 들어가지 않는다

#### post

- 데이터를 서버에 제출하거나, 수정할때 사용
- 데이터를 body에 포함시킨다
- url에 데이터가 노출되지 않아 보안 유지 (브라우저 히스토리, 서버로그에 저장되지 않음)
- 전송 길이 제한 없고 캐싱 할 수 없다

## 서버가 요청을 처리하고 response를 생성 후 http response 보냄

- 1xx은 정보만 담긴 메세지라는 것을 의미한다
- 2xx response가 성공적이라는 것을 의미한다
- 3xx 클라이언트를 다른 URL로 리다이렉트함을 의미한다
- 4xx 클라이언트 측에서 에러가 발생했음을 의미한다
- 5xx 서버 측에서 에러가 발생했음읠 의미한다

## 브라우저가 html content를 보여준다

### html과 css 파일을 위 과정을 통해 받아와 각각 트리를 만듬

- 먼저 html 태그를 해석해 html dom을 만들고
- css가 포함되어있다면 csssom 트리 구성도 함께 진행한다.

### 두 트리를 결합하여 렌더트리를 구축

- dom과 csssom을 결합하여 렌더트리를 만든다 (display: none, head 태그내부 요소는 렌더트리에 없다)

### 렌더트리 배치 (리플로우, 레이아웃)

- 렌더 트리 생성되면 배치가 시작되는데 렌더트리에서 각 노드의 위치, 크기 계산하여 배치한다

### 그리기 (리페인팅)

아래와 같은 스텝으로 그리기를 실행

1. 배경 색
2. 배경 이미지
3. 테두리
4. 자식
5. 아웃라인

브라우저는 변경에 대해 가능한 한 최소한의 동작으로 반응하려고 노력한다. 그렇기 때문에 요소의 색깔이 바뀌면 해당 요소의 리페인팅만 발생한다. 요소의 위치가 바뀌면 요소와 자식 그리고 형제의 리페인팅과 재배치가 발생한다. DOM 노드를 추가하면 노드의 리페인팅과 재 배치가 발생한다. "html" 요소의 글꼴 크기를 변경하는 것과 같은 큰 변경은 캐시를 무효화하고 트리 전체의 배치와 리페인팅이 발생한다.

### 레이어 합성 및 실제화면 출력

## 리플로우/리페인팅

- 리플로우와 리페인트는 렌더링과정에서 레이아웃 단계와 그리기 단게를 다시 거치는 과정이다.
- 렌더링 트리 구성에 사용된 모든 노드의 작은 변경에도 발생한다
- dom 추가 삭제 업뎃
- 돔 이동, 스타일 추가, 윈도우 크기변경, 폰트변경, 스크롤 등등

### 리플로우 발생하는 속성

- width,height, padding, margin, float, position 같이 레이아웃 위치에 영향을 주는 모든 속성
- 리플로우가 발생하면 그 후 단계는 무조건 실행된다 (리플로우 -> 리페인팅 -> 컴포짓 실행)
- 리플로우, 리페인팅이 발생하는 요소가 많다면 브라우저 성능에 영향을 준다

### 리페인팅 발생하는 속성

- color, border-radius, background 같이 시각적으로 보이는 속성

## 브라우저는 똑똑하다 그러나 몇가지는 아니다

- 매번 하나가 바뀔때마다 한번씩 리셋할수는 없지, 그래서 내부적으로 queue를 설정해 일괄 리플로우 실행한다. 그런데 아래와 같은 경우는 무조건 리플로우한다
- offsetTop, offsetLeft, offsetWidth, offsetHeight
- scrollTop, scrollLeft, scrollWidth, scrollHeight
- clientTop, clientLeft, clientWidth, clientHeight
- getComputedStyle() 또는 IE의 currentStyle
- 위 메소드는 노드의 스타일 정보를 요구하기에 브라우저는 계속 정보를 줘야한다. 그러니까 무조건 리플로우가 되어야하니 저런 것 쓰면 브라우저는 진짜 힘들겠다

## 리플로우/리페인팅 최대한 막기

- 간단히 봐서는 스타일 정보 요구를 적게하면 리플로우를 적게 할 수 있다
- 스타일 값을 변경하는 것이 아니라 클래스 네임을 바꾸는 것이 유리하다. (따로 바꾸는 것이 아닌 한번에 바꾸기 때문)
- 클래스 네임 변경이 불가피하다면 cssText를 이용하여 한번에 바꾸자
- dom을 일괄로 한번에 변경한다
  - 여러번 바뀌어야 최종완성이 되는 돔이 있다면 display: none으로 해당 노드 없에고(리플로우, 리페인팅 1번) 그 노드에 최종 완성되는 노드까지 작업을 실행 (이떄는 리플로우, 리페인팅 안일어남)한후 display를 복원한다 (리플로우, 리페인팅 1번)
- top, left 말고 transform 속성을 사용한다
- requestAnimationFrame를 사용한다 (내부적으로 transform을 사용하기에 리플로우 안함)
- 스크롤은 Intersection Observer API 사용

## osi 7layer

## http1.0 ~ 1.1 버전차이

### keep-alive

- keep-alive가 생겨서 한번 연결하면 받고자하는것을 5초간 200개까지 한번에 받고 연결 끊는다
- 하나의 연결에 여러 요청을 쓰기에 효율적이지만, 그만큼 연결이 늘어나서 동시간대 연결이 늘어난다. 너무 많은 연결이 있으면 서버가 추가로 연결을 받을 수 없으므로 터진다

### 파이프라이닝

- 원래는 req1 -> res1 -> req2 -> res2 이런 식인데
- req1 -> req2 -> res1 -> res2 순으로 response를 기다리지 않고 req 보냄
- 그만큼 응답 속도를 높여서 페이지 렌더링 시간 줄임
- HOL Blocking 문제 발생 (req1의 res1이 너무 길어지면 res2, res3도 늦어짐)

### 호스트 헤더

- 호스트 헤더가 가능해서 서브도메인을 사용할 수 있다.
- 1.0에서는 하나의 ip에 하나의 도메인만 운영가능했다. host header 추가로 서브도메인이 가능해졌다.

### 인증 절차

- client, server간 프록시 인증
- proxy-authorization
- proxy-authentication

## http1.1 ~ 2 버전 차이

- 멀티플렉싱: 요청순서 상관없이 먼저 들어온 응답 먼저 처리
- 우선순위에 따른 응답 처리 (css, img여러개 있으면 css를 우선순위올려 먼저 응답)
- HPACK 헤더 압축
- 서버푸시 (요청 안해도 서버에서 필요한 정보 같이 보냄)

## http vs https

- http는 서버에서 브라우저로 값을 보낼때 암호화되지 않아 데이터를 쉽게 도난당할수있다.
- https는 서버와 브라우저 사이 암호화해줌으로 보안 강화 ssl 인증서
- amp 가속화된 모바일 페이지 만들때도 https를 사용해야함

<TagLinks />

<Comment />
