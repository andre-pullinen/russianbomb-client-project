const requireModule = require.context(".", false, /\.config\.js$/);
const configs = {};

requireModule.keys().forEach(filename => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .replace(/(\.\/|\.config\.js)/g, "")
    .replace(/^\w/, c => c.toUpperCase());

  configs[moduleName] =
    requireModule(filename).default || requireModule(filename);
});

export default configs;
