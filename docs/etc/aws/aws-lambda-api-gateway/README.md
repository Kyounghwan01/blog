---
title: aws lambda + api gateway로 서버 없이 백엔드 구축하기
meta:
  - name: description
    content: aws lambda + api gateway로 서버 없이 백엔드 구축하기
  - property: og:title
    content: aws lambda + api gateway로 서버 없이 백엔드 구축하기
  - property: og:description
    content: aws lambda + api gateway로 서버 없이 백엔드 구축하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/aws/aws-lambda-api-gateway/
tags: ["aws"]
---

# Lambda + api-gateway

재정관리 toy프로젝트를 위해서는 서버 구축이 필요합니다. 그러나 따로 node.js로 서버를 구축하는 백엔드 작업까지는 원하지 않아 간단하게 서버를 구축하는 방법을 검색하는 도중 `AWS`의 `lambda`와 `api gateway`를 통해 손쉽게 서버를 구축하게 되어 기록을 남깁니다.<br><br>
기본 원리는 검색하거나, aws에 친절히 설명되어 있으니 생략하고, 서버 구축한 방법으로 바로 들어가겠습니다.

## Lambda

**1.lamba 기본 함수 만들기**

1. aws 람다에 접속하여 기본 함수를 만듭니다.
2. 기본정보 > 함수 이름 : 원하는 프로젝트명, run time : 사용할 언어선택 (node.js)
3. 함수 생성 클릭

**2. 기본 함수 내에서 직접 사용할 함수 만들기**

함수 코드 내에서 작동할 코드를 작성합니다.
**`handler` 파라미터 설명**

- `event` : query, header, body 같이 사용자가 적접적으로 보는 부분

  - `event.pathParameters`: api가 user/:id라면 :id 값이 들어온다.
  - `event.headers`: client에서 header에 넣은 파라미터 담김
  - `event.body`: client에서 body에 넣은 파라미터 담김

- `callback`: 함수가 마무리 되어 client로 정보를 보내는 곳

```js
export.handler = (event, context, callback) => {
  //node 10버전 이후로는 context로 인하여 함수가 중지되지 않아 502 에러가 뜬다.
  //그렇기에 아래 구문을 실행하고, callback으로 함수를 중단한다.
  context.callbackWaitsForEmptyEventLoop = false;

  //api gateway에서 CORS 활성화 버튼을 누르면 cors가 열리나
  //모든 브라우저에 대해 cors를 열면 해달 기능이 작동하지 않는다.
  //그러므로 백엔드 코드 header에 cors를 열어주어야 한다.
  const corsHeader = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  };

  callback(null, {'header': corsHeader,
  'statusCode': 200,
  'body': JSON.stringify(data)
  })
}

```

**3. 환경변수**
몽고디비 혹 다른 디비를 사용할 경우 해당 디비 값을 읽어와야하는데, 그때 이곳에서 디비 값을 읽는다.<br>
키 벨류 값으로 구성되며, 해당 키값은 `함수 코드` 작성하는 곳에서 `process.env.키`로 불러 올 수 있다.

**4. module 불러오기**
만약 몽고디비를 쓴다면 몽구스를 쓴다. 그런데 람다 내에는 몽구스 모듈이 없기에 함수내에 몽구스를 불러올 수 없다. 그럴때, `계층` 탭에서 인위적으로 node_module를 받아 알집으로 넣어준다.<br><br>

1. `aws lambda` 메인 화면으로 가 `계층` 탭을 누른다.
2. 계층 생성
3. 이름에 넣을 모듈 이름을 넣고 zip파일 (4번 설명) 을 넣어준다.<br>
   :::warning 중요
   `호환 런타임`은 lamba 만들때 넣은 런타임 버전, 언어와 동일 해야함..
   :::
4. zip 파일

- 임의로 파일을 만든후 `npm init`으로 `package.json`만들고 그 안에 `yarn add mongoose`로 `node_modules`를 만든후 만들어진 3파일(package.json, package.lock.json, node_modules)를 압축한다.

5. 생성 클릭
6. `aws lambda 함수` 탭으로 이동 후, `Layers`클릭하여 3번에 넣은 이름을 클릭하여 반영한 후, save 버튼 클릭.

## api gateway

- 위 lambda에서 만든 함수를 api로 연결하는 곳입니다.

1. 작업 > 리소스 생성 > 리소스 경로, 리소스 이름 작성
2. 작업 > 메서드 생성 > 원하는 CRUD 클릭 > 체크 > Lambda 함수 - 만든 함수 이름
   :::warning 중요
   Lambda 프록시 통합 사용 : 꼭!!!! 체크해주세요. 안하시면 함수가 기능 못합니다.
   :::
3. `GET`의 `:id` 같은 일부만 가져올때

- 만든 리소스 내에서 > 리소스 생성 > 상단 `프록시 리소스로 구성` 체크 > 리소스 이름, 리소스 경로 : `{proxy +}`로 작성 하단 `API Gateway CORS 활성화` 체크

## CRUD 예제

- `lambda`로 만든 crud 예제 코드입니다.

