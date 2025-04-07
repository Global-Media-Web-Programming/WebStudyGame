import Component from '../../core/Component';
import styles from './Button.module.css';

export default class Button extends Component {
  template() {
    /**
     * color: purple | yellow
     * shadow: true | false
     */
    const { color = 'purple', shadow = false, text = '' } = this.props;

    console.log(this.props);

    return `
      <button class="${styles.button} ${styles[color]} ${shadow ? styles.shadow : ''}">
        ${text}
      </button>
    `;
  }
}
