import './styles/global.css';
import './styles/font.css';
import router from './router/router';

// 초기 로드
window.addEventListener('DOMContentLoaded', router);

// 뒤로/앞으로 가기
window.addEventListener('popstate', router);

// 링크 클릭 이벤트 가로채기
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (!target || target.origin !== location.origin) return;

  e.preventDefault();
  const path = target.pathname;
  history.pushState(null, '', path);
  router();
});
