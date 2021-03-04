---
title: antd 번들 사이즈 줄이기
meta:
  - name: description
    content: react - antd 번들 사이즈 줄이기, ant design, bundle size
  - property: og:title
    content: react - antd 번들 사이즈 줄이기
  - property: og:description
    content: react - antd 번들 사이즈 줄이기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/a-tag-trap/
tags: ["react", "antd-mobile"]
---

# antd 번들 사이즈 줄이기

antd, antd-mobile, element-ui 등등 라이브러리를 많이 사용합니다<br>
사용방법은 `import { List } from 'antd-mobile';` 이런 방법으로 손쉽게 사용할 것입니다.<br>
위처럼 사용하시다보면 아래와 같은 `warning`을 발견할 수 있습니다.

## 원인

```
You are using a whole package of antd-mobile,
please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

- 말 그대로 **전체 번들을 가져오고 있으니, 필요한 것만 추려서 가져다 써라** 이런 뜻입니다.
- 그렇다면 해결해봅시다.

## babel-plugin-import 설치

```
npm install babel-plugin-import --save-dev
```

## .babelic 설정

```json
{
  "presets": ["@babel/preset-env"],
  // 아래와 같이 위에 설치한 라이브러리를 플러그인으로 넣어줍니다.
  // libraryDirectory 값이 import로 불러올 변수가 됩니다.
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "lib" }, "ant"],
    [
      "import",
      { "libraryName": "antd-mobile", "libraryDirectory": "lib" },
      "antd-mobile"
    ]
  ]
}
```

## 사용

```jsx
// 이렇게 사용하던 것을
import { List, Button } from "antd-mobile";

// 이렇게 사용하면 됩니다.
import List from "antd-mobile/lib/list";
import Button from "antd-mobile/lib/list";
```

- 한줄로 하던 것을 두줄, 세줄로 나오니 불편한 면이 있지만, 번들 사이즈를 현저히 줄일 수 있으므로 하나씩 필요한 것만 부르는 것이 더욱 시스템에 유리합니다.

<TagLinks />

<Comment />
