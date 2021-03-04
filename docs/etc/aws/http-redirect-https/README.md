---
title: aws cloudfront를 이용하여 http redirect to https
meta:
  - name: description
    content: aws cloudfront를 이용하여 http redirect to https
  - property: og:title
    content: aws cloudfront를 이용하여 http redirect to https
  - property: og:description
    content: aws cloudfront를 이용하여 http redirect to https
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/http-redirect-https/
tags: ["aws"]
---

# cloudfront 이용하여 https로 바꾸기

route53을 통해 도메인에 서비스를 배포하면 초기에 http로 할당됩니다.
그러나 http는 보안이 좋지 않기 떄문에 실 배포시 https로 바꿔줘야합니다.
그 작업은 aws의 cloudfront를 이용하면 매우 쉽게 할 수 있습니다.

1. cloudfront 접속
2. redirect하고 싶은 Domain Name의 id 클릭
3. Behaviors 클릭
4. Create Behavior 클릭
5. Path Pattern - 모든 사이트에 대해 redirect 하고 싶다면 \* 기입, 아니라면 특정 사이트 기입
6. Viewer Protocol Policy - Redirect HTTP to HTTPS 선택
7. 나머지 건들지 않고 create 클릭
8. https로 바뀐 url 확인 (간혹 내 컴퓨터에서만 redirect가 되는 이슈가 있으니, 휴대폰을 이용해서 사이트에 접속하여 두번 체크해줍니다.)

<TagLinks />

<Comment />
