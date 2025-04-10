import styles from './GameHeader.module.css';
import Component from '../../../core/Component';

export default class GameHeader extends Component {
  template() {
    const { language } = this.props;
    console.log('language from GamePage', language);
    const languageIcon = language === 'html' ? '< />' : '{ }';
    return `
      <div class="${styles.container}">
        <span class="${styles.languageIcon} ${styles[language]}">${languageIcon}</span>
        <span>${language.toUpperCase()}</span>
      </div>
    `;
  }
}
