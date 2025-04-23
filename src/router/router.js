import Layout from '../components/layout/Layout';
import routes from './routes';
import protectedRoute from './protectedRoute';

const router = () => {
  const path = location.pathname;
  const app = document.querySelector('#app');
  const isGamePage = /^\/games\/(html|css)/.test(path);

  const matchedRoute = matchRoute(path);
  let { component, params } = matchedRoute;

  // 게임 페이지인 경우 protectedRoute 적용
  if (isGamePage) {
    // result 페이지
    if (path.endsWith('/result')) {
      component = protectedRoute(component, { ...params, id: 'result' });
    } else if (params.language && params.id) {
      component = protectedRoute(component, params);
    }
  }

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
