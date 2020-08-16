# 2020.08월

## 8월 이슈 요약

- react로 기존 네이티브 앱 웹뷰로 만들기 진행 중
- 기존 vue 웹 유지보수

## 에러 해결 모음

### 1. Warning: Functions are not valid as a React child.

```
Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
```

- 함수인데 실행 안하고 render 부분에 코딩한 경우입니다.
- 함수 코드를 render에 넣었으니 당연히 정상적인 실행이 안되겠죠

```jsx
const Example = () => {
  const bookingStateTime = () => {
    switch (booking.status) {
      case "booking_confirmed":
      case "booked":
        return `예약 일시 : ${booking.created_at}`;
      case "cancel":
        return `취소 일시 : ${booking.lecture.course.updated_at}`;
      default:
        return `수정 일시 : ${booking.lecture.course.updated_at}`;
    }
  };
  return <span>{bookingStateTime}</span>;
};
```

- 위처럼 특정 함수를 만들고 render 부분에서 실행 안하고 함수만 호출시 위 같은 에러가 뜹니다.
- 해결방법은 함수 실행해주면 됩니다.

```jsx
const Example = () => {
  const bookingStateTime = () => {
    switch (booking.status) {
      case "booking_confirmed":
      case "booked":
        return `예약 일시 : ${booking.created_at}`;
      case "cancel":
        return `취소 일시 : ${booking.lecture.course.updated_at}`;
      default:
        return `수정 일시 : ${booking.lecture.course.updated_at}`;
    }
  };
  return <span>{bookingStateTime()}</span>;
};
```

## 배운점

### 1. react - 공용 컴포넌트

- `this.props.children` 다루는 법
- 중복 컴포넌트 최소화 시키기
- [정리](https://kyounghwan01.github.io/blog/React/common-component/)

### 2. python - 네이버 기사 크롤링

- `request`, `bs4` 이용하여 네이버 기사 크롤링
- [정리](https://kyounghwan01.github.io/blog/기타/python/naver-news-crawling/)

### 3. html - dataset 사용법

- [정리](https://kyounghwan01.github.io/blog/기타/html/dataset/)

<Disqus />
