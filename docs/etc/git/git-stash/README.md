---
title: git stash, apply 활용법
meta:
  - name: description
    content: git stash, apply 활용법
  - property: og:title
    content: git stash, apply 활용법
  - property: og:description
    content: git stash, apply 활용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-stash/
tags: ["git"]
---

# git stash, apply 활용법

- stash, apply 관련 명령어

```sh
// 현재 작업 파일 스태시에 저장
git stash

// 특정 이름으로 스태시 저장
git stash save NAME

// stash list
git stash list

// 가장 최근 stash 가져오기
git stash apply

// n번 stash 가져오기
git stash apply stash@{n}

// n번 stash 지우기
git stash drop stash@{n}

// stash 모두 지우기
git stash clear
```

<TagLinks />

<Comment />
