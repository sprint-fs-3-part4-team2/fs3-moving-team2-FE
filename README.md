# 무빙

## 프로젝트 소개

- 이사 소비자와 이사 전문가 매칭 서비스
- 🗓️ 프로젝트 기간: 2025.02.18 ~ 2025.04.10

# 풀스택 3기 파트4 2팀

## 링크
- [팀 문서](https://weak-lancer-c84.notion.site/1a06152b67c6817ebfd7c32764490c9f?v=1a06152b67c681a39668000c39caa079&pvs=4)
- [스토리북](https://d2fawnkpgj9lx8.cloudfront.net/?path=/story/common-moverinfo-templates-moverinfo--written-review-info)
- [공통 컴포넌트 피그마](https://www.figma.com/design/lXt37bEptE7xr8iHeNu1t7/2%ED%8C%80-%EB%AC%B4%EB%B9%99-%EB%AC%B8%EC%84%9C?node-id=0-1&p=f&t=8FxIfnJBhvXWd4p3-0)
- [배포 링크](https://moving-app.site)

## 팀원 구성
| 이름 | Github |
|------|---------|
| 강대원| https://github.com/Daewony |
| 김태훈| https://github.com/Zero5338 |
| 김현묵| https://github.com/kimhyunmook |
| 배진한| https://github.com/Jin-coding-333 |
| 전준기| https://github.com/JeonJun02 |
| 정유석| https://github.com/yousuk88 | 
| 최종훈| https://github.com/jonghun4 | 
| 최혜지| https://github.com/heziss |
| 함헌규| https://github.com/heonq |

## 기술 스택

- Next.js
- Typescript
- Tailwind CSS
- Storybook
- react-hook-form
- Tanstack-query
- Zustand
- axios

---

## 팀원별 구현 기능 상세

### 강대원

#### 일반 사용자 견적 요청 페이지
- 현재 로그인한 사용자가 제출한 견적요청을 조회
- 견적 요청이 없을 시, 사용자 견적 요청 UI 렌더링
- 모든 견적 질문 완료 시, 견적 요청 API 호출
- 견적 요청이 있을 시, 해당 견적 요약 UI 렌더링 및 견적 상세 페이지 이동 버튼 표시
- DOM 조작 최적화를 위해 useLayoutEffect 훅 활용
- 반응형 구현

#### 기사님이 받은 견적 요청 목록 페이지
- 일반 사용자가 보낸 견적 요청 목록을 조회 및 UI 렌더링
- 견적 요청의 필터링 옵션 구현
  - 스크롤이 내려도 보이도록 Sticky 적용
  - 이사 유형(소형 이사, 가정 이사, 사무실 이사)과 기사님의 서비스 가능 지역과 사용자가 해당 기사님에게 지정 견적 요청 필터 옵션에 맞게 렌더링
  - 필터 옵션을 로컬 스토리지를 활용
- 기사님의 받은 견적 요청에 대한 견적 작성 모달창에서 입력값을 세션 스토리지에 저장하여 데이터 손실 방지 및 사용자의 재작성 시간 감소
- 반응형 구현

#### 모달창 공통 컴포넌트 구현
- ESC 키 닫기, 외부 클릭 닫기, 스크롤 고정 기능 및 스크롤 제거 시 화면 너비 변화 방지 기능 적용

### 김태훈
### 프론트엔드 프로젝트 세팅
   프로젝트에 필요한 라이브러리와 프레임워크들을 설치 및 설정, 깃허브와 연결
   - github
   - tailwind.config
   - global.css 
   - prettier
   - husky
   - storybook
 
 ### 공통 컴포넌트 분석 및 구현 
   아토믹디자인패턴을 적용한 공통컴포넌트를 만들기 위한 회의 후 구현,
   스토리북을 통해 사용성의 편리함을 제공
 <img width="1622" alt="스크린샷 2025-04-14 오전 10 28 00" src="https://github.com/user-attachments/assets/018616af-afa2-4ad7-a3e8-d58357b5a166" />
<img width="1097" alt="스크린샷 2025-04-14 오전 10 28 42" src="https://github.com/user-attachments/assets/a60c29f5-9d32-4933-be2f-fbcfed6b25b7" />
 -  widthType, heightType, backgroundColorType, textColorType, borderColorsType, children 을 통해 자유롭게 커스텀 가능

<img width="1259" alt="스크린샷 2025-04-14 오전 10 30 21" src="https://github.com/user-attachments/assets/2add30b9-a815-416a-b0b8-d80dc06faffc" />
<img width="795" alt="스크린샷 2025-04-14 오전 10 30 54" src="https://github.com/user-attachments/assets/1d487e3f-c41e-4769-a97e-cca867a5c575" />

 ### 작성된 리뷰 페이지
   - 프론트
     UI작업, TanstackQuery를 통한 상태관리, 반응형 페이지, API
<img width="1<img width="927" alt="스크린샷 2025-04-14 오전 10 36 28" src="https://github.com/user-attachments/assets/0c6e8767-1686-4479-a703-341f5618a947" />
000" alt="스크린샷 2025-04-14 오전 10 35 45" src="https://github.com/user-attachments/assets/e5338206-c797-4dfa-8fcd-ad78f86600f3" />

   - 백엔드
     API service, controller, routes

 ### 기사님 마이페이지 
    - 프론트
      UI작업, TanstackQuery를 통한 상태관리, 반응형 페이지, API
<img width="1003" alt="스크린샷 2025-04-14 오전 10 35 08" src="https://github.com/user-attachments/assets/9431234f-73fe-4f57-a430-39b183d68e1c" />

    -백엔드
      API service, controller, routes

### 김현묵


### 배진한


### 전준기


### 정유석


### 최종훈


### 최혜지


### 함헌규

#### 프론트엔드 폴더구조 설정
- 각 페이지 URL을 정하고 이에 맞게 폴더구조를 설정
- 일반,기사 사용자 별로 페이지를 user,mover로 구분
- 내부에 유저 기능과 관련된 페이지를 (auth)로, 그외에 메인 페이지들을 (main)으로 그룹

#### 프론트엔드 배포 설정
- AWS Amplify를 프론트엔드 저장소와 연결하여 main 브랜치에 머지될 때 마다 배포 실행

#### PR 생성 시 테스트 설정
- Pull Request 생성 시 Next build를 실행하고 빌드 성공 여부를 확인하도록 설정

#### 허스키 설정
- 커밋을 진행할 때마다 Eslint 검사와 prettier로 포맷팅하도록 설정
- 이후 검사에 긴 시간이 소요된다는 팀원의 피드백에 따라 스테이징된 파일에 대해서만 검사 및 포맷팅을 하도록 설정

#### 공통 컴포넌트

##### 서비스 뱃지 타입 1
![image](https://github.com/user-attachments/assets/6c8546c6-6c83-4d9e-9c70-e950544b6f0b)


##### 서비스 뱃지 타입 2
![image](https://github.com/user-attachments/assets/413aa4b0-160f-4856-a3f2-5d174dc025ef)


##### 공통 인풋 섹션
![image](https://github.com/user-attachments/assets/5f45df52-adeb-4b3f-9ee9-6d66c3eb7981)


##### 기사님 통계
![image](https://github.com/user-attachments/assets/e2f8741f-9d6c-4b54-bf0b-677226324a3b)


##### 기사님 프로필 컴포넌트 (5가지 타입 선택 가능)
![image](https://github.com/user-attachments/assets/29208f67-36a3-488c-9e9b-125c87aeb639)

##### 견적 정보 컴포넌트
![image](https://github.com/user-attachments/assets/97ba3f8b-8e89-41ec-803c-cb02737ab80f)


##### 고객 정보 컴포넌트
![image](https://github.com/user-attachments/assets/dd8798df-f75c-4950-bfd9-0e48ec9233fd)


##### 리뷰 통계 컴포넌트
![image](https://github.com/user-attachments/assets/ae32f893-9945-41ec-97dd-e88bf2e4bf96)


##### 탭 선택 컴포넌트
![image](https://github.com/user-attachments/assets/bc5e0168-b53d-4d21-9fb0-13acab5cd405)


#### AxiosInstance 설정
- API 호출 시 에러코드가 401일 경우 토큰을 리프레쉬 하도록 설정
- 리프레쉬 하는 API 호출의 결과가 401일 경우 리프레쉬가 무한히 반복되기 때문에 이 경우 리턴하도록 설정
- 프로필 조회 API의 경우 로그인 돼있지 않을 경우 에러가 발생하면 안되기 때문에 401이 아닌 null을 리턴, 프로필 조회 API의 응답이 null일 경우 리프레쉬 토큰을 한번 실행하도록 설정

#### 내가 신청한 견적 요청 페이지
- 현재 로그인한 사용자가 제출한 견적요청을 조회
- 견적요청이 존재할 경우 데이터를 표시
- 견적요청이 없을 경우 견적요청 없음 컴포넌트 표시
- 견적요청이 아직 확정되지 않은 경우 견적요청 취소하기 버튼을 표시
- 버튼을 누르면 모달이 표시되고 확인을 누르면 견적요청 취소
- 견적요청이 확정된 경우 취소하기 버튼을 비활성화

#### 일반 사용자 견적 상세페이지
- 해당 견적 상세 데이터를 조회하고 렌더링
- 현재 조회하는 견적이 보고 있는 사용자의 견적이고 아직 확정되지 않은 경우 견적 확정하기 버튼을 표시

#### 기사님이 보낸 견적 목록 페이지
- 기사님이 보낸 견적 목록을 조회하고 렌더링

#### 기사 사용자 견적 상세페이지
- 해당 견적 상세 데이터를 조회하고 렌더링

#### Query parameter에 따라 toast를 표시하는 WarnProvider 구현

- 쿼리 파라미터에 `?warn={messageKey}`를 입력하면 constants 폴더의 `warningMessage`에 있는 상수 객체에서 messageKey에 해당하는 메시지 값을 toast로 출력
- toast를 직접 호출할 수 없는 상황(백엔드에서 리다이렉션하거나 넥스트 미들웨어에서 리다이렉션할 경우)에 toast를 사용하기 위해 구현
- toast를 표시한 이후 `?warn=` 쿼리파라미터를 제거, 기존의 다른 파라미터는 유지하도록 설정
