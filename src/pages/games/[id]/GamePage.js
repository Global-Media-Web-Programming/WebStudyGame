import Component from '../../../core/Component';
import styles from './GamePage.module.css';
import GameLanguage from '../../../components/game-language/GameLanguage';
import Button from '../../../components/button/Button';
import Hint from '../../../components/hint/Hint';
import Store from '../../../store/Store';
import parseHTML from '../../../utils/parseHtml';
import compareDOM from '../../../utils/compareDom';
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
 */
export default class GamePage extends Component {
  template() {
    console.log('template 실행 htmlLevel:', Store.state.htmlLevel);
    const { language } = this.props;
    if (language === 'html') {
      return `
        <div class="${styles.editorContainer}">
          <div class="${styles.gameHeader}">
            <div id="game-language"></div>
            <div class="${styles.btnContainer}">
              <div id="hint-btn"></div>
              <div id="next-btn"></div>
            </div>
          </div>
          <div class="${styles.gameMain}">
            <div class="${styles.info}">
              <h2 id="title" class="${styles.title}"></h2>
              <p id="description" class="${styles.description}"></p>
              <div class="${styles.subSection}">
                <h4 class="${styles.subSectionTitle}">﹒결과</h4>
                <iframe id="code-preview" class="${styles.codePreview}" sandbox="allow-scripts allow-same-origin"></iframe>
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

  nextButtonInstance = null;

  // 다음 버튼
  handleNext = () => {
    console.trace('🚨 handleNext 호출');
    const currentLevel = Store.state.htmlLevel;
    console.log('currentLevel in handleNext', currentLevel);

    if (currentLevel < htmlGameData.length - 1) {
      Store.state.htmlLevel += 1;
    } else {
      navigate(BUILD_ROUTES.GAME_RESULT('html'));
      Store.state.isHtmlSolved = true;
    }
  };

  mounted() {
    const { $el } = this;
    const { language } = this.props;

    const gameLangEl = $el.querySelector('#game-language');
    new GameLanguage(gameLangEl, { language });

    const hintBtnEl = $el.querySelector('#hint-btn');
    const hintEl = $el.querySelector('#hint');
    const nextBtnEl = $el.querySelector('#next-btn');
    const titleEl = $el.querySelector('#title');
    const descriptionEl = $el.querySelector('#description');
    const otherCodeEl = $el.querySelector('#other-code');
    const iframe = $el.querySelector('#code-preview');

    // 현재 레벨에 맞는 게임 데이터
    const currentLevel = Store.state.htmlLevel;
    // console.log(currentLevel);
    const currentGame = htmlGameData[currentLevel - 1];

    // 게임 정보 렌더링
    titleEl.textContent = `Case #${currentLevel}: "${currentGame.title}"`;
    descriptionEl.textContent = currentGame.description;

    // CodeMirror 에디터 설정
    const editor = new EditorView({
      doc: currentGame.bugCode,
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

    this.nextButtonInstance = new Button(nextBtnEl, {
      id: 'next-game-btn',
      text: '다음',
      color: 'purple',
      disabled: true, // 처음엔 정답이 아니므로 비활성화
      onClick: this.handleNext,
    });

    const updatePreview = () => {
      const code = editor.state.doc.toString();
      // 사용자 입력 css 적용할 수 있는 방법 찾기
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
