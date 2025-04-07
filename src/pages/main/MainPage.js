import Component from '../../core/Component';
import styles from './MainPage.module.css';
import LatestItems from '../../components/latest-items/LatestItems';
import GameTumbnail from '../../components/game-thumbnail/GameTumbnail';

export default class MainPage extends Component {
  template() {
    return `
      <section class="${styles.container}">
        <section id="latest-items" class="${styles.latestSection}">
        </section>
        <section class="${styles.gameSection}">
          <div id="game-thumbnail-html"></div>
          <div id="game-thumbnail-css"></div>
        </section>
      </section>
    `;
  }

  mounted() {
    const { $el } = this;

    const latestItemsEl = $el.querySelector('#latest-items');
    new LatestItems(latestItemsEl);

    const htmlThumbEl = $el.querySelector('#game-thumbnail-html');
    new GameTumbnail(htmlThumbEl, { language: 'html' });

    const cssThumbEl = $el.querySelector('#game-thumbnail-css');
    new GameTumbnail(cssThumbEl, { language: 'css', imgPos: 'left' });
  }
}
