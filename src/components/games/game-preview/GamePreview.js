import Component from '../../../core/Component';
import styles from './GamePreview.module.css';
import parseHTML from '../../../utils/parseHtml';
import compareDOM from '../../../utils/compareDom';

export default class GamePreview extends Component {
  template() {
    return `
      <div class="${styles.subSection}">
        <h4 class="${styles.subSectionTitle}">﹒결과</h4>
        <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts allow-same-origin allow-modals"></iframe>
      </div>
    `;
  }

  mounted() {
    const {
      initialCode,
      otherCode,
      language,
      answer,
      onCheck,
      bugCode,
      inputPos,
    } = this.props;
    this.iframe = this.$el.querySelector('#code-preview');
    this.initialCode = initialCode;
    this.bugCode = bugCode;

    // 초기 렌더링
    if (language === 'html') {
      this.iframe.srcdoc = `<!DOCTYPE html><html><body>${initialCode}</body></html>`;
      const userDOM = parseHTML(initialCode);
      const answerDOM = parseHTML(answer);
      onCheck(compareDOM(userDOM, answerDOM));
    } else if (language === 'css') {
      const bugCodeLines = this.bugCode.split('\n');
      const { line, start, end } = inputPos;
      const targetLine = bugCodeLines[line];
      const before = targetLine.substring(0, start);
      const after = targetLine.substring(end);
      bugCodeLines[line] = before + (initialCode ?? '') + after;

      const style = `<style>${bugCodeLines.join('\n')}</style>`;
      this.iframe.srcdoc = `<!DOCTYPE html><html><head>${style}</head><body>${otherCode}</body></html>`;

      const normalizedUserAnswer = initialCode
        ?.replace(/\s+/g, '')
        .replace(/['"]/g, '"')
        .replace(/(?<=\d)\.(?=\d)/g, '');
      const normalizedAnswer = answer
        .replace(/\s+/g, '')
        .replace(/['"]/g, '"')
        .replace(/(?<=\d)\.(?=\d)/g, '');
      onCheck(normalizedUserAnswer === normalizedAnswer);
    }
  }

  updatePreview(code, otherCode, language, answer, inputPos) {
    if (!this.iframe) return false;

    if (language === 'html') {
      this.iframe.srcdoc = `<!DOCTYPE html><html><body>${code}</body></html>`;
      const userDOM = parseHTML(code);
      const answerDOM = parseHTML(answer);
      return compareDOM(userDOM, answerDOM);
    } else if (language === 'css') {
      const bugCodeLines = this.bugCode.split('\n');
      const { line, start, end } = inputPos;
      const targetLine = bugCodeLines[line];
      const before = targetLine.substring(0, start);
      const after = targetLine.substring(end);
      bugCodeLines[line] = before + (code ?? '') + after;

      const style = `<style>${bugCodeLines.join('\n')}</style>`;
      this.iframe.srcdoc = `<!DOCTYPE html><html><head>${style}</head><body>${otherCode}</body></html>`;

      const normalizedUserAnswer = code
        ?.replace(/\s+/g, '')
        .replace(/['"]/g, '"')
        .replace(/(?<=\d)\.(?=\d)/g, '');
      const normalizedAnswer = answer
        .replace(/\s+/g, '')
        .replace(/['"]/g, '"')
        .replace(/(?<=\d)\.(?=\d)/g, '');
      // console.log(normalizedUserAnswer, normalizedAnswer);
      return normalizedUserAnswer === normalizedAnswer;
    }
  }
}
