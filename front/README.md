## 음성인식 API를 이용한 TODO리스트

### 프로젝트 요약

- 음성인식 (Speech To Text API) 를 이용한 TODO 리스트
---

### 개발환경

- BE
    - 서버 : Express
    - DB : Mysql(Sequalize)
- FE
    - Next.js
    - React.js (redux , redux-saga)
    - UI FrameWork : Ant-Design
- 역할 :
Backend :  Mysql 과 sequalize로 js환경에서 DB 연결 및 Express 활용하여 RESTAPI 사용

    음성인식 : Speech-To-Text 로 string을 액션별로 나누어 dispatch

    Front : Next.js를 이용하고 redux, redux-saga 액션 설정 및 컴포넌트 구성

---

### pages

#### 1. TODO 페이지
- 음성인식을 통한 일정등록
    <div>
    <img width="250" src="https://user-images.githubusercontent.com/60589856/100239253-89d3c100-2f74-11eb-98de-7ece89d0e89c.gif"></img>
    </div>
    </br>

- 음성인식을 통한 일정삭제,완료
    
    <div>
    <img width="250" src="https://user-images.githubusercontent.com/60589856/100241247-d6200080-2f76-11eb-8194-3c4736bbcc38.gif"></img>
    </div>
    </br>
#### 2.  MONTH 페이지

- 캘린더 형식의 월별 일정 검색
    <div>
    <img width="250" src="https://user-images.githubusercontent.com/60589856/100241383-f94ab000-2f76-11eb-9277-9cb68021cbe4.gif"></img>
    </div>
    </br>

#### 3. GOAL 페이지

- 목표 관리 기능
  </br>
    <div>
    <img width="270" src="https://user-images.githubusercontent.com/60589856/100241573-2f882f80-2f77-11eb-9abb-9f76ea402b28.PNG"></img>
    <img width="200" src="https://user-images.githubusercontent.com/60589856/100241578-30b95c80-2f77-11eb-90dd-5d3425652c59.PNG"/>
    </div>
