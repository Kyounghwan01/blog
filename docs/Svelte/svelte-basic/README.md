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

```md
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

```md
<input type="text" bind:value={name} />
<Todo bind:todos={todos} />
```

## 조건문, 반복문

- 조건문과 반복문의 시작은 `#` 중간은 `:` 끝은 `/`를 붙입니다

```md
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

```md
<Todo bind:todos={todos} />
```

### 부모

```md
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

```md
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

## lefecycle

- beforeUpdate
- onMount
- afterUpdate
- onDestory

### 값 갱신시

beforeUpdate -> afterUpdate (onMount 실행안됨)

```md
<script>
	import {onMount, onDestory, beforeUpdate, afterUpdate} from 'svelte'

	let h1

	beforeUpdate(() => {
		// 반응성있는 값이 바뀔때 실행됨 (화면 렌더링 전 -> onMount보다 먼저 실행됨)
		// 컴포넌트가 연결될때도 실행됨
		// 반응성을 가지는 데이터가 beforeUpdate, afterUpdate 훅 내부에 있으면 무한루프 (useEffect에서 setState 사용하는 것과 같은 맥락), 꼭 넣어야한다면 조건문을 넣어서 무한루프에 빠지지 않도록
		console.log('before update');
		console.log('h1 && h1.innerText');
	})
	afterUpdate(() => {
		// 반응성있는 값이 바뀔때 실행됨 (화면 렌더링 후 -> onMount 후에 실행됨)
		// 컴포넌트가 연결될때도 실행됨
		console.log('after update');
	})
	onMount(() => {
		// 컴포넌트 html 렌더링 된 이후에 실행됨
		// 컴포넌트가 화면에 출력된 이후 사용하는 훅
		h1 = document.querySelector('h1');
		console.log("mounted", h1.innerText)

		// 반환함수를 넣으면 onDestory와 같은 기능 (onDestory가 먼저 실행되고 반환함수 실행됨)
		// onDestory와 return 함수 둘중 하나만 만들어라
		// 주의사항! onMount에서 비동기 함수 로직을 넣을 경우 async 함수의 리턴은 promise이므로 return 익명함수가 무시된다. 그래서 비동기 함수가 있는 경우에는 return 익명함수로 onDestory를 사용하지 말고 onDestory 훅을 이용해라
		return () => {
			console.log('destory')
		}
	})

	onDestory(() => {
		// 컴포넌트가 연결해지되기 직전에 실행됨, 해지 직전이니 h1이 출력됨
		const h1 = document.querySelector('h1');
		console.log("destory", h1.innerText)
	})
</script>
<h1>something<h1/>
```

### lifeCycle 모듈화

#### lifecycle.js

```md
<script>
import {onMount, onDestroy, beforeUpdate, afterUpdate} from 'svelte';
import {writable} from 'svelte/store';

export function lifecycle(){
	onMount(() => {
		console.log('Mounted');

	})

	onDestroy(() => {
		console.log('onDestroy');

	})

	beforeUpdate(() => {
		console.log('beforeUpdate');

	})

	afterUpdate(() => {
		console.log('afterUpdate');

	})
}

export function delayRender(delay) {
	let render = writable(false);
	onMount(() => {
		setTimeout(() => {
			console.log(3);
			// 일반 변수가 반응성을 가지려면 util 함수가 아닌 컴포넌트내부에 정의되어야한다
			// render = true로 값을 바꾸고 app.svelte에 render가 true인 값으로 바꿔도 true로 바뀐것을 컴포넌트에서 반응하지 않는다는 의미

			// store 값인 $xxx도 util 함수가 아닌 컴포넌트 내부에서만 사용가능하다, set, update, subscribe 함수 사용가능
			// 컴포넌트 내부에서 $는 자동 subscribe 기능이고  store.subscribe는 자동 구독이 안되는 곳에서 구현하는 수동 구독 (중요!! 스벨트 파일이 아닌곳에서 값을 운반할때 store 값을 자주 사용한다)
			render.set(true)
		}, delay)
	})

	// render 스토어 객체를 delayRender의 반환값으로 리턴하면 component에서는 스토어 객체를 받기에 반응성을 가질 수 있다
	return render;
}
</script>
```

#### app.svelte

```md
<script>
import {lifecycle, delayRender} from './lifecycle.js'
	let done = delayRender(3000);
	lifecycle();
	let name = 'world';
