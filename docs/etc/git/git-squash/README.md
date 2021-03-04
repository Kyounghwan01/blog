---
title: git squash로 여러 커밋 한줄로 줄이기
meta:
  - name: description
    content: git squash로 여러 커밋 한줄로 줄이기
  - property: og:title
    content: git squash로 여러 커밋 한줄로 줄이기
  - property: og:description
    content: git squash로 여러 커밋 한줄로 줄이기, git, github, issue, projects, milestone
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-issue/
tags: ["git"]
---

# git squash로 여러 커밋 한줄로 줄이기

오늘은 git squash로 여러 커밋 한줄로 줄이는 방법에 대해서 알아보겠습니다!

## 이 작업을 하는 이유

개발자들이 개발을 할 task를 할당 받으면 `master` 브랜치에서 `feature` 브랜치를 분리하고, 그곳에서 작업을 한 이후 `master`로 `merge`합니다.

이때 `feature`브랜치에 여러 커밋이 있다면 커밋 수면큼 `master`에 커밋이 늘어나게 되죠.

하나의 이슈에 하나의 커밋메세지만 있는게 맞자고 생각이 들기 때문에 `feature`브랜치에 하나의 커밋만 넣으려고 하면 꼭 놓치는 부분이 생기거나 추가 작업이 생기면서 커밋 수가 어쩔 수 없이 늘어가기도 합니다.

이럴 때, 지금 알려드리는 squash 기능을 이용하면 여러 커밋을 하나로 압축하여 merge하는 브랜치에 하나의 커밋으로 남길 수 있습니다.

## 예시

1. master브랜치에서 feature 브랜치를 만듭니다

```
git checkout -b feature/20201213/squash-test
```

2. feature 브랜치에 내부 값을 바꾸면서 여러 커밋을 남깁니다.

```
// 현재 브랜치: feature/20201213/squash-test

git commit -m "commit 1"
git commit -m "commit 2"
git commit -m "commit 3"
```

3. master 브랜치로 checkout

```
git checout master
```

4. master 브랜치에서 feature 브랜치를 merge 함과 동시에 squash 실행

```
// 현재 브랜치: master

git merge --squash feature/20201213/squash-test
```

- 이 작업을 하면 여러 커밋들이 하나로 뭉치면서 master에 커밋 하나로 들어갑니다.

5. squash 한 결과 commit

```
// 현재 브랜치: master
git commit -m "~"
```

위 방법을 통해 깔끔한 커밋 메세지 관리 하시면 좋을 것 같습니다~~

<TagLinks />

<Comment />
