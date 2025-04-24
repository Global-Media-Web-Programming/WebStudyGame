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

    // JSON -> obj
    const learns = await fetch('/data/learns.json').then((response) =>
      response.json(),
    );

    new LearnListPage($content, { learns });
  }
}
