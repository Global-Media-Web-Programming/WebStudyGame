import Component from '../../../core/Component';
import styles from './GameOtherCode.module.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default class GameOtherCode extends Component {
  template() {
    const { language, otherCode } = this.props;

    if (!otherCode) return '';

    return `
      <div class="${styles.subSection}">
        <h4 class="${styles.subSectionTitle}">﹒${language === 'html' ? 'CSS' : 'HTML'} 코드</h4>
        <div id="other-code" class="${styles.otherCode}"></div>
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language, otherCode } = this.props;

    if (otherCode) {
      const otherCodeEl = $el.querySelector('#other-code');
      otherCodeEl.innerHTML = hljs.highlight(otherCode, {
        language: language === 'html' ? 'css' : 'html',
      }).value;
    }
  }
}
