export const ROUTES = {
  MAIN: '/',
  GAMES: '/games',
  GAME: '/games/:language/:id',
  GAME_RESULT: '/games/:language/result',
  LEARN: '/learn',
  LEARN_DETAIL: '/learn/:id',
  ARTICLE: '/article',
  ARTICLE_DETAIL: '/article/:id',
  NOT_FOUND: '*',
};

// 동적 경로를 생성할 때 사용
export const BUILD_ROUTES = {
  GAME: (language, id) => `/games/${language}/${id}`,
  GAME_RESULT: (language) => `/games/${language}/result`,
  LEARN_DETAIL: (id) => `/learn/${id}`,
  ARTICLE_DETAIL: (id) => `/article/${id}`,
};
