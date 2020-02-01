# vuePress

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
    nav: [
      { text: "Github", link: "https://github.com/Kyounghwan01" },
    ],
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

## 페이지 구성
--- 작업중