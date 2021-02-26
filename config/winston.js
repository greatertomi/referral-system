const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 10,
    colorize: true
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

module.exports = logger;
