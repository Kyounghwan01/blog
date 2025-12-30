---
title: Next.js AWS 배포 종합 가이드
meta:
  - name: description
    content: Next.js 애플리케이션을 AWS에 배포하는 전체 과정 가이드
  - property: og:title
    content: Next.js AWS 배포 종합 가이드
  - property: og:description
    content: Next.js 애플리케이션을 AWS에 배포하는 전체 과정 가이드
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/nextjs-aws-deployment-guide/
tags: ["aws", "nextjs"]
---

# Next.js AWS 배포 종합 가이드

## 개요

이 가이드는 Next.js 애플리케이션을 Vercel에서 AWS로 이전하여 배포하는 전체 과정을 단계별로 설명합니다. 각 단계는 기능별로 세분화되어 있으며, 순서대로 진행하면 완전한 CI/CD 파이프라인을 구축할 수 있습니다.

## 전체 아키텍처

```
개발자 코드 푸시
    ↓
CodeCommit (소스 코드 저장소)
    ↓
CodePipeline (CI/CD 파이프라인)
    ↓
CodeBuild (Docker 이미지 빌드)
    ↓
ECR (Docker 이미지 저장)
    ↓
ECS (컨테이너 실행)
    ↓
ALB (로드 밸런싱)
    ↓
CloudFront (CDN)
    ↓
사용자
```

## 배포 파이프라인 단계별 가이드

### 1단계: 소스 코드 관리 - CodeCommit

**목적:** AWS에서 제공하는 Git 저장소에 소스 코드를 관리합니다.

**주요 작업:**
- CodeCommit 리포지토리 생성
- 기존 Git 저장소 마이그레이션
- IAM 자격 증명 설정

**상세 가이드:** [CodeCommit 사용법](../codecommit/)

**예상 소요 시간:** 10-15분

---

### 2단계: 빌드 환경 설정 - CodeBuild

**목적:** Docker 이미지를 빌드하고 ECR에 푸시하는 빌드 환경을 구성합니다.

**주요 작업:**
- CodeBuild 프로젝트 생성
- 소스 공급자 연결 (CodeCommit)
- 환경 이미지 및 컴퓨팅 리소스 설정
- buildspec.yml 파일 작성
- IAM 권한 설정 (ECR 접근 권한)

**상세 가이드:** [CodeBuild 사용법](../codebuild/)

**예상 소요 시간:** 20-30분

**주의사항:**
- ECR 로그인 에러 발생 시 IAM 권한 확인 필요
- buildspec.yml에서 환경별 배포 분기 처리

---

### 3단계: 컨테이너 이미지 저장소 - ECR

**목적:** 빌드된 Docker 이미지를 저장하고 관리합니다.

**주요 작업:**
- ECR 리포지토리 생성
- 리포지토리 이름 규칙 확인 (CodeBuild와 동일하게)
- 이미지 푸시 확인

**상세 가이드:** [ECR 사용법](../ecr/)

**예상 소요 시간:** 5-10분

**주의사항:**
- CodeBuild가 먼저 선행되어야 함
- 리포지토리 이름은 CodeBuild 프로젝트 이름과 동일하게 설정

---

### 4단계: 로드 밸런서 설정 - EC2 ALB

**목적:** ECS 태스크에 트래픽을 분산시키는 로드 밸런서를 생성합니다.

**주요 작업:**
- Application Load Balancer 생성
- 대상 그룹 생성 (포트 8080)
- 보안 그룹 설정
- 리스너 및 라우팅 구성
- 상태 검사 설정

**상세 가이드:** [EC2 ALB 사용법](../ec2/)

**예상 소요 시간:** 15-20분

**주의사항:**
- 최소 2개 이상의 가용 영역 선택 필수
- 대상 그룹 포트는 Next.js 애플리케이션 포트(8080)와 일치해야 함
- 내부 VPC가 필요없다면 대부분 기본값으로 설정 가능

---

### 5단계: 컨테이너 실행 환경 - ECS

**목적:** Docker 컨테이너를 실행하고 관리하는 환경을 구성합니다.

**주요 작업:**
- ECS 클러스터 생성 (Fargate)
- Task Definition 생성 (포트 8080, 환경 변수 설정)
- ECS 서비스 생성
- ALB와 대상 그룹 연결
- VPC 네트워킹 설정

**상세 가이드:** [ECS 사용법](../ecs/)

**예상 소요 시간:** 30-40분

**주의사항:**
- CodeBuild, ECR, ALB가 먼저 완료되어야 함
- 서브넷은 ALB와 동일한 가용 영역 선택
- 보안 그룹은 ALB에서 오는 트래픽만 허용

---

### 6단계: CDN 및 전역 배포 - CloudFront

**목적:** 전 세계 사용자에게 빠른 콘텐츠 전달을 위한 CDN을 설정합니다.

**주요 작업:**
- CloudFront 배포 생성
- Origin 설정 (ALB 연결)
- 캐시 정책 설정 (정적 파일 캐싱)
- HTTPS 리다이렉트 설정
- 커스텀 도메인 연결

**상세 가이드:** [CloudFront 사용법](../cloudfront/)

**예상 소요 시간:** 20-30분

