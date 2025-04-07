const ROUTES = {
  MAIN: '/',
  GAMES: '/games',
  HTML_GAMES: '/games/html/:gameId',
  CSS_GAMES: '/games/css/:gameId',
  HTML_GAME_RESULT: '/games/html/result',
  CSS_GAME_RESULT: '/games/css/result',
  LEARN: '/learn',
  LEARN_DETAIL: '/learn/:learnId',
  ARTICLE: '/article',
  ARTICLE_DETAIL: '/article/:articleId',
  NOT_FOUND: '*',
};

export default ROUTES;