</script>

{#if \$done}

<h1>Hello {name}!</h1>
{/if}
```

## tick

- 데이터가 갱신되고 화면에 값이 반영되기 까지 잠깐 기다려주는 라이플사이클 훅
- 스벨트에서 값이 바뀌는 원리와 매우 밀접한 관계가 있다
  - 스벨트는 값에 할당이 되면 해당 함수가 끝날때 까지 갱신이 이루어지지 않는다
  - 그래서 하나의 함수에서 특정 값이 바뀌고 바뀐 특정 값을 잡으려면 `tick`을 사용해야한다
- 훅이지만 다른 훅과는 다르게 어느 곳에서나 사용 가능

```md
<script>
	import {tick} from 'svelte';
	let name = 'world';

	async function handler(){
		name='ddd';
		// 4. tick을 사용, tick은 비동기로 사용함, tick을 사용하면 name에 ddd가 할당되고 dom에 ddd가 갱신된 이후 h1.innerText가 실행됨
		await tick() ;
		// 1. 바로 화면이 갱신 되지 않고
		const h1 = document.querySelector('h1');
		console.log(h1.innerText);
	}
	// 2. 여기 까지 완료되어야 화면이 갱신됨 즉, Hello world가 콘솔에 출력됨
	// 3. Hello ddd가 나오기 위해서는 tick를 사용함
</script>

<h1 on:click={handler}>Hello {name}!</h1>
```

## 보간법

```md
<script>
	let value = 'test'
	let isUpperCase = false
</script>

<input {value} on:input={e => value = e.target.value} />

// bind의 경우 속성의 이름 생략하려면 {}도 지운다
<input bind:value />

// react, vue와 달리 svelte는 컴파일러여서 전체 코드를 번들하기 전에 평가하기 때문에 최적과 가능하기에 코드 줄임으로 권장
// 함수나 표현식 사용을 권장하지 않음

<div>{isUpperCase ? 'DIV' : 'div'}</div>
```

## 원시 html

- react의 dangerouslysetinnerhtml와 같은 기능으로 svelte에서는 `@html`을 사용함

```md
<script>
	let h1 = '<h1>tt</h1>'
	let isUpperCase = false
</script>

{@html h1}
```

## 디버깅 (로그찍기)

- 스벨트에서는 로그를 찍어주는 기능이 있어서 스크립트에 console.log을 적을 필요가 없다
- 로깅 하고 싶은 값이 변할 경우 콘솔에 계속 찍힌다
- 콘솔창을 열어 놓은 경우에는 값이 바뀔때마다 디버깅 툴이 열려서 지연됨
- 실행이 완료된 이후 콘솔창을 열면 콘솔만 찍혀있음

```md
<script>
	let index = 0;
	let name = 'tt';
</script>

{@debug index, name}

<h1 on:click={() => index +=1 }> hello {name}</h1>
```

## 스벨트에서 값 바뀌는 반응성 규칙

- 가장 중요!!!! 스벨트에서 반응성을 가지려면 할당(=)을 해야한다

```md
<script>
	let name = 'world';
	let fr = ['apple', 'banana'];
	let user = {
		name: 'nkh',
		depth: {
			a: 'b'
		},
		numbers: [1,2]
	}
	let numbers = user.numbers;

	function assign() {
		// string 재할당
		name = 'nep';
		// 배열 재할당
		fr = [...fr, 'orange'];

		// 객체 재할당
		user.name='nep';
		user.depth.a = 'c';
		// 스벨트의 경우 함수 하나가 다 종료된 이후 화면 값이 갱신된다.
		// 객체의 경우 객체 내부에 값이 하나라도 바뀌면 객체 전체를 갱신시키므로 아래와 같이 객체 내부의 배열에 push한 경우 원래대로라면 3이 반영되지 않아야 하나, 객체의 name, depth.a가 상단에서 바뀌었기 때문에 객체 전체가 갱신되고 그러므로 numbers에 3도 반영되어 갱신된다
		// 만약 user.numbers.push(3)만 user 객체에 변화를 줬다면 배열 재할당을 하지 않았기 때문에 값이 갱신되지 않는다
		user.numbers.push(3);
	}
</script>

<h1>Hello {name}!</h1>
<span>{fr}</span>
<p>{user.name}</p>
<p>{user.depth.a}</p>
<p>{user.numbers}</p>
// numbers는 user.numbers의 객체 값 주소를 공유한다 assign 함수를 실행하면 user.numbers 값이 바뀌고 그 주소를 참조하는 numbers도 값이 바뀌게 되지면 numbers는 할당연산자를 사용하지 않았기 때문에 갱신 대상이 아니다. assign함수내부에 numbers=numbers를 기입하면 반응갱신 대상이 된다
<p>{numbers}</p>
<button on:click={assign}>assign</button>
```

## label로 반응성 구문(\$:) 이해

- 실행순서

```
count 가 +1 됨
console.log(double)
함수 가 종료될때 까지 갱신 이뤄지지 않음
함수 종료후 데이터가 갱신되어 dom이 바뀌고
그 이후에 $: 구문 처리가 이루어짐

그래서 count가 더해진 이후 double도 더한 값이 반영되려려면 tick을 사용함 tick 사용함으로 순서는

count 가 +1 됨
await tick()실행함으로 갱신 까지 기다림
갱신 이후 $: 처리 이루어짐
console.log(double)
```

```md
<script>
	import {tick} from 'svelte'
	let count = 0

	// js의 label 구문, svelte에서는 무조건 $로 표현함 vue의 computed와 비슷한 기능(count가 반응성을 가진다면 double도 반응성을 가짐)
	$: {
		double = count * 2
	}

	async function assign() {
		count += 1
		await tick()
		console.log(double) // 0,2,4,6,8 -> 2부터 찍히지 않는다
		// 왜? count가 1이 증가하면 함수로직이 다 처리하면 갱신이 처리되고 그 이후에 반응성 구문($:)이 실행된다, 그래서 tick으로 비동기를 만들어줘야한다
	}

	<button on:click={assign}>assign</button>
	<h2>{count}</h2>
	<h2>{double}</h2>
</script>
```

## 반응성 구문 패턴

```md
<script>
  let count = 0;
  // 반응성 구문은 속한 컴포넌트가 실행되면 무조건 전체 다 실행된다 - 실행이 안되어야하면 조건문을 걸어줘야함

  // 선언
  $: double = count * 2;

  // 블록
  $: {
    console.log(count);
    console.log(double);
  }

  // 함수 실행 - count가 변경되면 log를 '실행'
  $: count, log();

  // 즉시실행함수 - count가 변경되면 익명함수 실행
  $: count,
    (() => {
      console.log("iife");
    })();

  // 조건문 - count or double가 변경되면 실행됨
  $: if (count > 0) {
    console.log("if", double);
  }

  // 조건문
  $: switch (count) {
    case 1:
      console.log(1);
      break;

    default:
      break;
  }

  // 반복문 - count가 변경되면 for문 실행
  $: for (let i = 0; i < 3; i += 1) {
    count;
    console.log(count, i);
  }

  function assign() {
    count += 1;
  }
</script>
```

## 클래스, 스타일 속성 바인딩

- 인라인으로 속성 바인딩이 쉽다

```md
<script>
let active = false;
let valid = false;
let color = {
	t: 'tomato',
	w: '#FFF'
}
let letterSpacing = 'letter-spacing: 5px;'
function multi() {
	return 'active multiple-class';
}
</script>

<!-- <div class={active ? 'active' : ''}> 와 같은 문법 -->
<div class:hello={active}>
	hello
</div>

// 여러 개의 지시어 사용 가능

<div class:hello={active} class:valid class:camel-case={camelCase}>
	hello
</div>

// 클래스에 함수 return 값 사용 가능

<div class={multi()}>함수실행</div>

<h2 style="background-color: {color.t}; color: {color.w}; {letterSpacing}">nkh</h2>
```

## 스타일 scrope, 전역화

- 컴포넌트 내에 style 태그내에 작성하는 스타일은 컴포넌트 내에서만 유효범위를 가진다
- 컴포넌트의 스타일은 해쉬화되기 때문에 다른 컴포넌트와 같은 클래스 이름을 사용해도 중복되지 않는다

### 글로벌 스타일

- 글로벌 스타일은 해쉬화 되지 않는다
- :global로 사용한다

```md
<style>
	:global(.fruits) {
		color: red;
	}
</style>
```

### 주의사항

글로벌이 아닌 컴포넌트 내부에서 사용하는 스타일 중에 스크립트에서 사용되지 않는 클래스 이름은 컴파일 후 번들 파일에 포함되지 않는다

즉, 이뜻은 동적으로 class를 부여하여 스크립트에 당장 적혀있지는 않지만 쓰일 수 있는 스타일이 번들에 포함이 안된다는 뜻이다

이럴 경우 :global을 사용하여 번들에 해당 스타일이 포함되도록 해야한다

## @keyframes 전역화

- `-global-`을 사용하면 keyframes을 전역화 할 수 있다

```md
<style>
	@keyframes -global-zoom {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.5);
		}
	}
