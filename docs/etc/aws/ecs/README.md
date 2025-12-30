---
title: ecs 사용법
meta:
  - name: description
    content: ecs 사용법
  - property: og:title
    content: ecs 사용법
  - property: og:description
    content: ecs 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/ecs/
tags: ["aws"]
---

# ecs 사용법

## ECS 설정 가이드

ECS(Elastic Container Service)는 AWS에서 제공하는 완전 관리형 컨테이너 오케스트레이션 서비스입니다. Docker 컨테이너를 실행하고 관리하여 확장 가능한 애플리케이션을 배포할 수 있습니다.

<iframe src="/blog/ecsinitsetting.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## ECS 서비스와 ALB 연결

ECS 서비스를 생성할 때 EC2에서 생성한 ALB와 VPC 네트워킹을 연결하는 과정입니다.

<iframe src="/blog/ecs.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## ECS 개요

ECS는 Docker 컨테이너를 실행하고 관리하는 서비스로, 다음 구성 요소로 이루어져 있습니다:

- **클러스터**: 컨테이너를 실행하는 논리적 그룹
- **태스크 정의**: 컨테이너 실행 방법을 정의하는 청사진
- **서비스**: 태스크를 지속적으로 실행하고 관리
- **태스크**: 실행 중인 컨테이너 인스턴스

## ⚠️ 중요: 사전 요구사항

**AWS CLI 명령어는 로컬 개발 환경에서 실행합니다. Next.js 프로젝트 내에서 실행하는 것이 아닙니다.**

ECS 설정 전에 다음이 완료되어 있어야 합니다:
1. CodeBuild 프로젝트 설정 완료
2. ECR 리포지토리 생성 완료
3. CodeBuild를 통해 ECR에 이미지 푸시 완료
4. ALB 및 대상 그룹 생성 완료 (EC2 ALB 가이드 참조)

## 1단계: ECS 클러스터 생성

### 방법 1: AWS 콘솔에서 생성 (추천 - 초보자용)

**1. AWS 콘솔 접속**
- AWS 콘솔에 로그인
- 리전을 `ap-northeast-2` (서울)로 설정

**2. ECS 서비스로 이동**
- 서비스 검색에서 "ECS" 입력
- "Elastic Container Service" 클릭

**3. 클러스터 생성**
- 좌측 메뉴에서 "클러스터" 클릭
- "클러스터 생성" 버튼 클릭
- 클러스터 이름: `pet-web-cluster` (또는 원하는 이름)
- 인프라: **AWS Fargate (서버리스)** 선택
- "생성" 버튼 클릭

**완료 확인:**
- 클러스터 상태가 "활성"이 될 때까지 대기 (약 1-2분)

## 2단계: Task Definition 생성

Task Definition은 컨테이너가 어떻게 실행될지 정의하는 청사진입니다.

### AWS 콘솔에서 Task Definition 생성

**1. ECS 콘솔에서 Task Definition으로 이동**
- 좌측 메뉴에서 "태스크 정의" 클릭
- "새 태스크 정의 생성" 버튼 클릭

**2. 기본 구성**
- 태스크 정의 패밀리: `pet-web-task` (또는 원하는 이름)
- 시작 유형: **AWS Fargate** 선택
- 운영 체제/아키텍처: **Linux/X86_64**
- CPU: 0.5 vCPU (512 단위) - 필요에 따라 조정
- 메모리: 1 GB (1024 MiB) - 필요에 따라 조정

**3. 컨테이너 정의**
- 컨테이너 이름: `nextjs-container`
- 이미지 URI: `YOUR_ACCOUNT_ID.dkr.ecr.ap-northeast-2.amazonaws.com/YOUR_ECR_REPO_NAME:latest`

**ECR 이미지 URI 확인 방법:**
```bash
aws ecr describe-repositories --region ap-northeast-2
```

**4. 포트 매핑**
- 컨테이너 포트: **8080** (Next.js 애플리케이션 포트)
- 프로토콜: **TCP**
- 포트 이름: `nextjs-port` (선택사항)

