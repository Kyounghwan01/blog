---
meta:
  - name: description
    content: 파이썬 웹 크롤링 (html 타입)
  - property: og:title
    content: 파이썬 웹 크롤링 (html 타입)
  - property: og:description
    content: 파이썬 웹 크롤링 (html 타입)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/기타/python/html-crawling/
---

# html타입 웹 크롤링

## 중요!

- [웹 크롤링 튜토리얼](https://kyounghwan01.github.io/blog/기타/python/crawling-tutorial/)을 먼저 보고 오세요

## TODO

- 전자공시 사이트의 모든 회사 정보를 가져옵니다.

## 크롤링 전 확인해야 할 것

- 우리가 크롤링 할 사이트가 정해졌다면, 크롤링할 사이트로 들어가 F12를 누르고 network탭을 눌러, 우리가 가져오고자 하는 request url을 찾고, 그 **url을 메모**합니다.<br>
  이후, 이 request url을 통해 받는 response값의 유형이 `html`타입 이어야 합니다.<br>
  `json`타입은 [json타입 웹 크롤링](https://kyounghwan01.github.io/blog/기타/python/json-crawling/)을 보시면 됩니다.

#### HTML Dom에 접근하는 방법

1. tag로 접근 (h1, p, span, div)
2. class 속성값으로 접근 (.className)
3. id 속성값으로 접근 (#id)

#### class, id값으로 돔 잡는법

- `p.name`, `p.password` - p태그의 name class 값을 가져온다
- `#info p.name` - id가 info라는 엘리먼트를 가져오고 그 자식중 p태그의 class가 name인 것을 가져온다
- tag로 가져오면 너무 중복이 많으므로, tag를 가져오되 class, id 옵션 값으로 가져와라
- 트리에서 노드를 가져오는 기능 => 리스트 형태로 가져옴
- . => class, # => id , , # 없는 경우 => 태그
- div.item => tag: div, class: item
- div#item => tag: div, id: item
- div div.item => div안에 있는(부모가 아닌 상하위 단계) tag: div, class: item
- div > div.item => div의 바로 자식 중 div.item인 것

## 환경설정

- `python3`가 설치된 환경을 가정합니다.

## BeautifulSoup 라이브러리 다운

```bash
pip3 install BeautifulSoup
```

<!--
## 코드 작성

- `크롤링 전 확인해야 할 것` 목차에서 메모한 request url을 여기서 사용합니다.
- 예시에서는 upbit에서 제공한 `https://crix-api-cdn.upbit.com/v1/crix/candles/minutes/30`을 사용합니다.

### get

```py
import requests

# 자바스크립트 axios와 동일하게, get, post 할 수 있다.
params = {'code': 'CRIX.UPBIT.KRW-BTC', 'count': 2,
          'to': '2020-06-08T10:07:11Z', 'timestamp': 1591610834813}
r = requests.get('https://crix-api-cdn.upbit.com/v1/crix/candles/minutes/30', params=params)

ticket = r.json()
print(ticket)
# [{'code': 'CRIX.UPBIT.KRW-BTC', 'candleDateTime': '2020-06-08T10:00:00+00:00', 'candleDateTimeKst': '2020-06-08T19:00:00+09:00', 'openingPrice': 11673000.0, 'highPrice': 11680000.0, 'lowPrice': 11665000.0, 'tradePrice': 11678000.0, 'candleAccTradeVolume': 18.61184002, 'candleAccTradePrice': 217300580.88941, 'timestamp': 1591610882479, 'unit': 30}, {'code': 'CRIX.UPBIT.KRW-BTC', 'candleDateTime': '2020-06-08T09:30:00+00:00', 'candleDateTimeKst': '2020-06-08T18:30:00+09:00', 'openingPrice': 11655000.0, 'highPrice': 11699000.0, 'lowPrice': 11655000.0, 'tradePrice': 11676000.0, 'candleAccTradeVolume': 61.24624295, 'candleAccTradePrice': 715489513.68521, 'timestamp': 1591610397044, 'unit': 30}]

# 위와 같은 데이터를 가져올 수 있다.
# 이제 목적에 맞게 for, while, if문을 통해 자료를 분리 시키면 됩니다

# 간단하게 찍힌 로그중 highPrice만 가져오는 것을 코딩하면 아래와 같습니다.
for t in ticket:
    print(t['highPrice'])
    print()
#11680000.0
#11699000.0
```

### POST

```py
data = {'param1': 'value1', 'param2': 'value'}
res = requests.post(URL, data=data)
``` -->
