import Component from '../../core/Component';
import styles from './LatestItems.module.css';
import articles from '../../data/articles.json';
import navigate from '../../utils/navigate';
import { BUILD_ROUTES } from '../../constants/routes';

export default class LatestItems extends Component {
  template() {
    return `
      <h2 class="${styles.latestTitle}">최신 소식</h2>
      <section class="${styles.container}"></section>
    `;
  }

  mounted() {
    const container = this.$el.querySelector(`.${styles.container}`);

    articles.forEach(({ id, title }) => {
      const articleEl = document.createElement('article');
      articleEl.className = styles.article;
      articleEl.dataset.id = id;
      articleEl.innerHTML = `
        <h2 class="${styles.articleTitle}">📜 ${title}</h2>
      `;

      container.appendChild(articleEl);
    });
  }

  setEvent() {
    this.addEvent('click', `.${styles.article}`, (e) => {
      const articleEl = e.target.closest(`.${styles.article}`);
      const articleId = articleEl.dataset.id;
      navigate(BUILD_ROUTES.ARTICLE_DETAIL(articleId));
    });
  }
}
