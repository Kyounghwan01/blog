---
title: vue + typescript + js 연동하기
meta:
  - name: description
    content: vue + typescript + js 연동하기
  - property: og:title
    content: vue + typescript + js 연동하기
  - property: og:description
    content: vue + typescript + js 연동하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/allow-js/
tags: ["TS"]
---

# TS에서 JS 연동하기

TS로 만든 프로젝트에서 JS 파일이 필요할 때, 사용하는 방법입니다.

**1. tsconfig.json**

- js 업로드 수용

```json
{
  "compilerOptions": {
    ...
    "allowJs": true,
    //ts 프로젝트에서 js를 읽을지 여부, default: false
    ...
  },
}

```

혹시 이 방법을 사용하셨는데,<br>
`Error "Cannot write file ... because it would overwrite input file."`<br>
이런 에러가 뜨셨다면 다음 단계를 실행합니다.

**2. tsconfig.json**

- 출력 디렉토리 설정

```json
{
  "compilerOptions": {
    ...
    "allowJs": true,
    "outDir": "",
    //출력할 디렉토리를 설정합니다.

    //etc: js 관련 설정
    "checkJs": false,
    //allowJs: true로 js 사용시 js의 오류 검사 여부
    "maxNodeModuleJsDepth": 0,
    //js파일 검색할 최대 깊이
    ...
  },
}

```

- 위 두단계를 거치면 이상 없이 ts 프로젝트에서 js를 사용할 수 있습니다.

<TagLinks />

<Comment />
