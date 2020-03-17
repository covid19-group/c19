const Rollbar = require('rollbar');

let options = {
  captureUncaught: true,
  captureUnhandledRejections: true,
};

if (process.env.NODE_ENV !== 'development') {
  options = {
    ...options,
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  };
}

const rollbar = new Rollbar(options);

export default rollbar;
