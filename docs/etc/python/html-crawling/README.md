---
title: 파이썬 웹 크롤링 (html 타입)
meta:
  - name: description
    content: 파이썬 웹 크롤링 (html 타입), python, crawling, 데이터 분석, 자동화
  - property: og:title
    content: 파이썬 웹 크롤링 (html 타입), python, crawling, 데이터 분석, 자동화
  - property: og:description
    content: 파이썬 웹 크롤링 (html 타입), python, crawling, 데이터 분석, 자동화
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/python/html-crawling/
tags: ["python"]
---

# html타입 웹 크롤링

## 중요!

- [웹 크롤링 튜토리얼](https://kyounghwan01.github.io/blog/etc/python/crawling-tutorial/)을 먼저 보고 오세요

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

## 크롤링 방법

1. json 방식에서 사용하던 `requests`모듈을 이용하여 request를 보내고 response를 받는다
2. 받은 response 값은 html값일 것이다.
3. 그 html 값을 BeautifulSoup으로 실행하여 html을 크롤링하기 쉽도록 돔트리 객체로 바꾼다
4. 돔 잡는 법에서 배운대로 원하는 돔을 잡아서 크롤링 진행한다.

### 전자공시 사이트에서 회사명 + 대표이름 크롤링

```py
import requests
import bs4
import pandas
url = "http://dart.fss.or.kr/corp/searchCorpL.ax"

result = {
  'office_name': [],
  's': []
}
searchIndex = 1
while searchIndex < 16: # 초성선택
  currentPage = 1
  is_next_page = True
  print('=====searchIndex value: ', searchIndex)
  while is_next_page:
    print('==currentPage value: ', currentPage)
    res = requests.post(url, data={
      "searchIndex": searchIndex,
      "currentPage": currentPage
    })
    currentPage = currentPage + 1

    dom = bs4.BeautifulSoup(res.content) # 문자열 html을 dom 형태(트리)의 객체로 변환

    rows = dom.select('div.table_scroll table tbody tr')

    for row in rows:
      columns = row.select('td')
      office_info = {
        "office_name": columns[0].text.replace('\n', '').replace('\t', '').replace('\r', ''),
        "s": columns[1].text.replace('\n', '').replace('\t', '').replace('\r', '')
      }
      result["office_name"].append(office_info["office_name"])
      result["s"].append(office_info["s"])
      print(office_info["s"])

    if len(rows) != 300:
      is_next_page = False

  searchIndex+= 1

df = pandas.DataFrame(result)
df.to_csv('dart.csv')
df.to_html('dart.html')
df.to_excel('dart.xlsx')

```

<TagLinks />

<Comment />
