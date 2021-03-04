---
title: 돔 조작 - selenium 사용법
meta:
  - name: description
    content: 돔 조작 - selenium 사용법, python, crawling, 데이터 분석, 자동화, naver, dom, html, javascript
  - property: og:title
    content: 돔 조작 - selenium 사용법, python, crawling, 데이터 분석, 자동화, naver, dom, html, javascript
  - property: og:description
    content: 돔 조작 - selenium 사용법, python, crawling, 데이터 분석, 자동화, naver, dom, html, javascript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/python/dom-modify-crawling/
tags: ["python"]
---

# selenium 사용법

> 돔 조작을 하여 클릭, 스크롤, 키보드를 눌러 크롤링할 작업이 있을 때, 사용합니다.

## 환경설정

1. 웹 드라이버 확인

- 크롬 -> 설정 -> 도움말 -> chrome 설정 -> 설치되있는 크롬 버전 확인

2. 웹 드라이버 설치

- [설치url](https://chromedriver.chromium.org/)에 들어가 1번에서 확인한 버전과 동일한 버전 클릭하여, 작업하는 디렉토리에 `chromedriver`를 위치시킵니다

3. 셀레니움 설치

```
pip3 install selenium
```

## 웹 띄우기

```py
from selenium import webdriver
# 드라이버 경로지정 => 해당 코드가 실행되면서 브라우저 열림
driver = webdriver.Chrome('./chromedriver')
# url에 접근
driver.get('https://www.naver.com/')


```

## 돔 조작 및 네이버 자동 로그인 예제

```py
# 웹 스크랩퍼 - 데이터 수집 툴

# 클릭, 스크롤, 키보드 누를때 사용한다
# 셀레니움으로 js 동작 가능

# 사이트가 로그인 방식이 세션이면 무조건 셀레니움, jwt이면 안써도됨
from selenium import webdriver
# 드라이버 경로지정 => 해당 코드가 실행되면서 브라우저 열림
driver = webdriver.Chrome('./chromedriver')
# url에 접근

driver.get('https://www.google.com/')

# search-product

# driver로 돔을 제어한다
# select를 통해 원하는 돔을 찾고,
# .select = find_elements_by_css_selector

# driver.find_element_by_css_selector('#headerSearchKeyword').send_keys('애플워치 3')
# driver.find_element_by_css_selector('#headerSearchBtn').click()
# s를 붙이면 [0], [1]등 반환 타입에 맞게
# 한다
# driver.find_element_by_css_selector('.link_login').click()
# driver.find_element_by_name('id').send_keys('naver_id')
# driver.find_element_by_name('pw').send_keys('mypassword1234')
# 셀레니움으로 sendkey를 누르면 자동 로그인 방지 창이뜬다 -> js로 처리
# driver.find_element_by_name('submit').click()

# # 이미지 가져오서 ocr - 광학문자인식 - 이미지에서 글자를 뽑는다
# # js 실행
# driver.execute_script('alert(‘hello world!!’);')
id = "'osc9245@naver.com'"
password = "'db124578'"
driver.get('https://nid.naver.com/nidlogin.login')
driver.execute_script("document.getElementsByName('id')[0].value=" + id)
driver.execute_script("document.getElementsByName('pw')[0].value=" + password)
# driver.find_element_by_id('label_ip_on').click()
driver.find_element_by_xpath('//*[@id="frmNIDLogin"]/fieldset/input').click()


```

## 맺음말

> 셀레니움을 쓸 때는 반드시 꼭 이것만을 써야 하는 **근거**가 있어야 합니다.<br>
> 왜냐하면 돔을 렌더링해야하기에 속도가 request나 bs4보다 월등히 **느리기** 때문이죠.<br>
> 셀레니움을 쓰는 이유인 클릭, 스크롤, 키보드를 눌러서 하는 행위 등 크롤링에 돔 조작이 꼭 필요하지 않는 이상 쓰지 않도록 하세요.<br>
> 더 자세한 메소드는 [셀레니움](https://www.selenium.dev/documentation/en/)공식 사이트에서 참조하세요.

<TagLinks />

<Comment />
