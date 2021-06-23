const requireModule = require.context(".", false, /\.service\.js$/);
const services = {};

requireModule.keys().forEach(filename => {
  const moduleName = filename
    .replace(/(\.\/|\.service\.js)/g, "")
    .replace(/^\w/, c => c.toUpperCase());

  services[moduleName] =
    requireModule(filename).default || requireModule(filename);
});

for (const moduleName of Object.keys(services)) {
  if (services[moduleName].init) {
    services[moduleName].init();
  }
}

export default services;
