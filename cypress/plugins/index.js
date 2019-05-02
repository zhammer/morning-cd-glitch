const fs = require('fs');
const cucumber = require('cypress-cucumber-preprocessor').default;
const watchApp = require('cypress-app-watcher-preprocessor');

const graphqlSchema = fs.readFileSync('cypress/plugins/schema.graphql', 'utf8');
module.exports = (on, config) => {
  on('file:preprocessor', watchApp(cucumber()));
  config.env.GRAPHQL_SCHEMA = graphqlSchema;
  return config;
};
