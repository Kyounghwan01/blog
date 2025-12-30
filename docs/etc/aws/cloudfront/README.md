---
title: cloudfront 사용법
meta:
  - name: description
    content: cloudfront 사용법
  - property: og:title
    content: cloudfront 사용법
  - property: og:description
    content: cloudfront 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/cloudfront/
tags: ["aws"]
---

# cloudfront 사용법

## CloudFront 설정 가이드

CloudFront는 AWS의 글로벌 콘텐츠 전송 네트워크(CDN) 서비스입니다. 전 세계 엣지 로케이션을 통해 콘텐츠를 빠르고 안전하게 전달합니다.

<iframe src="/blog/cloudfront.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## CloudFront 사용 이유

### 1. 전 세계 속도 향상 (CDN)
- 전 세계 엣지 로케이션에서 콘텐츠 제공
- 사용자에게 가장 가까운 엣지에서 응답
- 지연 시간 감소, 로딩 속도 향상

### 2. 서버 부하 감소
- 정적 파일(이미지, CSS, JS)을 엣지에서 제공
- Origin 서버로의 요청 감소
- 비용 절감 및 확장성 향상

### 3. 보안 강화
- DDoS 보호
- SSL/TLS 인증서 관리
- AWS WAF 통합 가능

### 4. 비용 절감
- 데이터 전송 비용 절감
- Origin 서버 트래픽 감소

## 아키텍처 구조

```
사용자
  ↓
CloudFront (예: dvxdhr3817qmv.cloudfront.net)
  ↓
Origin 서버 (ALB, App Runner, S3 등)
  ↓
애플리케이션
```

## 주요 설정

### ⚠️ 중요 설정 사항

**배포 시 주의사항:**
- 배포 → 해당 row 선택 → 동작 → 편집

**캐시 정책:**
- **중요**: 기본 동작의 캐시 정책은 **CachingDisabled**로 설정
- Next.js 동적 콘텐츠가 정상 처리되도록 보장

**Origin 설정:**
- **중요**: Origin 편집 → 프로토콜은 **HTTP만** 사용
- HTTPS는 CloudFront에서 처리

### 1. Origin 설정

**Origin Domain**
- ALB: `pet-web-alb-780775480.ap-northeast-2.elb.amazonaws.com`
- App Runner: `jdw92camnm.ap-northeast-1.awsapprunner.com`
- S3 버킷 등

**프로토콜**
- HTTP만 사용 (포트 80)
- HTTPS는 CloudFront에서 처리

**Origin Shield (선택사항)**
- 중복 요청 통합으로 Origin 비용 절감
- 성능 최적화 및 Origin 부하 감소
- 월 약 5달러 비용으로 월 20-35달러 절약 가능

### 2. Origin Request Policy

**Managed-AllViewerExceptHostHeader**
- Host 헤더 제거, CloudFront가 자동으로 Origin 도메인 사용
- App Runner/ALB가 올바른 Host 헤더를 받도록 보장

### 3. Cache Policy

**기본 동작 (Default Behavior)**
- **Managed-CachingDisabled**: 모든 요청을 Origin으로 전달
- Next.js의 동적 콘텐츠가 정상 처리되도록 보장

**정적 파일 캐싱 (추가 Behavior)**
정적 파일에 대해서는 별도의 Behavior를 생성하여 캐싱:

1. **Path Pattern**: `/_next/static/*`
   - Cache Policy: `CachingOptimized`

2. **Path Pattern**: `*.js`
   - Cache Policy: `CachingOptimized`

3. **Path Pattern**: `*.css`
   - Cache Policy: `CachingOptimized`

4. **Path Pattern**: `*.png`
   - Cache Policy: `CachingOptimized`

5. **Path Pattern**: `*.jpg`
   - Cache Policy: `CachingOptimized`

6. **Path Pattern**: `*.svg`
   - Cache Policy: `CachingOptimized`

### 4. Viewer Protocol Policy

- **Redirect HTTP to HTTPS**: HTTP를 HTTPS로 리다이렉트
- 보안 강화

### 5. 배포 타입

**⚠️ 중요**: CloudFront에서 웹 배포할 때
- Basic이 아니라 **Premium**으로 변경해야 배포 가능

## Origin Shield 장점

### 1. 비용 절감
- App Runner 서버 부하 57% 감소 → 월 20-35달러 절약
- Origin Shield 비용 월 5달러 vs 절약 효과 월 30달러

### 2. 성능 향상
- 웹사이트 로딩 56% 빨라짐
- 사용자가 체감할 정도로 확실히 빨라짐

### 3. 서버 안정성
- 트래픽 몰려도 Origin 서버 안정성 유지
- 갑작스런 접속자 증가해도 버팀

### 4. 설정 간편
- 클릭 몇 번이면 설정 완료
- 바로 효과 나타남

**결론**: 월 5달러 내고 월 30달러 절약하면서 웹사이트 2배 빨라지는 효과

## 504 Gateway Timeout 에러 해결

**에러 메시지:**
```
504 Gateway Timeout ERROR
The request could not be satisfied.
We can't connect to the server for this app or website at this time.
```

**해결 방법:**

1. **Origin 설정 확인**
   - CloudFront → 배포 → Origin 편집
   - Origin domain이 올바른지 확인
   - 프로토콜이 HTTP만 사용되는지 확인

2. **Origin 서버 상태 확인**
   - ALB/App Runner가 정상 작동하는지 확인
   - 헬스 체크 상태 확인

3. **Origin Request Policy 확인**
   - Host 헤더가 올바르게 전달되는지 확인

## 현재 설정 요약

### App Runner를 Origin으로 사용하는 경우

**Origin 설정:**
- Origin domain: `xxxx.awsapprunner.com`
- Protocol: HTTPS only
- Port: 443

**정책:**
- Origin Request Policy: `Managed-AllViewerExceptHostHeader`
- Cache Policy: `Managed-CachingDisabled` (기본 동작)
- Viewer Protocol Policy: Redirect HTTP to HTTPS

### ALB를 Origin으로 사용하는 경우

**Origin 설정:**
- Origin domain: `xxxx.elb.amazonaws.com`
- Protocol: HTTP only
- Port: 80

**정책:**
- Origin Request Policy: `Managed-AllViewerExceptHostHeader`
- Cache Policy: `Managed-CachingDisabled` (기본 동작)
- Viewer Protocol Policy: Redirect HTTP to HTTPS

## 향후 개선 가능한 부분

1. **선택적 캐싱**
   - 정적 파일(`/_next/static/**`, `/images/**`)만 캐싱
   - 동적 콘텐츠는 Origin으로 전달
   - 성능과 최신성의 균형

2. **캐시 무효화**
   - 배포 후 특정 경로의 캐시 무효화
   - 즉시 업데이트 반영

3. **압축 활성화**
   - Gzip/Brotli 압축으로 전송량 감소
   - 로딩 속도 향상

## 참고사항

- CloudFront는 전 세계 사용자에게 빠른 콘텐츠 전달을 제공합니다
- Origin 서버 부하를 크게 감소시킵니다
- SSL/TLS 인증서를 자동으로 관리합니다
- 커스텀 도메인 연결이 가능합니다
- 현재 설정은 동적 콘텐츠를 위해 기본 동작에서 캐싱을 비활성화하고 있습니다


<TagLinks />

<Comment />
