import Component from '../../../core/Component';
import styles from './GameHeader.module.css';
import GameLanguage from '../../game-language/GameLanguage';
import Button from '../../button/Button';
import Hint from '../hint/Hint';

export default class GameHeader extends Component {
  template() {
    const { currentLevel, totalLevel } = this.props;

    return `
      <div class="${styles.gameHeader}">
        <div class="${styles.leftHeader}">
          <div id="game-language"></div>
          <div id="current-level" class="${styles.currentLevel}">
            ${currentLevel}
            <span class="${styles.totalLevel}"> / ${totalLevel}</span>
          </div>
        </div>
        <div class="${styles.btnContainer}">
          <div id="hint-btn"></div>
          <div id="prev-btn"></div>
          <div id="next-btn"></div>
        </div>
      </div>
      <div id="hint"></div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language, currentLevel, hint, onPrev, onNext } = this.props;

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const hintBtnEl = $el.querySelector('#hint-btn');
    const hintEl = $el.querySelector('#hint');
    const prevBtnEl = $el.querySelector('#prev-btn');
    const nextBtnEl = $el.querySelector('#next-btn');

    // 힌트 버튼
    new Button(hintBtnEl, {
      id: 'html-game-btn',
      text: '힌트',
      color: 'yellow',
      onClick: () => {
        new Hint(hintEl, {
          content: hint,
        });
      },
    });

    // 이전 버튼
    this.prevButtonInstance =
      currentLevel !== 1 &&
      new Button(prevBtnEl, {
        id: 'prev-game-btn',
        text: '이전',
        color: 'purple',
        onClick: onPrev,
      });

    // 다음 버튼
    this.nextButtonInstance = new Button(nextBtnEl, {
      id: 'next-game-btn',
      text: '다음',
      color: 'purple',
      disabled: true,
      onClick: onNext,
    });
  }

  setState(nextState) {
    this.nextButtonInstance?.setState(nextState);
  }
}
