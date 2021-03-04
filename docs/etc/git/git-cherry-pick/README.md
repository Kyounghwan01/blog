---
title: git cherry-pick으로 다른 브랜치의 일부 커밋만 반영
meta:
  - name: description
    content: git cherry-pick으로 다른 브랜치의 일부 커밋만 반영
  - property: og:title
    content: git cherry-pick으로 다른 브랜치의 일부 커밋만 반영
  - property: og:description
    content: git cherry-pick으로 다른 브랜치의 일부 커밋만 반영, git, github, issue, projects, milestone
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-cherry-pick/
tags: ["git"]
---

# git cherry-pick으로 다른 브랜치의 일부 커밋만 반영

오늘은 git cherry-pick 명령어로 원하는 커밋만 브랜치에 반영하는 방법에 대해 알아보겠습니다!

## 이 작업을 하는 이유

이 명령어는 여러 브랜치의 여러 커밋 중에 원하는 커밋만 현재 브랜치에 불러올 때 사용합니다.

커밋을 다른 브랜치에 잘못 하거나, 요구사항이 바뀌어 필요 없는 커밋이 생기거나, 코드 의존성(dependency) 때문에 다른 사람의 커밋 중 일부를 가져와야 하는 경우가 종종 생길 때도 사용합니다!

## 사용법

`git cherry-pick <Commit1> <Commit2> <...>`

## 예시

여러 브랜치를 만들고 여러 커밋을 생성합니다.

```
git checkout -b branch1
git commit -m "1" // 편의상 해쉬값은 branch1-1이라고 합니다.
git commit -m "2" // 편의상 해쉬값은 branch1-1이라고 합니다.

git checkout -b branch2
git commit -m "3" // 편의상 해쉬값은 branch2-3이라고 합니다.
git commit -m "4" // 편의상 해쉬값은 branch2-4이라고 합니다.
```

이제 이중에서 branch1의 2번째 커밋과, branch2의 1번 커밋을 master브랜치에 반영하겠습니다.

```
git checkout master
git cherry-pick branch1-1 branch2-3
```

위 명령어를 통해 해당 커밋에 바뀐 내용만 현재 브랜치에 반영할 수 있습니다.

## cherry-pick으로 merge시 conflict이 생긴다면?

### cherry-pick을 중지한다

`git cherry-pick --abort` 명령어로 중지하면 cherry-pick 이전 상태로 되돌아갑니다.

### conflick을 해결하고 계속 진행한다.

conflict난 코드를 수정하고 `git add <path>`로 다시 git에 staging 시킵니다. 커밋을 다시 할 필요 없습니다.

이후 `git cherry-pick --continue` 명령어를 실행하면 다시 cherry-pick이 진행됩니다.

<TagLinks />

<Comment />
