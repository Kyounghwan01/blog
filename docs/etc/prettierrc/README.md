---
title: 프리티어 코드 formatting 설정하기
meta:
  - name: description
    content: 프리티어 코드 formatting 설정하기
  - property: og:title
    content: 프리티어 코드 formatting 설정하기
  - property: og:description
    content: 프리티어 코드 formatting 설정하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/prettierrc/
tags: ["settings"]
---

# 프리티어 설정

많은 개발자들이 코드포멧팅인 [프리티어](https://prettier.io/)를 많이 사용합니다.

같은 프로젝트를 여러 사람이 개발할 땐, 코드 포멧팅을 맞춰줘야하는데, 이때 프리티어 설정을 코드 컨벤션에 맞게 설정하면 모든 개발자가 같은 포맷으로 코딩을 할 수 있습니다.

그래서 이번 포스팅은 로컬에 있는 프리티어 설정을 **무시**하고, 프로젝트 설정에 있는 컨벤션에 맞게 프리티어가 작동하게 하는 방법을 알아보겠습니다.

1. 개발자 노트북 VScode에 Prettier 설치

2. 개발하는 프로젝트의 **루트 디렉토리**에 `.prettierrc`를 생성합니다.

3. 원하는 포맷 설정 작성

- `json` 형식으로 작성합니다.

```json
{
  //줄 바꿈 폭 길이
  "printWidth": 120,
  //탭 너비
  "tabWidth": 2,
  //탭 사용 여부
  "useTabs": false,
  //세미클론 여부
  "semi": true,
  //' or "
  "singleQuote": true,
  //여러줄 사용시, 뒷줄 콤마 여부
  "trailingComma": "all",
  //객체 리터럴 사용시 괄호에 공백 삽입 여부
  "bracketSpacing": true,
  // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  "jsxBracketSameLine": true,
  //화살표 함수 괄호 사용 방식
  "arrowParens": "avoid",
  //vue 파일의 script와 style태그 들여쓰기 여부
  "vueIndentScriptAndStyle": false,
  //맨마지막 줄 넣는지 여부
  "endOfLine": "auto"
}
```

제가 중요하게 생각하는 설정만 넣었습니다. 이외에서 다른 설정 들이 많으니 찾아보시고 더 추가하기면 되겠습니다.

<TagLinks />

<Comment />
