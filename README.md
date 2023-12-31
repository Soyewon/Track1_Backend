
<div align=center>
	
# _Discover Your Limitless Track_ <br><br>
# _🥁음악 프로듀서–보컬 매칭 플랫폼🎸_ <br>
<img width="600" alt="스크린샷 2023-01-18 오후 6 53 26" src="https://user-images.githubusercontent.com/75441684/213140181-d49cbdc6-5917-4546-a3c4-0000a454ae8f.png">

</div> <br><br>

## <strong> 💫 Track-1 핵심기능  </strong>
### <strong>1️⃣    녹음 댓글 기능 </strong><br>
 프로듀서가 스케치곡을 업로드하면 보컬들이 이를 다운로드 받아 각자 녹음 후 녹음 파일을 댓글로 업로드합니다. <br>
 곡을 올린 프로듀서는 이들의 녹음 파일을 들어보며 가장 마음에 드는 보컬에게 연락합니다.<br><br>
<div align=left>
	<img width="400" alt="스크린샷 2023-01-18 오후 6 50 21" src="https://user-images.githubusercontent.com/75441684/213141924-fe3ae8fb-7530-4198-991f-7b07af68696c.png">
</div>

### <strong>2️⃣    카테고리별 곡/보컬 필터 기능</strong> <br>
 보컬은 트랙 검색 페이지에서 자신이 부르고 싶은 장르의 곡을 필터링하여 들어볼 수 있습니다. <br>
 반대로 프로듀서는 보컬 검색 페이지에서 본인이 작업한 곡의 장르에 맞는 보컬들을 필터링하여 들어볼 수 있습니다. <br><br>
 
<div align=left>
	<img width="400" alt="스크린샷 2023-01-18 오후 6 50 32" src="https://user-images.githubusercontent.com/75441684/213145847-253e5df0-2b6c-4d9c-a155-e30416c78e23.png">

</div>

### <strong>3️⃣    뮤지션 프로필 기능 </strong><br>
 보컬과 프로듀서는 본인이 작업한 작업물을 각자의 프로필 페이지에 포트폴리오의 형태로 업로드할 수 있습니다. <br>
 이 중 가장 자신있는 작업물을 타이틀 곡으로 설정할 수 있습니다. 보컬의 경우 보컬 검색 탭에서 타이틀 곡을 추가 depth 없이 바로 들어볼 수 있습니다. <br><br><br>
<div align=left>
<img width="400" alt="스크린샷 2023-01-18 오후 6 50 42" src="https://user-images.githubusercontent.com/75441684/213146044-0ea73f33-2454-40c0-a962-ff1b0ae1bd9a.png">
</div><br><br>

