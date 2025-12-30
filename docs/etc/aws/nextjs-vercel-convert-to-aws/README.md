---
title: vercel에 배포한 nextjs 웹을 aws로 이전하기
meta:
  - name: description
    content: vercel에 배포한 nextjs 웹을 aws로 이전하기
  - property: og:title
    content: vercel에 배포한 nextjs 웹을 aws로 이전하기
  - property: og:description
    content: vercel에 배포한 nextjs 웹을 aws로 이전하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/nextjs-vercel-convert-to-aws/
tags: ["aws"]
---

# vercel에 배포한 nextjs 웹을 aws로 이전하기

## 배경

1. **비용 절감**
   - 트래픽이 많을 경우 Vercel보다 AWS가 훨씬 저렴

2. **커스터마이징 자유도**
   - 인프라 설정을 완전히 제어 가능
   - 특정 요구사항에 맞는 맞춤형 설정 가능

3. **AWS 생태계 통합**
   - S3, RDS, Lambda 등 AWS 서비스와의 원활한 통합

## 아키텍처 개요 

배포 파이프라인은 다음과 같이 구성됩니다:

- **CodeCommit**: 소스 코드 관리
- **CodePipeline**: 코드 변경 감지 및 빌드 트리거
- **CodeBuild**: Docker 이미지 빌드 및 ECR 푸시
- **ECS**: ECR 이미지 변경 감지 후 자동 배포
- **CloudFront**: 정적 콘텐츠 캐싱 및 URL 라우팅

## 고려했던 대안: AWS Amplify

더 간단한 방법으로 AWS Amplify를 사용할 수도 있습니다. Amplify는 클릭 몇 번으로 Next.js 애플리케이션을 배포할 수 있어 초기 설정이 매우 간단합니다.

하지만 다음 이유로 Amplify 대신 ECS 기반 아키텍처를 선택했습니다:

1. **VPC 내부망 접근 제한**
   - Amplify는 VPC 내부 리소스에 직접 접근하는 기능이 제한적입니다
   - 내부 데이터베이스나 API와의 통합이 복잡합니다

2. **비용 효율성**
   - 해당 프로젝트는 프론트엔드보다 API 로직이 더 많습니다
   - API 중심 워크로드의 경우 Amplify보다 ECS나 App Runner가 더 경제적입니다
   - 트래픽이 증가할수록 비용 차이가 커집니다

3. **커스터마이징 요구사항**
   - Docker 기반 배포로 특정 런타임 환경이나 라이브러리 설치가 필요할 때 유연합니다
   - 인프라 레벨의 세밀한 제어가 가능합니다

## 고려했던 대안: AWS App Runner

AWS App Runner도 고려했지만, 다음 이유로 선택하지 않았습니다:

- **리전 제한**: App Runner는 현재 도쿄 리전에만 제공되며 서울 리전은 지원하지 않습니다
- **리전 일관성**: 다른 AWS 서비스들을 서울 리전에서 운영 중이므로, 리전을 통일하여 지연 시간과 데이터 전송 비용을 최적화하고자 했습니다

## 주요 구현 단계

### 1. Docker 이미지 준비

Next.js 애플리케이션을 Docker 이미지로 빌드합니다. `Dockerfile`에서 프로덕션 빌드 및 실행 설정을 구성합니다.

#### CodeBuild buildspec.yml 설정

CodeBuild에서 사용하는 `buildspec.yml` 파일 예시입니다. 이 파일은 Docker 이미지를 빌드하고 환경별(dev, stg, prd) ECR에 푸시하는 역할을 합니다.

**주요 기능:**
- `DEPLOYMENT_ENV` 환경 변수에 따라 배포 환경을 제어합니다
- 개발 환경: 기본적으로 dev ECR에만 푸시
- 스테이징 환경: dev, stg ECR에 푸시
- 프로덕션 환경: dev, stg, prd ECR에 모두 푸시
- ECS 서비스 자동 배포 트리거

```yml
version: 0.2

env:
  variables:
    IMAGE_REPO_NAME: "pet-web"
    IMAGE_TAG: "latest"
    AWS_DEFAULT_REGION: "ap-northeast-2"
    # 운영 환경 설정
    PROD_ACCOUNT_ID: "--"
    PROD_REGION: "ap-northeast-2"
    # STG 환경 설정
    STG_ACCOUNT_ID: "--"
    STG_REGION: "ap-northeast-2"

phases:
  pre_build:
    commands:
      - DEPLOYMENT_ENV=${DEPLOYMENT_ENV:-"development"}
      - echo "DEPLOYMENT_ENV = $DEPLOYMENT_ENV"
      - ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
      - ECR_URI=$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_URI
      - echo Logged in to Amazon ECR
      
      # 운영 환경 ECR 로그인
      - PROD_ECR_URI=$PROD_ACCOUNT_ID.dkr.ecr.$PROD_REGION.amazonaws.com/$IMAGE_REPO_NAME
      - aws ecr get-login-password --region $PROD_REGION | docker login --username AWS --password-stdin $PROD_ECR_URI
      - echo Logged in to Production ECR
      
      # STG 환경 ECR 로그인
      - STG_ECR_URI=$STG_ACCOUNT_ID.dkr.ecr.$STG_REGION.amazonaws.com/$IMAGE_REPO_NAME
      - aws ecr get-login-password --region $STG_REGION | docker login --username AWS --password-stdin $STG_ECR_URI
      - echo Logged in to STG ECR

  build:
    commands:
      - set -e
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $ECR_URI:$IMAGE_TAG .
      - echo Build completed on `date`

  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image to development ECR...
      - docker push $ECR_URI:$IMAGE_TAG
      - printf '{"ImageURI":"%s"}' $ECR_URI:$IMAGE_TAG > imageDetail.json
      - |
        if [ "$DEPLOYMENT_ENV" = "staging" ]; then
          echo "=== main branch: pushing to STG ECR ==="
          docker tag $ECR_URI:$IMAGE_TAG $STG_ECR_URI:$IMAGE_TAG
          docker push $STG_ECR_URI:$IMAGE_TAG
          echo "Successfully pushed to STG ECR!"
        elif [ "$DEPLOYMENT_ENV" = "production" ]; then
          echo "=== Production: pushing to STG ECR ==="
          docker tag $ECR_URI:$IMAGE_TAG $STG_ECR_URI:$IMAGE_TAG
          docker push $STG_ECR_URI:$IMAGE_TAG
          echo "Successfully pushed to STG ECR!"

          echo "=== Production: pushing to Production ECR ==="
          docker tag $ECR_URI:$IMAGE_TAG $PROD_ECR_URI:$IMAGE_TAG
          docker push $PROD_ECR_URI:$IMAGE_TAG
          echo "Successfully pushed to Production ECR!"
        else
          echo "Not main branch (DEPLOYMENT_ENV=$DEPLOYMENT_ENV): skipping STG/PROD push."
        fi
      
      # ECS 자동 배포
      - echo Starting ECS deployment...
      - aws ecs update-service --cluster pet-web-cluster --service pet-web-task-service --force-new-deployment --region $AWS_DEFAULT_REGION
      - aws ecs wait services-stable --cluster pet-web-cluster --services pet-web-task-service --region $AWS_DEFAULT_REGION
      - echo ECS deployment completed successfully!

artifacts:
  files:
    - imageDetail.json
```

