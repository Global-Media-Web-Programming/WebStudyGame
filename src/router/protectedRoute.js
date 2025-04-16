import Store from '../store/Store';
import navigate from '../utils/navigate';
import { BUILD_ROUTES } from '../constants/routes';

const protectedRoute = (Component, { language, id }) => {
  const currentSolved =
    language === 'html' ? Store.state.isHtmlSolved : Store.state.isCssSolved;
  const currentLevel =
    language === 'html' ? Store.state.htmlLevel : Store.state.cssLevel;

  console.log('id: ', id);
  console.log('currentLevel: ', currentLevel);

  // 게임 결과 페이지 접근 시
  if (id === 'result') {
    if (!currentSolved) {
      navigate(BUILD_ROUTES.GAME(language, currentLevel));
      return null;
    }
    // 해결했으면 결과 페이지 렌덜이
    return Component;
  }

  const requestedLevel = parseInt(id);

  // 현재 레벨보다 높은 문제로 접근하려고 할 때
  if (requestedLevel > currentLevel + 1) {
    // 현재 레벨로 리다이렉트
    navigate(BUILD_ROUTES.GAME(language, currentLevel));
    return null;
  }

  // 현재 레벨이거나 다음 레벨이면 접근 허용
  if (requestedLevel === currentLevel || requestedLevel === currentLevel + 1) {
    return Component;
  }

  // 그 외의 경우 현재 레벨로 리다이렉트
  navigate(BUILD_ROUTES.GAME(language, currentLevel));
  return null;
};

export default protectedRoute;
