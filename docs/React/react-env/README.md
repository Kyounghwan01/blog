---
title: 환경변수 설정
meta:
  - name: description
    content: react 환경변수 설정, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, env, react env undefined, react env not working, next
  - property: og:title
    content: react 환경변수 설정
  - property: og:description
    content: react 환경변수 설정, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback, env, react env undefined, react env not working, next
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-env/
tags: ["react"]
---

# 환경변수 설정

보안에 치명적일 수 있는 데이터는 git에 올리지 않고 env라는 파일로 환경변수를 만들어 배포한 사이트에 변수를 설정하도록 합니다.

이 글에서는 local에서 작업할 때 react 내에서 env로 어떻게 환경변수로 접근하는지 알아보겠습니다!

아마 이 글을 보러 오신분들 대부분 `REACT_APP_XXX is undefined`이런 에러를 보았기 때문에 오셨을텐데요,

다른 포스팅에서는 `import dotenv from "dotenv` 이것을 하면 잘된다고 하는데 저의 경우 `Can't resolve 'fs' when bundle with webpack` 이런 에러가 뜨면서 더 진행이 안되었습니다. 그래서 아래와 같은 방법으로 해결하였습니다.

<TagLinks />

<Comment />
