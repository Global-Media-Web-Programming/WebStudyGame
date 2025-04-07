import Component from '../../../core/Component';
// import styles from './ArticleDetailPage.module.css';

export default class ArticleDetailPage extends Component {
  template() {
    const { id } = this.props;
    return `
      <div>${id}</div>
    `;
  }
}
