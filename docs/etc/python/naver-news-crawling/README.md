---
title: 네이버 뉴스 기사 크롤링
meta:
  - name: description
    content: 네이버 뉴스 기사 크롤링, naver, crawling, news, blog, python, 데이터 분석, 자동화
  - property: og:title
    content: 네이버 뉴스 기사 크롤링, naver, crawling, news, blog, python, 데이터 분석, 자동화
  - property: og:description
    content: 네이버 뉴스 기사 크롤링, naver, crawling, news, blog, python, 데이터 분석, 자동화
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/python/naver-news-crawling/
tags: ["python"]
---

# 네이버 뉴스 기사 크롤링

네이버 뉴스에 접속하여, 원하는 키워드와 원하는 기간을 설정하여 나오는 모든 기사 검색 결과를 크롤링하는 방법입니다.
기사 타이틀, 기사 등록일, 언론사 및 정확하지는 않지만 기자 이름과 기자 이메일까지 가져옵니다
마지막으로 엑셀 및 csv로 저장합니다.

## 코드

```py
import requests
from bs4 import BeautifulSoup
import math
import pandas
import re


resultList = []

url = "https://search.naver.com/search.naver?"

params = {
    "where": 'news',

    # 네이버 기사 검색 값
    "query": '매틱 네트워크 스테이킹',

    # 페이지네이션 값
    "start": 0,

    # "nso": 'so:r,p:1y,a:all'
}

# nso: so: r, p: 1y, a: all -> 최근 1년
# nso: so: r, p: 6m, a: all -> 최근 6개월
# nso: so: r, p: 1d, a: all -> 1일
# 없으면 전체 검색

# headers={'User-Agent': 'Mozilla/5.0'} -> 안티 크롤링 회피
raw = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, params=params)
html = BeautifulSoup(raw.text, "html.parser")

# 검색결과 html body
articles = html.select("ul.type01 > li")

# 전체 기사 수
totalCount = html.select("div.section_head > div.title_desc > span")[0].text.split(' / ')[1][:-1]

for i in range(0, math.floor(int(totalCount)/10)+1)):
    if i == 0:
        params['start'] = i
    else:
        params['start'] = i * 10 + 1

    raw = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, params=params)
    html = BeautifulSoup(raw.text, "html.parser")
    articles = html.select("ul.type01 > li")

    for ar in articles:
        # 제목 값
        title = ar.select_one("a._sp_each_title").text

        # 검색된 기사의 url을 가져와서 다시 html을 get
        articleUrl = ar.find("a")["href"]
        innerRaw = requests.get(articleUrl, headers={'User-Agent': 'Mozilla/5.0'})

        # 가져온 기사 html중 '기사', '@' string을 모두 가져온다
        innerHtml = BeautifulSoup(innerRaw.text, "html.parser")
        reporter = innerArticles = innerHtml(text=re.compile("기자"))
        reporterEmail = innerArticles = innerHtml(text=re.compile("@"))

        # 언론사 값
        source = ar.select_one("span._sp_each_source").text

        # 등록일 값
        date = ar.select_one("dd.txt_inline").text.split("  ")[1]

        res = {"title": title, "company": source,
               "url": articleUrl, "date": date, "reporter": reporter, "reporterEmail": reporterEmail}
        resultList.append(res)

# 검색된 기사 갯수
resultList.append({"totalCount": totalCount})

df = pandas.DataFrame(resultList)

df.to_csv('blockChain_articles.csv')
df.to_excel('blockChain_articles.xlsx')

```
