---
title: Sequelize table join 예시
meta:
  - name: description
    content: Sequelize table join 예시, node.js, express, mysql, table join, outer join, inner join, 중첩 테이블 쿼리 정의
  - property: og:title
    content: Sequelize table join 예시, node.js, express, mysql, table join, outer join, inner join, 중첩 테이블 쿼리 정의
  - property: og:description
    content: Sequelize table join 예시, node.js, express, mysql, table join, outer join, inner join, 중첩 테이블 쿼리 정의
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sequelize/sequelize-join/
---

# Sequelize table join 예시

mysql에서 쿼리문으로 join을 하면 쿼리문이 상당히 길어집니다. 그래서 express로 ORM으로 Sequelize를 사용합니다.

sequelize에서 mysql의 join과 같은 기능을 하는 것은 `include`입니다.

그래서 오늘은 `include` 사용함으로 inner join 하는 법과 outer join을 하는 법에 대해 알아보겠습니다!

## inner/outer join이란?

inner join은 조인이 되는 키 값을 기준으로 교집합 (null 값을 포함하지 않습니다.) 만약 join을 하는 테이블이 이 null 이면 에러

outer join은 조인이 되는 키 값을 기준 테이블 key 집합 (null 값을 포함), join하는 테이블의 값이 없어도 상관 없습니다.

그래서 join을 당한 table의 row가 null이 될 경우는 outer join을 해야합니다.

## 예시 설명

landing이라는 table은 company 테이블의 pk를 fk로 가집니다.

그리고 landingImage라는 table은 landing 테이블의 pk를 fk로 가집니다.

landingButtons라는 table은 landingImage 테이블의 pk를 fk로 가집니다. landingButtons은 landingImage에 있을수도 없을수도 있습니다. (이때 outer join을 써야겠죠)

즉, `company -< landing -< landingImage -< landimgButton` 이런 테이블 구조를 가지고 있습니다.

그리고 프론트에서 landing의 id를 기반으로 landing list를 전달해주는 예시를 할 것입니다.

## include

### model

먼저 모델을 정의합니다. 위에서 설명한 대로 1:n 구조로 associate 시킵니다.

```js
// model/index.js
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.companies = require("./company.model.js")(sequelize, Sequelize);
db.landings = require("./landing.model.js")(sequelize, Sequelize);
db.landingImages = require("./landingImage.model.js")(sequelize, Sequelize);
db.landingButtons = require("./landingButton.model.js")(sequelize, Sequelize);

// companies : landings -> 1:N
db.companies.hasMany(db.landings, { as: "landings" });
db.landings.belongsTo(db.companies, {
  foreignKey: "companyId",
  as: "companies"
});

// landings : landingImages -> 1:N
db.landings.hasMany(db.landingImages, { as: "landingImages" });
db.landingImages.belongsTo(db.landings, {
  foreignKey: "landingUuid",
  as: "landings"
});

// landingImages : landingButtons -> 1:N
db.landingImages.hasMany(db.landingButtons, { as: "landingButtons" });
db.landingButtons.belongsTo(db.landingImages, {
  foreignKey: "landingImageId",
  as: "landingImages"
});

module.exports = db;
```

### controller

모델 정의 완료하고 컨트롤러 정의합니다.

```js {8,17,19}
// constroller
const db = require("../models");
const Company = db.companies;
const Landing = db.landings;
const LandingImage = db.landingImages;
const LandingButton = db.landingButtons;

// landing은 company와 landingImage가 pk, fk 관계가 있기 때문에 include를 통해서 table join 시킵니다.
exports.getLandings = async (req, res) => {
  try {
    const company = await Landing.findAll({
      include: [
        { model: Company, as: "companies", attributes: ["name"] },
        {
          model: LandingImage,
          as: "landingImages",
          // landing은 landingButtons과는 아무런 관계가 없습니다. 하지만 landingButtons는 landingImages와 관계가 있기 때문에 중첩모델 쿼리를 작성합니다.
          include: [
            // LandingButton은 optional 하기 때문에 outer join을 해야합니다. 이때 쓰는 것이 required: false를 지정합니다.
            { model: LandingButton, as: "landingButtons", required: false }
          ]
        }
      ],
      attributes: { exclude: ["companyId"] }
    });
    res.send(company);
  } catch (e) {
    res.status(430).send(e);
  }
};
```

<TagLinks />

<Comment />
