---
title: github - issue 관리하기
meta:
  - name: description
    content: github - issue 관리하기
  - property: og:title
    content: github - issue 관리하기
  - property: og:description
    content: github - issue 관리하기, git, github, issue, projects, milestone
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-issue/
tags: ["git"]
---

# github으로 issue 관리하기

## 목차

1. 새로운 이슈열기
2. 로컬 저장소에 이슈 이름으로 브랜치 생성
3. 이슈해결
4. 수정 사항 커밋 (github이 해당 커밋이 이슈와 관련있다는 것을 알도록 커밋메세지안에 이슈번호를 적어야한다)
5. master에 머지
6. 이슈 닫기, 프로젝트 done, 브랜치 삭제

## 새로운 이슈 열기

- 깃헙 - issue - New issue 클릭
- title과 상세 정보 기입합니다
- Projects - github의 Projects를 만들었다면 Projects에서 불러옵니다.
- Labels - Labels은 bug, docu 등 디폴스된 태그가 있으며, 커스텀으로 만들 수 있습니다.
- milestone - 사전에 issue 탭에서 milestone를 만들고 반영합니다.
- Submit new issue를 눌러 이슈를 만듭니다.

## 로컬 저장소에 이슈 이름으로 브랜치 생성

이슈 생성시 나온 번호를 기반으로 브랜치를 생성합니다

```tsx
git checkout -b 이슈번호
```

## 이슈 해결

- 작업을 완료합니다

## 수정 사항 커밋 & 푸시

```
git add .
git commit

// 터미널 창 뜨면 i누르고
[이슈번호] 이슈 이름
- 뭐라뭐라뭐라 이슈를 했다1
- 뭐라뭐라뭐라 이슈를 했다2
// 다 적고 esc - :wq로 저장 및 터미널 나옴

git push origin 이슈번호
```

- 깃헙의 아까 만든 이슈에 올린 커밋 메세지가 추적 됬는지 확인합니다.

## pull riquest 올리거나 master에 병합

상황에 따라 pr을 올리거나 master에 병합 합니다.

```
git checkout master
git merge 이슈번호
git push origin master
```

## 이슈 닫기, 프로젝트 done, 브랜치 삭제

- 이슈가 완료되었다면, `Close issue`로 닫습니다.
- Projects로 들어가서 만든 이슈를 `done`으로 바꿉니다.
- 완료된 리모트 브랜치, 로컬 브랜치를 삭제합니다

```
git push origin -d 이슈번호 && git branch -d 이슈번호
```

<TagLinks />

<Comment />
