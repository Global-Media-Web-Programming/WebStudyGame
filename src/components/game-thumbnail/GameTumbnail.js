import Component from '../../core/Component';
import styles from './GameTumbnail.module.css';
import navigate from '../../utils/navigate';
import { getItem } from '../../utils/storage';
import Button from '../button/Button';
import { GAME_DESCRIPTION } from '../../constants/game';
import CODE_FILE from '/src/assets/img/icon/code-file.svg';
import FOOTSTEPS from '/src/assets/img/icon/footsteps.svg';
import RESOLVED from '/src/assets/img/icon/footsteps.svg';
import UNRESOLVED from '/src/assets/img/icon/unresolved.svg';
import HTML_GAME from '/src/assets/img/game/html.webp';
import CSS_GAME from '/src/assets/img/game/css.webp';

export default class GameTumbnail extends Component {
  template() {
    const { language, imgPos = '' } = this.props;

    // 문제 풀이 여부
    const isHtmlSolved = getItem('isHtmlSolved') === 'true' || false;
    const isCSSSolved = getItem('isCSSSolved') === 'true' || false;

    const summaryData = [
      { icon: CODE_FILE, label: '프론트엔드' },
      { icon: FOOTSTEPS, label: '5사건' },
      language === 'html'
        ? {
            icon: isHtmlSolved ? RESOLVED : UNRESOLVED,
            label: isHtmlSolved ? '해결' : '미해결',
          }
        : {
            icon: isCSSSolved ? RESOLVED : UNRESOLVED,
            label: isCSSSolved ? '해결' : '미해결',
          },
    ];

    const thumbnailImg = `
      <div class="${styles.imgWrapper}">
        <img src="${language === 'html' ? HTML_GAME : CSS_GAME}" alt="${language}-img" class="${styles.img}" />
      </div>
    `;

    return `
      <article class="${styles.container}">
        ${imgPos === 'left' ? thumbnailImg : ''}
        <div class="${styles.infoSection}">
          <div class="${styles.infoHeader}">
            <div class="${styles.infoHeaderRow}">
              <div class="${styles.summary}">
                ${summaryData
                  .map(
                    ({ icon, label }) => `
                    <div class="${styles.summaryItem}">
                      <img src="${icon}" alt="${label}-icon" class="${styles.summaryIcon}"/>
                      <span>${label}</span>
                    </div>
                  `,
                  )
                  .join('')}
              </div>
              <div id="button"></div>
            </div>
            <h2 class="${styles.language}">${language}</h2>
          </div> 

          <p class="${styles.description}">${language === 'html' ? GAME_DESCRIPTION.HTML : GAME_DESCRIPTION.CSS}</p>
        </div>
        ${imgPos !== 'left' ? thumbnailImg : ''}
      </article>
    `;
  }

  mounted() {
    const btnEl = this.$el.querySelector('#button');
    new Button(btnEl, { text: '해결하기' });
  }

  setEvent() {
    this.addEvent('click', '#button button', () => {
      const { language } = this.props;

      const path = language === 'html' ? `/games/html/1` : `/games/css/1`;

      navigate(path);
    });
  }
}
