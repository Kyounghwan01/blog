---
title: vue - mapGetters 사용법
meta:
  - name: description
    content: vue - mapGetters 사용법
  - property: og:title
    content: vue - mapGetters 사용법
  - property: og:description
    content: vue - mapGetters 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/mapGetters/
tags: ["vue"]
---

# mapGetters 사용법

```ts
import { mapGetters } from 'vuex'

@Component{
	computed: {
		...mapGetters([ '가져올getters값' ])
	}
}
// this.가져올getters값 으로 접근가능

// 또는
...mapGetters({
  // this.doneCount를 store.getters.doneTodosCount에 매핑하십시오.
  doneCount: 'doneTodosCount'
})
```

<TagLinks />

<Comment />
