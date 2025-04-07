import Component from '../../core/Component';
import styles from './NotFoundPage.module.css';

export default class NotFoundPage extends Component {
  template() {
    return `
      <div class="${styles.container}">
        <h1>찾을 수 없는 페이지</h1>
      </div>
    `;
  }
}
