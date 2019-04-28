const cucumber = require('cypress-cucumber-preprocessor').default;
const watchApp = require('cypress-app-watcher-preprocessor');
module.exports = on => {
  on('file:preprocessor', watchApp(cucumber()));
};
