import Component from '../../core/Component';
import styles from './Button.module.css';

/**
 * Button 컴포넌트
 *
 * @property {string} id - 고유 식별자 (필수)
 * @property {function} onClick - 버튼 클릭 시 호출될 콜백 함수 (필수)
 * @property {string} [text=''] - 버튼에 표시될 텍스트
 * @property {'purple' | 'yellow'} [color='purple'] - 버튼 색상
 * @property {boolean} [shadow=false] - 그림자 효과 여부
 */

export default class Button extends Component {
  template() {
    const { id, text = '', color = 'purple', shadow = false } = this.props;

    return `
      <button data-button-id="${id}" class="${styles.button} ${styles[color]} ${shadow ? styles.shadow : ''}">
        ${text}
      </button>
    `;
  }

  setEvent() {
    const { id, onClick } = this.props;
    if (!id || !onClick) return;

    this.addEvent('click', `[data-button-id="${id}"]`, (e) => {
      onClick(e);
    });
  }
}
