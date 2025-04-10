import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameHeader from '../../../components/games/game-header/GameHeader';

export default class GamePage extends Component {
  template() {
    return `
      <div class="${styles.editorContainer}">
        <div id="game-header"></div>
        <textarea id="code-editor" class="${styles.codeEditor}"></textarea>
        <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts"></iframe>
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language } = this.props;

    const gameHeaderEl = $el.querySelector('#game-header');
    new GameHeader(gameHeaderEl, { language });

    const textarea = document.getElementById('code-editor');
    const iframe = document.getElementById('code-preview');

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
