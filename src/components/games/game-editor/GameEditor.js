import Component from '../../../core/Component';
import styles from './GameEditor.module.css';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default class GameEditor extends Component {
  template() {
    const { language, bugCode, inputPos } = this.props;

    if (language === 'html') {
      return `
        <div class=${styles.container}><div id="code-editor" class="${styles.htmlEditor}"></div></div>
      `;
    } else if (language === 'css') {
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

  mounted() {
    const { $el } = this;
    const { language, bugCode, savedCode, onUpdate } = this.props;

    if (language === 'html') {
      this.editor = new EditorView({
        doc: savedCode ?? bugCode,
        extensions: [
          basicSetup,
          html(),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onUpdate(this.editor.state.doc.toString());
            }
          }),
        ],
        parent: $el.querySelector('#code-editor'),
      });
    } else if (language === 'css') {
      const cssInput = $el.querySelector(`.${styles.cssInput}`);
      cssInput.value = savedCode ?? '';

      cssInput.addEventListener('input', () => {
        onUpdate(cssInput.value);
      });
    }
  }

  getValue() {
    if (this.props.language === 'html') {
      return this.editor?.state.doc.toString();
    } else {
      return this.$el.querySelector(`.${styles.cssInput}`)?.value;
    }
  }
}
