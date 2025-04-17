import Component from '../../core/Component';
import styles from './Hint.module.css';
import Button from '../button/Button';
import escapeHtml from '../../utils/escapeHtml';

/**
 * Hint 컴포넌트
 *
 * @property {string} content - 모달 내용 (필수)
 * @property {function} onClose - 모달 닫을 때 실행될 함수
 */
export default class Hint extends Component {
  template() {
    const { content } = this.props;
    const escapedContent = escapeHtml(content, styles.keyword);

    return `
      <div class="${styles.overlay}">
        <div class="${styles.content}">
          <p>${escapedContent}</p>
          <div id="close-btn" class="${styles.closeBtn}"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { onClose } = this.props;
    const defaultOnClose = () => ($el.innerHTML = '');

    const closeButtonEl = $el.querySelector('#close-btn');
    const overlayEl = $el.querySelector(`.${styles.overlay}`);

    new Button(closeButtonEl, {
      id: 'modal-close-btn',
      onClick: () => {
        onClose?.();
        defaultOnClose();
      },
      color: 'purple',
      text: '확인',
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        defaultOnClose();
      }
    });

    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) {
        onClose?.();
        defaultOnClose();
      }
    });
  }
}
