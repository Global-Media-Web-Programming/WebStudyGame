import { ROUTES } from '../constants/routes';
import MainPage from '../pages/main/MainPage';
import GamesPage from '../pages/games/GamesPage';
import GamePage from '../pages/games/[id]/GamePage';
import GameResultPage from '../pages/games/result/GameResultPage';
import ArticlePage from '../pages/article/ArticlePage';
import ArticleDetailPage from '../pages/article/[id]/ArticleDetailPage';
import LearnPage from '../pages/learn/LearnPage.js';
import LearnDetailPage from '../pages/learn/[id]/LearnDetailPage.js';
import NotFoundPage from '../pages/not-found/NotFoundPage';

const routes = {
  [ROUTES.MAIN]: MainPage,
  [ROUTES.GAMES]: GamesPage,
  // 동적 경로
  [ROUTES.GAME]: GamePage,
  [ROUTES.GAME_RESULT]: GameResultPage,
  [ROUTES.ARTICLE]: ArticlePage,
  [ROUTES.ARTICLE_DETAIL]: ArticleDetailPage,
  [ROUTES.LEARN]: LearnPage,
  [ROUTES.LEARN_DETAIL]: LearnDetailPage,
  // 404
  [ROUTES.NOT_FOUND]: NotFoundPage,
};

export default routes;
