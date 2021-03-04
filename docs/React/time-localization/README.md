---
meta:
  - name: description
    content: react - time localize (서버 시간과 지역이 다른 웹 시간 동기화)
  - property: og:title
    content: react - time localize (서버 시간과 지역이 다른 웹 시간 동기화)
  - property: og:description
    content: react - time localize (서버 시간과 지역이 다른 웹 시간 동기화)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/time-localization/
---

# 서버 시간과 지역이 다른 웹 시간 동기화

> 서버는 한국에 있어 time값은 한국시간을 기준으로 사용하지만, 접속하는 웹의 지역이 미국인 경우 서버 시간으로 웹을 보여주면, time localize가 안되 있기 때문에 보정이 안된 값을 보여지게 됩니다

## 오류 상황 예시

예를 들면 아래와 같은 상황입니다.

1. 미국 뉴욕은 한국시간보다 13시간이 빠릅니다 (한국 - 일요일 오후 9시 -> 뉴욕 - 일요일 오전 8시)
2. 한국에서 뉴욕 유저에게 한국 현지시간 오후 9시에 어떠한 값을 보정했습니다. (변경내역 - 시간 : 일요일 오후 9시)
3. 시간 현지화가 안되어 있다면, 뉴욕 유저에게는 변경된 내역은 오후 9시로 보여집니다. (현재화 하며 일요일 오전 8시에 변경 되었다 보여줘야합니다)

## 해결 방법

1. 웹에 맨 처음 접속시, 서버의 시간을 알기 위한 api를 호출 합니다. (저희 회사에서는 서버 timestamp값을 response 해줍니다.)
2. timestamp값을 받으면, `new Date()`값을 사용하며, 현재 웹 시간값을 가져온 후, 서버시간과 현재시간을 뺀 값을 브라우저에 저장합니다.

```js
const getServerTime = async () => {
  const serverTime = await ping.getTime();
  const diffTime = moment
    .duration(moment().diff(moment(serverTime.data.timestamp.date)))
    .asSeconds();
  if (diffTime < 60) {
    // 60초 이하는 보정하지 않습니다.
    localStorage.setItem("diff-time", 0);
  } else {
    // 초 이하 단위는 사용하지 않습니다.
    localStorage.setItem("diff-time", Math.floor(diffTime));
  }
};
```

3. 유틸 함수를 만듭니다. 그 함수에는 브라우저에 저장한 값을 가져와서, 서버에서 가져온 값에 보정시킵니다.

```js
 localTime(value) {
    const localTime = localStorage.getItem('diff-time');
    return moment(value).add(localTime, 'm').format('YYYY-MM-DD HH:mm:ss');
  },
```

## 결론

위 방법대로 사용시 어느 지역에서 이용하든 동일한 시간대를 유지할 수 있습니다.

<TagLinks />

<Comment />
