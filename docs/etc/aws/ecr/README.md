---
title: ecr 사용법
meta:
  - name: description
    content: ecr 사용법
  - property: og:title
    content: ecr 사용법
  - property: og:description
    content: ecr 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/ecr/
tags: ["aws"]
---

# ecr 사용법

## ECR 설정 가이드

ECR(Elastic Container Registry)은 AWS에서 제공하는 완전 관리형 Docker 컨테이너 레지스트리입니다. Docker 이미지를 안전하게 저장, 관리, 배포할 수 있습니다.

<iframe src="/blog/ecr.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## ECR 개요

ECR은 Docker 컨테이너 이미지를 저장하고 관리하는 AWS의 완전 관리형 서비스입니다. CodeBuild, ECS, App Runner 등과 통합하여 컨테이너 기반 애플리케이션을 배포할 수 있습니다.

## ⚠️ 중요: 사전 요구사항

**CodeBuild가 먼저 선행되어야 합니다!**

ECR 리포지토리를 생성하기 전에 CodeBuild 프로젝트가 설정되어 있어야 합니다. CodeBuild에서 빌드한 Docker 이미지를 ECR에 푸시하기 때문입니다.

## ECR 리포지토리 생성

### 1. 리포지토리 생성

**생성 링크:**
- [ECR 리포지토리 생성](https://ap-northeast-1.console.aws.amazon.com/ecr/private-registry/repositories/create?region=ap-northeast-1)

**⚠️ 중요: 리포지토리 이름 규칙**
- **CodeBuild 프로젝트 이름과 동일하게** 지어야 합니다
- 빌드된 이미지가 App Runner나 ECS로 매칭되기 용이합니다
- 예시: CodeBuild 프로젝트가 `pet-web`이면 ECR 리포지토리도 `pet-web`

**리포지토리 설정:**
- 리포지토리 이름: CodeBuild 프로젝트 이름과 동일
- 가시성: Private (기본값)
- 태그 불변성: 필요에 따라 설정
- 이미지 스캔: 필요에 따라 활성화

### 2. 생성 확인

리포지토리 생성이 완료되면:

1. **CodeBuild 실행**
   - CodeBuild 프로젝트를 실행하여 Docker 이미지 빌드 및 푸시

2. **ECR에서 이미지 확인**
   - ECR 콘솔에서 리포지토리 선택
   - 이미지가 정상적으로 푸시되었는지 확인
   - 이미지 태그, 푸시 시간, 이미지 크기 등 확인

## ECR과 다른 AWS 서비스 통합

### CodeBuild 연동

CodeBuild의 `buildspec.yml`에서 ECR에 이미지를 푸시합니다:

```yaml
post_build:
  commands:
    - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_URI
    - docker push $ECR_URI:$IMAGE_TAG
```

### ECS 연동

ECS 태스크 정의에서 ECR 이미지를 참조합니다:

```json
{
  "image": "123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/pet-web:latest",
  "name": "pet-web-container"
}
```

### App Runner 연동

App Runner 서비스 생성 시 ECR 이미지를 소스로 선택합니다:
- ECR 리포지토리 선택
- 이미지 태그 지정
- 자동 배포 설정

## 리포지토리 이름 규칙

**권장 사항:**
- CodeBuild 프로젝트 이름과 동일
- 소문자, 숫자, 하이픈(-)만 사용
- 예시: `pet-web`, `api-server`, `frontend-app`

**이유:**
- CI/CD 파이프라인에서 일관성 유지
- 자동화 스크립트 작성 시 변수 관리 용이
- 배포 시 매칭 오류 방지

## 이미지 태그 전략

**태그 유형:**
- `latest`: 최신 빌드 (기본값)
- `v1.0.0`: 버전 태그
- `main-abc123`: 브랜치-커밋 해시
- `staging`, `production`: 환경별 태그

**권장 사항:**
- 프로덕션 환경에서는 `latest` 태그 사용 지양
- 버전 태그나 커밋 해시 사용 권장
- 환경별 태그로 배포 관리

## 보안 설정

### 이미지 스캔
- 취약점 스캔 활성화 권장
- 스캔 결과를 CloudWatch로 전송 가능

### 태그 불변성
- 이미지 태그 덮어쓰기 방지
- 프로덕션 환경에서 권장

### IAM 정책
- CodeBuild 서비스 역할에 ECR 푸시 권한 필요
- ECS/App Runner에 ECR 풀 권한 필요

## 비용

- 저장 비용: GB당 월 요금
- 데이터 전송: 리전 간 전송 시 비용 발생
- 스캔: 이미지 스캔 시 추가 비용 (선택사항)

## 참고사항

- ECR은 리전별로 독립적으로 운영됩니다
- 리전 간 이미지 복제가 필요한 경우 별도 설정 필요
- 이미지 라이프사이클 정책으로 오래된 이미지 자동 삭제 가능
- CodeBuild가 ECR에 접근하려면 적절한 IAM 권한이 필요합니다


<TagLinks />

<Comment />
