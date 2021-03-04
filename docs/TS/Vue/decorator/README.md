---
title: vue-property-decorator 세팅
meta:
  - name: description
    content: vue-property-decorator 세팅
  - property: og:title
    content: vue-property-decorator 세팅
  - property: og:description
    content: vue-property-decorator 세팅
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Vue/decorator/
tags: ["vue", "TS"]
---

# vue-property-decorator 세팅

- `vue-property-decorator`를 이용하여 vue + typescript로 토이프로젝트를 진행하였습니다.
  <br>배운점과 삽질하며 익힌점들을 정리합니다.

## project 생성

- vue-cli를 이용하여 만듭니다

1. `vue create project-name`으로 프로젝트를 생성할 수 있습니다.
2. `Manually select features` 선택
3. `typescript` 선택, `Babel`선택 안함, 나머지는 개발 방향에 맞춰 선택
4. `Use class-style component syntax` - Y를 눌러서 class 컴포넌트로 개발진행
5. 나머지 default 값 선택

## project 파일 설명

#### tsconfig.json

- typescript 언어로 코드를 작성하고, javascript로 재 빌드하여 기능을 구현하는 방식인데,
  이때 ts파일을 js로 어떻게 바꿀 것인지 설정하는 파일이다.
- `compilerOptions`: 컴파일 하는 옵션
- `target`: 빌드될 js 파일 버전
- `experimentalDecorators`: @ 같은 데코레이터 쓰려면 `true`
- `paths`: js로 말하면 `aliases.config.js`같은 느낌 (import shortcut)
- `include`: 하위에 정의된 파일들을 js로 바꾼다 (src/\*_/_.ts)
- `exclude`: 빌드 예외 파일 (node_module)

#### tslint.json

- eslint와 같이 코드 포맷을 일정하게 해주는 파일
- 설정이 많으니 오피셜 문서를 보면서 그때그때 적용하는게 학습하기 유리하다

#### 데코레이터

- 데코레이터도 하나의 함수이며 클래스 컴포넌트에서 사용한다.
- vue + ts에서 사용될 아주 중요하고 기초 예제

```ts
import { Components, Vue } from 'vue-property-decorator';
//class 스타일의 컴포넌트
@Component
export default class Home extend Vue {}
//class 선언 이후 vue를 상속받고 클래스를 컴포넌트로 사용하기위해 데코레이터 선언
```

<TagLinks />

<Comment />
