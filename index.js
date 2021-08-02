/* eslint-disable brace-style */
/* eslint-disable no-useless-catch */
require('dotenv').config();

const { setupContainer } = require('./src/config/container');
const { setupBroker } = require('./src/config/queue')();

(async () => {
  try {
    setupContainer();
    await setupBroker();
  } catch (e) {
    throw e;
  }
})();
