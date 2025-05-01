# 6조 [Code News](https://web-study-game.vercel.app/)

## 📂 프로젝트 소개

### 🕵️‍♂️ 탐정 컨셉의 HTML, CSS 학습을 위한 사이트입니다.

> 당신이 일하는 곳은 전설적인 탐정 사무소, "CODE NEWS".
> 세계 곳곳에서 수상한 버그 사건들이 접수되며, 당신의 임무는 이를 해결하는 것! 하지만 단순한 버그가 아니다. 때때로 누군가 고의로 버그를 심어 놓기도 하고,
> 웹사이트 속 숨겨진 단서를 통해 더 깊은 문제를 발견할 수도 있다.

&nbsp;

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                             Tool                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Bundler     |                                                               ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                |
|    Language     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) |
|     Styling     |                                                               ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)                                                                |
|   Formatting    |      ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)      |
| Package Manager |                                                                 ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                 |
| Version Control |       ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)       |
|   Deployment    |                                                            ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)                                                             |
|  Collaboration  |                                                            ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)                                                             |

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
📁 src/
├── 📁 components/
│   ├── 📁 button/
│   │   ├── 📄 Button.js
│   │   └── 📄 Button.module.css
│   └── 📁 layout/
│       ├── 📄 Layout.js
│       └── 📄 Layout.module.css
├── 📁 constants/
│   └── 📄 routes.js
├── 📁 core/
│   └── 📄 Component.js
├── 📁 data/
│   └── 📁 games/
│       ├── 📄 cssGames.json
│       └── 📄 htmlGames.json
├── 📁 pages/
│   └── 📁 games/
│       └── 📁 [id]/
│           ├── 📄 GamePage.js
│           └── 📄 GamePage.module.css
├── 📁 store/
│   └── 📄 Store.js
└── 📁 utils/
    ├── 📄 compareDom.js
    ├── 📄 escapeHtml.js
    ├── 📄 navigate.js
    └── 📄 parseHtml.js
```

&nbsp;

## 📌 우리의 컨벤션

### 네이밍 컨벤션

- 폴더명: `kebab-case` → e.g. navigation-bar, server-actions
- 파일명:

  - 기본 파일: `camelCase` → e.g. calculate.ts, apiClient.ts
  - 컴포넌트 파일: `PascalCase` → e.g. Button.tsx, ProductList.tsx

- 변수 및 함수

  - 함수명: `camelCase` → e.g. fetchProducts(), handleSubmit()
  - 변수명: `camelCase` → e.g. userName, itemCount
  - 상수명: UPPER_SNAKE_CASE
  - 화살표 함수

    - 컴포넌트: 하단에 default export

      ```js
      const ProductList = () => {
        return <div>상품 리스트</div>;
      };
      ```

    - 여러 가지 함수: 각 함수를 named export
      ```js
      export const fetchItems = () => {
        /* ... */
      };
      export const updateUser = () => {
        /* ... */
      };
      ```

  - 컴포넌트
    컴포넌트명: `PascalCase` → e.g. Header, LoginForm
    페이지 컴포넌트: `Page 접미사 사용` → e.g. MainPage, CartPage

### 커밋 컨벤션

e.g. style: 홈페이지 스타일링

- `feat`: 새로운 기능 추가
- `style`: css 수정 및 코드의 의미에 영향을 미치지 않는 변경사항
- `fix`: 버그 수정
- `refactor`: 리팩토링, 기능 변화 없이 코드 구조 개선
- `chore`: 코드 수정 외 잡다한 작업 (빌드 과정이나 설정 변경 등)
- `docs`: 문서 변경
- `test`: 테스트 코드 추가 또는 수정
- `rename`: 파일, 폴더, 변수 등 이름 변경
- `remove`: 파일, 폴더, 변수 등 삭제
- `comment`: 주석 추가, 삭제, 수정

**정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.** <br/>
**코드 품질 관리는 `eslint`로, 코드 포맷팅은 `prettier`로, 스타일 코드 포맷팅은 `stylelint`로, 커밋 메시지 관리는 `commitlint`로 했습니다. 팀원들과 소통하여 코딩 컨벤션을 구축했습니다.** <br/>
**그리고 `husky`를 사용해 규칙에 맞지 않으면 커밋을 제한했습니다.** <br/>

### 브랜치 전략

**main, develop** 브랜치와 **feat** 보조 브랜치를 사용했습니다.

- **main**: 배포 가능한 안정적인 상태의 코드를 유지
- **develop**: 기능 개발이 완료된 코드가 머지되는 브랜치
- **feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제 / issue 하나 당-branch 하나, PR 하나
  - feat 브랜치 이름 규칙: `feat/기능명-이슈번호` e.g. feat/admin-login-12

&nbsp;

## 🕓 프로젝트 진행 과정

### 기획 (2025.3.20 ~ 2025.3.27)

전체적인 서비스를 구상하고, 컨셉 기획을 했습니다.

### [피그마](https://www.figma.com/design/B5VpHCpeqzbfz9eTsGIxls/%EA%B0%80%EB%B0%986%EC%A1%B0_Figma?node-id=0-1&t=PlyAdR7YgujGTUtR-1) 작성 (2025.3.28 ~ 2025.4.1)

피그마로 디자인 작업을 하며 서비스의 구체적인 기능과 필요한 데이터를 정립했습니다.

### 퍼블리싱 (2025.4.2 ~ 2025.4.6)

역할을 분담해 페이지별 퍼블리싱 작업 위주로 개발했습니다.

### 기능 구현 (2025.4.7 ~ 2025.4.20)

역할을 분담해 전체적인 기능을 구현했습니다.

&nbsp;

## 💁 구성원

<table>
  <tr>
    <td align="center"><a href="https://github.com/AndyH0ng"><img src="https://avatars.githubusercontent.com/u/60703412?v=4" width="100px;" alt="AndyH0ng"/><br /><sub><b>🍀 홍준우</b></sub></a></td>
    <td align="center"><a href="https://github.com/duwlsssss"><img src="https://avatars.githubusercontent.com/u/92291790?v=4" width="100px;" alt="duwlsssss"/><br /><sub><b>🍀 김여진</b></sub></a></td>
    <td align="center"><a href="https://github.com/minji2424"><img src="https://avatars.githubusercontent.com/u/162069481?v=4" width="100px;" alt="minji2424"/><br /><sub><b>🍀 박민지</b></sub></a></td>
    <td align="center"><a href="https://github.com/jangtaebin3"><img src="https://avatars.githubusercontent.com/u/162237964?v=4" width="100px;" alt="jangtaebin3"/><br /><sub><b>🍀 장태빈</b></sub></a></td>
  </tr>
  <tr>
    <td align="center">역할: 개념, 아티클 페이지</td>
    <td align="center">역할: 프로젝트 세팅, 게임 페이지</td>
    <td align="center">역할: 게임 결과 페이지</td>
    <td align="center">역할: 메뉴바 컴포넌트 개발</td>
  </tr>
</table>