</style>
```

## this

- 일반 요소 바인딩
- dom의 요소를 찾을 때 `document.querySelector('input')` 이렇게 찾는 경우가 많은데 스벨트에서는 this를 이용하여 쉽게 요소를 잡을 수 있다

```md
<script>
import {tick} from 'svelte';

let isShow = false;
let inputEl;

async function toggle(){
	isShow = !isShow; // 반응성 갱신 주입
	await tick();
	// 정통적으로 아래와 같이 input을 잡는다
	// const inputEl = document.querySelector('input')
	inputEl && inputEl.focus();
}

<button on:click={toggle}>edit!</button>
{#if isShow}
	// 아래와 같이 bind:this를 이용하면 요소의 위치를 잡을 수 있다
	<input bind:this={inputEl} />
{/if}
</script>
```

## Properties, group

- 입력 요소 바인딩
- 라디오, 다중 선택 할때는 bind:group을 사용함

### 다중선택

```md
<script>
let fru = ['apple', 'banana'];
let selectedFru = [];
</script>

{#each fru as fruit}
<label>
<input type="checkbox" value={fruit} bind:group={selectedFru} />
{fruit}
</label>
{/each}
```

### 라디오

```md
<script>
// 라디오의 group데이터는 무조건 string
let group = '';

<label>
	<input type="radio" value="apple" bind:group={group} />
	apple
</label>
<label>
	<input type="radio" value="banana" bind:group={group} />
	banana
</label>

</script>
```

## 단일 다중 selectbox

```md
<script>
// 단일은 string
let select = '';

// 다중은 array
let multiSelect = ['banana', 'cherry'];
</script>

<select bind:value={select}>
	<option disabled value="">option 1</option>
	<!-- option에 value 없으면 text가 value로 들어감 -->
	<option>option 2</option>
	<option>option 3</option>
</select>

<select multiple bind:value={multiSelect}>
	<option disabled value="">option 1</option>
	<option>banana</option>
	<option>cherry</option>
</select>
```

## each key

```
{#each 배열 as 속성, 순서 (키)} {/each}
```

### 빈 배열 처리

```md
<script>
	let todos = [];
</script>

{#each todos as todo (todo.id)}

<div>todo.name</div>
{:else}
<div>아이템이 없어요</div>
{/each}
```

### each 구조분해

```md
<script>
	let todos = [{id: 1, name: 'a'}, {id: 2, name: 'b'}];
</script>

{#each todos as {id, name} (id)}

<div>{name}</div>
{/each}
```

### 키블록

키로 할당된 값이 갱신되면 내부 컴포넌트는 초기화됨

#### Count.svelte

```md
<script>
	let count = 0;
	setInterval(() => {
		count++;
	}, 1000)
</script>

<h1>{count}</h1>
```

### App.svelte

- reset 값이 갱신되면 내부에 있는 Count 컴포넌트는 초기화된다

```md
<script>
	let reset = false;
</script>

{#key reset}

<!-- #key 아래 컴포넌트는 reset 값이 바뀌면 자동 초기화 -->
<Count /> 
{/key}
<button on:click={() => reset = !reset}> reset </button>
```

<TagLinks />

<Comment />
