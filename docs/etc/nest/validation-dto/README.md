---
title: nestJS로 백엔드 api 만들기 (validation, dto)
meta:
  - name: description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript, validation, dto, forbidNonWhitelisted, useGlobalPipes, transform
  - property: og:title
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript, validation, dto, forbidNonWhitelisted, useGlobalPipes, transform
  - property: og:description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript, validation, dto, forbidNonWhitelisted, useGlobalPipes, transform
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/nest/validation-dto/
tags: ["nest"]
---

# nestJS로 백엔드 api 만들기 (validation, dto)

[이전 글](https://kyounghwan01.github.io/blog/etc/nest/controller-service/)에서는 컨트롤러와 서비스, 모듈을 정의하는 방법에 대해 알아보았습니다

이번 글에서는 nest에서 validation하는 방법에 대해 알아보겠습니다

express에서는 validation을 하기 위해 검증 로직을 만들거나 다른 라이브러리를 붙여서 데이터 검증을 하였습니다 그러나 nest에서는 내장 함수를 이용하여 검증이 가능합니다

어떠한 값을 `검증`하려면 그 값에 대한 정의가 필요하겠죠?

그 정의를 `dto`라는 곳에서 하게 됩니다

## dto 란?

dto는 Data Transfer Object의 약자로서, 데이터를 오브젝트로 변환하는 객체입니다

**어떠한 값이 어떤 타입을 가지고 이 값이 필수인지 옵션인지** 정의하기위한 파일이라고 보시면 됩니다

우리는 `검증`을 user를 `create`하는 부분과 user을 `update`하는 부분에서 할 것이기 때문에 `dto`를 `create-user.dto.ts`와 `update-user.dto.ts` 2개를 만들어주시면 됩니다

## 프로젝트 구조

| 프로젝트 구조                |
| :--------------------------- |
| **/src**                     |
| **ㅣㅡ dto**                 |
| **ㅣㅡㅡ /create-movie.dto** |
| **ㅣㅡㅡ /update-movie.dto** |
| **ㅣㅡ /user.controller.ts** |
| **ㅣㅡ /user.module.ts**     |
| **ㅣㅡ /user.entities.ts**   |
| **ㅣㅡ /user.service.ts**    |
| **ㅣㅡ app.module.ts**       |
| **ㅣㅡ main.ts**             |

## package 설치

먼저 필요한 패키지를 설치합니다

```
npm i class-validator class-transformer
```

## main.ts에 pipeline 설정

express에서 검증 하는 미들웨어를 설정하는 것과 비슷하다고 생각하시면 됩니다

아래 주석처리한 부분은 ValidationPipe에서 쓰이는 옵션입니다

```ts {2,12-18}
// main.ts
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
  // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
  // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(3000);
}
bootstrap();
```

### forbidNonWhitelisted

forbidNonWhitelisted 옵션에 대해 자세히 알아보겠습니다

이 옵션을 true 시키면 dto에 정의되지 않은 프로퍼티를 body에 넘길시 `property 'xxx' should not exist`라는 에러가 뜨게 됩니다

즉, dto에 정의되지 않은 프로퍼티를 차단하기 위한 용도로 사용됩니다

```json
{
  "statusCode": 400,
  "message": ["property xxx should not exist"],
  "error": "Bad Request"
}
```

### transform

transform 옵션에 대해 좀 더 자세히 알려드리면 원래 param으로 들어오는 값은 무조건 `string`으로 들어옵니다 (number 값으로 따로 바꿔줘야함)

그래서 param으로 들어온 값을 타입 체크를 하면 string으로 해야하죠

하지만 우리 db에 id는 uuid가 아닌 이상 대부분 number 타입입니다 그래서 `Number(paramId)`이런 식으로 형변환을 해야합니다

nest에서는 이런 불필요한 과정을 생략하기 위해 `transform`이라는 옵션을 만들었습니다

`transform`은 컨트롤러에서 id로 받는 값에 타입을 지정했다면 nest에서 자체적으로 타입을 변환하게다는 옵션입니다 아래 예시로 알아보겠습니다

```ts {4}
export class TestController {
  @Delete("/:id")
  // 원래는 userId는 string이지만 `userId: number`로 지정함으로 userId의 타입은 number로 변환됩니다
  remove(@Param("id") userId: number) {
    console.log(typeof userId); // number
  }
}
```

위처럼 형변환을 위해서는 `main.ts`에 `transform: true`로 꼭! 바꿔야함을 기억하세요!!

## create-user.dto

```ts
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  // 배열이면 each true, 옵션값이면 IsOptional 사용
  @IsOptional()
  @IsString({ each: true })
  readonly address: string[];
}
```

## update-user.dto

update는 create와 동일하나 내부 값이 필수가 아니기 때문에 `PartialType`를 사용하여 간단하게 구현할 수 있습니다

```ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// UpdateUserDto는 CreateMovieDto와 인터페이스 동일하나 필수 값이 아니다
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

## 만든 dto를 controller에 적용

이제 만든 dto를 controller에 적용하여 프론트에서 create, update api를 호출할 때 값 검증을 하도록 하겠습니다

## user.controller.ts

```ts {13,14,31,41}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { User } from "./entities/user.entities";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") userId: number): User {
    return this.userService.getOne(userId);
  }

  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete("/:id")
  remove(@Param("id") userId: number) {
    return this.userService.deleteOne(userId);
  }

  @Patch("/:id")
  patch(@Param("id") userId: number, @Body() updateData: UpdateUserDto) {
    return this.userService.update(userId, updateData);
  }
}
```

## user.service.ts

```ts {3,4,29,36}
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entities";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    const user = this.users.find(user => user.id === Number(id));
    if (!user) {
      // 클라이언트는 error.message에 user id ${id} not found이 값이 들어갑니다. status-code는 nest가 정해준 값으로 들어갑니다
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.users = this.users.filter(user => user.id !== Number(id));
    return true;
  }

  create(userData: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData
    });
  }

  update(id: number, updateData: UpdateUserDto) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({ ...user, ...updateData });
  }
}
```

## 정리

이번 글에서 nest를 이용하여 validation을 하는 방법에 대해 알아보았습니다

중점적으로 기억할 사항은 ValidationPipe의 속성을 이용하면 좀 더 친절한 errormessage를 받을 수 있다는 점과 validation 조건을 위한 변수 타입을 정의하는 dto 사용 방법에 대해 기억하시면 좋을 것 같습니다!

다음 글에서는 nest에서 에러핸들링 하는 방법에 대해 알아보겠습니다

<TagLinks />

<Comment />
