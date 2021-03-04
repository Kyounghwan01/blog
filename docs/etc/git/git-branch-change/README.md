---
title: git commit, branch 옮기기
meta:
  - name: description
    content: git commit, branch 옮기기, 상대참조, 강제로 옮기기, ^, ~
  - property: og:title
    content: git commit, branch 옮기기, 상대참조, 강제로 옮기기, ^, ~
  - property: og:description
    content: git commit, branch 옮기기, git, github, 상대참조, 강제로 옮기기, ^, ~
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-branch-change/
tags: ["git"]
---

# git commit, branch 옮기기

오늘은 git에 여러 커밋이 있을 때, 이전 커밋으로 올라가거나, 다른 브랜치로 옮기는 명령어에 대해서 알아보겠습니다~

그전에 미리 알아두면 좋을 `Head`에 대해 알아봅니다!

## Head

head는 현재 브랜치 작업트리의 가장 최근 커밋을 가리킵니다.

head를 분리한다 -> 브랜치에 붙어있던 head를 커밋에 붙인다 (즉 현재 내가 위치한 위치를 브랜치가 아닌 커밋에 붙인다)

`git checkout 커밋이름(fed2dawdanv)` -> head를 분리하여 원하는 커밋에 붙인다

참고로 해쉬커밋이 매우 난잡하여 복사하기 힘든데 앞의 4글자만 붙여도 정상적으로 작동합니다. 아래의 두 명령어는 동일하다는 의미입니다.

```
git checkout fed2dawdanvwadfoiaheviejaieoc

git checkout fed2
```

## 캐럿 연산자(^) 이용하여 원하는 브랜치의 바로 이전 커밋으로 이동

캐럿 연산자(^)를 이용하면 바로 이전 커밋으로 이동할 수 있습니다.

아까 위에서 `HEAD`는 현재 브랜치의 가장 최근 커밋이라고 말씀드렸습니다. 이 `HEAD`를 이용하여 윗커밋 윗윗커밋으로 이동해보겠습니다!

branch1이라는 브랜치가 있고, 해당 브랜치에는 3개의 커밋이 있다고 가정합니다.

```
// 브랜치를 branch1으로 이동합니다.
git checkout branch1

// branch1의 이전 커밋으로 이동합니다.
git checkout HEAD^

// branch1의 이전 이전 커밋으로 이동합니다.
git checkout HEAD^
```

## 틸트 연산자(~)를 이용하여 원하는 수만큼 이전 커밋으로 이동

캐럿 연산자(^)를 이용하면 여러 이전 커밋으로 이동할 수 있습니다.

branch1이라는 브랜치가 있고, 해당 브랜치에는 3개의 커밋이 있다고 가정합니다.

```
// 브랜치를 branch1으로 이동합니다.
git checkout branch1

// branch1의 3번 이전 커밋으로 이동합니다.
git checkout HEAD~3

```

## 브랜치 강제로 옮기기

상대 참조(^, ~)를 통해 이동하시다가 다시 브랜치를 원래대로 옮길 때, 특정 에러로 인해 움직이지 못하는 경우가 있습니다.

제가 상대 참조를 사용하는 가장 일반적인 방법은 브랜치를 옮길 때 입니다. `-f` 옵션을 이용해서 브랜치를 특정 커밋에 직접적으로 재지정 할 수 있습니다.

`git branch -f master HEAD~3`

(강제로) master 브랜치를 HEAD에서 세번 뒤로 옮겼습니다. (three parents behind HEAD).

<TagLinks />

<Comment />
