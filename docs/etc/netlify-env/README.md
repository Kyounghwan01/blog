---
title: netlify env 환경변수 설정하는 방법
meta:
  - name: description
    content: netlify env 환경변수 설정하는 방법, netlify, env, .env
  - property: og:title
    content: netlify env 환경변수 설정하는 방법
  - property: og:description
    content: netlify env 환경변수 설정하는 방법, netlify, env, .env
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/netlify-env/
---

# netlify env 환경변수 설정하는 방법

오늘은 netlify에 배포한 이후, 환경변수를 읽어오는 법에 대해 알아보겠습니다!

## netlify에 환경변수 기입

첫번째로 빌드된 프로젝트에 환경변수를 기입합니다.

**Build & deploy -> Environment -> Environment variables -> Edit variables**

위 경로로 들어와 환경변수를 기입합니다.

예를 들면

`key : REACT_APP_API_BASE_URL`

`value: https://xxxxx`

이 후 빌드를 한번 더 실행해주고 환경변수가 제대로 들어갔는지 확인해봅니다.

만약 환경변수가 아직도 반영이 안되었다면 아래 단계로 넘어갑니다.

## netlify.toml 생성

배포하는 프로젝트 코드로 들어와서 루트 레벨에 아래와 같이 코드를 기입하고 푸시합니다.

```
// netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[context.production.environment]
  TOML_ENV_VAR = "From netlify.toml"
  REACT_APP_TOML_ENV_VAR = "From netlify.toml (REACT_APP_)"
```

배포 완료되면 env 값이 반영됨을 알수있습니다~

<TagLinks />

<Comment />
