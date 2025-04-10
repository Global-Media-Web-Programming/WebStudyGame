import Component from '../../../core/Component';
import styles from './GameResultPage.module.css';

export default class GameResultPage extends Component {
  template() {
    const { language } = this.props;

    return `
      <section class="${styles.container}">
        <h1>${language} 수첩 정리</h1>
      </section>
    `;
  }
}
