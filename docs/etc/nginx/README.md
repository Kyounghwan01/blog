---
title: mac에서 nginx 사용법
meta:
  - name: description
    content: mac에서 nginx 사용법, nginx, homebrew
  - property: og:title
    content: mac에서 nginx 사용법
  - property: og:description
    content: mac에서 nginx 사용법, nginx, homebrew
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/nginx/
---

# mac에서 nginx 사용법

nginx를 사용한 이유로 dev 서버가 준비되지 않았고 작업한 내용을 요청자에게 확인 받아야하는 상황인데 나는 다른 작업을 해야하는 경우

또는 dev 서버에 많은 개발자 분들이 pr을 올려서 내 코드가 파이프라인 돌기까지 오랜 시간이 걸릴 경우

이럴때 nginx를 이용해 확인 받고자 하는 프로젝트의 빌드 결과물로 서버를 띄우고 해당 서버에서 요청자가 결과물을 확인하고, 저는 다른 브랜치에서 다른 작업을 할 수 있습니다

이 포스팅은 mac을 기준으로 작성합니다

## brew 설치

첫번째로 터미널에서 brew를 설치합니다.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

설치가 완료되면 `brew doctor`로 설치를 확인합니다 아래처럼 콘솔에 찍히면 성공

```
Your system is ready to brew
```

## nginx 설치

설치가 됬다면 아래 명령어로 nginx를 설치합니다

```
brew install nginx
```

설치가 완료되면 `nginx.conf` 파일로 이동하여 설정파일을 수정합니다

### nginx.conf

여러가지 환경설정이 있지만 위와 같이 사용하는 목적을 가진 사람에게는 단 몇줄만 알면됩니다 다른 궁금하신 설정값에 대해서는 [Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/) 이곳에 들어가셔서 확인하시면 됩니다

파일 위치는 대부분 `/usr/local/nginx/conf`, `/etc/nginx`, `/usr/local/etc/nginx` 여기 셋중 하나에 존재합니다

conf 파일 수정 전에 일단 빌드된 파일이 필요합니다

react를 예로 들면 react 프로젝트에서 `yarn build`를 실행하면 `src/public/dist`파일에 빌드된 결과물이 들어옵니다 그러면 우리는 이 `dist`파일을 nginx 서버에 올리고 요청자는 `dist`파일을 확인하는 형식입니다

편의를 위해 `dist`파일 위치를 아래와 같이 가정합니다 `/User/Joshua/Desktop/source/Nginx-test/public/dist` (절대경로 써주셔야해요!)

```
http {
  include /etc/nginx/mime.types;
  server_tokens off;
  client_max_body_size 32m;

  upstream app_server {
    server localhost:8081;
    keepalive 128;
  }

  endpoints {
    metadata_server;
  }

  server {
    # Running port
    listen 8080;

    # 443 포트로 지정하면 포트 번호 기재 안해도됩니다 (https://localhost 로 실행가능)
    listen 443 ssl;
    # https를 사용하는 경우 crt, key 파일을 위치합니다
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;

    location / {
      # 이곳에 dist 파일을 위치합니다
      root  /User/Joshua/Desktop/source/Nginx-test/public/dist;
      index index.html
    }
  }
}
```

## nginx 재시작

conf 파일 수정을 완료했다면 아래 명령어로 nginx를 재시작 합니다

```
brew service restart nginx
```

성공적으로 완료되면 `localhost`로 접속시 `dist`파일이 실행됩니다!

## nginx 종료

`nginx -s stop`

<TagLinks />

<Comment />
