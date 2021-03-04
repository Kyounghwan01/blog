---
title: React.js - 이벤트 발생시 스크롤 맨 밑으로 내리기
meta:
  - name: description
    content: React.js - 이벤트 발생시 스크롤 맨 밑으로 내리기, react, setState, scroll, event, useRef
  - property: og:title
    content: React.js - 이벤트 발생시 스크롤 맨 밑으로 내리기
  - property: og:description
    content: React.js - 이벤트 발생시 스크롤 맨 밑으로 내리기, react, setState, scroll, event, useRef
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/event-scroll-bottom/
tags: ["react"]
---

# 이벤트 발생시 스크롤 맨 밑으로 내리기

이번 포스팅은 채팅 또는 댓글 추가로 인하여 이벤트 발생시, 화면을 가장 밑으로 내리는 방법에 대해 알아보겠습니다.

## ref 사용하기

이벤트 발생시 돔을 강제로 가져와서 조작해야하니 당연히 `ref`를 사용해야 합니다.
react를 사용하니 `useRef`를 이용하여 ref를 사용합니다.

```jsx
import React, { useRef } from "react";

const RefExample = () => {
  ➊ const scrollRef = useRef();
};
```

## ref 넣을 타겟 설정

가장 밑으로 내릴 element 대상을 선정하여 ref 값을 부여합니다.

```jsx
import React, { useRef } from "react";

const RefExample = () => {
  const scrollRef = useRef();

  return (
    ➊
    <div ref={scrollRef}>
      {
        commnet.map({content, member}) => {
          return (
            <List>
              <Item>
                {content}
                {member.name}
              </Item>
            </List>
          )
        })
      }
    </div>
  )
};
```

## 아래로 내리는 이벤트 추가

저는 댓글이 추가될 경우 이벤트가 발생하여, 스크롤을 가장 밑으로 내리는 작업을 하였습니다.

댓글이 추가될 경우 store의 `editDone`이 `true`로 바뀌게됩니다.

`useEffect`에 `editDone`이 `true`로 바뀌면, 스크롤이 가장 밑으로 내리는 함수가 실행됩니다.

```jsx
import React, { useRef, useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';

const RefExample = () => {
  const scrollRef = useRef();
  ➊ const { editDone } = useSelector(state => state.board);

  ➋ const scrollToBottom = useCallback(() => {
    if (editDone) {
      // 스크롤 내리기
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [editDone]);

  ➌ useEffect(() => {
    RefExample();
  }, [RefExample])


  return (
    <div ref={scrollRef}>
      {
        commnet.map({content, member}) => {
          return (
            <List>
              <Item>
                {content}
                {member.name}
              </Item>
            </List>
          )
        })
      }
    </div>
  )
};
```

<TagLinks />

<Comment />
