---
title: vuePress 사용법
meta:
  - name: description
    content: vuePress 사용법
  - property: og:title
    content: vuePress 사용법
  - property: og:description
    content: vuePress 사용법, 이미지 추가, 빌드, 깃헙 배포, 코드 강조
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-start/
tags: ["vuepress"]
---

# vuePress 사용법

## 시작하기

오늘은 vue에서 만든 정적 웹사이트인 vuepress로 블로그를 만든 경험을 토대로 vuepress 사이트를 만드는 방법에 대해 알아보겠습니다.
여기에 없는 세부정보는 [vuepress 공식사이트](https://vuepress.vuejs.org/guide/) 를 참고 해주세요.

## 설치

1. vuepress blog를 만들 깃헙 리포지토리를 생성 후, 리포지토리를 클론합니다.

```sh
$ git clone '리포지토리 클론 주소'

//주소 이동
$ cd '리포지토리 클론 주소'
```

2. vuepress 모듈을 설치 및 npm 초기 설정 합니다.

```sh
$ npm init -y
$ npm install -D vuepress
```

3. `package.json` 의 `scripts` 부분을 아래와 같이 수정합니다.

```json
{
  ...
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  ...
}
```

4. package.json과 같은 뎁스에 `docs`라는 폴더를 만들어주고 <br>하위로 `README.md`를 만들어준후 아래 내용을 추가합니다.

```md
# vuepress til
```

5. package.json과 같은 뎁스에 `deploy.sh`를 만들고 아래 내용을 붙여넣습니다.<br>
   **맨 밑 깃헙 주소 넣는 부분은 꼭 본인의 주소와 레포 이름을 넣어주세요.**

```sh
#!/usr/bin/env sh

# abort on errors
set -e

git pull
git add -A
git commit -m "$1 $2 $3 --all.sh master"
git push origin master

# build
npm run docs:build
# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy with vuepress'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

6. 터미널에서 `docs`로 들어간 후 `yarn docs:dev` 또는 `npm docs:dev` 를 통해 만든 md 파일이 나오면 일단 페이지 렌더링은 성공입니다.

7. 렌더링이 성공했다면 이번엔 깃헙에 올려봅시다.<br>
   위처럼 `yarn docs:dev`를 했다면 `docs` 하위로 `.vuepress`가 생성됩니다. <br>그안에 `config.js`를 만든 후 아래 내용을 붙여 넣어줍니다.<br>
   **코드 안에 중요 부분 유의해주세요**

```js
module.exports = {
  title: "title",
  description: "desc",
  themeConfig: {
    nav: [{ text: "Github", link: "https://github.com/Kyounghwan01" }],
    sidebar: getSidebarArr()
  },
  //가장 중요한 부분!
  //<username>.github.io 뒤에 주소가 붙으시면
  //아래와 같이 뒤 붙는 주소를 넣어주셔야합니다.
  //안그러면 css 가 반영이 안되요!! 꼭꼭 넣어주세요
  base: "/blog/"
};

function getSidebarArr() {
  var fs = require("fs");
  var docsPath = __dirname + "/../";
  var sidebarArr = [];
  var HomeFilelist = [];
  var filelist = fs.readdirSync(docsPath);
  filelist.forEach(function(file) {
    if (file === ".vuepress") return;
    var stat = fs.lstatSync(docsPath + "/" + file);
    if (stat.isDirectory()) {
      // directory
      // title is file, children is readdirSync
      var docsFolderPath = docsPath + "/" + file;
      var list = fs.readdirSync(docsFolderPath);
      sidebarArr.push(makeSidebarObject(file, list));
    } else {
      // NOT directory
      // title is '/' children is file
      HomeFilelist.push(file);
    }
  });
  sidebarArr.unshift(makeSidebarObject("", HomeFilelist));
  return sidebarArr;
}
function makeSidebarObject(folder, mdfileList) {
  var path = folder ? "/" + folder + "/" : "/";
  mdfileList = aheadOfReadme(mdfileList);
  var tmpMdfileList = [];
  // remove .md, add Path
  mdfileList.forEach(function(mdfile) {
    if (mdfile.substr(-3) === ".md") {
      mdfile = mdfile.slice(0, -3) === "README" ? "" : mdfile.slice(0, -3);
      tmpMdfileList.push(path + mdfile);
    }
  });
  mdfileList = tmpMdfileList;
  // remove folder prefix number
  if (folder) {
    var dotIdx = folder.indexOf(".");
    var title = Number(folder.substr(0, dotIdx))
      ? folder.substr(dotIdx + 1)
      : folder;
  } else {
    title = "HOME";
  }
  return {
    title: title,
    children: mdfileList
  };
}
function aheadOfReadme(arr) {
  // ['1.test.md','README.md'] => ['README.md','1.test.md']
  var readmeIdx = arr.indexOf("README.md");
  if (readmeIdx > 0) {
    arr.unshift(arr.splice(readmeIdx, 1)[0]);
  }
  return arr;
}
```

8. 터미널에서 프로젝트 폴더 위치에서 `sh deploy.sh` 실행하여 깃헙에 배포합니다.<br> 대략 3~5분 안에 `https://<USERNAME>.github.io/<REPO>` 접속하시면 올리신 vuepress가 렌더됩니다.

## 코드 하이라이트

포스팅 작업 중, 코드를 쓰고, 특정 코드를 강조하고 싶은 일이 있습니다.
이럴때, `js {이부분}` 에 코드 강조할 **줄**을 넣어줍니다.
만약 여러줄을 강조할 경우 `js {2,4,10-11}` 이렇게 작성합니다.

```js {2,4,10-11}
function highlightTest() {
  console.log("나를 강조해!");
}
highlightTest();

const users = [
  { name: "nkh", age: 28 },
  { name: "kkk", age: 33 }
];
const onlyName = users.map(({ name }) => name);
const onlyAge = users.map(({ age }) => age);
```

## 포스팅 내 이미지 추가

포스팅내 외부 링크를 추가할 때는 `[네이버](https://naver.com)` 이런식으로 가져옵니다.
이미지 추가 문법은 링크 추가와 비슷합니다. 다른점은 맨앞에 **!**를 넣어주는 것입니다.

`![CSS 로딩 에러](../.vuepress/public/images/css-loading-error.png)`

vuepress에서 배포를 위해 `build`명령을 실행하면, docs에 있는 파일들은 웹팩에 의해 빌드 파일로 전환됩니다.
그래서 포스팅을 쓰는 md파일에 이미지를 넣어봤자, 이미지는 보이지 않습니다.
그러나 docs중 유일하게 번들링 되지 않는 곳은 `.vuepress/public/` 이 파일 부분입니다.
그래서 ga의 ga-xxxx.html 파일도 이곳에 넣어주면 아무런 영향을 받지 않고 정상 작동할 수 있었죠.
이미지도 마찬가지입니다.
구분을 위해 `.vuepress/public/images` 폴더를 만들고 그 안에 이미지를 넣어줍니다.

`![recruit-type](https://user-images.githubusercontent.com/44187477/97069109-b78db900-1608-11eb-812f-4f2eb11aac56.jpg)`

위처럼 작성하면 아래와 같은 이미지가 삽입됩니다!

![recruit-type](https://user-images.githubusercontent.com/44187477/97069109-b78db900-1608-11eb-812f-4f2eb11aac56.jpg)

<TagLinks />

<Comment />
