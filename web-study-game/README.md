# TEAM6 - 웹 계산기 과제

## 📂 프로젝트 소개

### HTML, CSS 학습을 위한 게임 사이트입니다.

&nbsp;

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                             Tool                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Bundler     |                                                               ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                |
|    Language     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) |
|     Styling     |                                                               ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)                                                                |
|    Formatting    |      ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)      |
| Package Manager |                                                                 ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                 |
| Version Control |       ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)       |
|   Deployment    |                                                            ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)                                                             |
|  Collaboration  |          ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)           |

</div>

&nbsp;

## 🔩 프로젝트 설정 및 실행 방법

### 1. 프로젝트 클론하기

먼저, Git 저장소에서 프로젝트를 로컬로 클론해야 합니다. 터미널(또는 명령 프롬프트)을 열고 아래 명령어를 입력합니다.

```bash
git clone https://github.com/Global-Media-Web-Programming/WebStudyGame.git
```

해당 명령어는 지정된 Git 저장소에서 프로젝트를 로컬 컴퓨터로 복사해옵니다.

### 2. 의존성 설치

프로젝트가 로컬에 클론된 후, 프로젝트 폴더로 이동한 다음, 필요한 패키지들을 설치해야 합니다.
Node.js 기반 프로젝트인 경우, `npm` 명령어를 사용하여 의존성을 설치할 수 있습니다.

```bash
npm install
```

이 명령어는 `package.json` 파일에 정의된 모든 의존성(dependencies)을 자동으로 설치해 줍니다.

### 3. 개발 서버 실행

모든 의존성이 설치되면, 개발 서버를 실행하여 프로젝트를 로컬에서 테스트할 수 있습니다.

```bash
npm run dev
```

이 명령어를 통해 개발 모드에서 서버를 시작하며, 변경 사항이 있을 때 자동으로 갱신됩니다.
이후, 브라우저에서 `http://localhost:5173` 주소로 접속하여 애플리케이션을 확인할 수 있습니다.

&nbsp;

## 📄 폴더 구조

```

```
&nbsp;

## 📌 우리의 컨벤션

### 파일 컨벤션

- 폴더명: lowercase 또는 kebab-case
- 파일명: PascalCase

### 코드 컨벤션

- 함수: export default function FunctionName(){}
- 변수명: camelCase
- 상수명: UPPER_SNAKE_CASE

### 커밋 컨벤션

e.g. style: 홈페이지 스타일링 (#이슈번호)
- `feat`: 새로운 기능 추가
- `style`: css 수정 및 코드의 의미에 영향을 미치지 않는 변경사항
- `fix`: 버그 수정
- `refactor`: 리팩토링, 기능 변화 없이 코드 구조 개선
- `chore`: 코드 수정 외 잡다한 작업 (빌드 과정이나 설정 변경 등)
- `docs`: 문서 변경
- `test`: 테스트 코드 추가 또는 수정

**정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.** <br/>
**코드 품질 관리는 `eslint`로, 코드 포맷팅은 `prettier`로, 커밋 메시지 관리는 `commitlint`로 했습니다. 팀원들과 소통하여 코딩 컨벤션을 구축했습니다.** <br/>
**그리고 `husky`를 사용해 규칙에 맞지 않으면 커밋을 제한했습니다.** <br/>

### 브랜치 전략

**main, develop** 브랜치와 **feat** 보조 브랜치를 사용했습니다.

- **main**: 배포 단계에서만 사용하는 브랜치
- **develop**: 개발 단계에서 main 역할을 하는 브랜치
- **feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제
  - feat 브랜치 이름 규칙: `feat/기능명-이슈번호` e.g. feat/admin-login-12

&nbsp;

## 🕓 프로젝트 진행 과정

### 기획 (2025.3.20 ~ 2025.3.27)

전체적인 서비스를 구상하고, 컨셉 기획을 했습니다.

### [피그마](https://www.figma.com/design/B5VpHCpeqzbfz9eTsGIxls/%EA%B0%80%EB%B0%986%EC%A1%B0_Figma?node-id=0-1&t=PlyAdR7YgujGTUtR-1) 작성 (2025.3.28 ~ 2025.4.1)

피그마로 디자인 작업을 하며 서비스의 구체적인 기능과 필요한 데이터를 정립했습니다.

### 퍼블리싱 (2025.4.2 ~ 2025.4.6)

역할을 분담해 페이지별 퍼블리싱 작업 위주로 개발했습니다.

### 기능 구현 (2025.4.7 ~ 2025.4.16)

역할을 분담해 전체적인 기능을 구현했습니다.

&nbsp;

## 🚀 주요 페이지와 기능

### ☁️ 반응형 디자인

모든 페이지에 다양한 디바이스에서 작동할 수 있도록 스타일을 적용했습니다.

### ✔️ 메인 페이지

### ✔️ HTML 게임 페이지

### ✔️ CSS 게임 페이지

### ✔️ 개발자 소개 페이지

&nbsp;

## 💁 구성원

| [![AndyH0ng](https://avatars.githubusercontent.com/u/60703412?v=4)](https://github.com/AndyH0ng) | [![duwlsssss](https://avatars.githubusercontent.com/u/92291790?v=4)](https://github.com/duwlsssss) | [![minji2424](https://avatars.githubusercontent.com/u/162069481?v=4)](https://github.com/minji2424) | [![jangtaebin3](https://avatars.githubusercontent.com/u/162237964?v=4)](https://github.com/jangtaebin3) |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| **🍀 [홍준우](https://github.com/AndyH0ng)** | **🍀 [김여진](https://github.com/duwlsssss)** | **🍀 [박민지](https://github.com/minji2424)** | **🍀 [장태빈](https://github.com/jangtaebin3)** |
| 역할 | 역할 | 역할 | 역할 |

&nbsp;

## 📝 KPT 회고

### 🍀 홍준우

- **KEEP**

- **PROBLEM**
  
- **TRY**
  
&nbsp;

### 🍀 김여진

- **KEEP**

- **PROBLEM**
  
- **TRY**

&nbsp;

### 🍀 박민지

- **KEEP**

- **PROBLEM**
  
- **TRY**

&nbsp;

### 🍀 장태빈

- **KEEP**

- **PROBLEM**
  
- **TRY**