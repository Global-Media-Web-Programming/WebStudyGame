import Component from '../../core/Component';
import styles from './LatestItems.module.css';
import articles from '../../data/articles.json';
import navigate from '../../utils/navigate';

export default class LatestItems extends Component {
  template() {
    return `
      <h2 class="${styles.latestTitle}">최신 소식</h2>
      <section class="${styles.container}">
      </section>
    `;
  }

  mounted() {
    const container = this.$el.querySelector(`.${styles.container}`);

    articles.forEach(({ id, title, image }) => {
      const articleEl = document.createElement('article');
      articleEl.className = styles.article;
      articleEl.dataset.id = id;
      articleEl.innerHTML = `
        <img src="${image}" alt="${title}-thumbnail" class="${styles.img}" />
      `;

      container.appendChild(articleEl);
    });
  }

  setEvent() {
    this.addEvent('click', `.${styles.article}`, (e) => {
      const articleEl = e.target.closest(`.${styles.article}`);
      const articleId = articleEl.dataset.id;
      navigate(`/article/${articleId}`);
    });
  }
}
