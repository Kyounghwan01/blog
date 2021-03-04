---
title: window - yarn FullyQualifiedErrorId :UnauthorizedAccess
meta:
  - name: description
    content: window - yarn FullyQualifiedErrorId :UnauthorizedAccess
  - property: og:title
    content: window - yarn FullyQualifiedErrorId :UnauthorizedAccess
  - property: og:description
    content: window - yarn FullyQualifiedErrorId :UnauthorizedAccess
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/terminal-alias/
tags: ["settings"]
---

# window - yarn FullyQualifiedErrorId :UnauthorizedAccess 오류

window에서 npm 설치 이후 yarn을 설치하고, 파워쉘 또는 cmd에서 `yarn` 명령어를 쳤을 떄 나오는 에러를 해결해봅니다.

애러는 아래와 같습니다

```
yarn : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\xxx/xxx/xx\yarn.ps1 파일을 로드할 수 없습니다. 자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오. 위치 줄:1 문자:1 + yarn -v + ~~~~ + CategoryInfo : 보안 오류: (:) [], PSSecurityException + FullyQualifiedErrorId : UnauthorizedAccess
```

## fix

1. 권리자 권한으로 파워쉘 실행합니다.
2. 파워쉘에 `ExecutionPolicy` 명령어를 쳐봅니다.
3. `Restricted`라고 뜬다면 보안 정책 위번으로 `yarn` 뿐만 아니라 다른 글로벌 명령어도 모두 같은 에러로 실행이 되지 않습니다.
4. 해결하기 위해 파워쉘에 `Set-ExecutionPolicy Unrestricted`를 실행합니다.
5. `Unrestricted`라 콘솔에 찍혔다면 파워쉘을 끄고, 다시 켠 후 `yarn`을 실행합니다.

<TagLinks />

<Comment />
