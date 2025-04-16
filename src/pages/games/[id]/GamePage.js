import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameLanguage from '../../../components/game-language/GameLanguage';
import Button from '../../../components/button/Button';
import Hint from '../../../components/hint/Hint';
import Store from '../../../store/Store';
import parseHTML from '../../../utils/parseHtml';
import compareDOM from '../../../utils/compareDom';
import escapeHtml from '../../../utils/escapeHtml';
import htmlGameData from '../../../data/games/htmlGames.json';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import navigate from '../../../utils/navigate';
import { BUILD_ROUTES } from '../../../constants/routes';
// import { css } from '@codemirror/lang-css';

/**
 * @property {'html' | 'css'} language - 언어 (필수)
 * @property { number | string } id = 문제 번호 or 'result' (필수)
 */
export default class GamePage extends Component {
  template() {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const currentGame = htmlGameData[currentLevel - 1];

    const title = escapeHtml(currentGame.title, styles.keyword);
    const description = escapeHtml(currentGame.description, styles.keyword);

    if (language === 'html') {
      return `
        <div class="${styles.editorContainer}">
          <div class="${styles.gameHeader}">
            <div class="${styles.leftHeader}">
              <div id="game-language"></div>
              <div id="current-level" class="${styles.currentLevel}">
                ${currentLevel}
                <span class="${styles.totalLevel}"> / ${htmlGameData.length}</span>
              </div>
            </div>
            <div class="${styles.btnContainer}">
              <div id="hint-btn"></div>
              <div id="prev-btn"></div>
              <div id="next-btn"></div>
            </div>
          </div>
          <div class="${styles.gameMain}">
            <div class="${styles.info}">
              <h2 id="title" class="${styles.title}">Case #${currentLevel}: "${title}"</h2>
              <p id="description" class="${styles.description}">${description}</p>
              <div class="${styles.subSection}">
                <h4 class="${styles.subSectionTitle}">﹒결과</h4>
                <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts allow-same-origin allow-modals"></iframe>
              </div>
              <div id="other-code-container" class="${styles.subSection}">
                <h4 class="${styles.subSectionTitle}">﹒CSS 코드</h4>
                <div id="other-code" class="${styles.otherCode}"></div>
              </div>
            </div>
            <div id="code-editor" class="${styles.codeEditor}"></div>
          </div>
          <div id="hint"></div>
        </div>
      `;
    } else if (language === 'css') {
      return `
        <div>css 게임 페이지</div>
      `;
    }
  }

  prevButtonInstance = null;
  nextButtonInstance = null;

  // 이전 버튼 클릭 이벤트 핸들러
  handlePrev = () => {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);

    navigate(BUILD_ROUTES.GAME(language, currentLevel - 1));
  };

  // 다음 버튼 클릭 이벤트 핸들러
  handleNext = () => {
    const { language, id } = this.props;
    const currentLevel = parseInt(id);

    // 1~ 9
    if (currentLevel < htmlGameData.length) {
      // 작성한 코드 저장
      const code = this.editor.state.doc.toString();
      Store.setState({
        userCodes: {
          ...Store.state.userCodes,
          [language]: {
            ...Store.state.userCodes[language],
            [currentLevel]: code,
          },
        },
      });
      // 다음 레벨로 이동
      navigate(BUILD_ROUTES.GAME(language, currentLevel + 1));
      // Store 업데이트는 문제를 풀었을 때만
      if (language === 'html') {
        Store.setState({ htmlLevel: currentLevel + 1 });
      } else {
        Store.setState({ cssLevel: currentLevel + 1 });
      }
    } else {
      // 마지막 레벨을 풀었으면 결과 페이지로
      navigate(BUILD_ROUTES.GAME_RESULT(language));
      Store.setState({ isHtmlSolved: true });
    }
  };

  mounted() {
    const { $el } = this;
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const currentGame = htmlGameData[currentLevel - 1];

    // 저장된 코드가 있으면 불러오기
    const savedCode =
      Store.state.userCodes[language]?.[currentLevel] ?? currentGame.bugCode;

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const hintBtnEl = $el.querySelector('#hint-btn');
    const hintEl = $el.querySelector('#hint');
    const prevBtnEl = $el.querySelector('#prev-btn');
    const nextBtnEl = $el.querySelector('#next-btn');
    const otherCodeEl = $el.querySelector('#other-code');
    const iframe = $el.querySelector('#code-preview');

    // CodeMirror 에디터 설정
    this.editor = new EditorView({
      doc: savedCode,
      extensions: [
        basicSetup,
        html(),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            updatePreview();
          }
        }),
      ],
      parent: $el.querySelector('#code-editor'),
    });

    // 추가 코드가 있을 때만
    if (currentGame.otherCode) {
      otherCodeEl.innerHTML = hljs.highlight(currentGame.otherCode, {
        language: 'css',
      }).value;
      $el.querySelector('#other-code-container').style.display = 'block';
    } else {
      $el.querySelector('#other-code-container').style.display = 'none';
    }

    // 힌트 버튼
    new Button(hintBtnEl, {
      id: 'html-game-btn',
      text: '힌트',
      color: 'yellow',
      onClick: () => {
        new Hint(hintEl, {
          content: currentGame.hint,
        });
      },
    });

    // 이전 버튼
    this.prevButtonInstance =
      currentGame.id !== 1 &&
      new Button(prevBtnEl, {
        id: 'prev-game-btn',
        text: '이전',
        color: 'purple',
        onClick: this.handlePrev,
      });

    // 다음 버튼
    this.nextButtonInstance = new Button(nextBtnEl, {
      id: 'next-game-btn',
      text: '다음',
      color: 'purple',
      disabled: true, // 처음엔 정답이 아니므로 비활성화
      onClick: this.handleNext,
    });

    const updatePreview = () => {
      const code = this.editor.state.doc.toString();
      iframe.srcdoc = code;

      // html로 parse
      const userDOM = parseHTML(code);
      const answerDOM = parseHTML(currentGame.answer);

      console.log(userDOM, answerDOM);
      // 비교해 정답 여부 체크
      const isCorrect = compareDOM(userDOM, answerDOM);
      console.log('isCorrect', isCorrect);

      // 버튼 상태만 업데이트
      this.nextButtonInstance.setState({
        disabled: !isCorrect,
      });
    };

    // 초기 렌더링
    updatePreview();
  }
}
