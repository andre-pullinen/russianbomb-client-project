const requireModule = require.context(".", false, /\.route\.js$/);
let routes = [];

requireModule.keys().forEach(filename => {
  routes = routes.concat(
    requireModule(filename).default || requireModule(filename)
  );
});

export default routes;
