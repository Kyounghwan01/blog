---
title: vue audio 사용법
meta:
  - name: description
    content: vue audio 사용법
  - property: og:title
    content: vue audio 사용법
  - property: og:description
    content: vue audio 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/audio/
tags: ["vue"]
---

# audio 사용법

회사 프로젝트 내에서 클릭시 소리를 내를 작업하여 기록 남깁니다.<br>

## 사용법

- 매우 쉽습니다.
- 자바스크립트 내 Audio 객체를 사용하여 이펙트를 작동합니다.

```vue
<template>
  <div
    @click="
      play(
        'http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3'
      )
    "
  >
    audioPlayer
  </div>
</template>
<script>
export default {
  methods: {
    play(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  }
};
</script>
```

- 위처럼 오디오 객체를 가져와서 `play()` 메소드로 실행합니다.
- 이외 일시 정지 `pause()` 메소드도 있습니다.

<TagLinks />

<Comment />
