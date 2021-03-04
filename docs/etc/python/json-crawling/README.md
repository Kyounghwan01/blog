---
title: 파이썬 웹 크롤링 (json 타입)
meta:
  - name: description
    content: 파이썬 웹 크롤링 (json 타입), python, crawling, 데이터 분석, 자동화
  - property: og:title
    content: 파이썬 웹 크롤링 (json 타입), python, crawling, 데이터 분석, 자동화
  - property: og:description
    content: 파이썬 웹 크롤링 (json 타입), python, crawling, 데이터 분석, 자동화
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/python/json-crawling/
tags: ["python"]
---

# json타입 웹 크롤링

## 중요!

- [웹 크롤링 튜토리얼](https://kyounghwan01.github.io/blog/etc/python/crawling-tutorial/)을 먼저 보고 오세요

## TODO

- upbit 사이트를 크롤링하여 코인 차트내역을 가져옵니다.

## 크롤링 전 확인해야 할 것

- 우리가 크롤링 할 사이트가 정해졌다면, 크롤링할 사이트로 들어가 F12를 누르고 network탭을 눌러, 우리가 가져오고자 하는 request url을 찾고, 그 **url을 메모**합니다.<br>
  이후, 이 request url을 통해 받는 response값의 유형이 `json`타입 이어야 합니다.<br>
  `html`타입은 [html타입 웹 크롤링](https://kyounghwan01.github.io/blog/etc/python/html-crawling/)을 보시면 됩니다.

## 환경설정

- `python3`가 설치된 환경을 가정합니다.

## requests 라이브러리 다운

- [requests 공식 홈페이지](https://requests.readthedocs.io/en/master/)

```bash
pip3 install requests
```

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
```

## pandas를 이용하여 가져온 데이터 저장하기

### pandas 설치

#### pandas로 변환되는 과정

- 리스트, 디셔너리를 데이터 프레임으로 덮어서 저장 -> 읽을땐 데이터프레임을 가져와서 [], {}로 변환

```bash
pip3 install pandas
```

### csv 저장 코드

```py
import requests
import pandas

r = requests.get('URL')


# 아래 처럼 포맷을 잘 맞춰야 csv형식으로 나온다
result = {
    'tradePrice': [],
    'openingPrice': [],
}

tr = r.json()

for tricer in tr:
    result['tradePrice'].append(tricer['tradePrice'])
    result['openingPrice'].append(tricer['openingPrice'])

print(result)

df = pandas.DataFrame(result)

# 파일 저장
df.to_csv('dart.csv')
df.to_excel('dart.xlsx')
df.to_html('dart.html')

```

## 저장한 csv파일 읽어오기

```py
import pandas

df = pandas.read_csv('test.csv')

print(df[(df['나이'] > 21) | (df['이름'] == '철수')])
```

<TagLinks />

<Comment />
