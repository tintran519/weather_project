var _ = require('lodash');

var localEnvVars = {
  TITLE: 'weather',
  SAFE_TITLE: 'weather',
}

module.exports = _.extend(process.env, localEnvVars);
