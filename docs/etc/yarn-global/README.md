---
title: npm / yarn global 실행해도 command not found 해결 방법
meta:
  - name: description
    content: npm / yarn global 실행해도 command not found 해결 방법, setting, yarn, npm , global
  - property: og:title
    content: npm / yarn global 실행해도 command not found 해결 방법, setting, yarn, npm , global
  - property: og:description
    content: npm / yarn global 실행해도 command not found 해결 방법, setting, yarn, npm , global
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/yarn-global/
tags: ["settings"]
---

# yarn global 실행해도 command not found 해결 방법

## 원인

yarn global로 패키지를 설치한 곳과, 패키지를 읽는 곳이 달라서 생기는 문제입니다.
설치한 곳과 읽는 곳이 달라진 경우는 저의 경우 zsh로 바꾸는 바람에 path가 틀어져서 생겼습니다

## 해결방법

### 1. yarn global로 설치하는 경로 확인

```tsx
yarn global bin
// /Users/kyounghwan/.yarn/bin
```

### 2. prefix 확인

```tsx
yarn config get prefix
// /Users/kyounghwan/.yarn
```

### 3. prefix 값을 yarn에 바로 붙입니다

```tsx
yarn config set prefix ~/.yarn
```

### 4. 사용하는 shell에 path값을 변경합니다

bash 사용하시면 ~/.bash_profile에 zsh를 사용하시면 ~/.zshrc를 열고 아래와 같이 입력합니다

```tsx
vim ~/.zshrc
```

vim 창이 열리면

```tsx
export PATH="$PATH:`yarn global bin`"
```

위 같이 넣고 저장 후 나와서 아래 커맨드로 zsh에 저장합니다

```tsx
source ~/.zshrc
```

이후, 터미널 끄고, 다시 켜서 `zsh` 를 입력하면 에러가 해결됩니다!

<TagLinks />

<Comment />
