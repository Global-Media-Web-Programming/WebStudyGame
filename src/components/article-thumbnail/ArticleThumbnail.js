import styles from './ArticleThumbnail.module.css';
import Component from '../../core/Component';

export default class ArticleThumbnail extends Component {
  template() {
    const { title, desc } = this.props;

    return `
      <article class="${styles.container}">
        <div class="${styles.infoSection}">
          <div class="${styles.infoHeader}">
            <div class="${styles.infoHeaderRow}">
            </div>
            <h2 class="${styles.title}">${title}</h2>
          </div> 

          <p class="${styles.description}">${desc}</p>
        </div>
      </div>
      </article>
    `;
  }
}
