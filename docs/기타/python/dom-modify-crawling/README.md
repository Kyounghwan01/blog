---
meta:
  - name: description
    content: 돔 조작 - selenium 사용법
  - property: og:title
    content: 돔 조작 - selenium 사용법
  - property: og:description
    content: 돔 조작 - selenium 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/기타/python/dom-modify-crawling/
---

# selenium 사용법

> 돔 조작을 하여 클릭, 스크롤, 키보드를 눌러 크롤링할 작업이 있을 때, 사용합니다.

1. 웹 드라이버 확인

- 크롬 -> 설정 -> 도움말 -> chrome 설정 -> 설치되있는 크롬 버전 확인

2. 웹 드라이버 설치

- [설치url](https://chromedriver.chromium.org/)에 들어가 1번에서 확인한 버전과 동일한 버전 클릭하여, 작업하는 디렉토리에 `chromedriver`를 위치시킵니다

3. 셀레니움 설치

```
pip3 install selenium
```

4. 기본 코드 작성

```py
from selenium import webdriver
# 드라이버 경로지정 => 해당 코드가 실행되면서 브라우저 열림
driver = webdriver.Chrome('./chromedriver')
# url에 접근
driver.get('https://www.naver.com/')


# 웹 스크랩퍼 - 데이터 수집 툴

# 클릭, 스크롤, 키보드 누를때 사용한다
# 셀레니움으로 js 동작 가능

# 사이트가 로그인 방식이 세션이면 무조건 셀레니움, jwt이면 안써도됨
from selenium import webdriver
# 드라이버 경로지정 => 해당 코드가 실행되면서 브라우저 열림
driver = webdriver.Chrome('./chromedriver')
# url에 접근

driver.get('https://www.naver.com/')

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


# 문자열 포맷팅
# 행동이 들어가면 셀레니움
# 행동을 안하면 requests -
# request, bs4만으로 쓰는지, 아니면 셀레니움을 쓰는데 꼭 쓰는 근거가 있어야함

```
