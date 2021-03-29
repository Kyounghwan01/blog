---
title: svelte - 스벨트 기본 문법
meta:
  - name: description
    content: svelte - 스벨트 기본 문법, 조건문, 반복문, 반응성, store, writable
  - property: og:title
    content: svelte - 스벨트 기본 문법, 조건문, 반복문, 반응성, store, writable
  - property: og:description
    content: svelte - 스벨트 기본 문법, 조건문, 반복문, 반응성, store, writable
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Svelte/svelte-basic/
tags: ["svelte"]
---

# svelte

> 스벨트 기본 동작 원리에 대해 기록합니다!

## svelte가 react, vue와 뭐가 다른가?

- react와 vue는 가상돔을 사용하여 값이 갱신되면 현재와 가상돔을 비교하고 바뀐 부분만 갱신합니다 그에 반해 svelte는 가상돔이 없습니다 가상돔을 만드는 작업도 없고 가상 돔을 비교하는 작업이 생략되고 오직 갱신하는 작업만 존재합니다. 그렇기 때문에 react, vue보다 빠릅니다
- svelte는 실제 돔을 사용하며 반응성을 직접 주입하여 바뀐 부분만 캐치하여 돔을 리렌더링 합니다
- svelte는 dependencies 없이 devDependencies로만 구성되어 번들의 크기가 작습니다 즉, 배포할때 시간이 적게 걸립니다
- svelte는 react, vue와 같은 기능을 가진 코드를 적으면 월등히 적은 코드량을 가집니다
- 그러나 나온지 몇년 안됬기에 문법이 격변하고, 레퍼런스가 적어 구글링하기가 힘듭니다

## svelte가 값을 갱신하는 방법

- 반응성을 가진 값이 새로운 값으로 할당되면 리렌더링됩니다
- 아래 예시처럼 assign 함수에 의해 name이 test로 바뀌면 name을 가지고 있는 돔은 리렌더링 됩니다

```svelte
<script>
  let name = "world";
  function assign() {
    name = "test";
  }

</script>

<h1 class={age < 85 ? 'active' : ''}>{name}</h1>
<button on:click={assign}>assign</button>
<img src="" alt={world} />
<input type="text" bind:value={name} />

<style>
  h1 {
    color: red;
  }
  .active {
    color: blue;
  }
</style>
```

- 양방향 바인딩하여 input에서 값 적음으로 무조건 바뀌게 하려면 `bind:value` 기입
- 자식 컴포넌트에 props로 내릴때도 양방향 바인딩`bind:value`를 사용하여 값을 바꿀수 있다

```svelte
<input type="text" bind:value={name} />
<Todo bind:todos={todos} />
```

## 조건문, 반복문

- 조건문과 반복문의 시작은 `#` 중간은 `:` 끝은 `/`를 붙입니다

```svelte
<script>
	let name = 'world';
	let toggle = false;
	let frute = ['apple', 'banana', 'orange'];
	const deleteF = () => {
		// 반응성을 위해 재할당
		frute = frute.slice(1)
	}
</script>
<button on:click={() => toggle = !toggle}>
	toggle
</button>

// each를 돌때 key를 넣어준다 as item 뒤에 소괄호 붙임
// {#each frute as item (key값)}
<ul>
	{#each frute as item (item)}
	  <li>{item}</li>
	{/each}
</ul>
<button on:click={deleteF}>eat</button>


{#if toggle}
  <h1>Hello {name}!</h1>
{:else}
  <div>
	  no name!
  </div>
{/if}
```

## 부모 자식 컴포넌트 값 교환

- 다른 프레임워크와 같이 부모는 자식 컴포넌트에 동일한 방식으로 props를 내립니다.
- 자식은 부모로 부터 props를 받을 때 `export let propsName`으로 props를 받습니다.
- 자식 컴포넌트가 부모로 부터 받은 값을 바꾸려고 한다면 부모는 자식에게 양방향 바인딩을 사용하여 props을 내리면 부모의 값을 바꿀 수 있습니다.

```svelte
<Todo bind:todos={todos} />
```

### 부모

```svelte
<script>
	import Fruits from './Fruits.svelte';
	let name = 'world';
	const fruits = [1,2,3]
</script>

<h1>Hello {name}!</h1>

<Fruits {fruits}/>

<Fruits {fruits} reverse={true}/>

```

### 자식

```svelte
<script>
	// props 받을때 export를 쓴다
	export let fruits
	export let reverse

	let computedFru = []

	if (reverse) {
		computedFru = [...fruits].reverse()
	} else {
		computedFru = fruits
	}
</script>

<ul>
	{#each computedFru as fri}
		<li>{fri}</li>
	{/each}
</ul>
```

<TagLinks />

<Comment />
