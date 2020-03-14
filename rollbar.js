const Rollbar = require('rollbar');

let options = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

if (process.env.NODE_ENV !== 'production') {
  options = {
    ...options,
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  };
}

const rollbar = new Rollbar(options);

export default rollbar;
