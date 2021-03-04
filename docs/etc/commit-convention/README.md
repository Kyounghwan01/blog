---
title: 커밋컨벤션
meta:
  - name: description
    content: 커밋컨벤션, commit, commit convention
  - property: og:title
    content: 커밋컨벤션, commit, commit convention
  - property: og:description
    content: 커밋컨벤션, commit, commit convention
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/commit-convention/
tags: ["settings"]
---

# 커밋컨벤션

### 1) 기본 형식

```
[commit type]: [commit message] ([jira ticket number?])
```

### 2) commit type

| 구분자   | 작업 유형                 | 예                                                        | 비고 |
| -------- | ------------------------- | --------------------------------------------------------- | ---- |
| feat     | 새 기능 구현              | feat: 락커 회원 목록 검색 기능 추가 (S2-2345)             |      |
| fix      | 버그 수정                 | fix: 상점 목록의 에러처리 예외케이스 대응 (S2-2356)       |      |
| docs     | 문서(또는 주석) 관련 작업 | docs: 데코레이터 옵션에 대한 문서 추가 (S2-2345)          |      |
| refactor | 리팩터링                  | refactor: createStore의 함수를 작은 함수로 분리 (S2-2345) |      |
| test     | 테스트 관련 작업          | test: 상점 생성 테스트 추가 (S2-2345)                     |      |
| chore    | 기타 작업                 | chore: 프로덕션 빌드시 소스맵 생성하도록 변경 (S2-2334)   |      |

### 3) commit message

이번 커밋에서 작업한 내용을 간결하게 설명합니다.

### 4) jira ticket number

Jira에 등록한 이슈의 번호를 적습니다.
연관 티켓이 없다면 작성하지 않습니다.

# 2. 작성 규칙

- 제목은 50자를 넘지 않아야 합니다.
- 본문은 한 줄에 80자를 넘기지 않습니다.
- 문장의 끝에 구두점(.)을 끝에 찍지 않습니다.
- 문장은 명사로 끝나야 합니다.
- 제목과 본문 사이는 한 줄을 개행하여 분리합니다.

# 3. 커밋 작성 예

```markdown
feat: 프렌즈 지원하기 버튼에 GA 이벤트 태그 추가 (PP-2345)

구글 광고를 지원하기 위해서 GA이벤트 태그가 아닌 구글 애드센스 추적 코드를 삽입합니다.
또한, 프렌즈 지원하기 버튼에 정의된 이벤트 태그를 보내는 기능을 추가합니다.
```

<TagLinks />

<Comment />
