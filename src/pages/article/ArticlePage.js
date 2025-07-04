import Component from '../../core/Component';
import ArticleListPage from './ArticleListPage.js';
import './ArticlePage.css';

export default class ArticlePage extends Component {
  template() {
    return `
      <div class="article-layout">
        <main id="content"></main>
      </div>
    `;
  }

  async mounted() {
    const $content = this.$el.querySelector('#content');

    new ArticleListPage($content);
  }
}
