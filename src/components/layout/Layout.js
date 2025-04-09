import Component from '../../core/Component';
import styles from './Layout.module.css';
import { ROUTES } from '../../constants/routes';
import MENU_BAR from '/src/assets/img/icon/menu.svg';

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
              <img src="${MENU_BAR}" alt="menu icon"/>
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
  }
}

export default Layout;
