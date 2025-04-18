import Component from '../../core/Component';
import styles from './Layout.module.css';
import { ROUTES } from '../../constants/routes';
import MENU_BAR from '../../assets/img/icon/menu.svg';
import MenuBar from '../menu-bar/MenuBar';

class Layout extends Component {
  template() {
    const { path, isGamePage } = this.props;

    const navItem = (href, text) => {
      const isActive = path === href ? styles.active : '';
      return `<a href="${href}" class="${isActive}">${text}</a>`;
    };

    if (!isGamePage) {
      return `
        <main class="${styles.container}">
          <header class="${styles.header}">
            <a href="${ROUTES.MAIN}" class="${styles.logo}">CODE NEWS</a>
            <div class="${styles.navLine}"></div>
            <nav class="${styles.nav}">
              ${navItem(ROUTES.GAMES, 'GAMES')}
              ${navItem(ROUTES.LEARN, 'LEARN')}
              ${navItem(ROUTES.ARTICLE, 'ARTICLE')}
            </nav>
          </header>
          <section id="page-root" class="${styles.pageRoot}"></section>
        </main>
      `;
    } else {
      return `
        <main class="${styles.container}">
          <header class="${styles.gameHeader}">
            <div class="${styles.gameNavBoldLine}"></div>
            <div class="${styles.gameNav}">
              <a href="${ROUTES.MAIN}" class="${styles.logoSmall}">CODE NEWS</a>
              <div id="menu-bar" class="${styles.menuBarPlace}">
                <img src="${MENU_BAR}" alt="menu icon" class="${styles.menuBarIcon}" />
              </div>
            </div>
            <div class="${styles.gameNavLines}">
              <div class="${styles.gameNavLine}"></div>
              <div class="${styles.gameNavLine}"></div>
            </div>
          </header>
          <section id="page-root" class="${styles.pageRoot}"></section>
        </main class="${styles.container}">
      `;
    }
  }

  mounted() {
    const { Page, params } = this.props;
    const pageRoot = document.querySelector('#page-root');

    if (!Page || !pageRoot) return;

    new Page(pageRoot, params);

    const menuBarEl = this.$el.querySelector('#menu-bar');
    console.log('menuBarEl:', menuBarEl); // 디버깅용 로그

    if (!menuBarEl) {
      console.error('#menu-bar element not found!');
      return;
    }

    // MenuBar 컴포넌트 생성 및 DOM에 추가
    const menuBarContainer = document.createElement('div');
    document.body.appendChild(menuBarContainer); // MenuBar를 body에 추가
    const menuBar = new MenuBar(menuBarContainer);

    // MENU_BAR 아이콘 클릭 이벤트
    const menuIcon = document.querySelector(`.${styles.gameNav} img`);
    menuIcon.addEventListener('click', () => {
      menuBar.openMenu();
    });
  }
}

export default Layout;
