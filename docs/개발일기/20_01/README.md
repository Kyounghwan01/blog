# 2020.01월

## 1월 이슈 요약
- 설정 - 예약 / 취소 타입 자유롭게 설정
  - lacture, course 및 수업 만들기, 수업 수정 페이지 모두 관여
- 매출 - 기간별 조회 기능
- 기술 - vuex 상태 초기화 안되게 저장
- sms - sms 기눙 구현 (90%)
- 엑셀 - 회원 엑셀 다운로드 필터(수강권) 추가
- 엑셀 - 만료회원도 다운로드되는 로직 수정
- 엑셀 - 스튜디오 오너만 다운로드 되도록 수정

## 1.3
- 만료된 회원 포함 하지 않도록 필터를 해도 만료된 회원 포함됨 수정
- sms 기능 member to day 요구 (15일)

## 1.6
- aws 서버 다운 시 행동요령
  - eb -> 다운 서버 우클릭 -> 앱 서버 다시 시작
  - ec2 -> 다운 서버 검색 및 우클릭 -> 인스턴스 재부팅
- 1.7 productio 반영전 qa test
  web staging 반영되었습니다.
- [SM-1736] 수강권별로 예약가능한 시간 설정
- [SM-1937] 기간제 예약 취소 가능 횟수 설정

1. 회원의 기간제 취소 횟수 보임 또는 안보임 변경이력표시
2. 취소 가능 횟수 문구 수정
3. 기간제수강권 티켓요약 정보 수정 (전체, 잔여, 예약가능 횟수 사항 제거)
4. 수강권 취소가능횟수 일괄 표시 제거 또는 보이기 (edited)

## 1.7
- 배포 전 배포 이슈 qa test
- 첫 배포
  - 수강권 업그레이드 이슈 발생
    - 수강권 업그레이드 대상이 없을 경우 length가 없다는 에러 도출, 분기처리로 해결

## 1.8
- 회원 목록 엑셀 다운로드시 그룹/프라이빗에 대한 구분 필터 요구
- 예약/취소 시간 별 범위 제한, 동일 또는 시작시간이 끝시간보다 더 클시 noti알림 및 에러처리 로직 헬퍼 유틸 함수 제작
- react styled-component 공부

## 1.13
- 월별 이용 횟수 제한 설정 layout 완료
  - 백엔드 api부재로 작업 지연
- 기간별 매출 코드 분석

## 1.14
- 회원 필터 개선 (일정 - 만료된 회원 표시 ui 수정)
- staging 올리기
  - 엑셀다운로드 오너만 하도록
  - 엑셀 만료된 수강권 누르지 않으면 사용중, 예정만 뜨도록

## 1.21
- sms 메세지 작성시 바이트 체크 util 함수 제작
- sms와 앱 푸시 component 분기
- 기간별 매출 확인 완료

## 1.22
- 수업 일괄 수정시 예약 타입 (group_booking_type, cancel_type) 보정 안되는 이슈 해결
- Vuex-persistedstate : 모든 module의 store에 저장되던 이슈 지정한 paths store만 저장되도록 수정
:::tip TIP posting
**[vuex 새로고침시 상태 초기화 방지](https://kyounghwan01.github.io/blog/Vue/vuex/vuex-persistedstate/)**
:::
- yarn으로 설치시 gyp 다운로드 안되는 이슈 - 1. 먼저 package.json에 패키지 적고 인스톨할때 waiting하면 취소

## 1.23
- 날짜 스타일 변경
  - 2020-01-23 -> 2020. 1.23

## 1.24
- vue 프로젝트시 자주 쓰는 파일 전역으로 관리하기
:::tip TIP posting
**[vue 파일 전역으로 관리하기](https://kyounghwan01.github.io/blog/Vue/vue/dir/)**
:::

## 1.28
- Emit 사용법
    - 자식이 부모한테 영향 주는 방법
    - 부모컴포넌트에서 먼저 함수를 정의한다
        - <자식 @자식으로보낼함수명=“함수명”/>
        - 자식은 “$emit(부모가보낸함수명, 인자)” 로 호출가능
- 부모 -> 자식 props 넘기기
    - <부모 :propname=“propValue”/>
    - 자식
        - Props : {propname : Number}
        - this.propname으로 호출, templete는 propname으로 호출<br>
:::tip TIP posting
**[vue props 전달 및 event 상속](https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/)**
:::
- sms 리스트 렌더

## 1.29
- sms list에서 메세지 필터( sms, lms, 전체 ) 기능 추가 (디자인 안나옴)
  - watch 개념 사용
```vue
<template>
  <el-radio-group v-model="smsType">
    <el-radio v-for="option in smsTypeOptions"
    :key="option.label" :label="option.value">
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

// 위와 같이 라디오는 v-model은 smsType을 따른 다고 할 때,

<script>
export default {
  data(){
    return {
      smsType: 'ALL',
      smsTypeOptions: [
        { value: 'ALL', label: '전체' },
        { value: 'SMS', label: 'SMS' },
        { value: 'LMS', label: 'LMS' },
      ],
    }
  },
  watch: {
     smsType() {
      this.getMessages();
    },
  }
  //watch로 smsType변경을 감지하고 있으니 라디오가 변경 될 때마다
  //this.getMessages 함수가 실행된다.
}
</script>

```


## 1.30
- sms list layout 변경
  - column에 결과보기 버튼 추가
  - 결과보기 클릭시 전송된 시간, 대상자, 전송결과 출력
  - sms list에서 row클릭시 smsDetail로 이동하여 메세지에 대한 내용 및 디테일 보여줌
  - 메세지 전송 이전 포인트 부족시 모달 완성 (잔여포인트 < 발송예정 초인트)

## 1.31

- sms detail 페이지 -> 이전, 다음 리스트 부르기 위한 api 요청 (query string 이용)
- queryString

```js
export default {
  get: (id, type, filter) =>
    axios.get(`${BASE_URL}/${id}`, {
      params: {
        type: type,
        filter: filter
      }
    })
};
//위와 같이 get안에서 params를 포함한다.
//network에는 https://urlname?type="type"&filter="filter"로 찍힌다.
```

- 예약 취소, 예약 수정 기능 구현
  - 예약 취소 : `deleted_at` 파람을 추가로 넣어주면 그 문자는 `send_on`시간이 되어도 전송되지 않는다.
  - 예약 수정 : 새로운 파람들을 기반으로 기존 `sms id`는 유지되고 값이 모두 바뀐다.
