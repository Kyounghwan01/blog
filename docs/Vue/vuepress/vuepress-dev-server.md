---
title: vuePress dev 서버 만들기
meta:
  - name: description
    content: vuePress dev 서버 만들기, github, actions, vue, vuepress, ci, cd
  - property: og:title
    content: vuePress dev 서버 만들기, github, actions, vue, vuepress, ci, cd
  - property: og:description
    content: vuePress dev 서버 만들기, github, actions, vue, vuepress, ci, cd
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-actions/
tags: ["vuepress"]
---

# vuePress dev 서버 만들기

vuepress로 static 사이트를 여러명이 운영할 경우 master에 머지하기 전 dev 서버에서 확인 후 master에 머지 할 경우가 있습니다. <br />
그래서 이번에는 dev 서버 구성했던 방법에 대해 작성하려고 합니다.

먼저 github 자체에서 호스팅해주는 깃헙 페이지에서 master 브랜치와 dev 브랜치 둘다 호스팅해주면 안될까? 라는 생각을 하였습니다. <br />
GitHub Pages는 하나의 브랜치만 호스팅을 지원합니다. 저의 경우 master에 올란 dist 파일을 gh-pages라는 브랜치에 넣고 gh-page를 깃헙 페이지에서 호스팅 하도록 설정하였습니다. <br />
그래서 dev 서버로 구성되는 브랜치는 깃헙 페이지가 아닌 네트리파이, 버셀, 파이어베이스 같은 무료 호스팅 사이트를 이용하도록 하였습니다.

## devlop 브랜치 github actions 연결

다음으로 develop 브랜치에 코드가 푸시 될때마다 github action이 작동하여 github에서 빌드해주고 dev-gh-pages 라는 브랜치에 빌드된 결과물이 코드 푸시되도록 하였습니다. <br />
이를 위하여 프로젝트 루트에 아래 파일을 작성해주세요. 혹시 github actions를 이용하여 자동배포를 모르시는 분은 먼저 [이곳](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-actions/)을 보시고 자동배포를 완료하시고 따라오시면 됩니다.

```yml
// .github/workflows/dev.yml

name: Build and Deploy
on:
  push:
    branches: [ develop ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Deploy Build Files
      uses: jenkey2011/vuepress-deploy@1.0.1
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BUILD_SCRIPT: yarn && yarn docs:build
        TARGET_BRANCH: develop-gh-pages
        BUILD_DIR: docs/.vuepress/dist
```

위처럼 작성하시면 `develop` 브랜치에 코드가 푸시되면 `Actions`가 작동하여 빌드하고 빌드된 결과물을 `develop-gh-pages` 브랜치에 푸시합니다.

이후 develop-gh-pages 브랜치를 호스팅 사이트에 위탁하여야합니다. 저는 네트리파이를 이용하였습니다.

## netlify 배포

https://www.netlify.com/ 여기에 접속하시고 New site from Git 클릭 후 GitHub을 연결해줍니다.

이후 사용하는 리포를 클릭후 Branch to deploy에 develop-gh-pages 브랜치를 넣어줍니다. 나머지는 아무것도 건들이지 않고 Deploy site 버튼을 눌러주면 완료됩니다.

위 방법을 이상없이 완료하시면 develop-gh-pages에 코드가 푸시되면 netlify에서 코드 푸시를 감지하여 배포해줍니다.


<TagLinks />

<Comment />
