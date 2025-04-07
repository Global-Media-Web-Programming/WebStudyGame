import Component from '../../core/Component';
import styles from './GamesPage.module.css';
import GameTumbnail from '../../components/game-thumbnail/GameTumbnail';

export default class GamesPage extends Component {
  template() {
    return `
      <section class="${styles.container}">
        <div id="game-thumbnail-html"></div>
        <div id="game-thumbnail-css"></div>
      </section>
    `;
  }

  mounted() {
    const { $el } = this;

    const htmlThumbEl = $el.querySelector('#game-thumbnail-html');
    new GameTumbnail(htmlThumbEl, { language: 'html' });

    const cssThumbEl = $el.querySelector('#game-thumbnail-css');
    new GameTumbnail(cssThumbEl, { language: 'css' });
  }
}
