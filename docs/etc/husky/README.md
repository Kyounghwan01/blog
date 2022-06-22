---
title: husky, lint-staged로 git commit 전에 eslint, prettier 체크하기
meta:
  - name: description
    content: husky, lint-staged로 git commit 전에 eslint, prettier 체크하기
  - property: og:title
    content: husky, lint-staged로 git commit 전에 eslint, prettier 체크하기
  - property: og:description
    content: husky, lint-staged로 git commit 전에 eslint, prettier 체크하기, react, seo, ssr
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/husky/
tags: ["git"]
---

# husky, lint-staged로 git commit 전에 eslint, prettier 체크하기

여러 인원이 있는 회사에서 일관성 있는 컨벤션 및 빌드에러 방지를 위해 `git commit`를 할때 바뀐 폴더에 대해 lint 체크를 하고 prettier를 실행 하도록 합니다. eslint 에러에 걸리면 commit은 취소됩니다.

## husky, lint-staged 설치

```
yarn add -D husky lint-staged
```

## husky 세팅

```
npx husky-init && yarn
```

## lint-staged 설정

- pre-commit 파일을 아래와 같이 수정

```
...

yarn lint-front
```

## package.json 수정

```json
{
  "script": {
    ...
    "lint-front": "lint-staged"
  },
  "lint-staged": {
    // 프로젝트에 있는 이번 commit에 변경된 모든 ts, tsx 파일을 대상으로 아래 명령어를 실행한다.
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --config ./.prettierrc --write -u" // 루프레벨에 있는 .prettierrc를 기준으로 prettier를 실행한다.
    ]
  }
}
```

- 이후 파일 변경 및 `git commit`을 하면 lint-staged가 실행된다.

## 에러

### hint: The 'pre-commit' hook was ignored because it's not set as executable.

- terminal를 pre-commit이 있는 디렉토리로 이동 후, `chmod +x .husky/pre-commit` 실행

### typescript 파일이 eslint 에 걸리지 않으면

```json
{
  "lint-staged": {
    "renderer/**/*.{js,ts,jsx,tsx}": [
      "eslint --ext .tsx,.ts . --quiet --fix",
      "prettier --config ./.prettierrc.json --write -u"
    ]
  }
}
```

- `.eslintrc` 파일에서 아래 rules 추가

```json
{
  "rules": {
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      { "ts": "never", "tsx": "never" }
    ],
    "@typescript-eslint/no-unused-vars": 2,
    "no-empty-pattern": 2,
    "no-case-declarations": 2,
    "@typescript-eslint/no-empty-interface": 2
  }
}
```

<TagLinks />

<Comment />
