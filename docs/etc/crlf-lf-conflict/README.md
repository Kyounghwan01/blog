---
title: 이유 없이 conflict이 날때 (crlf-lf)
meta:
  - name: description
    content: 이유 없이 conflict이 날때 (crlf-lf), Why should I have conflict after push
  - property: og:title
    content: 이유 없이 conflict이 날때 (crlf-lf)
  - property: og:description
    content: 이유 없이 conflict이 날때 (crlf-lf)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/crlf-lf-conflict/
---

# 이유 없이 conflict이 날때 (crlf-lf)

window로 os를 바꾸면서 mac 쓰는 개발자간 이유 없이 컨플릭이 나기 시작했습니다.

신기한 것은 상대방은 해당 파일을 고친 적이 없었습니다. 그런데 파일의 전체가 다시 덮여있는 모습을 보이고 있었습니다.

열심히 구글링하면서 결국 해결하였습니다.

## 원인

**crlf와 lf의 차이로 인한 충돌**

window는 기본적으로 crlf가 default이고 맥, 리눅스는 lf가 default입니다.

crlf와 lf가 만나면 conflict가 일어나는데 , 코드상 다른 부분이 없고, 전체 코드가 같은 코드로 덮여버리기 때문에 왜 conlict이 일어나는지 알기 힘듭니다.

그래서 팀에서 os가 많은 쪽으로 crlf 또는 lf로 통일 시켜주면 됩니다.

프로젝트의 root 레벨에 아래와 같은 코드를 붙여주면 되는데, 아래 예시의 경우 crlf로 코드를 푸시하면 git에서 자동으로 lf로 바꿔줍니다.

이렇게 작업을 해놓으면 crlf와 lf 차이로 원인 불명의 conflict가 나는것을 막을 수 있습니다.

## fix

```jsx
// src/.gitattributes
*.js    eol=lf
*.jsx   eol=lf
*.ts    eol=lf
*.tsx   eol=lf
*.json  eol=lf
*.html  eol=lf
*.css   eol=lf
*.scss  eol=lf
```

<TagLinks />

<Comment />
