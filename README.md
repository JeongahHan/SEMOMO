# SEMOMO

# I.프로젝트 정보
<br>
<br>

**1. 소개**
> 모임끼리 소통하기 쉬운 세상의 모든 모임(세모모) '소모임 플랫폼'
<br>
<br>

**2. 제작기간**
> 기간 : 2023.10.01 ~ 2023.10.24 (3주)
<br>
<br>

**3. 주요기능**
>+ 소모임 <br>
>    + 소모임 개설
>    + 소모임 가입 승인
>    + 모임 장소(지도로 표시),날짜,시간
>    + 모임원 참가or취소
>    + 관심 모임 저장<br>
>+ 소모임 內 게시판 <br>
>    + 사진첩 및 게시판 작성
>    + 게시판 댓글 작성
>    + 댓글 內 좋아요 버튼 기능<br>
>+ 개인 피드 <br>
>    + 유저끼리 팔로우/팔로잉 기능 
>    + 피드 작성
>    + 피드 댓글 작성
>    + 댓글 內 좋아요 버튼 기능<br>
>+ 통합검색 시, 소모인 & 피드 동시 확인
>+ 참여중인 모임의 채팅방 이용 기능 구현
>+ 관리자 : 신고 당한 모임 관리 / 블랙 회원 관리 / 공지사항 게시판
>+ 마이페이지 <br>
>    + 내 정보 수정 
>    + 내가 참여하고 있는 모임 조회
>    + 내가 찜한 모임 조회
>    + 관리자 페이지
>    + 내 피드 조회<br>
<br>
<br>

**4.개발 환경**
<br>
<br>


<img width="841" alt="image" src="https://github.com/JeongahHan/SEMOMO/assets/142190043/2a3287f4-60b3-4c77-929c-90df11bb161c">



<br>
<br>

**5. ERD**

![image](https://github.com/JeongahHan/Greenbook/assets/142190043/c9578c10-e833-4bb9-adf8-19b50ff569e5)


<br>
<br>

**6. 참여인원 및 역할분담**
>|이름|구현기능|
>|---|---|
>|한정아<br>(본인)|<img width="650" alt="image" src="https://github.com/JeongahHan/Greenbook/assets/142190043/a61fe489-6f33-4cc1-bacf-4a49d3ddfed3">|
>|이유나|<img width="650" alt="image" src="https://github.com/JeongahHan/Greenbook/assets/142190043/5d9fa025-5bc6-4b54-8a24-99dc95a2baf8">|
>|최명훈|<img width="650" alt="image" src="https://github.com/JeongahHan/Greenbook/assets/142190043/de54c6eb-0a32-4296-bc9d-e345dc83b343">|
>|유재욱|<img width="650" alt="image" src="https://github.com/JeongahHan/Greenbook/assets/142190043/a5cebb3a-e3ae-4626-8d4f-a87bb4a1608e">|
>|송슬기|<img width="650" alt="image" src="https://github.com/JeongahHan/Greenbook/assets/142190043/e175d855-31da-47d9-9fb4-20da78e76207">|

<br>
<br>
<br>
<br>

# II.구현결과


내 기능
-----------
**1.전체적인 front구성**
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/cb2a56af-c834-48ed-ab43-ef526aeb98c3">
</p>
<br>
<br>
<br>
<br>

**2.메인 내 찜 많은 상품 Top20 기능 구현**
<div align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/8fc3b1e2-0b42-43f4-b62e-7eb84d115679">
</div>
<br>
<br>
<br>
<br>

**3.외부 베스트셀러 API가져오기**
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/be150ba3-ea71-4671-ab00-65077f53fbf2">
</p>
<br>
<br>
<br>
<br>

**4.독서후기게시판 제작**
+ 게시판 글 작성 / 읽기 / 수정 / 삭제
+ 게시판 내 (제목,내용,작성자) 분류하여 검색 기능 구현
<br>
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/832844cb-7968-4217-b6e4-534741ef4e6e">
</p>
<br>
<br>
<br>
<br>

**5.댓글 / 좋아요 기능구현**
+ 댓글 작성 / 읽기 / 수정 / 삭제
+ 댓글 좋아요 / 좋아요 취소
+ 유저한테 쪽지보내기 기능 연결 
<br>
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/eb69fd7c-993e-4e3f-9d84-dd9acf77c6f3">
</p>
<br>
<br>
<br>
<br>

**6. 모든 글 통합검색**
+ 통합검색 내 필터기능구현 (중고책방 게시판 글  / 독서노트 게시판 글)
+ 검색 항목 없을 시 , 이전으로 돌아가기
<br>
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/647bbc31-453d-49bb-b559-9f18b3a9f269">
</p>
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/9c3b2250-c965-43aa-802f-0a55ddcf74a6">
</p>
<br>
<br>
<br>
<br>

**7. 회사소개**
+ 스크롤에 반응하는 소개 페이지 제작
<br>
<p align-="center">
  <img src="https://github.com/JeongahHan/Greenbook/assets/142190043/c24d6bbd-4ee8-45f6-9425-69c08a6a4812">
</p>
<br>
<br>
<br>
<br>










