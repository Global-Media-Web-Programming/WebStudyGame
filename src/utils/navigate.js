const navigate = (path) => {
  window.history.pushState(null, null, path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export default navigate;
