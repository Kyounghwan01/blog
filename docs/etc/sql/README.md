---
title: sql 기본
meta:
  - name: description
    content: sql 기본, select, from, insert, join, serve query, union, groupby, where, table, column, row
  - property: og:title
    content: sql 기본, select, from, insert, join, serve query, union, groupby, where, table, column, row
  - property: og:description
    content: sql 기본, select, from, insert, join, serve query, union, groupby, where, table, column, row
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/sql/
---

# sql 기본

## table 조회

```sql
select * from DB명.table명

select email, age, address from member;
```

### table column값 조건으로 조회

```sql
SELECT * FROM member where age NOT BETWEEN 30 AND 39;
SELECT * FROM member where sign_up_day > '2019-01-01';
SELECT * FROM member where sign_up_day BETWEEN '2018-01-01' AND '2018-12-31';
```

### row의 문자열 조건 조회

```sql
select * from member where address LIKE '서울%'; # 서울을 시작 값 서울특별시
select * from member where address LIKE '%고양시%'; # 앞뒤에 고양시 있는 값 경기 고양시
```

### 날짜 조건으로 조회

```sql
select * from member where year(birthday) = '1992';
select * from member where month(sign_up_day) in (6,7,8);
select * from member where DAYOFMONTH(sign_up_day) BETWEEN 15 AND 31; // 각 달의 (15, 31)사이에 가입한 멤버 조회
# 날짜 차이
select sign_up_day, DATEDIFF(sign_up_day, '2019-01-01') from memer;
```

## 여러개 조건 걸기

```sql
# 두가지 조건을 모두 만족해야 할때
  SELECT * FROM member
  WHERE (gender = 'm' AND height >= 180)
  OR (gender = 'f' AND height >= 170) ;
```

- AND가 OR보다 우선으로 연산됨 그러나 `()` (소괄호)를 이용하면 우선 처리 가능

## 정렬

정렬은 `ORDER BY`를 사용한다

```sql
SELECT sign_up_day, email FROM member
ORDER BY YEAR(sign_up_day) DESC, email ASC;

# string 값을 int로 치환하여 orderby 하고 싶을때
# data 컬럼을 임시적으로 signed(정수) 타입으로 바꿔 정렬한다
select * from member order by CAST(data AS signed) ASC;
```

### 주의

- 각 절의 순서를 맞춰야 문법 에러가 나지 않는다
- select → from → where → order by 순으로 작성한다

## 데이터 일부만 가져오기

데이터의 일부만 가져올 때, `LIMIT`를 사용한다

```sql
# 상위 10개
SELECT * FROM member ORDER BY sign_up_day DESC LIMIT 10;

# 상위 8,9번만 가져옴
SELECT * FROM member ORDER BY sign_up_day DESC LIMIT 8,2;
```

## NULL 다루기

### IS NOT NULL

null이 없는 값만 가져온다

```sql
SELECT * FROM member where address IS NOT NULL;
```

### COALESCE

row에 null 값이 있는경우 원하는 문자로 치환하도록 한다

```sql
# height 컬럼의 row가 null이면 ####로 치환
SELECT
    COALESCE(height,'####'),
    COALESCE(weight, '___'),
    COALESCE(address,'@@@')
FROM member ;
```

### IFNULL

첫번째 인자가 null인 경우 두번째 인자를 표시하고, null이 아니면 해당 값을 리턴

```sql
SELECT IFNULL(height, 'N/A') FROM member;
```

### IF

첫번째 인자가 조건문이 오고 조건이 true일 경우 두번째 인자를 리턴, false이면 세번째 인자 리턴

```sql
SELECT IF(height IS NOT NULL, height, 'N/A') FROM member;
```

## 튀는 값 처리하기

양수만 있어야하는 곳에 음수가 있거나, address가 안드로메다로 들어가있거나

```sql
SELECT AVE(age) FROM member WHERE age BETWEEN 5 AND 100; # 숫자에 조건으로 제외
SELECT * FROM member WHERE address LIKE '%호'; # LIKE ~호로 끝나는 것을 가져옴
```

## 컬럼끼리 계산

select문에서 컬럼끼리 조합하여 값을 산출하면 된다

```sql
SELECT height, weight, weight / ((height / 100) * (height / 100)) from member;
```

## 컬럼에 alias 붙이기

긴 sql문을 단축어로 다룬다

```sql
SELECT CONCAT(height, 'cm', ',', weight, 'kg') AS '키와 몸무게',
weight / ((height/100) * (height/100)) AS BMI
FROM member;

# 컬럼이 '키와 몸무게', 'BMI'로 출력된다
```

### JavaScript switch case문 → SQL CASE ELSE 문

bmi 에 대한 여러 조건이 있을 경우 아래와 같이 CASE 문을 만들어 조건 처리

