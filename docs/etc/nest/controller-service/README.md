---
title: nestJS로 백엔드 api 만들기 (컨트롤러, 서비스, 엔티티)
meta:
  - name: description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:title
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:description
    content: nestJS로 백엔드 api 만들기, nest, backend, mongodb, mysql, nosql, sequelize, express, node, typescript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/nest/controller-service/
tags: ["nest"]
---

# nestJS로 백엔드 api 만들기 (컨트롤러, 서비스, 엔티티)

저희는 주소록을 만들 예정입니다 이 주소록의 기능은 다음과 같습니다

```
1. 주소록 전체를 가져오는 기능
2. 주소록 id를 가지고 하나의 주소를 가져오는 기능
3. 주소를 만드는 기능
4. 주소를 지우는 기능
5. 주소를 바꾸는 기능
```

이렇게 총 5개의 api를 만들도록 하겠습니다!

## 프로젝트 구조

| 프로젝트 구조                |
| :--------------------------- |
| **/src**                     |
| **ㅣㅡ /user.controller.ts** |
| **ㅣㅡ /user.module.ts**     |
| **ㅣㅡ /user.entities.ts**   |
| **ㅣㅡ /user.service.ts**    |
| **ㅣㅡ app.module.ts**       |
| **ㅣㅡ main.ts**             |

구조는 위와 같습니다

controller는 `nest g co`를 이용하여 만드시면 되고, sevices는 `nest g s`를 이용하면 nest에서 자동으로 만들어줍니다

## user.module.ts

컨트롤러와 서비스를 감싸줄 모듈을 정의합니다

```ts
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  // controller와 service가 모듈에 정의되어야 컨트롤러 안에서 서비스 이용가능합니다 (DI)
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
```

## app.module.ts

app.module에 우리가 위에서 만든 user 모듈을 import 해줍니다

```ts
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
```

## user.entities.ts

express에서 스키마 정의하는 것으로 이해하시면 됩니다

```ts
export class User {
  id: number;
  name: string;
  age: number;
  address: string;
}
```

## user.service.ts

컨트롤러에 들어가는 service 입니다

nest의 `NotFoundException`를 이용하면 손쉽게 에러핸들링이 가능합니다

```ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entities";

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

  create(userData: any) {
    this.users.push({
      id: this.users.length + 1,
      ...userData
    });
  }

  update(id: number, updateData: any) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({ ...user, ...updateData });
  }
}
```

## user.controller.ts

express에서는 `import service from './user.service.ts'`로 가져오겠지만

nest에서는 위와 같이 가져오지 않고, `constructor`를 사용하여 `UserService` 클래스를 가져와 사용합니다

any로 정의한 부분은 뒷 포스팅에서 `dto`에 대해 알아본 후 채우도록 하겠습니다

```ts {17}
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

@Controller("user")
export class UserController {
  // `constructor`를 사용하여 `UserService` 클래스를 가져와 사용합니다
  // 필수! controller에 service를 주입하기 위해서는 user.module.ts에 controller와 service가 정의되어야 합니다
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
  create(@Body() userData: any) {
    // any 부분은 dto를 정의하면서 채웁니다
    return this.userService.create(userData);
  }

  @Delete("/:id")
  remove(@Param("id") userId: number) {
    return this.userService.deleteOne(userId);
  }

  @Patch("/:id")
  patch(@Param("id") userId: number, @Body() updateData: any) {
    // any 부분은 dto를 정의하면서 채웁니다
    return this.userService.update(userId, updateData);
  }
}
```

## 정리

이번 글에서는 컨트롤러와 서비스, 모듈을 정의하는 방법에 대해 알아보았습니다

중요한 것은 컨트롤러내에서 서비스를 사용할때 단순 import가 아닌 `constructor`를 사용해서 가져온다는 점과

컨트롤러에서 서비스를 사용하기 위해서는 모듈내에 컨트롤러, 서비스가 정의되어야 한다는 점을 기억하지면 좋을 것 같습니다

다음 글에서는 nest에서 validation하는 방법에 대해 알아보겠습니다.

<TagLinks />

<Comment />
