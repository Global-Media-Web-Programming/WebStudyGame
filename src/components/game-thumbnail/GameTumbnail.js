import Component from '../../core/Component';
import styles from './GameTumbnail.module.css';
import Button from '../button/Button';
import { GAME_DESCRIPTION } from '../../constants/game';
import CODE_FILE from '/src/assets/img/code-file.svg';
import FOOTSTEPS from '/src/assets/img/footsteps.svg';
import UNRESOLVED from '/src/assets/img/unresolved.svg';

export default class GameTumbnail extends Component {
  template() {
    const { language, imgPos = '' } = this.props;

    const summaryData = [
      { icon: CODE_FILE, label: '프론트엔드' },
      { icon: FOOTSTEPS, label: '5사건' },
      { icon: UNRESOLVED, label: '미해결' },
    ];

    const thumbnailImg = `<div class="${styles.tumbnailImg}"></div>`;

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
  // <img src="" alt="${language}-img" class="${imgPos === 'left' ? styles.left : ''}"></img>

  mounted() {
    const btnEl = this.$el.querySelector('#button');
    console.log('btnEl:', btnEl);
    new Button(btnEl, { text: '해결하기' });
  }
}
