---
title: Sequelize pagenation 예시
meta:
  - name: description
    content: Sequelize pagenation 예시, node.js, express, mysql
  - property: og:title
    content: Sequelize pagenation 예시, node.js, express, mysql
  - property: og:description
    content: Sequelize pagenation 예시, node.js, express, mysql
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sequelize/sequelize-pagenation/
---

# Sequelize pagenation 예시

sequelize로 페이지네이션을 할 경우 sequelize에서 제공하는 `limit`와 `offset`를 이용하면 손쉽게 구현할 수 있습니다.

```js
let pageNum = req.query.page; // 요청 페이지 넘버
let offset = 0;

if (pageNum > 1) {
  offset = 10 * (pageNum - 1);
}

post.findAll({
  // pagination
  offset: offset,
  limit: 10
});
```

return 되는 요소의 숫자 (total count) 까지 알고 싶을 때는 `findAndCountAll`를 사용합니다.

```js
User.findAndCountAll({
  include: [{ model: Profile, where: { active: true } }],
  limit: 3
});
```

## 종합

```js
let limit = 10;
let offset = 0 + (req.body.page - 1) * limit;
Posts.findAndCountAll({
  offset: offset,
  limit: limit,
  order: [["date", "ASC"]]
})
  .then(async result => {
    return res.status(200).json({
      status: true,
      message: res.__("success"),
      innerData: result
    });
  })
  .catch(err => {
    return validator.InvalidResponse(res, `${err}`);
  });
```

## 에러

Sequelize findAndCountAll 사용시 count가 배열 length만큼 카운팅되지 않고 더 많이 카운팅 되는 현상

- Wrong count query for findAndCountAll with include #7225 검색

```js
const landingList = await Landing.findAndCountAll({
  include: {
    model: db.companies,
    as: "companies",
    attributes: ["name"]
  },
  // 아래 distinct: true를 추가하면 연결된 테이블로 인해 count가 바뀌는 현상을 박을 수 있다.
  distinct: true,
  limit,
  offset
});
```

<TagLinks />

<Comment />
