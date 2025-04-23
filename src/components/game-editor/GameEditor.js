import Component from '../../core/Component';
import styles from './GameEditor.module.css';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html'; // HTML 언어 모드 추가
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default class GameEditor extends Component {
  // template 메서드는 코드 에디터를 표시하는 HTML을 반환합니다.
  template() {
    const { language, bugCode, inputPos } = this.props;

    // language가 html일 경우
    if (language === 'html') {
      return `
        <div class=${styles.container}>
          <div id="code-editor" class="${styles.htmlEditor}"></div>
        </div>
      `;
    }
    // language가 css일 경우
    else if (language === 'css') {
      const bugCodeLines = bugCode.split('\n');
      const { line, start, end } = inputPos;

      const targetLine = bugCodeLines[line];
      const before = targetLine.substring(0, start);
      const after = targetLine.substring(end);
      const inputTag = `<input type="text" class="${styles.cssInput}" placeholder="정답 입력">`;

      const placeholder = '___INPUT_PLACEHOLDER___';
      bugCodeLines[line] = before + placeholder + after;

      let highlightedCode = hljs.highlight(bugCodeLines.join('\n'), {
        language: 'css',
      }).value;
      highlightedCode = highlightedCode.replace(placeholder, inputTag);

      return `
        <section class=${styles.container}>
          <div class="${styles.cssEditor}">
            <pre><code>${highlightedCode}</code></pre>
          </div>
        </section>
      `;
    }
  }

  // mounted 메서드는 컴포넌트가 DOM에 마운트된 후 실행됩니다. 여기서 코드 에디터를 초기화합니다.
  mounted() {
    const { $el } = this;
    const { language, bugCode, savedCode, onUpdate } = this.props;

    // language가 html일 경우
    if (language === 'html') {
      // HTML 모드를 적용하여 EditorView 초기화
      this.editor = new EditorView({
        doc: savedCode ?? bugCode, // 저장된 코드가 있으면 사용
        extensions: [
          basicSetup, // 기본 설정
          html(), // HTML 언어 모드 추가
          EditorView.lineWrapping, // 줄 바꿈 설정
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onUpdate(this.editor.state.doc.toString()); // 코드 변경 시 onUpdate 호출
            }
          }),
        ],
        parent: $el.querySelector('#code-editor'), // 코드 에디터가 렌더링될 부모 요소
      });
    }
    // language가 css일 경우
    else if (language === 'css') {
      // CSS 입력 필드 설정
      const cssInput = $el.querySelector(`.${styles.cssInput}`);
      cssInput.value = savedCode ?? ''; // 저장된 CSS 코드가 있으면 사용

      // CSS 입력 필드에서 입력값을 실시간으로 처리
      cssInput.addEventListener('input', () => {
        onUpdate(cssInput.value);
      });
    }
  }

  // getValue 메서드는 현재 에디터의 값을 반환합니다.
  getValue() {
    if (this.props.language === 'html') {
      return this.editor?.state.doc.toString(); // HTML 코드 반환
    } else {
      return this.$el.querySelector(`.${styles.cssInput}`)?.value; // CSS 코드 반환
    }
  }
}
