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
import cssGameData from '../../../data/games/cssGames.json';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
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

    let codeEditor = '';
    if (language === 'html') {
      codeEditor = `
        <div id="code-editor" class="${styles.htmlEditor}"></div>
      `;
    } else if (language === 'css') {
      // CSS 문제에서는 input 태그 사용
      const bugCodeLines = currentGame.bugCode.split('\n');
      const { line, start, end } = currentGame.inputPos;

      const targetLine = bugCodeLines[line];
      const before = targetLine.substring(0, start);
      const after = targetLine.substring(end);
      const inputTag = `<input type="text" class="${styles.cssInput}" placeholder="정답 입력">`;

      const placeholder = '___INPUT_PLACEHOLDER___';
      bugCodeLines[line] = before + placeholder + after;

      // CSS 하이라이팅 적용
      let highlightedCode = hljs.highlight(bugCodeLines.join('\n'), {
        language: 'css',
      }).value;
      // 특수 문자열을 input 태그로 교체
      highlightedCode = highlightedCode.replace(placeholder, inputTag);

      codeEditor = `
        <div class="${styles.cssEditor}">
          <pre><code>${highlightedCode}</code></pre>
        </div>
      `;
    }

    return `
      <div class="${styles.editorContainer}">
        <div class="${styles.gameHeader}">
          <div class="${styles.leftHeader}">
            <div id="game-language"></div>
            <div id="current-level" class="${styles.currentLevel}">
              ${currentLevel}
              <span class="${styles.totalLevel}"> / ${gameData.length}</span>
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
            <h2 id="title" class="${styles.title}">Case #${currentLevel}: "${currentGame.title}"</h2>
            <p id="description" class="${styles.description}">${description}</p>
            <div class="${styles.subSection}">
              <h4 class="${styles.subSectionTitle}">﹒결과</h4>
              <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts allow-same-origin allow-modals"></iframe>
            </div>
            <div id="other-code-container" class="${styles.subSection}">
              <h4 class="${styles.subSectionTitle}">﹒${language === 'html' ? 'CSS' : 'HTML'} 코드</h4>
              <div id="other-code" class="${styles.otherCode}"></div>
            </div>
          </div>
          ${codeEditor}
        </div>
        <div id="hint"></div>
      </div>
    `;
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
    const gameData = language === 'html' ? htmlGameData : cssGameData;
    console.log('handlenext 호출');

    // 1 ~ 9
    if (currentLevel < gameData.length) {
      // 작성한 코드 저장
      const htmlCode = this.editor?.state.doc.toString();
      const cssInput = this.$el.querySelector(`.${styles.cssInput}`);
      const cssCode = cssInput?.value;

      Store.setState({
        userCodes: {
          ...Store.state.userCodes,
          [language]: {
            ...Store.state.userCodes[language],
            [currentLevel]: language === 'html' ? htmlCode : cssCode,
          },
        },
      });
      if (language === 'html') {
        Store.setState({ htmlLevel: currentLevel + 1 });
      } else if (language === 'css') {
        Store.setState({ cssLevel: currentLevel + 1 });
      }
      // 다음 레벨로 이동
      navigate(BUILD_ROUTES.GAME(language, currentLevel + 1));
    } else {
      // 마지막 레벨을 풀었으면 결과 페이지로
      if (language === 'html') {
        Store.setState({ isHtmlSolved: true });
      } else {
        Store.setState({ isCSSSolved: true });
      }
      navigate(BUILD_ROUTES.GAME_RESULT(language));
    }
  };

  mounted() {
    const { $el } = this;
    const { language, id } = this.props;
    const currentLevel = parseInt(id);
    const gameData = language === 'html' ? htmlGameData : cssGameData;
    const currentGame = gameData[currentLevel - 1];

    // 저장된 코드가 있으면 불러오기
    const savedCode = Store.state.userCodes[language]?.[currentLevel];

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const hintBtnEl = $el.querySelector('#hint-btn');
    const hintEl = $el.querySelector('#hint');
    const prevBtnEl = $el.querySelector('#prev-btn');
    const nextBtnEl = $el.querySelector('#next-btn');
    const otherCodeEl = $el.querySelector('#other-code');
    const iframe = $el.querySelector('#code-preview');

    if (language === 'html') {
      // CodeMirror 에디터 설정
      this.editor = new EditorView({
        doc: savedCode ?? currentGame.bugCode,
        extensions: [
          basicSetup,
          html(),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              this.updatePreview();
            }
          }),
        ],
        parent: $el.querySelector('#code-editor'),
      });
    } else if (language === 'css') {
      // css 게임일 땐 input에 저장된 정답 넣기
      const cssInput = this.$el.querySelector(`.${styles.cssInput}`);
      cssInput.value = savedCode ?? '';
    }

    // 추가 코드가 있을 때만
    if (currentGame.otherCode) {
      otherCodeEl.innerHTML = hljs.highlight(currentGame.otherCode, {
        language: language === 'html' ? 'css' : 'html',
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
      currentLevel !== 1 &&
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

    this.iframe = iframe;
    this.currentGame = currentGame;

    // 초기 렌더링
    this.updatePreview();
  }

  setEvent() {
    const { language } = this.props;

    if (language === 'css') {
      this.addEvent('input', `.${styles.cssInput}`, () => {
        this.updatePreview();
      });
    }
  }

  updatePreview() {
    const { language } = this.props;

    if (language === 'html') {
      const code = this.editor.state.doc.toString();
      this.iframe.srcdoc = code;
      const userDOM = parseHTML(code);
      const answerDOM = parseHTML(this.currentGame.answer);
      const isCorrect = compareDOM(userDOM, answerDOM);
      this.nextButtonInstance.setState({
        disabled: !isCorrect,
      });
    } else if (language === 'css') {
      const cssInput = this.$el.querySelector(`.${styles.cssInput}`);
      const userAnswer = cssInput?.value;
      // 공백과 따옴표 통일
      const normalizedUserAnswer = userAnswer
        ?.replace(/\s+/g, '')
        .replace(/['"]/g, '"');
      const normalizedAnswer = this.currentGame.answer
        .replace(/\s+/g, '')
        .replace(/['"]/g, '"');
      const isCorrect = normalizedUserAnswer === normalizedAnswer;

      console.log(normalizedUserAnswer, normalizedAnswer, isCorrect);
      // CSS 스타일 적용
      const bugCodeLines = this.currentGame.bugCode.split('\n');
      const { line, start, end } = this.currentGame.inputPos;
      const targetLine = bugCodeLines[line];
      const before = targetLine.substring(0, start);
      const after = targetLine.substring(end);
      bugCodeLines[line] = before + (userAnswer ?? '') + after;

      const style = `<style>${bugCodeLines.join('\n')}</style>`;
      this.iframe.srcdoc = style + this.currentGame.otherCode;

      this.nextButtonInstance.setState({
        disabled: !isCorrect,
      });
    }
  }
}
