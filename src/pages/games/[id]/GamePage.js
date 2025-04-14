import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameLanguage from '../../../components/games/game-language/GameLanguage';
import Button from '../../../components/button/Button';
import Hint from '../../../components/hint/Hint';
import parseHTML from '../../../utils/parseHtml';
import compareDOM from '../../../utils/compareDom';

/**
 * @property {'html' | 'css'} language - 언어 (필수)
 */
export default class GamePage extends Component {
  template() {
    return `
      <div class="${styles.editorContainer}">
        <div class="${styles.gameHeader}">
          <div id="game-language"></div>
          <div class="${styles.btnContainer}">
            <div id="hint-btn"></div>
            <div id="next-btn"></div>
          </div>
        </div>
        <textarea id="code-editor" class="${styles.codeEditor}"></textarea>
        <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts"></iframe>
        <div id="hint"></div>
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language } = this.props;

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const hintBtnEl = $el.querySelector('#hint-btn');
    const hintEl = $el.querySelector('#hint');
    new Button(hintBtnEl, {
      id: 'html-game-btn',
      text: '힌트 보기',
      color: 'yellow',
      onClick: () => {
        new Hint(hintEl, {
          content:
            '`value` 속성을 `placeholder` 처럼 잘못 사용함 (입력 불가능하게 됨)',
        });
      },
    });

    const textarea = $el.querySelector('#code-editor');
    const iframe = $el.querySelector('#code-preview');

    const initialCode = `
      <img></img>
    `;

    textarea.value = initialCode;

    const answercode = `
      <img src="/assets/img/puppy.jpg">
    `;

    function updatePreview() {
      const code = textarea.value;
      iframe.srcdoc = code;

      // html로 parse
      const userDOM = parseHTML(code);
      const answerDOM = parseHTML(answercode);

      // 비교해 정답 여부 체크
      const isCorrect = compareDOM(userDOM, answerDOM);
      console.log(isCorrect);
    }

    // 실시간 업데이트
    textarea.addEventListener('input', updatePreview);
    // 초기 렌더링
    updatePreview();
  }
}
