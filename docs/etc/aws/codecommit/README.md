---
title: codecommit 사용법
meta:
  - name: description
    content: codecommit 사용법
  - property: og:title
    content: codecommit 사용법
  - property: og:description
    content: codecommit 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/codecommit/
tags: ["aws"]
---

# codecommit 사용법

## CodeCommit 설정 가이드

CodeCommit은 AWS에서 제공하는 관리형 소스 제어 서비스입니다. GitHub나 GitLab과 유사하지만 AWS 생태계와 완벽하게 통합되어 있습니다.

<iframe src="/blog/codecommit.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## 설정 단계 요약

### 1. 리전 설정
- AWS 콘솔에서 리전을 **서울(ap-northeast-2)**로 변경합니다.

### 2. 리포지토리 생성
- CodeCommit에서 이전할 리포지토리를 생성합니다.
- 리포지토리 주소를 복사합니다.
  - 예: `https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/pet-aa`

### 3. IAM 자격 증명 생성
1. IAM 콘솔 접속 → 액세스 관리 → 사용자 클릭 → 본인 계정 클릭
2. "보안 자격 증명" 탭으로 이동
3. "AWS CodeCommit 리포지토리에 대한 HTTPS Git 자격증명" 섹션에서 "자격증명 생성" 클릭
4. 생성된 사용자 이름과 암호를 안전하게 보관합니다.

### 4. 기존 리포지토리 마이그레이션

터미널에서 다음 명령어를 실행합니다:

```bash
# 원격 저장소 URL 변경
git remote set-url origin https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/[리포지토리명]

# 최신 코드 가져오기
git fetch origin
git pull origin main --all

# 모든 브랜치 푸시
git push origin --all
```

**주의**: 사용자 이름과 비밀번호 입력 시 3번에서 생성한 CodeCommit 자격 증명을 사용합니다.

## 참고사항

- CodeCommit은 AWS 계정당 5개 리포지토리까지 무료로 제공됩니다.
- HTTPS를 통한 Git 접근을 위해 IAM 자격 증명이 필요합니다.
- SSH 키를 사용하려면 추가 설정이 필요합니다.


<TagLinks />

<Comment />
