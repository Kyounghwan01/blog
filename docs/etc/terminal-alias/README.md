---
title: mac 터미널 alias (단축키) 설정하기
meta:
  - name: description
    content: mac 터미널 alias (단축키) 설정하기
  - property: og:title
    content: mac 터미널 alias (단축키) 설정하기
  - property: og:description
    content: mac 터미널 alias (단축키) 설정하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/terminal-alias/
tags: ["settings"]
---

# alias (단축키) 설정하기

> 저의 경우 프로젝트를 열때 터미널에서 프로젝트 루트로 이동한 후 에디터를 엽니다<br>
> 그때마다 cd _, cd _ 하는게 너무 귀찮더라구요.<br>
> 그래서 터미널에 단축키를 넣어서 해당 단어를 입력하면 바로 원하는 루트로 오도록 하였습니다.<br>

- 아래 방법은 `zsh`를 사용할 때입니다.

1. 터미널을 켜고, 아래 명령어를 입력합니다

```bash
vim ~/.zshrc
```

2. 맨 밑쪽 alias example 아래쪽에 아래와 같은 방식으로 원하는 단축키를 입력합니다. 아래는 제가 터미널에 저장한 단축키입니다

```sh
alias gs="git status"
alias gl="git log"
alias gd="git diff"
alias gc="git checkout"
alias gcm="git checkout master"
alias gp="git pull"
alias ys="yarn start"
alias vblog="cd Desktop/source/toy/blog"
alias vd="vuepress dev"
```

- 다 저장 했으면 `esc`키 누르고 `:wq`로 vim을 나옵니다

3. `zsh`에 저장한 단축키 등록

- vim을 나왔다면 터미널에 돌아왔습니다. 이후 아래 명령어를 입력합니다.

```zsh
source ~/.zshrc
```

4. 저장을 완료했다면 터미널을 끄고 다시 켜서 단축키가 등록됬는지 확인합니다

<TagLinks />

<Comment />