### 2. ECR 리포지토리 생성

환경별로 Docker 이미지를 저장할 ECR 리포지토리를 생성합니다.

**생성해야 할 리포지토리:**
- 개발 환경: `pet-web` (또는 `pet-web-dev`)
- 스테이징 환경: 별도 AWS 계정의 `pet-web` (STG_ACCOUNT_ID)
- 프로덕션 환경: 별도 AWS 계정의 `pet-web` (PROD_ACCOUNT_ID)

각 리포지토리는 해당 환경의 ECS 클러스터에서 이미지를 가져와 사용합니다.

### 3. ECS 클러스터 및 서비스 설정

**클러스터 구성:**
- ECS Fargate를 사용하여 서버리스 컨테이너 실행 환경을 구성합니다
- 환경별로 별도의 클러스터를 생성하거나, 동일 클러스터 내에서 서비스로 분리할 수 있습니다

**태스크 정의:**
- CPU, 메모리 리소스 할당 설정
- 환경 변수 및 Secrets Manager 연동
- ECR 이미지 URI 지정

**서비스 설정:**
- 자동 스케일링 정책 구성 (CPU/메모리 사용률 기반)
- 로드 밸런서(ALB) 연결
- 헬스 체크 설정

### 4. CI/CD 파이프라인 구축

#### CodePipeline 설정
- CodeCommit에 코드 푸시 시 CodePipeline이 자동으로 트리거됩니다
- CodeBuild에서 Docker 이미지 빌드 및 ECR 푸시가 실행됩니다
- ECS 서비스가 새 이미지 감지 후 자동 배포됩니다

#### 환경별 배포 전략 (dev, stg, prd)

다중 환경을 관리하기 위한 구조:

1. **CodePipeline 분리**
   - 환경별로 별도의 CodePipeline을 생성합니다
   - 예시:
     - `pet-web-dev`: dev 브랜치 감지
     - `pet-web-stg`: stg 브랜치 감지
     - `pet-web`: main 브랜치 감지 (프로덕션)

2. **CodeBuild 환경 변수 설정**
   - 각 CodePipeline에서 CodeBuild 실행 시 `DEPLOYMENT_ENV` 환경 변수를 설정합니다
   - 예시:
     - dev 파이프라인: `DEPLOYMENT_ENV=development`
     - stg 파이프라인: `DEPLOYMENT_ENV=staging`
     - prd 파이프라인: `DEPLOYMENT_ENV=production`

3. **buildspec.yml 환경 분기**
   - `DEPLOYMENT_ENV` 값에 따라 배포 대상 ECR이 결정됩니다
   - development: dev ECR에만 푸시
   - staging: dev + stg ECR에 푸시
   - production: dev + stg + prd ECR에 모두 푸시 

### 5. CloudFront 설정

**오리진 설정:**
- ECS ALB(Application Load Balancer)를 오리진으로 설정합니다
- ALB는 ECS 서비스의 여러 태스크에 트래픽을 분산합니다

**캐싱 정책:**
- 정적 콘텐츠(`/_next/static`, 이미지 등)에 대한 캐싱 정책 구성
- 동적 콘텐츠(API 라우트 등)는 캐싱하지 않도록 설정

**보안 및 도메인:**
- HTTPS 리다이렉트 설정 (HTTP → HTTPS)
- ACM(Amazon Certificate Manager)을 통한 SSL/TLS 인증서 설정
- 커스텀 도메인 연결

## 주의사항

- **비용 관리**: ECS Fargate는 사용한 만큼 과금되므로 모니터링이 필요합니다
- **배포 시간**: Docker 이미지 빌드 및 배포에 시간이 소요될 수 있습니다
- **환경 변수 관리**: Secrets Manager나 Parameter Store를 활용하여 민감한 정보를 안전하게 관리합니다
- **로깅**: CloudWatch Logs를 통해 애플리케이션 로그를 중앙 집중식으로 관리합니다


<TagLinks />

<Comment />
