import Component from '../../core/Component';
import ArticleThumbnail from '../../components/article-thumbnail/ArticleThumbnail.js';

export default class LearnPage extends Component {
  template() {
    return `
      <div class="learn-list"></div>
    `;
  }

  mounted() {
    const $list = this.$el.querySelector('.learn-list');
    if (!$list) {
      console.error('Error: .learn-list element not found');
      return;
    }

    const { learns } = this.props;

    learns.forEach((learn) => {
      const $thumbnail = document.createElement('div');
      $list.appendChild($thumbnail);

      new ArticleThumbnail($thumbnail, {
        title: learn.title,
        desc: learn.description,
      });

      $thumbnail.addEventListener('click', () => {
        window.location.href = `/learn/${learn.id}`;
      });
    });
  }
}