**5. 환경 변수**
- `NODE_ENV` = `production`
- `PORT` = `8080`
- `HOSTNAME` = `0.0.0.0`

**6. 로그 구성**
- 로그 드라이버: **awslogs**
- awslogs-group: `/ecs/pet-web-task` (CloudWatch Logs 그룹)
- awslogs-region: `ap-northeast-2`
- awslogs-stream-prefix: `ecs`

**7. 헬스 체크 (선택사항, 나중에 설정 가능)**
- 명령어: `CMD-SHELL, curl -f http://localhost:8080/api/health || exit 1`
- 간격: 30초
- 제한 시간: 5초
- 재시도 횟수: 3

**8. 검토 및 생성**
- 모든 설정 확인 후 "생성" 클릭

## 3단계: Application Load Balancer (ALB) 생성

ECS 서비스에 트래픽을 분산시키기 위해 로드 밸런서가 필요합니다.

**참고:** ALB 생성은 EC2 콘솔에서 수행합니다. 자세한 내용은 [EC2 ALB 가이드](/etc/aws/ec2/)를 참조하세요.

**주요 설정 요약:**
- 로드 밸런서 이름: `pet-web-alb`
- 체계: 인터넷 경계 (Internet-facing)
- IP 주소 유형: IPv4
- VPC: 기본 VPC 또는 사용할 VPC 선택
- 가용 영역: 최소 2개 이상 선택
- 대상 그룹: `pet-web-tg` 생성
  - 프로토콜: HTTP
  - 포트: 8080 (Next.js 컨테이너 포트)
  - 상태 확인 경로: `/` 또는 `/api/health`

## 4단계: ECS 서비스 생성

ECS 서비스는 Task Definition을 기반으로 컨테이너를 실행하고 ALB와 연결합니다.

### AWS ECS 콘솔에서 서비스 생성

**1. ECS 콘솔로 이동**
- AWS 콘솔에서 "ECS" 검색
- 클러스터 → `pet-web-cluster` 클릭

**2. 서비스 생성**
- 서비스 탭에서 "생성" 버튼 클릭

**3. 환경 구성**
- 컴퓨팅 옵션: 시작 유형 선택
- 시작 유형: **FARGATE** 선택
- 플랫폼 버전: **LATEST** (기본값)

**4. 배포 구성**
- 애플리케이션 유형: **서비스** 선택
- Task Definition:
  - 패밀리: `pet-web-task` 선택
  - 리비전: **1 (LATEST)** 선택

**5. 서비스 구성**
- 서비스 이름: `pet-web-task-service`
- 원하는 작업 수: **2** (고가용성을 위해 최소 2개 권장)

**6. 네트워킹**
- VPC: 기본 VPC (자동 선택됨) 또는 사용할 VPC 선택
- 서브넷:
  - `ap-northeast-2a` 서브넷 선택
  - `ap-northeast-2b` 서브넷 선택 (ALB와 동일한 가용 영역)
- 보안 그룹: "새 보안 그룹 생성" 또는 기존 보안 그룹 선택
  - 보안 그룹 이름: `pet-web-ecs-sg`
  - 인바운드 규칙:
    - 유형: 사용자 지정 TCP
    - 포트: 8080
    - 소스: ALB 보안 그룹 (`pet-web-alb-sg`) 선택
- 퍼블릭 IP: 활성화됨 (인터넷 접근용)

**7. 로드 밸런싱**
- 로드 밸런서 유형: **Application Load Balancer** 선택
- 기존 로드 밸런서 사용: 선택
- 로드 밸런서: `pet-web-alb` 선택
- 리스너: **HTTP:80** 선택
- 대상 그룹: `pet-web-tg` 선택

**8. 서비스 자동 크기 조정 (선택사항)**
- 지금은 사용 안 함 선택 (나중에 설정 가능)

**9. 태그 (선택사항)**
- 키: `Name`, 값: `pet-web-task-service`
- 키: `Environment`, 값: `production` (또는 `staging`, `dev`)

**10. 검토 및 생성**
- 모든 설정 확인
- "생성" 클릭

### 서비스 배포 확인

