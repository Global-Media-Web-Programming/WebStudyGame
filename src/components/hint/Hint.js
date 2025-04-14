import Component from '../../core/Component';
import styles from './Hint.module.css';
import Button from '../button/Button';

/**
 * Hint 컴포넌트
 *
 * @property {string} content - 모달 내용 (필수)
 * @property {function} onClose - 모달 닫을 때 실행될 함수
 */
export default class Hint extends Component {
  template() {
    const { content } = this.props;
    return `
      <div class="${styles.modalOverlay}">
        <div class="${styles.modalContent}">
          ${content}
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
    const overlayEl = $el.querySelector(`.${styles.modalOverlay}`);

    new Button(closeButtonEl, {
      id: 'modal-close-btn',
      onClick: () => {
        onClose?.();
        defaultOnClose();
      },
      color: 'purple',
      text: this.props.closeBtnText,
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
