import Component from '../../../core/Component';
import styles from './GamePage.module.css';

export default class GamePage extends Component {
  template() {
    const { language } = this.props;
    return `
      <div class="${styles.editorContainer}">
        <h1>${language}</h1>
        <textarea id="code-editor" class="${styles.codeEditor}"></textarea>
        <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts"></iframe>
      </div>
    `;
  }

  mounted() {
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