## <strong> 💻  Server </strong>
|<img src="https://user-images.githubusercontent.com/75441684/211896210-69dc0940-99af-46c2-b6d1-9be3729229f1.jpeg" width="300">|<img src="https://avatars.githubusercontent.com/u/86148470?v=4" width="300">|
|:------:|:------:|
|[김다현](https://github.com/dahyunnee)(Server)|[소예원](https://github.com/Soyewon)(Server)|

<br>

### <strong> ✔️ ERD </strong>
<br>
<img width="786" alt="스크린샷 2023-01-05 오후 6 22 16" src="https://user-images.githubusercontent.com/75441684/210745543-e9939509-1a2f-4675-ab22-c2707f196a28.png">
<br/>
<br/>

### <strong> 👩🏻‍💻 역할 분담 </strong>
<img width="705" alt="스크린샷 2022-12-31 오후 3 20 58" src="https://user-images.githubusercontent.com/86148470/210127304-762814aa-6323-40ee-85b4-282d64c06931.png">


<br>

### <strong> 🏃 Used 🏃 </strong>
<br>
<p>
<img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/><br>
<img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black"/>
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white"/>
</p>
  
<br>

## 🏃 Coding Convention 🏃
<br>
<details markdown="1">
<summary>네이밍</summary>

### DB

- DB 이름은 **UpperCamelCase**를 사용합니다.

<br>

### 함수, 변수, 타입
- 함수와 변수에는 **lowerCamelCase**를 사용합니다.
- 함수명은 동사로 시작합니다.
- 타입명은 **파스칼케이스**를 사용합니다.
  - interface이름에 I를 붙이지 않습니다.
- 기본 클래스 파일을 생성하거나 컴포넌트를 생성할 때는 약어 규칙에 따라 네이밍합니다.  

<br>

### 변수 네이밍

- `사진` → photo
- `유저` → user 
- `배열을 담은 변수`→ ~s(복수형)
- `상태` → status 

---
</details>

<br>

## ✉️ Commit Strategy

```
feature : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
test : 테스트 코드 추가
refactor : 코드 리팩토링
style : 코드 의미에 영향을 주지 않는 변경사항
chore : 빌드 부분 혹은 패키지 매니저 수정사항
```
<br>

## 🗂 프로젝트 폴더링

```jsx

📦 config             
 ┣ 📜 index.ts
 ┗ 📜 s3Config.ts

📦 controller               
 ┣ 📜 index.ts
 ┣ 📜 mypageController.ts
 ┣ 📜 profileController.ts
 ┣ 📜 tracksController.ts
 ┣ 📜 userController.ts
 ┗ 📜 vocalsController.ts

📦 interfaces                
 ┗ 📂 user
 ┃ ┣ 📜 index.ts
 ┃ ┣ 📜 ProducerCreateDTO.ts
 ┃ ┣ 📜 UserLogInDTO.ts
 ┃ ┗ 📜 vocalsController.ts
 ┗ 📜 index.ts
 
 📦 middlewares               
 ┗ 📂 S3download
 ┃ ┣ 📜 index.ts
 ┗ 📂 S3upload
 ┃ ┣ 📜 index.ts
 ┃ ┣ 📜 uploadCommentWav.ts
 ┃ ┣ 📜 uploadProfileImage.ts
 ┃ ┗ 📜 uploadWavAndImage.ts
 ┗ 📂 user
 ┃ ┣ 📜 auth.ts
 ┃ ┣ 📜 index.ts
 ┃ ┗ 📜 validator.ts
 ┗ 📜 index.ts

📦 constants                  
 ┣ 📜 index.ts
 ┣ 📜 responseMessage.ts
 ┣ 📜 reponse.ts
 ┣ 📜 statusCode.ts
 ┗ 📜 tokenType.ts

📦 modules                   
 ┗ 📜 jwtHandler.ts

📦 router                   
 ┣ 📜 index.ts
 ┣ 📜 mypageRouter.ts
 ┣ 📜 profileRouter.ts
 ┣ 📜 tracksRouter.ts
 ┣ 📜 userRouter.ts
 ┗ 📜 vocalsRouter.ts
 
📦 service                  
 ┣ 📜 index.ts
 ┣ 📜 mypageService.ts
 ┣ 📜 profileService.ts
 ┣ 📜 tracksService.ts
 ┣ 📜 userService.ts
 ┗ 📜 vocalsService.ts
 
📜 index.ts
```

## ✨ Branch Strategy
<br>
	
### 🌴 브랜치
#### 📌 브랜치 단위
- 브랜치 단위 = 이슈 단위 = PR단위

#### 📌 브랜치명
- 브랜치는 뷰 단위로 생성합니다.
- 브랜치 규칙 → feature/#이슈번호
- `ex) feature/#1`
- 공통적인 것 작업 - Global
    - feature/chore/fix/network

<br>
## <strong> API 로직 구현 진척도 : 100% </strong>
<br>
<br>

## <strong> ✍️ API 명세서 링크 </strong>

[API 명세서](https://granite-allosaurus-84c.notion.site/API-Docs-76a02ccc9b4e4fe9bd4dc48335242ec5)

<br>

## <strong> 📁 Dependencies module (package.json) </strong>


```json
{
  "dependencies": {
    "@aws-sdk/client-s3": "^3.218.0",
    "@aws-sdk/s3-request-presigner": "^3.241.0",
    "@prisma/client": "^4.6.0",
    "@types/supertest": "^2.0.12",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dayjs": "^1.11.7",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "get-audio-duration": "^3.1.1",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^3.0.1",
    "node-fetch": "2",
    "prisma": "^4.6.0"
  },
  "name": "Track1-server",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/Track1-client/backend.git",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "create:distFolder": "tsc",
    "db:pull": "npx prisma db pull && npx prisma generate",
    "db:push": "npx prisma db push && npx prisma generate",
    "mocha": "mocha src/test/*.ts -r ts-node/register --exit --timeout 1000000"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/chai": "^4.3.4",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.15",
    "@types/express-validator": "^3.0.0",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/lodash": "^4.14.191",
    "@types/mocha": "^10.0.1",
    "@types/multer": "^1.4.7",
    "@types/multer-s3": "^3.0.0",
    "@types/node": "^18.11.17",
    "chai": "^4.3.7",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.6.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.4"
  }
}
```

<br>
<br>

## <strong> ⚙️ server architecture </strong>
![KakaoTalk_Photo_2023-01-11-21-13-36](https://user-images.githubusercontent.com/86148470/211803771-39cfd867-9193-4564-9250-21c897193ea3.jpeg)



