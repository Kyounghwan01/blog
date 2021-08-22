---
title: vuePress github actions로 자동배포하기
meta:
  - name: description
    content: vuePress github actions로 자동배포하기, github, actions, vue, vuepress, ci, cd
  - property: og:title
    content: vuePress github actions로 자동배포하기, github, actions, vue, vuepress, ci, cd
  - property: og:description
    content: vuePress github actions로 자동배포하기, github, actions, vue, vuepress, ci, cd
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-actions/
tags: ["vuepress"]
---

# vuePress github actions로 자동배포하기

블로그에 글을 작성하고 저는 쉘 스크립트를 실행하여 수동 배포하였습니다.

쉘스트립트는 간단히 요약하면 (궁금하시면 제 블로그 `deploy.sh`를 참조하시면 됩니다!)

1. master에 새로운 코드 푸시
2. 로컬 빌드
3. 빌드된 dist 파일을 gh-pages 브랜치에 푸시합니다.

이런 간단한 쉘을 지금까지는 수동으로 배포하였습니다.

그런데 github actions를 이용하면 master 푸시를 하는 순간, github에서 자동으로 빌드 및 배포 할 수 있었습니다. <br /> 
그래서 최근 쉘스크립트에서 actions로 빌드 과정을 수정하였고 그 방법에 대해 기록하려고 합니다.

vuepress로 만든 블로그 및 배포가 완료된 상태로 가정하고 글을 작성합니다. 아직 블로그 제작을 못하신 분들은 [vuepress로 블로그 만들기](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-start/)를 참조하시고 와주세요!!

## workflows 파일 생성

먼저 간단하게 workflows 파일을 생성합니다. 쉘스크립트랑 비슷하게 어떠한 기능을 수행할지 알려주는 파일이라고 보시면 됩니다.

프로젝트의 루트 디렉토리에서 `.github`을 만드시고 그 안에 `workflows`를 만드시고 그 안에 `main.yml`을 만들고 아래 스크립트를 복사 붙여넣기 해주세요. <br />
`main.yml`의 main은 파일 이름 임의로 바꿔도 상관 없지만 `.github`과 `workflows`는 그대로 유지하셔야 코드 푸시후 actions가 작동합니다.

아래 스크립트는 간단하게 yarn을 실행하고 build 하고 빌드된 결과물을 가르켜주는 스크립트입니다. 자신의 상황에 맞게 수정하시면 됩니다.

`secrets.ACCESS_TOKEN`는 아래에서 설명할께요.

```
// .github/workflows/main.yml

name: Build and Deploy
on: [push]
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
        TARGET_BRANCH: gh-pages
        BUILD_DIR: docs/.vuepress/dist
```

## Github에 환경변수 세팅

### personal access token 발급

이제 `secrets.ACCESS_TOKEN`를 세팅해봅시다.

먼저 https://github.com/settings/tokens 여기로 들어가셔서 access token 키를 받고, token값을 따로 기억해주세요. <br />
이미 키를 발급받아 token을 알고 계시면 그 token 값을 사용하시면됩니다.

### 블로그에 token 저장

블로그 레포로 돌아가신 후 Settings > Secrets에 들어간 후 `New repository secret` 버튼을 클릭합니다.

`Name`은 `ACCESS_TOKEN`으로 `Value`는 아까 저장한 token 값을 넣은 후 Add secret 버튼을 클릭합니다.

## yml 파일 배포

이제 아까 만든 yml 파일을 배포합니다. 이후 코드를 push 할때마다 자동으로 github actions이 작동하여 ci가 되는 것을 볼 수 있습니다. <br />
Actions 탭에서 확인 가능합니다!



<TagLinks />

<Comment />
