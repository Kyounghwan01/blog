---
title: npm 기초 정리
meta:
  - name: description
    content: npm 기초 정리
  - property: og:title
    content: npm 기초 정리
  - property: og:description
    content: npm 기초 정리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/webpack/npm-tutoiral/
tags: ["webpack"]
---

# npm 기초 정리

## npm이란?

- 명령어로 자바스크립트 라이브러리를 설치하고 관리하는 패키지 매니저
  > node.js 설치시 자동으로 같이 설치됨

## npm 초기화 명령어

```bash
npm init -y
// npm 초기 디폴트 명령어로 실행한다.
```

## npm이 기존 방법보다 좋은 장점

**관리 용이**

- 라이브러리가 페이지 중간에 넣어도 돌아가는게 웹 개발의 유연함이지만 그에 따라 의존성, 라이브러리 버전 관리 매우 불편
- 라이브러리 사이간 버전 의존이 있어 버전 관리가 불편했으나 package.json안에서 dependencies 한곳에 다 뭉치게 되어 라이브러리 관리가 편해졌다.

**설치 용이**

- cdn (일반적인 자바스크립트 로딩방식)을 사용할 떄는 검색하고 찾아서 태그를 긁어와야 하는 불편함, 시간이 많이 든다
- 내가 필요한 것이 있다면 `npm install`로 라이브러리가 설치가 빠르게 되는 장점이 있다.
- 내 컴퓨터 환경에 node_modules에 잘 정돈되어 설치된다.

## npm 설치 명령어

### 1. npm 지역 설치

```bash
// 프로젝트 node_modules에 설치된다
npm install ... --save-prod
or
npm i ...
or
npm install ...
npm uninstall ...
```

### 1.1 지역 설치 옵션

#### 1. npm install ... --save-dev or -D or npm i ... -D

> devDependencies에 설치

#### 2. npm install ... --save-prod

### 1.2 dependencies와 devDependencies 차이

#### 1. npm i vue : dependencies

- `dependencies`: 앱의 로직을 직접적으로 구현되는데 필요한 라이브러리 (vue, react, chartjs 등등)

#### 2. npm i vue -D: devDependencies

- `devDependencies`: 개발을 할때 도움을 주는 보조 라이브러리 (webpack, js-compress, sass)

### 1.3 dependencies(배포용)와 devDependencies(개발용) 사용시 주의점

- `배포용`은 `npm run build`시 최종 애플리케이션 코드안에 포함됨
  - **주의!** `배포용`에 필요 없는 개발용 라이브러리가 포함시 빌드 시간이 매우 오래 걸린다.
- `개발용`은 `npm run build`시 앱에 포함 안됨
- 기본적으로는 개발자가 설치시 구분하나, 구분을 못하겠으면 라이브러리 안내 된 곳에서 설치 하라는 방법대로 하면 된다.

### 3. npm 전역 설치

```bash
// 프로젝트 node_modules에 설치되지 않는다
npm install ... --global
or
npm install ... -g
npm uninstall ... --global
// 전역 설치 라이브러리 경로
// /usr/local/lib/node_modules
```

<TagLinks />

<Comment />
