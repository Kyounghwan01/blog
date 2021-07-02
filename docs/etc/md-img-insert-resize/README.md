---
title: md 파일에 이미지 삽입 및 사이즈 조절하기
meta:
  - name: description
    content: md 파일에 이미지 삽입 및 사이즈 조절하기, html, img, resize javascript, getElementsByTagName, markdown, md, image
  - property: og:title
    content: md 파일에 이미지 삽입 및 사이즈 조절하기, html, img, resize javascript, getElementsByTagName, markdown, md, image
  - property: og:description
    content: md 파일에 이미지 삽입 및 사이즈 조절하기, html, img, resize javascript, getElementsByTagName, markdown, md, image
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/md-img-insert-resize/
tags: ["etc"]
---

# md 파일에 이미지 삽입 및 사이즈 조절하기

이번 글에서는 md 파일에 이미지를 삽입하는 방법 및 삽입시 이미지 사이즈를 조절하는 방법에 대해 알아보겠습니다.

md 파일에 이미지를 삽입하는 방법은 2가지가 있습니다

md 문법으로 이미지를 삽입하는 방법과 html의 img tag를 이용해서 삽입하는 방법이 있습니다 두가지 모두 천천히 알아보도록 하겠습니다

## md 문법으로 이미지 삽입하기

### 프로젝트 외부에서 이미지 가져오기

이미지를 cdn이나 다른 사이트에서 가져오는 경우 아래와 같이 사용하면 됩니다

```md
![img](https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png)
```

![img](https://s.pstatic.net/static/www/mobile/edit/2021/0701/cropImg_728x360_67071928262748357.jpeg)

### 프로젝트 내부 이미지 가져오기

프로젝트 내부에 있는 이미지를 사용할 경우 이미지의 경로를 () 사이에 넣어주시면됩니다

```md
![2021_04_user_count](~@source/.vuepress/public/image/2021_04_user_count.png)
```

![2021_04_user_count](~@source/.vuepress/public/image/2021_04_user_count.png)

### 이미지 사이즈 조절

md 문법으로는 이미지를 리사이즈 할 수 없습니다. 그러나 이제 알려드릴 img 태그를 이용하시면 이미지 사이즈를 조절할 수 있습니다

## img tag 이용하며 이미지 삽입 및 사이즈 조절

사용법은 html의 img 태그 사용하는 방법과 동일합니다

```html
<img src="~@source/.vuepress/public/image/2021_06_user_count.png" />
```

<img src="~@source/.vuepress/public/image/2021_06_user_count.png" width="100" height="200" />

### 사이즈 조절

이미지 사이즈 조절하는 방법도 img 태그의 문법을 따르면 됩니다

px과 % 모두 가능하고, px은 단위 생략 가능합니다

```html
<img
  src="~@source/.vuepress/public/image/2021_06_user_count.png"
  width="100"
  height="200"
/>

<img
  src="~@source/.vuepress/public/image/2021_06_user_count.png"
  width="10%"
  height="20%"
/>
```

<img
  src="~@source/.vuepress/public/image/2021_06_user_count.png"
  width="10%"
  height="20%"
/>

## 이미지 가운데 정렬

꿀팁하나 드리면 이미지를 가운데 정렬을 매우 쉽게 할 수 있습니다! html의 center 태그를 이용하는 방법입니다

```html
<center>
  <img
    src="~@source/.vuepress/public/image/2021_06_user_count.png"
    width="100"
    height="200"
  />
</center>
```

<center>
  <img
    src="~@source/.vuepress/public/image/2021_06_user_count.png"
    width="100"
    height="200"
  />
</center>

## 참고

- [md 문법](https://guides.github.com/features/mastering-markdown/)

<TagLinks />

<Comment />