**주의사항:**
- 기본 동작의 캐시 정책은 CachingDisabled로 설정 (동적 콘텐츠)
- 정적 파일(`/_next/static/*`, `*.js`, `*.css` 등)은 별도 Behavior로 캐싱
- Origin Shield 사용 시 비용 절감 효과

---

### 7단계: CI/CD 파이프라인 통합 - CodePipeline

**목적:** 전체 배포 프로세스를 자동화하는 파이프라인을 구축합니다.

**주요 작업:**
- CodePipeline 생성
- 소스 단계: CodeCommit 연결
- 빌드 단계: CodeBuild 연결
- 배포 단계: ECS 배포 (선택사항)
- 환경별 파이프라인 분리 (dev, stg, prd)

**상세 가이드:** [CodePipeline 사용법](../codepipeline/)

**예상 소요 시간:** 20-30분

**주의사항:**
- 환경별로 별도의 CodePipeline 생성
- CodeBuild에 환경 변수(`DEPLOYMENT_ENV`) 전달
- buildspec.yml에서 환경별 분기 처리

---

## 전체 배포 프로세스 요약

### 초기 설정 (1회)

1. **CodeCommit** - 소스 코드 저장소 생성 및 마이그레이션
2. **CodeBuild** - 빌드 프로젝트 생성 및 권한 설정
3. **ECR** - 이미지 저장소 생성
4. **EC2 ALB** - 로드 밸런서 및 대상 그룹 생성
5. **ECS** - 클러스터, 태스크 정의, 서비스 생성
6. **CloudFront** - CDN 배포 생성
7. **CodePipeline** - CI/CD 파이프라인 구축

### 일상적인 배포 프로세스

```
1. 개발자가 코드를 CodeCommit에 푸시
   ↓
2. CodePipeline이 자동으로 트리거
   ↓
3. CodeBuild가 Docker 이미지 빌드
   ↓
4. 빌드된 이미지를 ECR에 푸시
   ↓
5. ECS 서비스가 새 이미지 감지 후 자동 배포
   ↓
6. ALB가 새 태스크에 트래픽 라우팅
   ↓
7. CloudFront가 업데이트된 콘텐츠 캐싱
```

## 환경별 배포 전략

### 개발 환경 (dev)
- 브랜치: `dev`
- CodePipeline: `pet-web-dev`
- ECR: 개발 계정의 `pet-web`
- ECS: 개발 클러스터

### 스테이징 환경 (stg)
- 브랜치: `stg`
- CodePipeline: `pet-web-stg`
- ECR: 스테이징 계정의 `pet-web`
- ECS: 스테이징 클러스터

### 프로덕션 환경 (prd)
- 브랜치: `main`
- CodePipeline: `pet-web`
- ECR: 프로덕션 계정의 `pet-web`
- ECS: 프로덕션 클러스터

## 비용 최적화 팁

1. **ECS Fargate**
   - 필요한 만큼만 CPU/메모리 할당
   - 사용하지 않는 태스크는 즉시 종료

2. **CloudFront**
   - 정적 파일만 캐싱하여 Origin 부하 감소
   - Origin Shield 사용 시 57% 부하 감소

3. **ALB**
   - 사용하지 않는 리스너 제거
   - 필요시에만 HTTPS 리스너 추가

4. **CodeBuild**
   - 빌드 시간 최적화 (캐시 활용)
   - 불필요한 빌드 트리거 방지

## 문제 해결 가이드

### CodeBuild ECR 로그인 에러
- **증상:** `AccessDenied` 에러 발생
- **해결:** IAM 역할에 ECR 권한 추가
- **상세:** [CodeBuild 권한 에러 해결](../codebuild/#권한-에러-해결)

### ECS 태스크가 대상 그룹에 등록되지 않음
- **증상:** 대상 그룹 상태가 `unhealthy`
- **해결:** 보안 그룹 규칙 확인, 포트 매핑 확인
- **상세:** [ECS 서비스와 ALB 연결](../ecs/#ecs-서비스와-alb-연결-과정-상세)

### CloudFront 504 에러
- **증상:** Gateway Timeout 에러
- **해결:** Origin 설정 확인, ALB 상태 확인
- **상세:** [CloudFront 504 에러 해결](../cloudfront/#504-gateway-timeout-에러-해결)

## 관련 문서

- [Vercel에서 AWS로 이전하기](../nextjs-vercel-convert-to-aws/) - 전체 배경 및 아키텍처 개요
- [App Runner 사용법](../apprunner/) - 대안 배포 방법 (도쿄 리전)
- [HTTP to HTTPS 리다이렉트](../http-redirect-https/) - CloudFront HTTPS 설정

## 예상 총 소요 시간

- **초기 설정:** 약 2-3시간
- **일반 배포:** 약 10-15분 (자동화된 파이프라인)

## 다음 단계

1. 각 단계별 가이드를 순서대로 따라 진행
2. 각 단계 완료 후 다음 단계로 진행
3. 전체 파이프라인 구축 후 테스트 배포 수행
4. 모니터링 및 로깅 설정 확인

---

**참고:** 이 가이드는 실제 운영 환경에서 사용된 설정을 기반으로 작성되었습니다. 프로젝트에 따라 일부 설정이 다를 수 있습니다.

<TagLinks />

<Comment />