```sql
SELECT
(CASE
    WHEN weight IS NULL OR height is NULL  then '비만 여부 알 수 없음'
    WHEN weight / ((height/100) * (height/100)) >= 25 then '과체중 또는 비만'
    WHEN weight / ((height/100) * (height/100)) >= 18.5
        AND weight / ((height/100)) * (height/100) < 25
        then '정상'
    ELSE '저체중'
END) AS obesity_check

FROM member
ORDER BY obesity_check ASC;
```

## grouping

### 성별기준으로 그룹

```sql
SELECT * FROM member GROUP BY gender; # m의 row와 f의 row를 나눈다
SELECT gender, COUNT(*) FROM member GROUP BY gender; # m의 row와 f의 row를 나눈다

```

### 성별, 주소기준 그룹 (멀티 기준)

- 주소가 난잡하기 때문에 앞 2개가 같은 경우 그룹핑 (서울사는 사람, 경기사는 사람)
- 여러개의 컬럼을 기준으로 그룹핑 가능 (서울에 사는 남자여자, 경기에 사는 남자여자)

```sql
SELECT SUBSTRING(address, 1, 2) as region, COUNT(*)
FROM member
GROUP BY SUBSTRING(address, 1, 2);
```

[group by res](https://www.notion.so/a696b16504a949bf9bd60e198ebb0412)

### 그룹핑된 기준에서 특정 row 값만 보고 싶을때 (HAVING)

- HAVING을 WHERE로 못바꿈
- where는 맨처음 table에서 row를 조회할때 쓰는 문법
- having은 조회된 쿼리에서 다시 그룹핑하여 그룹내에서 필터링 할때 쓰는 문법

```sql
SELECT
    SUBSTRING(address, 1, 2) AS region,
    gender,
    COUNT(*)
FROM member
GROUP BY
    SUBSTRING(address, 1, 2),
    gender
HAVING
		region IS NOT NULL # regin = '서울'
		AND gender = 'm'
ORDER BY
    region ASC,
    gender DESC;
```

### group by 주의사항

- group by문에서 사용한 컬럼만 select 구분에서 사용할 수 있다 (max, count 같은 집계함수 제외)

  - group 기준으로 사용하지 않은 컬럼을 SELECT문 뒤에 사용하여 조회하려면, 각 그룹의 row중에서 사용하지 않은 컬럼의 값을 어느 row에서 가져와야하는지 모른다

  ### 가능

  ```sql
  SELECT
      SUBSTRING(address, 1, 2) AS region,
      gender,
      COUNT(*)
  FROM member
  GROUP BY
      SUBSTRING(address, 1, 2),
      gender
  HAVING
  		region IS NOT NULL # regin = '서울'
  		AND gender = 'm'
  ORDER BY
      region ASC,
      gender DESC;
  ```

  ### 불가능

  ```sql
  SELECT
      SUBSTRING(address, 1, 2) AS region,
      gender,
      COUNT(*),
  		age # group by에 없기 때문에 선택 불가능
  FROM member
  GROUP BY
      SUBSTRING(address, 1, 2),
      gender
  HAVING
  		region IS NOT NULL # regin = '서울'
  		AND gender = 'm'
  ORDER BY
      region ASC,
      gender DESC;
  ```

  ```sql
  SELECT * FROM member  # Operand should contain 1 column 에러
  GROUP BY
      SUBSTRING(address, 1, 2),
      gender
  HAVING
      SUBSTRING(address, 1, 2) IS NOT NULL # regin = '서울'
  		AND gender = 'm'
  ORDER BY
      SUBSTRING(address, 1, 2) ASC,
      gender DESC;
  # Operand should contain 1 column
  ```

### groupby 된 기준으로 총합을 보여주는 키워드 (WITH ROLLUP)

세부그룹을 중간단위로 합치고 최종으로 모든 row 수를 더한 값까지 확장하여 보여줌

- groupby의 상위 기준에 따라 합쳐줌
  - 현재 region이 gender보다 먼저 사용함으로 region 컬럼 기준으로 합쳐짐

```sql
SELECT
    SUBSTRING(address, 1, 2) AS region,
    gender,
    COUNT(*)

FROM member
GROUP BY
    SUBSTRING(address, 1, 2), // region이 gender보다 먼저 사용함으로 rollup의 기준이됨
    gender
WITH ROLLUP // region 기준으로 즉, 서울의 총합, 경기의 총합을 보여주는 row 생성
having region is not null
ORDER BY
    region ASC,
    gender DESC;
```

### WITH ROLLUP (NULL임을 나타내기 위해 쓰인 NULL vs. 부분 총계을 나타내기 위해 쓰인 NULL)

GROUPING 함수 사용

- GROUPING 함수는 그 인자를 그루핑 기준에서 고려하지 않은 부분 총계인 경우에 1을 리턴하고 그렇지 않은 경우 0을 리턴합니다.

(1) 실제로 NULL을 나타내기 위해 쓰인 NULL인 경우에는 0,

(2) 부분 총계를 나타내기 위해 표시된 NULL은 1

```sql
SELECT
		YEAR(sign_up_day) AS s_year,
    SUBSTRING(address, 1, 2) AS region,
    gender,
		GROUPING(YEAR(sign_up_day)),GROUPING(gender), GROUPING(SUBSTRING(address, 1, 2))
    COUNT(*)

FROM member
GROUP BY
    SUBSTRING(address, 1, 2),
    gender
WITH ROLLUP
having region is not null
ORDER BY
    region ASC,
    gender DESC;
```

## SELECT문 실행 순서

1. SELECT
2. FROM
3. WHERE
4. GROUP BY
5. HAVING
6. ORDER BY
7. LIMIT

## 고유값만 보기

```sql
SELECT DISTINCT(SUBSTRING(address, 1, 2)) FROM member ;
```

## JOIN

### outer join

item table, stock table 조인

```sql
SELECT
    itme.id,
    itme.name,
    stock.iemc_id,
    stock.inventory_count
FROM item LEFT OUTER JOIN stock # 왼쪽 item 테이블을 기준으로 stock 테이블을 합치라
ON item.id = stock.item_id  # item id의 값과 stock의 item_id를 비교하여 같은 row를 합치라
```

- left outer join의 경우 왼쪽 테이블 기준으로 합쳐기지 때문에 item에는 있지만 stock에는 없을 수 있기에 값이 null일 수 있다
- right outer join도 동일한 방식으로 적용

### join시 테이블에 alias

```sql
SELECT
    i.id,
    i.name,
    s.item_id,
    s.inventory_count
FROM item AS i LEFT OUTER JOIN stock AS s
ON i.id = s.item_id
```

### table alias와 colunm alias 차이

- 둘다 긴 문장을 짧게 만드는 점은 동일하다
- column : 조회 결과 테이블 컬럼을 원하는 글자로 보기위함
- table: sql문 전체에 aslias를 적용하여 코딩에 가독성을 위함

### inner join

- 각 테이블에서 join 했을때 둘다 공통으로 가진 row만 가져온다
- 기준 테이블 없음 (row에 null이 있을 수 없음)
- 기준이 없기에 left, right가 없다

```sql
SELECT
    i.id,
    i.name,
    s.item_id,
    s.inventory_count
FROM item AS i INNER JOIN stock AS s
ON i.id = s.item_id;
```

## fk 가 아닌 컬럼으로 join

- left outer join, right outer join, inner join 에 따라 결과 달라진다

```sql
SELECT * from player AS p LEFT OUTER JOIN team AS t
ON p.team = t.team_name;
```

- 이럴때 union을 사용합니다
- \*을 사용할때는 두 테이블의 컬럼이 동일한때 사용가능합니다 그렇지 않으면 공통으로 가지는 컬럼 이름으로 SELECT 절 뒤에 기입합니다

```sql
SELECT * from item;
UNION
SELECT * from item_new;
```

## 테이블 중복 허용하고 합치기 (UNIONALL)

- union은 테이블을 합치되 중복되는 row는 제거
- UNIONALL은 중복되는 row도 반영함

## USING

- 조인 조건으로 사용하는 두 컬럼의 이름이 같으면 ON 대신 USING을 사용

```sql
SELECT * from item AS old INNER JOIN item_new AS new
ON old.id = new.id # 조인 조건이 id로 동일한 상황에서 USING 사용가능

# USING 사용
SELECT * from item AS old INNER JOIN item_new AS new
USING(id)
```

## 세개 테이블 JOIN

- 세개의 테이블을 join하고 여성이 산 의류중 평점이 높은 순으로 나열

```sql
SELECT
        i.id, i.name, avg(star)
FROM
    item AS i LEFT OUTER JOIN review AS r
         ON r.item_id = i.id
    LEFT OUTER JOIN member AS m
         ON r.mem_id = m.id
where m.gender = 'f'
group by i.id, i.name # group by로 조건에 맞는 row를 하나로 합침 (핵심!)
order by avg(star) DESC;
```

- 리뷰수가 1개 이상이고, 별점이 같다면 리뷰가 더 많은 순

```sql
SELECT
        i.id, i.name, avg(star), count(*) as total
FROM
    item AS i LEFT OUTER JOIN review AS r
         ON r.item_id = i.id
    LEFT OUTER JOIN member AS m
         ON r.mem_id = m.id
where m.gender = 'f'
group by i.id, i.name
having count(*) > 1
order by avg(star) DESC, count(*) desc;
```

<TagLinks />

<Comment />
