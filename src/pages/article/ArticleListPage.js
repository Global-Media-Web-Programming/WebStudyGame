import Component from '../../core/Component';
import ArticleThumbnail from '../../components/article-thumbnail/ArticleThumbnail';
import articles from '../../data/articles.json';

export default class ArticleListPage extends Component {
  template() {
    return `
        <div class="article-list"></div>
    `;
  }

  mounted() {
    const $list = this.$el.querySelector('.article-list');

    articles.forEach((article) => {
      const $thumbnail = document.createElement('div');
      $list.appendChild($thumbnail);

      new ArticleThumbnail($thumbnail, {
        title: article.title,
        image: article.image,
        desc: article.hint,
      });

      $thumbnail.addEventListener('click', () => {
        window.location.href = `/article/${article.id}`;
      });
    });
  }
}
