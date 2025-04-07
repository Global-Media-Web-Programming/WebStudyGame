import Layout from '../components/layout/Layout';
import routes from './routes';

const router = () => {
  const path = location.pathname;
  const app = document.querySelector('#app');
  const isGamePage = /^\/games\/(html|css)/.test(path);

  const matchedRoute = matchRoute(path);
  const { component, params } = matchedRoute;

  new Layout(app, {
    matched: path,
    isGamePage,
    params,
    Page: component,
  });
};

// 동적 경로 매칭 함수
const matchRoute = (path) => {
  for (const route in routes) {
    const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
    const match = path.match(routeRegex);

    if (match) {
      const params =
        route.match(/:\w+/g)?.map((param, idx) => ({
          [param.slice(1)]: match[idx + 1],
        })) || [];

      return { component: routes[route], params: Object.assign({}, ...params) };
    }
  }
  return null;
};

export default router;
