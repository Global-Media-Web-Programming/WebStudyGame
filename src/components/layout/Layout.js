import Component from '../../core/Component';
import style from './Layout.module.css';
import ROUTES from '../../constants/routes';
import MENU_BAR from '/src/assets/img/menu.svg';
import routes from '../../router/routes';

class Layout extends Component {
  template() {
    const { matched, isGamePage } = this.props;

    const navItem = (href, text) => {
      const isActive = matched === href ? style.active : '';
      return `<a href="${href}" class="${isActive}">${text}</a>`;
    };

    if (!isGamePage) {
      return `
        <header class="${style.header}">
          <a href="${ROUTES.MAIN}" class="${style.logo}">CODE NEWS</a>
          <div class="${style.navLine}"></div>
          <nav class="${style.nav}">
            ${navItem(ROUTES.GAMES, 'GAMES')}
            ${navItem(ROUTES.LEARN, 'LEARN')}
            ${navItem(ROUTES.ARTICLE, 'ARTICLE')}
          </nav>
        </header>
        <main id="page-root" class="${style.pageRoot}"></main>
      `;
    } else {
      return `
        <header class="${style.gameHeader}">
          <div class="${style.gameNavBoldLine}"></div>
          <div class="${style.gameNav}">
            <a href="${ROUTES.MAIN}" class="${style.logoSmall}">CODE NEWS</a>
            <img src="${MENU_BAR}" alt="menu icon"/>
          </div>
          <div class="${style.gameNavLine}"></div>
          <div class="${style.gameNavLine}"></div>
        </header>
        <main id="page-root" class="${style.pageRoot}"></main>
      `;
    }
  }

  mounted() {
    const { matched } = this.props;
    const Page = routes[matched] || routes[ROUTES.NOT_FOUND];

    console.log(document.querySelector('#app'));

    const pageRoot = document.querySelector('#page-root');

    new Page(pageRoot);
  }
}

export default Layout;
