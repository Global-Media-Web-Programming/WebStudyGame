import Layout from '../components/layout/Layout';
import routes from './routes';

const router = () => {
  const path = location.pathname;
  const app = document.querySelector('#app');
  const isGamePage = /^\/games\/(html|css)/.test(path); // 게임 화면일 땐 레이아웃 다르게 하려고

  const matchedRoute = matchRoute(path);
  const { component, params } = matchedRoute;

  new Layout(app, {
    path,
    isGamePage,
    params,
    Page: component,
  });
};

// 동적 경로 매칭 함수
const matchRoute = (path) => {
  const routeEntries = Object.entries(routes);

  // 더 구체적인 경로가 먼저 오도록 정렬 (':' 개수로 오름차순 정렬)
  const sortedRoutes = routeEntries.sort((a, b) => {
    const aParams = (a[0].match(/:\w+/g) || []).length;
    const bParams = (b[0].match(/:\w+/g) || []).length;
    return aParams - bParams;
  });

  for (const [route] of sortedRoutes) {
    if (route === '*') continue; // 404 스킵

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
  // 404 fallback
  return {
    component: routes['*'],
    params: {},
  };
};

export default router;
