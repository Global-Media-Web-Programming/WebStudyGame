import styles from './GameTumbnail.module.css';
import navigate from '../../utils/navigate';
import Store from '../../store/Store';
import { observe } from '../../core/Observer';
import { GAME_DESCRIPTION } from '../../constants/game';
import Component from '../../core/Component';
import Button from '../button/Button';
import { BUILD_ROUTES } from '../../constants/routes';

import CODE_FILE from '/src/assets/img/icon/code-file.svg';
import FOOTSTEPS from '/src/assets/img/icon/footsteps.svg';
import RESOLVED from '/src/assets/img/icon/footsteps.svg';
import UNRESOLVED from '/src/assets/img/icon/unresolved.svg';
import HTML_GAME from '/src/assets/img/game/html.webp';
import CSS_GAME from '/src/assets/img/game/css.webp';

export default class GameTumbnail extends Component {
  initState() {
    return {
      isHtmlSolved: Store.state.isHtmlSolved,
      isCSSSolved: Store.state.isCSSSolved,
      htmlLevel: Store.state.htmlLevel,
      cssLevel: Store.state.cssLevel,
    };
  }

  template() {
    const { language, imgPos = '' } = this.props;

    // 문제 풀이 여부
    const { isHtmlSolved, isCSSSolved } = this.state;

    const summaryData = [
      { icon: CODE_FILE, label: '프론트엔드' },
      { icon: FOOTSTEPS, label: '10사건' },
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
    // 렌더 후 this.state에 접근
    /*
      Store.state.isHtmlSolved = true로 변경되면
      observe의 콜백 함수가 실행되고
      newState에 새로운 값이 할당되고
      조건문을 통해 state가 실제로 변경되었는지 확인한 후
      Object.assign(this.state, newState)로 컴포넌트의 state가 업데이트됨
      이렇게 Store의 state 변화를 감지해서 컴포넌트의 state를 업데이트하는 방식임
    */
    observe(() => {
      const newState = {
        isHtmlSolved: Store.state.isHtmlSolved,
        isCSSSolved: Store.state.isCSSSolved,
      };

      // 상태가 바뀐 경우에만 반영
      if (
        newState.isHtmlSolved !== this.state.isHtmlSolved ||
        newState.isCSSSolved !== this.state.isCSSSolved
      ) {
        Object.assign(this.state, newState);
      }
    });

    const { language } = this.props;
    const { isHtmlSolved, isCSSSolved } = this.state;

    const btnEl = this.$el.querySelector('#button');

    // html/css 게임, 풀이 여부에 따라 다른 버튼 렌더링
    if (language === 'html') {
      if (isHtmlSolved) {
        new Button(btnEl, {
          id: 'html-game-btn',
          text: '수첩 보기',
          onClick: () => {
            navigate(BUILD_ROUTES.GAME_RESULT('html'));
          },
        });
      } else {
        new Button(btnEl, {
          id: 'html-game-btn',
          text: '해결하기',
          onClick: () => {
            navigate(BUILD_ROUTES.GAME('html', 1));
          },
        });
      }
    } else if (language === 'css') {
      if (isCSSSolved) {
        new Button(btnEl, {
          id: 'css-game-btn',
          text: '수첩 보기',
          onClick: () => {
            navigate(BUILD_ROUTES.GAME_RESULT('css'));
          },
        });
      } else {
        new Button(btnEl, {
          id: 'css-game-btn',
          text: '해결하기',
          onClick: () => {
            navigate(BUILD_ROUTES.GAME('css', 1));
          },
        });
      }
    }
  }
}
