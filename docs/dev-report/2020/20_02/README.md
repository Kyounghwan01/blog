# 2020.02월

## 2월 이슈 요약

- git merge 방법, git 꼬였을 때, 마스터 브랜치 사로 가져와서 커밋 추적 및 손머지
- 회계장부 개인 프로젝트 시작
- pagenation 및 next, prev 호출법

## Vuepress 기반 블로그 작성 시작

- 카테고리 분류
- 메인페이지 수정
- Header tab 변경

## 회계장부 관리 프로젝트

- Stack : vue, ~~그렙큐엘 예정~~
- ui : element-ui
- ~~serverless로 로컬스토리지로 일단 프론트 부터 제작 예정~~
- firebase

* reduce 함수 응용
  ```js
  let largeArray = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ];
  //위 배열을 하나의 통으로 만들고 싶을때
  let concatArray = largeArray.reduce(
    (combine, nextArray) => combine.concat(nextArray),
    []
  );
  //concatArray = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8......]
  ```

## 원치 않은 파일도 같이 머지될 때

- master에서 새 sms 브랜치 만들어 qa에 있는 sms, payment관련 로직 가져옴 (대략 40개 파일)
- 머지

```shell
예시) 현재 작업 브랜치 이름 : SM-gh
작업완료
git push origin SM-gh (현재 브랜치 : SM-gh)
git checkout qa (현재 브랜치: qa)
git pull origin qa (현재 브랜치: qa)
git merge SM-gh (현재 브랜치: qa) - **컨플릭이 날 경우 브랜치 옮기지 말고 여기서 해결.
vscode내에서 컨플릭 해결 후
git add .
git commit -m "컨플릭해결문구"
git push origin qa (현재 브랜치: qa)

```

## iframe 사용

```html
<iframe :src="결재번호+고객번호"></iframe>
```

## width값 초과시 아래로 줄 내리기

- 휴대폰 기종에 따라 `width` 값이 모두 달라 한 기종에 맞출 수 없음. 가장 많이 쓰는 핸드폰의 해상도에 맞추어 `width`값을 한정 후 그 값 이상으로 올라가면 자르고 아랫줄에서 보이게 해결. <br>띄어쓰기의 경우 바로 줄내림을 해야하는데 css `white-space: pre-line;, word-break: break-word;` 로 해결

```vue
<template>
  <div class="preview-message">
    <p>{{ message }}</p>
  </div>
</template>
<style>
.preview-message {
  white-space: pre-line;
  height: 500px;
  width: 370px;
  overflow-y: auto;
  p {
    word-break: break-word;
  }
}
</style>
```

<Comment />
