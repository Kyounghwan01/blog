---
title: aws 웹 호스팅을 위한 웹 서비스 살펴보기
meta:
  - name: description
    content: aws 웹 호스팅을 위한 웹 서비스 살펴보기, s3, cloudfront, codebuild, codepipeline, iam
  - property: og:title
    content: aws 웹 호스팅을 위한 웹 서비스 살펴보기
  - property: og:description
    content: aws 웹 호스팅을 위한 웹 서비스 살펴보기, s3, cloudfront, codebuild, codepipeline, iam
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/aws-web-hosting/
tags: ["aws"]
---

# aws 웹 호스팅을 위한 웹 서비스 살펴보기

aws에 빌드된 웹 서비스를 호스팅 시키려면 총 6가지의 웹 서비스를 거쳐야 합니다.
어느 서비스에서 어떤 기능을 수행하는지 알아보겠습니다.
참고로 배포는 아래 나열한 순서대로 하면 됩니다.

## CodePipeline

- 만든 소프트웨어를 프로덕션으로 빌드, 테스트, 배포하는 과정을 자동화하는 ci/cd 서비스
- 깃헙, aws ecr, s3에 올린 코드를 배포할수있습니다.
- 깃헙 및 다른 코드 배포 사이트에서 코드를 가져오면 `codeBuild` 웹 서비스 에서 빌드시킨 결과물을 테스트 및 배포합니다.

## CodeBuild

- codepipeline에서 가져온 코드를 빌드시키는 웹서비스
- 빌드시킬 운영체제, 환경변수, 빌드 사양등을 선택하여 빌드시킵니다.
- 빌드된 결과물은 코드파이프라인에 다시 돌려줍니다.

## s3

- 코드파이프라인과 코드빌드를 통해 빌드된 결과물을 저장하는 저장소

## iam

- 빌드되고 배포될 코드를 s3에 저장할텐데, s3에 저장하도록 허가 및 다른 권한에 대한 서비스
- iam에서 허가 안하고 빌드 돌리면, 파이프라인에서 build까지는 성공하나 그 이후, access denied 에러로 배포가 실패합니다. 빌드가 올라갈 프로젝트 이름(\*.studiomate.kr)에 대해 s3 저장해도 된다는 `역할 및 s3 권한 추가`를 꼭 해야합니다.

## cloudfront

- 웹 컨텐츠가 사용자에게 가장 빠르게 전달되도록 지원하는 웹서비스
  cloudfront로 배포된 웹에 사용자가 접근하면 지연시간이 가장 낮은 엣지 로케이션(서울, 도쿄, 홍콩)으로 라우팅되어 콘텐츠 전송 성능이 뛰어납니다.

## route53

- dns 웹서비스 - cloudfront에서 배포한 웹을 설정한 dns에 배포합니다.
- cloudfront에 먼저 배포가 되고, 배포된 결과물을 route53의 dns에 넣습니다.

<TagLinks />
<Comment />
