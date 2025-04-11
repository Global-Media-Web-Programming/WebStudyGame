import Component from '../../../core/Component';
import styles from './GameResultPage.module.css';
import NotFoundPage from '../../not-found/NotFoundPage.js';

export default class GameResultPage extends Component {
  template() {
    const { language } = this.props;

    // HTML 페이지 콘텐츠
    if (language === 'html') {
      return `
    <section class="${styles.container}">

      <!-- 🔻 HTML 태그 표시 영역 -->
<div class="${styles.header}">
  <div class="${styles.labelLine}">
    <span class="${styles.icon}">&lt;/&gt;</span>
    <span class="${styles.label}">HTML</span>
  </div>
  <hr class="${styles.divider}" />
</div>

      <h1 class="${styles.title}">축하합니다!</h1>
      <p class="${styles.subtitle}">모든 버그를 해결하셨습니다.</p>

      <p class="${styles.description}">
        <strong class="${styles.bold}">탐정 수첩</strong>에 오늘 해결한 버그가 기록됐으니 다음 사건을 위해 꼼꼼히 읽어보세요!
      </p>

        <div class="${styles.noteBox}">
          <p class="${styles.date}">2025. 04. 10. 탐정 수첩</p>

          <h3 class="${styles.sectionTitle}">1. 제목을 나타내는 <span>HTML 태그</span></h3>
          <ul class="${styles.tagList}">
            <li><code>&lt;h1&gt;</code>: 가장 중요한 제목 (보통 페이지 메인 제목)</li>
            <li><code>&lt;h2&gt;</code>: 부제목 또는 섹션 제목</li>
            <li><code>&lt;h3&gt;</code>: 하위 섹션 제목</li>
            <li><code>&lt;h4&gt;~&lt;h6&gt;</code>: 점점 더 작은 중요도의 제목</li>
          </ul>

          <div class="${styles.codeExample}">
            <code><span class="${styles.codeTag}">&lt;h1&gt;</span>이것은 가장 중요한 제목입니다<span class="${styles.codeTag}">&lt;/h1&gt;</span></code><br />
            <code><span class="${styles.codeTag}">&lt;h2&gt;</span>이것은 두 번째로 중요한 제목입니다<span class="${styles.codeTag}">&lt;/h2&gt;</span></code><br />
            <code><span class="${styles.codeTag}">&lt;h3&gt;</span>이것은 세 번째 수준의 제목입니다<span class="${styles.codeTag}">&lt;/h3&gt;</span></code>
          </div>

          <p class="${styles.tip}">보통 한 페이지에 <strong>&lt;h1&gt;</strong>은 하나만 사용하고, SEO와 접근성을 위해 순서대로 사용하는 것이 좋다.</p>
        </div>
      </section>
      `;
    }

    // CSS 페이지 콘텐츠
    else if (language === 'css') {
      return `
      <section class="${styles.container}">
        <h1 class="${styles.title}">축하합니다!</h1>
        <p class="${styles.subtitle}">CSS 버그를 모두 해결하셨습니다.</p>

        <p class="${styles.description}">
          <strong>탐정 수첩</strong>에 오늘 정리한 내용을 복습하고, 다음 사건에도 멋지게 도전하세요!
        </p>

        <div class="${styles.noteBox}">
          <p class="${styles.date}">2025. 04. 11. 탐정 수첩</p>

          <h3 class="${styles.sectionTitle}">1. 선택자와 스타일 선언</h3>
          <ul class="${styles.tagList}">
            <li><code>선택자 { 속성: 값; }</code> 구조를 기억하세요.</li>
            <li><code>.클래스</code>는 class 속성을 가진 요소를 선택합니다.</li>
            <li><code>#아이디</code>는 고유한 id를 가진 요소를 선택합니다.</li>
          </ul>

          <div class="${styles.codeExample}">
            <code>.title { color: blue; font-size: 20px; }</code><br />
            <code>#main { background-color: #eee; }</code>
          </div>

          <p class="${styles.tip}">스타일은 위에서 아래로, 더 구체적인 선택자가 우선됩니다. 충돌이 날 때는 마지막에 선언된 값이 적용돼요!</p>
        </div>
      </section>
      `;
    }

    // 예외 처리
    else {
      return NotFoundPage;
    }
  }
}
