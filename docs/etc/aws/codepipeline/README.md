---
title: codepipeline 사용법
meta:
  - name: description
    content: codepipeline 사용법
  - property: og:title
    content: codepipeline 사용법
  - property: og:description
    content: codepipeline 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/codepipeline/
tags: ["aws"]
---

# codepipeline 사용법

## codepipeline 설정 가이드

CodeBuild는 AWS에서 제공하는 완전 관리형 빌드 서비스입니다. 소스 코드를 컴파일하고, 테스트를 실행하며, 배포 가능한 소프트웨어 패키지를 생성합니다.

<iframe src="/blog/codebuild.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## CodeBuild 프로젝트 구성

### 1. 프로젝트 기본 설정

**프로젝트 이름**
- 프로젝트 이름은 2~255자여야 합니다
- 영문자(A-Z, a-z), 숫자(0-9), 특수 문자(-, _)를 사용할 수 있습니다
- 예시: `pet-web`

**프로젝트 유형**
- **기본 프로젝트**: 사용자 지정 CodeBuild 프로젝트 생성
- **러너 프로젝트**: GitHub Actions, GitLab, Buildkite 등에서 사용할 관리형 러너 생성

### 2. 소스 설정

**소스 공급자**
- AWS CodeCommit, GitHub, Bitbucket, S3 등에서 선택 가능
- 예시: CodeCommit의 `pet-web` 리포지토리 사용

**참조 유형**
- **브랜치**: 특정 브랜치 선택 (예: `main`)
- **Git 태그**: 특정 태그 선택
- **커밋 ID**: 특정 커밋 ID 지정 (빌드 시간 단축 가능)

### 3. 환경 설정

**환경 이미지**
- **관리형 이미지**: AWS CodeBuild가 제공하는 이미지 사용
- **사용자 지정 이미지**: Docker 이미지 직접 지정

**실행 모드**
- **컨테이너**: Docker 컨테이너에서 실행 (권장)
- **인스턴스**: EC2 인스턴스에서 직접 실행

**운영 체제 및 런타임**
- 운영 체제: Ubuntu, Amazon Linux 등
- 런타임: Standard, Docker 등
- 이미지: `aws/codebuild/standard:7.0` 등

**컴퓨팅 리소스**
- 3GB 메모리, vCPU 2개 (기본)
- 7GB 메모리, vCPU 4개
- 15GB 메모리, vCPU 8개
- 70GB 메모리, vCPU 36개
- 145GB 메모리, vCPU 72개

### 4. 서비스 역할

**서비스 역할 생성**
- CodeBuild가 다른 AWS 서비스에 접근하기 위한 IAM 역할
- 역할 이름: `codebuild-[프로젝트명]-service-role`
- 예시: `codebuild-pet-web-service-role`

### 5. 추가 구성

**제한 시간**
- 기본 제한 시간: 1시간
- 설정 범위: 5분 ~ 36시간

**대기 중인 제한 시간**
- 빌드 대기열 기본 시간: 8시간
- 설정 범위: 5분 ~ 8시간

**권한 설정**
- **권한이 있음**: Docker 이미지를 빌드하거나 빌드의 권한을 승격할 때 활성화 필요

**환경 변수**
- 빌드 과정에서 사용할 환경 변수 설정
- 일반 텍스트 또는 AWS Systems Manager Parameter Store, Secrets Manager 사용 가능

**Buildspec 설정**
- **buildspec 파일 사용**: 소스 코드 루트의 `buildspec.yml` 파일 사용 (권장)
- **빌드 명령 삽입**: 빌드 명령을 프로젝트 구성에 직접 저장
- 기본 파일명: `buildspec.yml`
- 커스텀 경로 지정 가능 (예: `configuration/buildspec.yml`)

## 주요 설정 항목 요약

| 항목 | 설명 |
|------|------|
| 프로젝트 이름 | 2~255자, 영문/숫자/특수문자(-, _) |
| 소스 공급자 | CodeCommit, GitHub, S3 등 |
| 환경 이미지 | 관리형 이미지 또는 사용자 지정 이미지 |
| 컴퓨팅 리소스 | 메모리 및 vCPU 선택 |
| 서비스 역할 | IAM 역할 자동 생성 또는 기존 역할 선택 |
| Buildspec | buildspec.yml 파일 사용 또는 직접 명령 입력 |

## 참고사항

- CodeBuild는 빌드 시간과 컴퓨팅 리소스 사용량에 따라 과금됩니다
- 빌드 로그는 CloudWatch Logs에 자동으로 저장됩니다
- 환경 변수는 빌드 보안을 위해 Parameter Store나 Secrets Manager 사용을 권장합니다
- VPC 내부 리소스 접근이 필요한 경우 VPC 설정을 구성해야 합니다

## 권한 에러 해결

### ECR 로그인 에러

CodeBuild에서 ECR에 Docker 이미지를 푸시할 때 권한 에러가 발생할 수 있습니다. 이는 CodeBuild 서비스 역할에 ECR 접근 권한이 없기 때문입니다.

**에러 예시:**
```
Error: Cannot perform an operation on a public repository
An error occurred (AccessDenied) when calling the GetAuthorizationToken operation
```

### 해결 방법

#### 1. IAM 역할 권한 추가

1. **IAM 콘솔 접속**
   - IAM → Roles → 역할 이름 선택 (`codebuild-pet-web-service-role`)

2. **권한 추가**
   - Permissions 탭 클릭
   - **방법 1**: AWS 관리형 정책 추가
     - `AmazonEC2ContainerRegistryPowerUser` (ECR 읽기/쓰기)
     - 또는 `AmazonEC2ContainerRegistryFullAccess` (전체 접근)
   - **방법 2**: 인라인 정책 추가
     - 필요한 ECR 권한만 선택적으로 추가

#### 2. 필요한 ECR 권한

CodeBuild가 ECR에 이미지를 푸시하려면 다음 권한이 필요합니다:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    }
  ]
}
```

#### 3. Amazon Q 활용

권한 설정이 복잡하거나 구체적인 권한이 필요한 경우, **Amazon Q**에 질문하면 필요한 권한을 정확히 알려줍니다.

**참고**: CodeBuild 서비스 역할은 프로젝트 생성 시 자동으로 생성되지만, 기본적으로 최소한의 권한만 부여됩니다. ECR, S3, CloudWatch Logs 등 사용하는 서비스에 대한 권한을 명시적으로 추가해야 합니다.


<TagLinks />

<Comment />
