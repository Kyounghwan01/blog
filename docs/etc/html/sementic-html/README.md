---
title: 시멘틱 html
meta:
  - name: description
    content: 시멘틱 html 사용하기, html, js, react, vue, css, 프론트엔드, 웹 개발자, web, 백엔드, sementic, 개발자
  - property: og:title
    content: 시멘틱 html 사용하기, html, js, react, vue, css, 프론트엔드, 웹 개발자, web, 백엔드, sementic, 개발자
  - property: og:description
    content: 시멘틱 html 사용하기, html, js, react, vue, css, 프론트엔드, 웹 개발자, web, 백엔드, sementic, 개발자
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/html/sementic-htm/
tags: ["html", "css"]
---

# 시멘틱 html 사용하기

## 시멘틱 웹을 쓰는 이유

먼저 그냥 html을 div, span으로도 충분히 구현 가능한데 왜 header, footer, article 등등 다양한 태그들로 만들어야 하는지 의문을 가질 수 있습니다.

시멘틱 웹을 사용함으로 얻는 **장점**은 아래와 같습니다.

**1. seo 점수를 더 유리하게 가져갈 수 있습니다.**

- 적절한 시멘틱 태그를 이용한다면 웹사이트를 추천해줍니다, 예를 들면 `title`, `h1` 등이 있습니다. (참조: [seo, 접근성 향상 doc](https://developer.mozilla.org/ko/docs/Web/HTML/Element#%ED%85%8D%EC%8A%A4%ED%8A%B8_%EC%BD%98%ED%85%90%EC%B8%A0) )

**2. 웹 접근성**

- 웹 페이지를 음성으로 알려주는 스크린 리더를 이용하거나 키보드로 웹을 이용하는 경우 시멘틱 태그로 이용한다면 이상 없이 구현가능합니다.

**3. 개발자들을 위한 유지보수**

- `<div>`로 모두 만들어져있다면 그 html이 어느 부분을 뜻하는지 어려울 수 있습니다. 하지만 `header`, `footer`, `article`, `main`등 시멘틱 태그를 이용한다면 대략적으로 이 html이 어느 부분인지 파악이 가능해 좀 더 코드를 이해하기 쉬울 수 있습니다.

## 시멘틱 웹 사용하는 방법

많은 시멘틱 태그가 있지만 그중 거의 모든 웹에 필수적으로 들어갈 것으로 예상되는 태그들을 소개해드립니다!

## header

- 웹 사이트의 가장 상단 부분은 `header` 태그를 사용합니다.

## nav

- 만약 `header` 태그 안에 여러 메뉴가 있다면 `nav` 태그를 사용합니다.
- 꼭 `header` 태그 내부가 아니더라도 웹 내 이동을 위한 네비게이션 기능을 가진 html 요소는 `nav` 태그를 사용합니다.

## footer

- 웹 사이트의 마지막 부분 (메인 페이지에서는 회사 정보, 링크가 들어가는 부분) 또는 웹앱에서는 gnb가 오는 부분으로 볼 수 있습니다.

## main

- 웹사이트의 중요한 컨텐츠가 위치하는 부분은 `main` 태그를 사용합니다.

## article

- `main` 태그 내에서도 나뉠수 있는 컨텐츠는 `article`로 나누면 됩니다.

## section

- `article` 태그 내에서도 나뉠수 있는 컨텐츠는 `section`로 나누면 됩니다.

## aside

- `main` 내에서도 코어 컨텐츠와 직접 상관이 없는 부분 (ex: 광고, youtube로 치면 연관된 동영상)은 `aside` 태그를 사용합니다.

## figure

- `figure`는 일러스트, 도형, 사진, 코드같은 그 자체로 의미를 갖는 내용을 의미합니다.
- `figure` 태그 중에 `figcaption` 태그를 사용하면 이미지에 부가적인 설명을 추가할 수 있습니다.

```html
<figure>
  <img src="eaxmple.png" alt="eaxmple" />
  <figcaption>eaxmple</figcaption>
</figure>
```

## 종합예제

### 예시 코드

- 위 예시들을 총 종합하면 아래와 같은 코드로 만들 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>시멘틱html 예시</title>
  </head>
  <style>
    body {
      padding: 0;
      margin: 10px;
    }
    header {
      height: 50px;
      border: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header span {
      margin-left: 20px;
    }
    nav {
      border: 1px solid green;
      height: 30px;
    }
    ul {
      display: flex;
      margin: 5px 20px 0 0;
      align-items: center;
      justify-content: center;
    }
    nav ul li {
      margin-right: 50px;
    }
    main {
      border: 1px solid blue;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    article {
      padding: 10px;
      border: 1px solid gray;
      width: 90%;
    }
    section {
      padding: 10px;
      border: 1px solid dodgerblue;
      width: 90%;
      margin-bottom: 10px;
      height: 30px;
    }
    aside {
      padding: 10px;
      border: 1px solid navy;
      width: 10%;
    }
    footer {
      height: 30px;
      border: 1px solid purple;
    }
  </style>
  <body>
    <header>
      <span>header</span>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#profile">profile</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <article>
        article
        <section>section1</section>
        <section>section2</section>
      </article>
      <aside>aside</aside>
    </main>
    <footer>footer</footer>
  </body>
</html>
```

### 데모

<SementicExample />

<TagLinks />

<Comment />
