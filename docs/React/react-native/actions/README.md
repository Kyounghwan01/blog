---
title: github action 파이프라인 설계
meta:
  - name: description
    content: github action 파이프라인 설계
  - property: og:title
    content: github action 파이프라인 설계
  - property: og:description
    content: github action 파이프라인 설계
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/actions/
tags: ["react-native", "react"]
---

# github action으로 react native 실시간 배포하기

## 배경

- react native codepush가 서비스 종료됨에 따라 우리는 codepush와 같은 서비스를 자체적으로 구성해야했다. 우리는 `react-native-ota-hot-update`를 사용하기로 하였다.
- 이것을 사용하기 위해서는 프로젝트의 react-native 코드를 android, ios에서 사용 가능한 `xxx.bundle.zip`파일로 만들어야한다. 이 방법을 cli를 이용해서 배포 가능하지만 자동화 시키기로 하였다.
- 내가 내린 방법으론, `main` branch에 머지하고 `OTAversion.json`이라는 파일이 바뀌게 되면 각 OS에 맞는 bundle.zip을 만들어 지정된 db에 업로드 한다. 그리고 나온 결과를(성공이든 실패든) slack으로 알려주기 까지의 과정을 github actions을 이용하여 CI/CD를 구축하도록 하였다. 

## 전제사항

1. 배포 되어야 할 db가 있어야한다.
2. aws s3를 사용하였다. 그렇기에 s3 access_key, secret_key를 알아야한다.
3. slack을 이용한다면 slack webhook url 정보를 알아야한다. 

## 코드

- jabs는 하나의 흐름으로 흘러간다.
- 먼저 node를 세팅하고. OTAversion.json에 정의한 OTA 버전이 가장 최신 배포된 OTA 버전보다 높은지 판단하고. 더 높을 때만 다음 과정으로 진행된다. 아니라면 error을 던져서 바로 `Send Slack Notification` jab으로 넘어간다 (if가 always임으로 무조건 실행된다) 그리고 실패 원인을 포함하여 slack으로 결과를 던진다.
- 그런 다음 android, ios에 맞는 bundle을 병렬로 zip화 시킨다.
- 다음은 s3에 업로드 할 변수를 세팅하고 `upload-ota.js`를 통해 번들링된 zip파일을 actions 내부에서 찾아서 aws s3에 올린다. 단순 js script로 yml이 아니기때문에 node로 실행한다.

```yml
name: auto bundle zip
on:
  push:
    branches:
      - 'main'
    paths:
      - 'OTAversion.json'
jobs:
  carrot-pet-deploy-codepush:
    name: Deploy codepush update
    runs-on: ubuntu-latest-m
    steps:
      - name: Check out repository
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'yarn'
      - name: Check OTA version
        run: node .github/workflows/scripts/check-ota-version.js
      - name: Install only required dependencies
        run: |
          yarn install --frozen-lockfile
      - name: Export Android & iOS bundles in parallel
        run: |
          bash .github/workflows/scripts/export-bundles.sh
      - name: Set environment variables
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          echo "환경 변수가 설정되었습니다."
      - name: Install AWS SDK and Node.js
        run: |
          yarn add @aws-sdk/client-s3
      - name: Send POST request with file upload
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          GITHUB_ACTOR: ${{ github.actor }}
        run: node .github/workflows/scripts/upload-ota.js
      - name: Send Slack Notification
        if: always()
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_URL }}
        run: |
          bash .github/workflows/scripts/send-slack-notification.sh ${{ job.status }}
```

## 개선한 사항

- 속도
  - github action에서 제공하는 기본 runner가 너무 느렸다.
  - 그래서 회사가 엔터프라이즈 price를 쓰고 있기에 컴퓨팅 자원을 더 땡겨서 새로운 `ubuntu-latest-m`이라는 runner를 만들어 이 yml이 실행되는 속도를 올렸다.
  - android, ios 코드 번들링을 직렬에서 병렬로 바꾸어 실행 속도를 올렸다.
- 가독성
  - yml과 관련 없는 js코드들(업로드, ota version check, 번들링)들은 따로 분리하여 간단한 yml이 되도록 하였다.

<TagLinks />

<Comment />
