import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameLanguage from '../../../components/games/game-language/GameLanguage';

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
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language } = this.props;

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const textarea = $el.querySelector('#code-editor');
    const iframe = $el.querySelector('#code-preview');

    const initialCode = `
      <style>
        h1 { color: red; }
      </style>
      <h1>Hello Bug!</h1>
      <script>
        console.log('버그 발생!'); 
      </script>
    `;
    textarea.value = initialCode;

    function updatePreview() {
      const code = textarea.value;
      iframe.srcdoc = code;
    }

    // 초기 렌더링
    updatePreview();

    // 실시간 업데이트
    textarea.addEventListener('input', updatePreview);
  }
}
