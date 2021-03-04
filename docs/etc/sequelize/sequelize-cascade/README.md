---
title: Sequelize 1:N delete cascade 예시
meta:
  - name: description
    content: Sequelize 1:N delete cascade 예시, node.js, express, mysql,  delete multiple association, cascade
  - property: og:title
    content: Sequelize 1:N delete cascade 예시, node.js, express, mysql,  delete multiple association, cascade
  - property: og:description
    content: Sequelize 1:N delete cascade 예시, node.js, express, mysql,  delete multiple association, cascade
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sequelize/sequelize-cascade/
---

# Sequelize 1:N delete cascade 예시

오늘은 1:N 관계에서 부모 1이 지워지면 자식 N도 모두 지워지는 cascade에 대해 알아보겠습니다

## cascade

1:N 관계로 이루어진 테이블에서 '생성'의 경우는 각각 테이블에 연결하여 생성하면 아무런 문제가 없지만 1의 관계에 있는 테이블 row가 삭제되는 경우 문제가 발생합니다.

1의 테이블 row가 삭제될 경우 1의 테이블을 FK로 가진 N테이블의 row도 전부 삭제되어야 합니다. 그러나 실제로는 FK 컬럼이 null로 바뀔 뿐 N 테이블의 row는 그대로 유지 되기 때문입니다.

그래서 위와 같은 작업을 하려면 users(1) posts(n) 테이블이 있고, board는 user_id를 FK로 가진다고 가정한다면 users의 id 1번이 삭제된다면 user_id가 1로 FK를 가지고 있는 board의 row를 모두 찾아 삭제 해야 하는 상황입니다.

지금은 쉽게 하나의 관계만 보았지만 부모의 자식의 자손관계 까지 내려갔을 때, 부모가 삭제되면 자식, 자손 모두 삭제되어야 한다는 개념으로 본다면 생각보다 많은 개발 리소스가 투입됩니다.

그래서! **sequelize에서는 cascade를 옵션으로 제공합니다!!**

결론만 말씀드리면 cascade 옵션을 설정할 후 **부모 테이블의 row를 제거하면 부모를 FK로 가진 자식 그리고 자식을 FK로 가지고 있는 자손 즉, 부모와 연결된 모든 테이블의 row는 자동으로 삭제됩니다!**

## 사용 예시

1:N 관계를 설정하고 옵션 값으로 cascade를 넣는 방법, 그리고 1의 관계에 있는 row를 지워보는 방법까지 진행해보겠습니다.

## 프로젝트 구조

| 프로젝트 구조                  |
| :----------------------------- |
| **/src**                       |
| **ㅣㅡ app**                   |
| **ㅣㅡ /config**               |
| **ㅣㅡㅡ /db.config.js**       |
| **ㅣㅡ /controllers**          |
| **ㅣㅡㅡ /user.controller.js** |
| **ㅣㅡ /modules**              |
| **ㅣㅡㅡ /index.js**           |
| **ㅣㅡㅡ /user.model.js**      |
| **ㅣㅡㅡ /post.model.js**      |
| **ㅣㅡ /routes**               |
| **ㅣㅡㅡ /user.routes.js**     |
| **ㅣㅡ package.json**          |
| **ㅣㅡ server.js**             |

## 초기 설치

원하는 위치에서 폴더를 만듭니다.

```
$ mkdir cascade-example
$ cd cascade-example
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

## Sequelize 모델 정의

```js
// modules/user.model.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  return User;
};

// modules/post.model.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  return Post;
};
```

## Sequelize 초기화 및 관계(1:N) 설정

이곳에서 1:N 관계 설정 및 cascade를 적용합니다.

sequelize 및 다른 docs에서는 cascade는 하위(N)의 관계 옵션에 넣어줘야 한다고 합니다. 여러번 시도 결과 hasMany와 belongTo 모두에 cascade를 옵션으로 넣어줬을 때 정상동작 하여 아래와 같이 코딩하였습니다. 혹시 N의 관계에 cascade를 넣어서 정상 작동하면 N의 관계에만 cascade 옵션을 넣으시면 되겠습니다!

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

db.users = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);

db.users.hasMany(db.posts, {
  as: "posts",
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true
});
db.posts.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
  onDelete: "cascade",
  hooks: true
});

module.exports = db;
```

## user, post 추가 컨트롤러

```js
// controllers/user.controller.js
const db = require("../models");

exports.createUser = async (req, res) => {
  try {
    const user = await db.users.create({
      name: req.body.name
    });
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.createPost = async (req, res) => {
  const { id } = req.params; // user_id
  try {
    const post = await db.post.create({
      userId: id,
      name: req.body.name
    });
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
};
```

## 1:N 관계에서 1 테이블 row 삭제 컨트롤러

- 위와 같이 cascade 옵션을 설정한 이후, 아래와 같이 user id를 넣어 user를 삭제하면 user_id를 FK로 연결된 post는 모두 사라지는 것을 db 상으로 볼 수 있습니다!!

```js
// controllers/user.controller.js
const db = require("../models");

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await db.users.destroy({ where: { id } });
    res.send({ message: "success" });
  } catch (e) {
    res.status(500).send(e);
  }
};
```

<TagLinks />

<Comment />
