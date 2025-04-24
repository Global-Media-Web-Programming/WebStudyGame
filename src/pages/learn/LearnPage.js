import Component from '../../core/Component';
import LearnListPage from './LearnListPage.js';
import './LearnPage.css';

export default class ArticlePage extends Component {
  template() {
    return `
      <div class="learn-layout">
        <main id="content"></main>
      </div>
    `;
  }

  async mounted() {
    const $content = this.$el.querySelector('#content');

    new LearnListPage($content);
  }
}