```js
"use strict";
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

/* Board 오브젝트를 정의합니다. */

const boardSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  content: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  registreDate: { type: String, required: true },
  history: [
    {
      date: {
        type: String
      },
      price: {
        type: Number
      },
      memo: {
        type: String
      },
      staff: {
        type: String
      },
      count: {
        type: Number
      }
    }
  ]
});

/* 하나의 연결 객체를 반복적으로 사용합니다. */

//connection 함수 정의
let connection = null;

const connect = () => {
  if (connection && mongoose.connection.readyState === 1)
    return Promise.resolve(connection);
  //연결되있으면 connection에 연결 정보 날림
  return mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(conn => {
      connection = conn;
      return connection;
    });
};

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const corsHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
  };

  let operation = event.httpMethod;
  let Board = mongoose.model("board", boardSchema);
  let proxy, password;
  switch (operation) {
    case "GET":
      /* 경로: /board 설명: 전체 게시글 정보를 불러옵니다. */

      if (event.pathParameters === null) {
        let query = {};
        if (event.queryStringParameters !== null) {
          //이름이나, 내용으로 검색
          if (event.queryStringParameters.name) {
            query.name = {
              $regex: event.queryStringParameters.name,
              $options: "i"
            };
          }
          if (event.queryStringParameters.content) {
            query.content = {
              $regex: event.queryStringParameters.content,
              $option: "i"
            };
          }
        }
        // name과 content를 이용하여 검색한 결과를 내림차순으로 반환합니다.
        connect().then(() =>
          Board.find(query)
            .select("-password")
            .sort({ id: -1 })
            .exec(function(error, boards) {
              if (error) {
                callback(null, {
                  headers: corsHeader,
                  statusCode: 500,
                  body: JSON.stringify(error)
                });
              } else {
                callback(null, {
                  headers: corsHeader,
                  statusCode: 200,
                  body: JSON.stringify(boards)
                });
              }
            })
        );
      } else {
        /* 경로: /board/:id 설명: 특정 게시글 정보를 불러옵니다. */
        //proxy이름으로 id 값 건너옴
        proxy = event.pathParameters.proxy;
        connect().then(() =>
          Board.findOne({ id: proxy })
            .select("-password")
            .exec(function(err, board) {
              if (err) {
                callback(null, {
                  statusCode: 500,
                  body: JSON.stringify(err),
                  headers: corsHeader
                });
              } else if (!board) {
                callback(null, {
                  statusCode: 500,
                  body: JSON.stringify("Board not found."),
                  headers: corsHeader
                });
              } else {
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify(board),
                  headers: corsHeader
                });
              }
            })
        );
      }
      break;

    case "POST":
      let lastId = 0;
      // 가장 최근에 작성된 게시물 번호를 가져옵니다.
      //connect() 를 기반으로 찾고 지우고 포스트하고 모든 것을 한다, .sort({id: -1})으로 가장 마지막에 있는 게시물 정보 가져옴
      connect().then(() =>
        Board.findOne({})
          .sort({ id: -1 })
          .exec(function(err, board) {
            if (err) {
              callback(null, {
                statusCode: 500,
                body: err,
                headers: corsHeader
              });
            } else {
              lastId = board ? board.id : 0;
              const {
                name,
                content,
                password,
                address,
                registreDate,
                phone
              } = JSON.parse(event.body);
              const newBoard = new Board({
                name,
                content,
                password,
                address,
                registreDate,
                phone
              });
              newBoard.id = lastId + 1;
              // 새로운 글을 등록합니다.
              newBoard.save(function(err, board) {
                if (err) {
                  callback(null, {
                    statusCode: 500,
                    body: JSON.stringify(err),
                    headers: corsHeader
                  });
                } else {
                  callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(lastId + 1),
                    headers: corsHeader
                  });
                }
              });
            }
          })
      );
      break;
    case "PUT":
      proxy = event.pathParameters.proxy;
      password = event.headers.password;

      connect().then(() =>
        Board.findOne({ id: proxy }).exec(function(err, board) {
          if (err) {
            callback(null, { statusCode: 500, body: JSON.stringify(err) });
          } else if (!board) {
            callback(null, {
              statusCode: 500,
              body: JSON.stringify("Board not found.")
            });
          } else {
            //게시물이 있다면 수정시 비밀번호
            if (board.password != password) {
              callback(null, {
                statusCode: 500,
                body: JSON.stringify("Password is incorrect.")
              });
            } else {
              //event : 사용자가 쓰는 곳, event.body : 사용자가 body에 넣은 자
              const {
                name,
                content,
                password,
                address,
                registreDate,
                phone
              } = JSON.parse(event.body);
              // 사용자가 입력한 name, content, password에 맞게 정보를 변경합니다.
              Board.findOneAndUpdate(
                { id: proxy },
                { name, content, password, address, registreDate, phone }
              ).exec(function(err, board) {
                if (err) {
                  callback(null, {
                    statusCode: 500,
                    body: JSON.stringify(err)
                  });
                } else {
                  callback(null, {
                    statusCode: 200,
                    body: JSON.stringify("success")
                  });
                }
              });
            }
          }
        })
      );
      break;

    case "DELETE":
      proxy = event.pathParameters.proxy;
      password = event.headers.password;
      connect().then(() =>
        Board.findOne({ id: proxy }).exec(function(err, board) {
          if (err) {
            callback(null, { statusCode: 500, body: JSON.stringify(err) });
          } else if (!board) {
            callback(null, {
              statusCode: 500,
              body: JSON.stringify("Board not found.")
            });
          } else {
            if (board.password != password) {
              callback(null, {
                statusCode: 500,
                body: JSON.stringify("Password is incorrect.")
              });
            } else {
              // 사용자가 입력한 번호에 해당하는 게시물을 삭제합니다.
              Board.findOneAndRemove({ id: proxy }).exec(function(err, board) {
                if (err) {
                  callback(null, {
                    statusCode: 500,
                    body: JSON.stringify(err)
                  });
                } else {
                  callback(null, {
                    statusCode: 200,
                    body: JSON.stringify("success")
                  });
                }
              });
            }
          }
        })
      );
      break;

    default:
      callback(new Error(`Unrecognized operation "${operation}"`));
  }
};
```

<TagLinks />

<Comment />
