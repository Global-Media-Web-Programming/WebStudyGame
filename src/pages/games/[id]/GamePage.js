import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameHeader from '../../../components/games/game-header/GameHeader';
import GameEditor from '../../../components/games/game-editor/GameEditor';
import GamePreview from '../../../components/games/game-preview/GamePreview';
import GameOtherCode from '../../../components/games/game-other-code/GameOtherCode';
import Store from '../../../store/Store';
import escapeHtml from '../../../utils/escapeHtml';
import htmlGameData from '../../../data/games/htmlGames.json';
import cssGameData from '../../../data/games/cssGames.json';
import navigate from '../../../utils/navigate';
import { BUILD_ROUTES } from '../../../constants/routes';

/**
 * @property {'html' | 'css'} language - 언어 (필수)
 * @property { number | string } id = 문제 번호 or 'result' (필수)
 */
export default class GamePage extends Component {
  template() {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const gameData = language === 'html' ? htmlGameData : cssGameData;
    const currentGame = gameData[currentLevel - 1];
    const description = escapeHtml(currentGame.description, styles.keyword);

    return `
      <div class="${styles.editorContainer}">
        <div id="game-header"></div>
        <div class="${styles.gameMain}">
          <div class="${styles.info}">
            <h2 id="title" class="${styles.title}">Case #${currentLevel}: "${currentGame.title}"</h2>
            <p id="description" class="${styles.description}">${description}</p>
            <div id="game-preview"></div>
            <div id="game-other-code"></div>
          </div>
          <div id="game-editor" class="${styles.container}"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { $el } = this;
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const gameData = language === 'html' ? htmlGameData : cssGameData;
    const currentGame = gameData[currentLevel - 1];
    const savedCode = Store.state.userCodes[language]?.[currentLevel];

    // 컴포넌트 초기화
    this.gameHeader = new GameHeader($el.querySelector('#game-header'), {
      language,
      currentLevel,
      totalLevel: gameData.length,
      hint: currentGame.hint,
      onPrev: this.handlePrev,
      onNext: this.handleNext,
    });

    this.gameEditor = new GameEditor($el.querySelector('#game-editor'), {
      language,
      bugCode: currentGame.bugCode,
      inputPos: currentGame.inputPos,
      savedCode,
      onUpdate: (code) => {
        const isCorrect = this.gamePreview.updatePreview(
          code,
          currentGame.otherCode,
          language,
          currentGame.answer,
          currentGame.inputPos,
        );
        this.gameHeader.setState({ disabled: !isCorrect });
      },
    });

    this.gamePreview = new GamePreview($el.querySelector('#game-preview'), {
      initialCode: savedCode ?? currentGame.bugCode,
      otherCode: currentGame.otherCode,
      language,
      answer: currentGame.answer,
      bugCode: currentGame.bugCode,
      inputPos: currentGame.inputPos,
      onCheck: (isCorrect) => {
        this.gameHeader.setState({ disabled: !isCorrect });
      },
    });

    new GameOtherCode($el.querySelector('#game-other-code'), {
      language,
      otherCode: currentGame.otherCode,
    });

    // 초기 렌더링
    const initialCode = savedCode ?? currentGame.bugCode;
    const isCorrect = this.gamePreview.updatePreview(
      initialCode,
      currentGame.otherCode,
      language,
      currentGame.answer,
      currentGame.inputPos,
    );
    this.gameHeader.setState({ disabled: !isCorrect });
  }

  handlePrev = () => {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    navigate(BUILD_ROUTES.GAME(language, currentLevel - 1));
  };

  handleNext = () => {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const gameData = language === 'html' ? htmlGameData : cssGameData;
    const code = this.gameEditor.getValue();

    // 정답 저장
    Store.setState({
      userCodes: {
        ...Store.state.userCodes,
        [language]: {
          ...Store.state.userCodes[language],
          [currentLevel]: code,
        },
      },
    });

    if (currentLevel < gameData.length) {
      if (language === 'html') {
        Store.setState({ htmlLevel: currentLevel + 1 });
      } else {
        Store.setState({ cssLevel: currentLevel + 1 });
      }
      navigate(BUILD_ROUTES.GAME(language, currentLevel + 1));
    } else {
      if (language === 'html') {
        Store.setState({ isHtmlSolved: true });
      } else {
        Store.setState({ isCSSSolved: true });
      }
      navigate(BUILD_ROUTES.GAME_RESULT(language));
    }
  };
}
