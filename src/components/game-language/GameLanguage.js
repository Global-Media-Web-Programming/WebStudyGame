import styles from './GameLanguage.module.css';
import Component from '../../core/Component';

export default class GameLanguage extends Component {
  template() {
    const { language } = this.props;
    const languageIcon = language === 'html' ? '< />' : '{ }';
    return `
      <div class="${styles.container}">
        <span class="${styles.languageIcon} ${styles[language]}">${languageIcon}</span>
        <span>${language.toUpperCase()}</span>
      </div>
    `;
  }
}
