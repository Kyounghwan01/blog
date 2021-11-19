---
title: git push access error 해결법
meta:
  - name: description
    content: No anonymous write access. Authentication failed for 'https://github.com/Kyounghwan01/blog.git/'
  - property: og:title
    content: No anonymous write access. Authentication failed for 'https://github.com/Kyounghwan01/blog.git/'
  - property: og:description
    content: No anonymous write access. Authentication failed for 'https://github.com/Kyounghwan01/blog.git/', git, github, issue, projects, milestone
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/git/git-push-error/
tags: ["git"]
---

# remote: No anonymous write access. fatal: Authentication failed for 'https://github.com/xxx/xxx.git/'

## 원인

- Remote(github)의 이메일이 바뀌었거나, 패스워드가 바뀌었거나, 해당 리포지토리의 access token이 사라지거나 바뀌는 경우들 중 하나입니다.
- Remote Auth 정보가 바뀌었으니 Local Auth 정보도 바뀌어야합니다.

## 해결

- email이나 username이 바뀐 경우라면 아래와 같이 해결하세요.

```bash
git config --global user.name Kyounghwan01
git config --global user.email noh5524@gmail.com

git push
```

- 위 방법으로 해결이 안되거나 token이 변경된 경우라면 아래와 같이 해결하세요.

1. `https://github.com/settings/tokens` 이곳에서 token을 새로 발급하고(타이틀은 마음대로, 권한에 push는 당연히 추가합니다.) `ghp_xxxxxxxxx` 이 값을 복사해줍니다.

2. 터미널에서 아래와 같이 입력합니다.

```bash
git remote set-url origin https://`ghp_xxxxxxxxx`@github.com/`username`/`git주소`.git

git push
```

<TagLinks />

<Comment />
