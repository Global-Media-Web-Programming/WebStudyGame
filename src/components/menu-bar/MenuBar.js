import Component from '../../core/Component';
import styles from './MenuBar.module.css';
import CROSS_ICON from '../../assets/img/icon/cross.svg';
import HOME_ICON from '../../assets/img/icon/home.svg';
import GAMES_ICON from '../../assets/img/icon/games.svg';
import LEARN_ICON from '../../assets/img/icon/learn.svg';
import ARTICLE_ICON from '../../assets/img/icon/article.svg';

export default class MenuBar extends Component {
  initState() {
    return { isOpen: false }; // 메뉴바 열림/닫힘 상태
  }

  template() {
    const { isOpen } = this.state;

    return `
    <div class="${styles.menuBarContainer}">
      <div class="${styles.shadow} ${styles.close} ${isOpen ? styles.open : ''}"></div>
      <div class="${styles.menuBar} ${styles.close} ${isOpen ? styles.open : ''}">
        <button class="${styles.closeBtn}">
          <img src="${CROSS_ICON}" alt="close icon" class="${styles.icon}" />
        </button>
        <hr class="${styles.divider}" />
        <hr class="${styles.divider}" />
        <ul class="${styles.menuList}">
          <li class="${styles.menuItem}">
          <img src="${HOME_ICON}" alt="home icon" class="${styles.icon}" />
            <a href="/" class="${styles.link}">Home</a>
          </li>
          <li class="${styles.menuItem}">
            <img src="${GAMES_ICON}" alt="games icon" class="${styles.icon}" />
            <a href="/games" class="${styles.link}">Games</a>
          </li>
          <li class="${styles.menuItem}">
            <img src="${LEARN_ICON}" alt="learn icon" class="${styles.icon}" />
            <a href="/learn" class="${styles.link}">Learn</a>
          </li>
          <li class="${styles.menuItem}">
            <img src="${ARTICLE_ICON}" alt="article icon" class="${styles.icon}" />
            <a href="/article" class="${styles.link}">Articles</a>
          </li>
        </ul>
      </div>
    </div>
    `;
  }

  setEvent() {
    // 닫기 버튼 클릭 이벤트
    this.addEvent('click', `.${styles.closeBtn}`, () => {
      this.closeMenu();
    });

    // 메뉴 항목 클릭 이벤트
    this.addEvent('click', `.${styles.link}`, () => {
      this.closeMenu();
    });

    // shadow 클릭 이벤트
    this.addEvent('click', `.${styles.shadow}`, (event) => {
      const menuBar = document.querySelector(`.${styles.menuBar}`);
      if (!menuBar.contains(event.target)) {
        this.closeMenu();
      }
    });
  }

  openMenu() {
    const menuBar = document.querySelector(`.${styles.menuBar}`);
    const shadow = document.querySelector(`.${styles.shadow}`);

    this.setState({ isOpen: true });

    requestAnimationFrame(() => {
      menuBar.classList.remove(styles.close);
      shadow.classList.remove(styles.close);

      requestAnimationFrame(() => {
        menuBar.classList.add(styles.open);
        shadow.classList.add(styles.open);
      });
    });
  }

  closeMenu() {
    const menuBar = document.querySelector(`.${styles.menuBar}`);
    const shadow = document.querySelector(`.${styles.shadow}`);

    menuBar.classList.remove(styles.open);
    shadow.classList.remove(styles.open);
    menuBar.classList.add(styles.close);
    shadow.classList.add(styles.close);

    setTimeout(() => {
      this.setState({ isOpen: false }); // 렌더링 리셋
    }, 500);
  }
}
