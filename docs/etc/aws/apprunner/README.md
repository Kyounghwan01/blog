---
title: apprunner 사용법
meta:
  - name: description
    content: apprunner 사용법
  - property: og:title
    content: apprunner 사용법
  - property: og:description
    content: apprunner 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/apprunner/
tags: ["aws"]
---

# apprunner 사용법

## App Runner 설정 가이드

App Runner는 AWS에서 제공하는 완전 관리형 컨테이너 애플리케이션 서비스입니다. 소스 코드나 컨테이너 이미지에서 자동으로 애플리케이션을 빌드하고 배포합니다.

<iframe src="/blog/apprunner.pdf" width="100%" height="800px" style="border: 1px solid #ccc;"></iframe>

## App Runner 개요

App Runner는 컨테이너 기반 애플리케이션을 쉽게 배포하고 운영할 수 있는 완전 관리형 서비스입니다. ECR 이미지를 기반으로 자동 스케일링, 로드 밸런싱, 모니터링을 제공합니다.

## ⚠️ 중요: 사전 요구사항

**CodeBuild와 ECR 설정이 먼저 선행되어야 합니다!**

App Runner를 사용하기 전에 다음이 완료되어 있어야 합니다:
1. CodeBuild 프로젝트 설정 완료
2. ECR 리포지토리 생성 완료
3. CodeBuild를 통해 ECR에 이미지 푸시 완료

## Next.js Standalone 설정으로 인한 포트 설정

### 왜 필요한가?

**Standalone 모드 사용 이유:**
- 이미지 크기가 크게 줄어듭니다
- 배포 시간이 단축됩니다
- 불필요한 파일이 제외되어 효율적입니다

**포트 설정이 필요한 이유:**
- Standalone 모드를 사용하면 자동 포트 변경이 작동하지 않습니다
- App Runner는 기본적으로 포트 8080을 사용합니다
- 명시적으로 포트를 지정해야 합니다

### 1. App Runner 환경 변수 설정

**설정 경로:**
- App Runner → 배포 요소 선택 → 구성 → 편집 버튼 클릭
- 서비스 구성 → 환경 변수 섹션

**필요한 환경 변수:**
- `PORT`: `8080`
- `HOSTNAME`: `0.0.0.0`
- `NODE_ENV`: `production`

### 2. server.js 파일 생성

프로젝트 루트에 `server.js` 파일을 생성합니다:

```javascript
/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT, 10) || 8080
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

**주요 설정:**
- `hostname`: `0.0.0.0`으로 설정하여 모든 네트워크 인터페이스에서 수신
- `port`: 환경 변수 `PORT`에서 읽거나 기본값 8080 사용
- 에러 핸들링 및 로깅 포함

### 3. apprunner.yml 파일 설정

프로젝트 루트에 `apprunner.yml` 파일을 생성합니다:

```yaml
version: 1.0
runtime: nodejs20
build:
  commands:
    build:
      - npm ci --cache .npm --prefer-offline
      - npm run build
run:
  runtime-version: 20
  command: node server.js
  network:
    port: 8080
  env:
    - name: PORT
      value: "8080"
    - name: HOSTNAME
      value: "0.0.0.0"
    - name: NODE_ENV
      value: "production"
```

**설정 설명:**
- `runtime`: Node.js 20 사용
- `build.commands`: 빌드 명령어 (npm ci, npm run build)
- `run.command`: 실행 명령어 (`node server.js`)
- `run.network.port`: 포트 8080 지정
- `run.env`: 환경 변수 설정

### 4. next.config.js 설정

Next.js 설정 파일에 standalone 모드 활성화:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ... 기타 설정
}

module.exports = nextConfig
```

## App Runner 서비스 생성

### 1. 소스 선택
- ECR 리포지토리 선택
- 이미지 태그 지정 (예: `latest`)

### 2. 서비스 설정
- 서비스 이름 입력
- CPU 및 메모리 설정
- 자동 스케일링 설정

### 3. 배포 설정
- 자동 배포 활성화 (ECR 이미지 업데이트 시 자동 배포)
- 수동 배포도 가능

## 주요 기능

### 자동 스케일링
- 트래픽에 따라 자동으로 인스턴스 수 조정
- 최소/최대 인스턴스 수 설정 가능

### 로드 밸런싱
- 자동으로 트래픽 분산
- 고가용성 보장

### 모니터링
- CloudWatch와 통합
- 로그 및 메트릭 자동 수집

## 비용

- 인스턴스 시간당 요금
- 데이터 전송 비용
- 사용한 만큼만 과금 (온디맨드)

## 참고사항

- App Runner는 현재 도쿄 리전(ap-northeast-1)에서만 제공됩니다
- 서울 리전이 필요한 경우 ECS나 다른 서비스를 고려해야 합니다
- ECR 이미지가 업데이트되면 자동으로 새 배포가 트리거됩니다
- 환경 변수는 서비스 구성에서 관리할 수 있습니다
- Custom domain 연결이 가능합니다


<TagLinks />

<Comment />
