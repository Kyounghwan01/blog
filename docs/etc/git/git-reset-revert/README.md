---
title: git reset, revert로 이전 커밋으로 돌리기
meta:
  - name: description
    content: git reset, revert로 이전 커밋으로 돌리기
  - property: og:title
    content: git reset, revert로 이전 커밋으로 돌리기
  - property: og:description
    content: git reset, revert로 이전 커밋으로 돌리기, git, github, issue, projects, milestone
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-reset-revert/
tags: ["git"]
---

# git reset, revert로 이전 커밋으로 돌리기

오늘은 git reset, revert를 이용하여 이전 커밋으로 돌리는 방법에 대해서 알아보겠습니다!

## 이 작업을 하는 이유

단편적인 예로 이전 돌아가고 싶은 커밋으로 가고 싶을 때 사용하거나, master 브랜치로 릴리즈를 했는데 치명적인 버그로 인하여 롤백해야하는 경우 이전 커밋으로 되돌아가기 위해 위 명령어를 사용합니다!

## reset, revert 차이

둘다 이전 커밋으로 되돌린다는 점에서는 동일하나

github 같은 온라인 저장소에 올라가 다른 사람간 코드 공유의 유(revert)무(reset)에 따라서 달라집니다.

## reset

origin에 올리지 않고 로컬에 커밋이 머물렀다면, 올라갔어도 나만 해당 브랜치를 사용한다면 reset를 쓰셔도 좋습니다.

사용법은 `git reset --option 돌아갈 커밋`입니다.

아래 예시로 알아보겠습니다.

1. commit을 여러번 합니다.

```
git commit -m "1"
git commit -m "2"
git commit -m "3"
```

2. commit을 바로 이전 상황으로 돌립니다.

```
git reset HEAD^
```

3. 여러개의 commit 이전으로 돌리는 경우

```
git reset HEAD~2
```

- `1` 커밋으로 되돌아갑니다.
- `HEAD~2` 부분에 커밋 해쉬를 써도 되돌아갑니다.

### reset 옵션

#### --hard

- hard 옵션을 사용하면 돌아간 커밋 이후의 변경 이력은 모두 삭제합니다.

```
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --hard [1번commit hash]
git push
```

- 즉, 위처럼 실행할 경우 2, 3번 커밋 반영 내용은 모두 사라집니다. 물론 코드도 날아가지요.

#### --mixed

- 변경 이력은 모두 삭제하지만 변경 내용은 남아있습니다.

```
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --mixed [1번commit hash]
git add .
git commit -m "~"
git push
```

- 위처럼 실행할 경우 이력은 날아가나 unStage 상태로 코드는 남아있습니다. 코드를 반영하려면 `add` 명령어로 stage에 반영하고 commit 합니다.

#### --soft

- 변경 이력은 모두 삭제하지만 변경 내용은 남아있습니다. 그러나 stage 되어있습니다.

```
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --soft [1번commit hash]
git commit -m "~"
git push
```

- 즉, `add`명령어 필요없이 바로 commit 진행 가능합니다.

### origin에 올린 상태에서 reset하고 push 한다면?

- 로컬은 origin에 있는 commit을 삭제한 채로 origin에 덮으려고 하니 당연히 에러가 뜹니다.
- 이럴땐 `--force` 옵션을 주어 강제로 로컬 commit history를 origin commit history로 덮어씁니다. 즉, 만약 해당 리포를 다른 사람들과 공유하고 있다면 **무조건** 하시면 안되는 행동입니다.

### reset 사용하는 경우

위처럼 다른 사람간 코드가 공유될 때, reset를 사용하면 상상치도 못하는 헬게이트가 열립니다. 그러므로 reset를 사용하는 경우는 아래와 같습니다.

- 혼자만 사용하는 브랜치인 경우
- origin에 있지만 아무도 이 브랜치를 사용하지 않는다는 확신을 가지는 경우

그 이외의 경우 commit을 되돌릴때 아래의 `revert`를 사용합니다.

## revert

revert는 reset과 다르게 커밋을 삭제하는 것이 아닌 커밋을 추가합니다.

그러나 이전 커밋과 정반대의 데이터를 추가하는 방식으로 코드를 되돌립니다.

revert 명령어는 `reset --soft`, `mixed`와 동일한 결과를 가져오지만 이력은 `Revert "..."`라는 메세지가 추가됩니다.

```
git commit -m "1번 커밋"
git commit -m "2번 커밋"
git commit -m "3번 커밋"

git revert [1번commit hash]
```

위처럼 명령어를 실행하면 `1번 커밋` 이후의 커밋들이 삭제되는 것이 아니라, **`1번 커밋`에 해당하는 내용만 삭제**됩니다. 그리고 `Revert "1번 커밋"`이라는 커밋에는 1번 커밋이 삭제된 이력이 남게 되죠.

`git log`에는 아래와 같이 찍힙니다.

```
Revert "1번 커밋"
3번 커밋
2번 커밋
1번 커밋
```

### 바로 커밋되게 하지 않으려면?

만약 revert한 결과를 stage 상태만 유지하고, commit 하지 않으려면 `--no-commit` 옵션을 추가합니다.

```
git revert --no-commit [커밋 해쉬]

// 이후
git commit -m "어떤 커밋을 왜 리버트했니?"

git push
```

### 여러개 커밋을 되돌리려면?

```
git revert [커밋해쉬]..[커밋해쉬]
```

git log에는

```
git revert [1번커밋해쉬]..[2번커밋해쉬]
git log

Revert "2번커밋해쉬"
Revert "1번커밋해쉬"
```

revert는 되돌리는 커밋이 중간에 있을때 커밋 해쉬를 넣어서 중간 커밋만 삭제할 수 있고, 어떤 커밋이 왜 revert 됬는지 commit message를 통해 관찰 가능함으로 더욱 유용합니다.

또는 revert는 커밋은 삭제되는 것보다 이전으로 되돌리는 이력마저 남기는 것이 history 유지 차원에서 더 좋습니다.

그래서 `revert` 씁시다!

<TagLinks />

<Comment />
