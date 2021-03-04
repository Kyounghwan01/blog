---
title: Multer, sequelize를 이용하여 이미지 업로드 하기
meta:
  - name: description
    content: Multer, sequelize를 이용하여 이미지 업로드 하기, node.js, express, mysql, react, blob, buffer
  - property: og:title
    content: Multer, sequelize를 이용하여 이미지 업로드 하기, node.js, express, mysql, react, blob, buffer
  - property: og:description
    content: Multer, sequelize를 이용하여 이미지 업로드 하기, node.js, express, mysql, react, blob, buffer
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sequelize/sequelize-multer/
---

# Multer, sequelize를 이용하여 이미지 업로드 하기

이미지 및 다른 멀티파트 데이터를 sequelize와 express에 업로드 하는 방법에 대해 알아보겠습니다~

업로드를 할때는 `Multer`라는 미들웨어를 사용합니다. 바로 예시로 달려봅시다!!

## 프로젝트 구조

| 프로젝트 구조               |
| :-------------------------- |
| **/src**                    |
| **ㅣㅡ app**                |
| **ㅣㅡ /config**            |
| **ㅣㅡㅡ /db.config.js**    |
| **ㅣㅡ /middleware**        |
| **ㅣㅡㅡ /upload.js**       |
| **ㅣㅡ /modules**           |
| **ㅣㅡㅡ /index.js**        |
| **ㅣㅡㅡ /image.model.js**  |
| **ㅣㅡ /routes**            |
| **ㅣㅡㅡ /image.routes.js** |
| **ㅣㅡ package.json**       |
| **ㅣㅡ server.js**          |

- `db.config.js`는 MYSQL 연결 및 Sequelize 구성을 위한 설정 파일입니다.
- `server.js`는 CORS를 구성하고, Express를 초기화 및 Sequelize 연결, 서버 연결을 담당합니다.
- `models`에서는 MYSQL 테이블 구성을 담당합니다.
- `routes`는 front에서 접근할 경로를 정의합니다. (컨트롤러를 포함하였습니다)
- `middleware`는 route에서 중간 경유하여 데이터 처리를 할때 사용합니다.

## 초기 설치

원하는 위치에서 폴더를 만듭니다.

```
$ mkdir express-mysql-multer-example
$ cd express-mysql-multer-example
```

package.json 사용을 위해 npm 초기화 합니다. `npm init`를 입력한 이후 계속 enter 쳐줍니다

프로젝트 진행을 위해 dependencies를 설치합니다

```
npm install express sequelize mysql2 body-parser cors multer fs --save

```

## express 웹 서버 추가

아래와 같이 코딩 이후 터미널에서 `node server.js`를 실행하고 `localhost:8080`에 접속하여 `{ message: "this is express server" }`가 출력되는지 확인합니다

```js
// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/image.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
```

## MYSQL config 데이터 구성

```js
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "xxxxx",
  DB: "test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

## Sequelize 초기화

```js
// modules/index.js
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.images = require("./image.model.js")(sequelize, Sequelize);

module.exports = db;
```

## Sequelize 모델 정의

간단하게 이미지 path 저장하는 스키마 정의합니다.

```js
// modules/image.model.js
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "image",
    {
      path: {
        // 우리는 프론트에서 보내준 이미지를 Blob 타입으로 변환하여 서버에 저장합니다.
        type: DataTypes.BLOB("long"),
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false
    }
  );

  return Image;
};
```

## middleware 정의

이부분이 이번 포스팅의 하이라이트입니다. multer를 사용하여 서버에 image를 저장합니다.

```js
const multer = require("multer");

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 서버에 저장될 위치
    cb(null, __basedir + "/app/static/assets/");
  },
  filename: (req, file, cb) => {
    // 서버에 저장될 때 파일 이름
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
  // 프론트에서 넘겨울 params key 값, 오른쪽 같이 넘겨줘야함-> {photo: binary}
  "photo"
);
module.exports = uploadFile;
```

## routes 정의

위에서 만든 미들웨어를 사용하여 이미지를 서버에 처리하고 나온 path를 db에 저장합니다.

```js
// routes/image.routes.js
module.exports = app => {
  const db = require("../models");
  const Image = db.images;
  const upload = require("../middleware/upload");
  const fs = require("fs");
  const multer = require("multer");

  var router = require("express").Router();

  router.post("/upload", upload, async (req, res, next) => {
    try {
      // blob형태를 base64로 변환
      const imgData = fs
        .readFileSync(`app${req.file.path.split("app")[1]}`)
        .toString("base64");

      // db에 path 저장
      await Image.create({ path: imgData });

      res.json({ path: imgData });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

  app.use("/api/", router);
};
```

- 미들웨어 적용 안하는 코드

```js
// routes/image.routes.js
module.exports = app => {
  const db = require("../models");
  const Image = db.images;
  const upload = require("../middleware/upload");
  const fs = require("fs");

  var router = require("express").Router();

  const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  };

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "/app/static/assets/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    }
  });

  var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
    "photo"
  );

  router.post("/upload", async (req, res) => {
    uploadFile(req, res, function(err) {
      // 여기가 진행될 때는 이미 이미지가 서버에 올라간 상황
      try {
        const imgData = fs.readFileSync(`app${req.file.path.split("app")[1]}`).toString("base64");

        // db에 path 저장
        await Image.create({ path: imgData });

        res.json({ path: imgData });
      } catch (e) {
        res.status(400).json({ message: err.message });
      }
    });
  });

  router.get('/', async (req, res) => {
    try {
      const images = await Image.findAll();
      res.send(images);
    } catch (e) {
      res.status(400).json({ message: err.message });
    }
  });

  app.use("/api/", router);
};
```

## front에서 server로 이미지 올리는 법

[React 이미지 올리기 & 압축](https://kyounghwan01.github.io/blog/React/image-upload/)이 포스팅 참조하시면 어떻게 데이터를 가공하여 서버로 넘겨야되는지 자세히 나와있습니다!!

## server에서 img받아 front에서 보여주기

```js
import React, { useState } from "react";

export default function Test() {
  const [image, setImage] = useState("");

  const testFunc = async () => {
    const res = await axios.get("http://localhost:8080/");
    let buff = new Buffer(res.data.images[0], "base64");
    let text = buff.toString("ascii");
    setImage(`data:image/png;base64,${text}`);
  };

  return <img src={image} />;
}
```

<TagLinks />

<Comment />
