---
title: svelte - 글로벌 scss 적용하는 법
meta:
  - name: description
    content: svelte - 글로벌 scss 적용하는 법
  - property: og:title
    content: svelte - 글로벌 scss 적용하는 법
  - property: og:description
    content: svelte - 글로벌 scss 적용하는 법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Svelte/global-scss/
tags: ["svelte"]
---

# 글로벌 scss 적용

이번 포스팅에서는 svelte에서 글로벌 scss 적용하는 방법에 대해 알아봅니다!

가장 간단한 방법은 `public/index.html`에 css를 정의하는 방법입니다. 그러나 우리는 scss를 사용할 것이고 public/index.html은 전처리가 완료되지 않았기에 사용할 수 없습니다. 그래서 이 포스팅을 통해 좀더 svelte스럽게 global style를 정의하는 방법에 대해 알아보겠습니다.

사전 조건은 번들러로 `rollup`을 사용하고 있습니다, 또한 전처리 언어로 scss를 사용하고 있습니다

scss를 사용할 것이니 먼저 scss를 설치해봅시다

## scss 설치

```
yarn add -D node-sass svelte-preprocess
```

`node-sass`와 `svelte-preprocess`를 설치함으로 scss 전처리하도록 합니다

### rollup.config.js

`rollup.config.js`의 plugins에 아래와 같이 scss 사용하기 위한 작업을 합니다

```js {12}
...
import sveltePreprocess from "svelte-preprocess";

export default {
  ...
   plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      },
      preprocess: sveltePreprocess()
    }),
}
```

### Component.svelte

위처럼 전처리를 해놓으면 아래와 같이 scss를 사용할 수 있습니다.

```md
<div class="scss-test">
  <div class="scss-test__children">
    test
  </div>
</div>
<style lang="scss">
.scss-test {
  height: 40px;
  &__children {
    width: 100px;
  }
}
</style>
```

## scss 전역으로 사용하기

이제 scss를 전역으로 사용해봅시다. 먼저 전역으로 사용할 scss를 만들어줍니다

### src/scss/main.scss

전역으로 사용하는 btn 스타일이 아래와 같이 있다고 가정합니다

```scss
.btn {
  $btn-color--default: #e2e6ea;
  $btn-color--success: #61bd4f;
  $btn-color--danger: #eb5a46;
  $text-color--default: #212529;
  $text-color--colorful: #fff;

  display: inline-block;
  padding: 6px 12px;
  background-color: $btn-color--default;
  color: $text-color--default;
  border-radius: 4px;
  line-height: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  &:hover {
    background-color: darken($btn-color--default, 10%);
  }
  &.success {
    background-color: $btn-color--success;
    color: $text-color--colorful;
    &:hover {
      background-color: darken($btn-color--success, 10%);
    }
  }
  &.danger {
    background-color: $btn-color--danger;
    color: $text-color--colorful;
    &:hover {
      background-color: darken($btn-color--danger, 10%);
    }
    &::after {
      content: "!";
    }
  }
  &.small {
    font-size: 12px;
    padding: 0 6px;
  }
}
```

### rollup.config.js

`rollup.config.js`에서 위에 정의한 `main.scss`를 전역으로 사용하도록 세팅합니다. 아까 위에 정의한 `sveltePreprocess` 내부에 객체로 추가 정의하면 됩니다

```js {9-11}
export default {
  ...
   plugins: [
    svelte({
      compilerOptions: {
        dev: !production
      },
      preprocess: sveltePreprocess({
        scss: {
          prependData: '@import "./src/scss/main.scss";'
        }
      })
    }),
}

```

### 주의사항

위처럼 전역으로 scss를 사용할 경우 해당 svelte 컴포넌트에 아무런 style에 대한 정의가 없다 하더라도 `<style lang="scss"></style>`를 작성해야합니다 예를 들면 아래와 같습니다

```md
<div class="actions">
    <div class="btn" on:click={addList}>Add List</div>
    <div class="btn success" on:click={addList}>Add List</div>
</div>

<!-- btn, btn scss는 main.scss에 글로벌 화하였기에 이 컴포넌트에서 style을 정의할 필요가 없다. 그러나 global scss를 사용하기 위해서는 style 태그를 필수로 작성해야한다 -->
<style lang="scss"></style>
```

<TagLinks />

<Comment />
