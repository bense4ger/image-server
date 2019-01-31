const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const routes = require('./routes');

module.exports = class {
  constructor(port) {
    this._port = port;
    this._app = express();
  }

  configure() {

    this._app.use(expressWinston.logger({
      transports: [new winston.transports.Console()],
      msg: '{{req.method}} - {{req.url}}: {{JSON.stringify(req.params)}}',
    }));

    const router = express.Router();
    Object.entries(routes).forEach(r => {
      router[r[1].method](r[1].route, r[1].handler);
    });

    this._app.use('/', router);
  }

  start() {
    this._app.listen(this._port, () => console.log(`Server listening on port: ${this._port}`));
  }
};
