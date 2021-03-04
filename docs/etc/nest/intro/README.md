---
title: nestJS로 백엔드 api 만들기 (개념 및 프로젝트 세팅)
meta:
  - name: description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:title
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/nest/intro/
tags: ["nest"]
---

# nestJS로 백엔드 api 만들기 (개념 및 프로젝트 세팅)

이번 글을 시작으로 nestJS를 이용하여 백엔드 api를 구축하는 방법에 대해 알아보려고 합니다!

범위는 nest로 프로젝트를 설치하고, 스키마, 컨트롤러, 서비스, 라우트 모두 정의하고 postman으로 실행한 이후 unit test, e2e 테스트까지 다루게 됩니다

db는 따로 연결하지 않고 로컬 서버로만 사용합니다

nest가 express에 비해 어느 면이 다르고 어느 면이 훨씬 좋은지 알아보는 것이 중점입니다! (validation 자동화, 에러핸들링 자동화, typescript 강제화로 타입 디버깅 , status code 자동 기입 등등)

## 글 모음

- [nest 개념 및 세팅 #1](https://kyounghwan01.github.io/blog/etc/nest/intro/)
- [nest 컨트롤러, 서비스, 엔티티 만들기 #2](https://kyounghwan01.github.io/blog/etc/nest/controller-service/)
- [nest validation과 dto #3](https://kyounghwan01.github.io/blog/etc/nest/validation-dto/)

## nest 란?

코드 없이 개략적인 이론만 기술하기 가볍게 읽고 넘어가주세요

nest는 express를 만든 사람들이 나와서 만든 프레임워크로 기본적으로 express와 사용법이 매우 비슷합니다

다른점은 어노테이션을 사용한다는 것과 typescript이 필수적으로 사용된다는 점입니다

nest는 아래와 같은 구조로 코드가 진행됩니다

### 코드 흐름

`모듈 > 컨트롤러 > 서비스 > 엔티티`

```ts
// 모듈 영역
@Module({
  controllers: [MoviesController],
  providers: [MoviesService]
})
// 컨트롤러 영역
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviceService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    // 서비스 영역
    return this.moviceService.getAll();
  }
}
```

모듈은 db로 치자면 table이라고 보면 좋을 것 같습니다 (user, board 등등)

그 모듈 아래로 모듈을 작동하는 컨트롤러는 라우팅 하는 곳입니다

컨트롤러 안에 서비스 함수가 들어가고 서비스에서 db와 서버가 소통하는 구간이라고 보시면 됩니다

## 프로젝트 세팅

1. `npm i -g nest`를 입력하여 nest를 설치합니다
2. `nest new 프로젝트이름`을 입력하여 nest 세팅합니다

## nest 기본 문법

세팅을 완료했으니 기본 문법에 대해 알아보겠습니다

express와 nest를 비교하면서 진행하겠습니다

### param

get 요청에서 `/:id`를 통해 들어오는 `id`를 가져오는 방법입니다

#### express

```js
exports.getOne = (req, res) => {
  const { id } = req.params;
};
```

#### nest

nest에서 get요청을 할때는 `Get` 어노테이션을 사용합니다

또한 Get 어노테이션안에 routing되는 주소도 동시에 입력합니다

params을 가져올 때는 `Param`어노테이션을 이용하여 가져옵니다

```ts
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviceService.getOne(movieId);
  }
```

### Query

#### express

```js
exports.getLandings = (req, res) => {
  const { currentPage } = req.query;
};
```

#### nest

`Query`를 가져오는 방법은 `Param`을 가져오는 방법과 동일합니다

front에서 보내는 Query 변수를 `Query` 어노테이션 안에 넣어주면 됩니다

```ts
@Get('search')
search(@Query('year') searchYear: string) {
  return `we are search with title ${searchYear}`;
}
```

### Body

#### express

```js
exports.create = (req, res) => {
  console.log(req.body.title);
};
```

#### nest

```ts
@Post()
create(@Body() movieData: CreateMovieDto) {
  return this.moviceService.create(movieData);
}
```

### param과 body 동시에 쓸때

```ts
@Patch('/:id')
patch(@Param('id') movieId: number, @Body() updateData: UpdateeMovieDto) {
  return this.moviceService.update(movieId, updateData);
}
```

### req, res

nest는 express를 동시 지원하기 때문에 req, res를 사용가능합니다

하지만 nest에서는 권장하지 않습니다 (req, res를 사용하면 내부적으로 속도가 많이 느려진다고합니다)

nest는 req는 위에서 알아본대로 어노테이션을 이용하여 받고 res는 컨트롤러에서 return 시킨 값을 프론트로 보내주게됩니다

## 정리

이번 글에서는 nest가 어떤 건지, 프로젝트 세팅 그리고 아주 기본적인 문법에 대해 알아보았습니다

다음 글부터는 본격적으로 api 만드는 방법을 알아보겠습니다!!

<TagLinks />

<Comment />
