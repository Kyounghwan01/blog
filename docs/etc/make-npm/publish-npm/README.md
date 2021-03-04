---
title: npm - npm에 코드 배포하기
meta:
  - name: description
    content: npm - npm에 코드 배포하기
  - property: og:title
    content: npm - npm에 코드 배포하기
  - property: og:description
    content: npm - npm에 코드 배포하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/make-npm/publish-npm/
tags: ["npm"]
---

# npm에 코드 배포하기

이번 글은 여러분들께서 많이 쓰시는 npm에 코드를 등록하여 `npm i xxx`를 하면 등록하신 코드를 누구나 사용가능 하도록 하는 글입니다.

## 사전 준비

[npm 공식 사이트](https://www.npmjs.com/) 여기로 들어가셔서 회원 가입 후, name, password, email를 기억해주세요

## 등록할 코드 만들기

### 1. 터미널에서 빈 디렉토리를 하나 만들어줍니다.

```sh
mkdir make-npm
```

### 2. 만든 디렉토리로 이동 후 아래와 같이 명령을 실행합니다.

```sh
cd make-npm
npm init
```

### 3. 이후 나오는 과정

#### package name

- npm에 등록되는 패키지 이름입니다. 중복은 허용되지 않습니다. 통상 `@성함 또는 회사명/패키지이름` 이렇게 많이 짓습니다

#### version

- 완성되지 않은 초기 패키지니 `0.0.1`로 해줍니다

#### description

- 패키지 상세내용입니다.

#### entry point

- 패키지 등록 후, 누군가 설치하면 맨 처음 파일을 읽을 루트 파일입니다.
- index.js 또는 main.js를 사용합니다.
- 이번에는 index.js로 해봅니다.

> 나머지는 패키지 등록에 필요하지 않습니다.

#### 4. 간단히 등록할 코드 만들기

```js
// make-npm/index.js
module.exports = {
  name: "nkh",
  address: "noh5524@gmail.con",
  mobile: 01022349891
};
```

- 호출시 정보를 알려주는 간단한 코드입니다.
- 우리가 entry point를 index.js로 만들었기 때문에 패키지가 등록되면 index.js가 실행되고 위 객체가 콘솔에 나오게 될 것입니다.

#### 5. npm 등록하기

- npm에 등록할 때는 public, private 버전이 있습니다. private는 월 구독비를 받습니다. 이번 글에서는 public한 경우입니다.

- npm에 public하게 등록하는 명령어는 아래와 같습니다.

  - `npm publish --access public`
  - 위 명령어를 실행하면 access 접근 거부 같은 에러를 보실 것입니다.

- npmjs.com에 등록한 이름, pw, email이 지금 필요합니다.

  - `npm login`을 실행하시고 이름, pw, email를 입력해주세요
  - 두번째 부터 배포시에는 `npm publish --access public` 가 아니라 `npm publish`로 실행하셔도 됩니다.

- 배포가 성공적으로 됬다면 `npmjs.com`에 들어가셔서 프로필 사진을 누르시고, `Packages`를 누르면 패키지가 등록되었습니다.

## 등록한 코드 사용하기

이제 어느 프로젝트에서든 `npm i xxx`를 통해 만드신 패키지를 사용하실 수 있습니다.

## 주의사항

파일을 수정하고 재 배포하실때는 **무조건** `package.json`의 `version`값을 수정하셔야합니다. 수정하지 않으시면 다른 파일이라 인식하지 못하고 배포하지 않습니다.

다음 글에서는 간단한 js파일이 아니라 react를 이용한 컴포넌트를 만들어보고 그 컴포넌트를 등록하고 실제 불러오는 과정까지 다뤄보겠습니다.

<TagLinks />

<Comment />
