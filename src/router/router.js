import Layout from '../components/layout/Layout';

const router = () => {
  const path = location.pathname;
  const app = document.querySelector('#app');
  const isGamePage = /^\/games\/(html|css)/.test(path);

  new Layout(app, { matched: path, isGamePage });
};

export default router;