**배포 상태 확인:**
- 서비스 상태: **ACTIVE**
- 실행 중인 작업 수: 설정한 작업 수와 일치
- 대상 그룹 상태: 모든 태스크가 **healthy** 상태

**확인 방법:**
1. ECS 콘솔 → 클러스터 → 서비스 → 작업 탭
2. EC2 콘솔 → 대상 그룹 → 대상 탭에서 상태 확인

## ECS 서비스와 ALB 연결 과정 상세

### 네트워킹 연결의 중요성

ECS 서비스를 생성할 때 ALB와 VPC 네트워킹을 올바르게 연결해야 합니다.

**연결 과정:**

1. **서브넷 선택**
   - ALB가 사용하는 서브넷과 동일한 가용 영역의 서브넷 선택
   - 최소 2개 이상의 가용 영역 선택 (고가용성)

2. **보안 그룹 설정**
   - ECS 태스크의 보안 그룹은 ALB 보안 그룹에서 오는 트래픽만 허용
   - 인바운드 규칙: ALB 보안 그룹 → 포트 8080 (컨테이너 포트)

3. **대상 그룹 연결**
   - ECS 서비스가 태스크를 자동으로 대상 그룹에 등록
   - ALB가 대상 그룹의 태스크로 트래픽 라우팅

### 자동 등록 메커니즘

**ECS의 자동 등록 기능:**
- 새 태스크가 시작되면 자동으로 대상 그룹에 등록
- 태스크가 종료되면 자동으로 대상 그룹에서 제거
- 헬스 체크 실패 시 자동으로 재시작
- 수동 작업 불필요

**동작 흐름:**
```
1. ECS 서비스가 새 태스크 시작
   ↓
2. 태스크가 실행되면 ALB 대상 그룹에 자동 등록
   ↓
3. ALB가 헬스 체크 수행
   ↓
4. 정상 태스크는 트래픽 수신 시작
   ↓
5. 비정상 태스크는 트래픽에서 제외 및 재시작
```

## IAM 권한 설정

### ECS 자동 배포를 위한 권한

ECS 서비스가 ALB와 대상 그룹을 자동으로 관리하려면 적절한 IAM 권한이 필요합니다.

**필요한 권한:**
- `elasticloadbalancing:RegisterTargets`
- `elasticloadbalancing:DeregisterTargets`
- `elasticloadbalancing:DescribeTargetHealth`
- `elasticloadbalancing:DescribeLoadBalancers`

**ECS 작업 실행 역할에 권한 추가:**
1. IAM 콘솔 접속
2. ECS 작업 실행 역할 선택 (예: `ecsTaskExecutionRole`)
3. 권한 추가 → AWS 관리형 정책 또는 인라인 정책 추가

## 참고사항

- ECS 클러스터는 리전별로 생성되며, 리전 간 이동 불가
- Task Definition은 생성 후 수정 불가 (새 리비전 생성 필요)
- 서비스의 네트워크 설정은 생성 후 변경 가능하지만 주의 필요
- Fargate는 사용한 만큼 과금됩니다 (CPU, 메모리, 실행 시간 기준)
- CloudWatch Logs를 통해 애플리케이션 로그 확인 가능
- ALB와 연동하여 고가용성 및 자동 스케일링 구현 가능

### ECS + ALB 아키텍처 흐름

```
사용자 요청
    ↓
CloudFront (CDN)
    ↓
ALB (Application Load Balancer)
    ├─ 헬스 체크 수행
    ├─ SSL/TLS 종료
    └─ 트래픽 분산
    ↓
대상 그룹 (Target Group)
    ├─ 태스크 1 (10.0.1.100:8080) ✓ 정상
    ├─ 태스크 2 (10.0.1.101:8080) ✓ 정상
    └─ 태스크 3 (10.0.1.102:8080) ✗ 비정상 (트래픽 제외)
    ↓
ECS 태스크 (Next.js 애플리케이션)
```

**참고:** ALB 및 대상 그룹 생성에 대한 자세한 내용은 [EC2 ALB 가이드](/etc/aws/ec2/)를 참조하세요.


<TagLinks />

<Comment />
