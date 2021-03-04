---
title: Node.js + Express + MySQL + Sequelize example
meta:
  - name: description
    content: Node.js + Express + MySQL + Sequelize example
  - property: og:title
    content: Node.js + Express + MySQL + Sequelize example
  - property: og:description
    content: Node.js + Express + MySQL + Sequelize example
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sequelize/sequelize-basic-example/
---

# Node.js + Express + MySQL + Sequelize example

이 포스팅에서는 Node.js + Express + MySQL + Sequelize를 사용하여 간단한 CRUD를 예시로 알아보겠습니다! 구현 이후에는 postman을 이용하여 직접 호출하는 것 까지 해보겠습니다

## 프로젝트 구조

| 프로젝트 구조                      |
| :--------------------------------- |
| **/src**                           |
| **ㅣㅡ app**                       |
| **ㅣㅡ /config**                   |
| **ㅣㅡㅡ /db.config.js**           |
| **ㅣㅡ /controllers**              |
| **ㅣㅡㅡ /tutorial.controller.js** |
| **ㅣㅡ /modules**                  |
| **ㅣㅡㅡ /index.js**               |
| **ㅣㅡㅡ /tutorial.model.js**      |
| **ㅣㅡ /routes**                   |
| **ㅣㅡㅡ /tutorial.routes.js**     |
| **ㅣㅡ package.json**              |
| **ㅣㅡ server.js**                 |

- `db.config.js`는 MYSQL 연결 및 Sequelize 구성을 위한 설정 파일입니다.
- `server.js`는 CORS를 구성하고, Express를 초기화 및 Sequelize 연결, 서버 연결을 담당합니다.
- `models`에서는 MYSQL 테이블 구성을 담당합니다.
- `controllers`에서는 모든 crud 작업을 처리합니다.
- `routes`는 front에서 접근할 경로를 정의합니다.

## 초기 설치

원하는 위치에서 폴더를 만듭니다.

```
$ mkdir express-mysql-example
$ cd express-mysql-example
```

package.json 사용을 위해 npm 초기화 합니다. `npm init`를 입력한 이후 계속 enter 쳐줍니다

프로젝트 진행을 위해 dependencies를 설치합니다

```
npm install express sequelize mysql2 body-parser cors --save

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
// 개발 중에는 기존 테이블을 삭제하고 데이터베이스를 다시 동기화해야 할 수 있습니다. force: true다음 코드로 사용
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
```

- `Express`가 웹서버를 구축합니다
- `body-parser`가 request를 구분하고 `req.body` 객체를 생성합니다.
- `cors`는 서버에 연결하고자 하는 front의 주소와 연결을 허용해줍니다.

## MYSQL config 데이터 구성

```js
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "xxxxx", // mysql 초기 설정한 비밀번호
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

처음 5 개의 매개 변수는 MySQL 연결 용입니다.
pool선택 사항이며 Sequelize 연결 풀 구성에 사용됩니다.

- max: 풀의 최대 연결 수
- min: 풀의 최소 연결 수
- idle: 연결이 해제되기 전에 유휴 상태 일 수있는 최대 시간 (밀리 초)
- acquire: 오류가 발생하기 전에 해당 풀이 연결을 시도하는 최대 시간 (밀리 초)

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
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
```

## Sequelize 모델 정의

```js
// modules/tutorial.model.js
module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};
```

## controller 정의

```js
// controllers/tutorial.controller.js
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
```

## routes 정의

```js
// routes/tutorial.routes.js
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
```

## API 테스트

`node server.js`를 실행하여 서버를 실행합니다.

### post

```
POST -> `http://localhost:8080/api/tutorials`
body -> {"title": "title 1", "description": "desc 1"}
```

생성 확인합니다.

### get

```
GET -> `http://localhost:8080/api/tutorials`
```

위에서 만든 `{"title": "title 1", "description": "desc 1"}` 출력 확인합니다.

### 개별 get

```
GET -> `http://localhost:8080/api/tutorials/1`
```

위에서 만든 `{"title": "title 1", "description": "desc 1"}` 출력 확인합니다.

### delete

```
delete -> `http://localhost:8080/api/tutorials/1`
```

<TagLinks />

<Comment />
