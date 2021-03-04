---
title: typescript - 유틸리티 타입 (Partial, Omit, Pick)
meta:
  - name: description
    content: typescript - 유틸리티 타입 (Partial, Omit, Pick), 타입스크립트, ts
  - property: og:title
    content: typescript - 유틸리티 타입 (Partial, Omit, Pick)
  - property: og:description
    content: typescript - 유틸리티 타입 (Partial, Omit, Pick), 타입스크립트, ts
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/utility-types/
tags: ["TS"]
---

# 유틸리티 타입

- 제네릭 타입이라고도 불립니다.
- 꼭 쓰지는 않아도 되지만, 쓰면 짧게 쓸수있다, 정의한 인터페이스를 변환 (js의 map 같은 느낌)

## Partial

- 파셜 타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있습니다.

### 예시1

```ts
interface Address {
  email: string;
  address: string;
}

type MyEmail = Partial<Address>;
const me: MyEmail = {}; // 가능
const you: MyEmail = { email: "noh5524@gmail.com" }; // 가능
const all: MyEmail = { email: "noh5524@gmail.com", address: "secho" }; // 가능
```

### 예시2

```ts
interface Address {
  email: string;
  address: string;
}

type MyEmail = Partial<Address>;
const me: MyEmail = {}; // 가능
const you: MyEmail = { email: "noh5524@gmail.com" }; // 가능
const all: MyEmail = { email: "noh5524@gmail.com", address: "secho" }; // 가능

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// Partial - 상품의 정보를 업데이트 (put) 함수 -> id, name 등등 어떤 것이든 인자로 들어올수있다
// 인자에 type으로 Product를 넣으면 모든 정보를 다 넣어야함
// 그게 싫으면
interface UpdateProduct {
  id?: number;
  name?: string;
  price?: number;
  brand?: string;
  stock?: number;
}
// 위와 같이 정의한다.
// 그러나 같은 인터페이스를 또 정의하는 멍청한 짓을 피하기 위해서 우리는 Partial을 쓴다.
function updateProductItem(prodictItem: Partial<Product>) {
  // Partial<Product>이 타입은 UpdateProduct 타입과 동일하다
}
```

### Partial 구현하기

```ts
// 아래 인터페이스를 다른 방법으로 아래와 같이 구현 가능하다
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

type partials = Partial<UserProfile>

// #1
type UserProfileUpdate = {
  username?: UserProfile["username"];
  email: UserProfile["email"];
  profilePhotoUrl?: UserProfile["profilePhotoUrl"];
};

// #2 - 맵드 타입
type UserProfileUpdate = {
  // index signatures
  [p in 'username' | 'email' | 'profilePhotoUrl']? = UserProfile[p]
};

type UserProfileKeys = keyof UserProfile // 'username' | 'email' | 'profilePhotoUrl'
// #3
type UserProfileUpdate = {
  [p in key of UserProfile]? = UserProfile[p]
};

// #4 - 파셜
type RealPartial<T> = {
  [p in key of T]? = T[p]
};
```

## Pick

- 픽 타입은 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의합니다.

### 예시

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품 목록을 받아오기 위한 api
function fetchProduct(): Promise<Product[]> {
  // ... id, name, price, brand, stock 모두를 써야함
}

type shoppingItem = Pick<Product, "id" | "name" | "price">;

// 상품의 상세정보 (Product의 일부 속성만 가져온다)
function displayProductDetail(shoppingItem: shoppingItem) {
  // id, name, price의 일부만 사용 or 별도의 속성이 추가되는 경우가 있음
  // 인터페이스의 모양이 달라질 수 있음
}

// 3. Partial - 상품의 정보를 업데이트 (put) 함수 -> id, name 등등 어떤 것이든 인자로 들어올수있다
// 인자에 type으로 Product를 넣으면 모든 정보를 다 넣어야함
// 그게 싫으면
interface UpdateProduct {
  id?: number;
  name?: string;
  price?: number;
  brand?: string;
  stock?: number;
}
// 위와 같이 정의한다.
// 그러나 같은 인터페이스를 또 정의하는 멍청한 짓을 피하기 위해서 우리는 Partial을 쓴다.
function updateProductItem(prodictItem: Partial<Product>) {
  // Partial<Product>이 타입은 UpdateProduct 타입과 동일하다
}
```

## Omit

- 특정 속성만 제거한 타입을 정의합니다. pick의 반대

## 예시

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

type shoppingItem = Omit<Product, "stock">;

const apple: Omit<Product, "stock"> = {
  id: 1,
  name: "red apple",
  price: 1000,
  brand: "del"
};
```

<TagLinks />

<Comment />
